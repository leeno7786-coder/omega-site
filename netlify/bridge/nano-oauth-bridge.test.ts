// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { createNanoBridgeHandler } from './nano-oauth-bridge';
import nanoFunction, { config } from '../functions/nano-oauth-bridge';
import { createBridgeHandler } from './oauth-bridge';

const origin = 'https://plugins.omega2ai.com';
const state = 'a'.repeat(64);
const verifier = 'v'.repeat(64);
const challenge = Buffer.from(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))).toString('base64url');
const env = {
  NANO_BRIDGE_HANDLE_KEY: Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString('base64'),
  NANO_BRIDGE_SLACK_CLIENT_ID: 'nano-slack-fixture',
  NANO_BRIDGE_SLACK_CLIENT_SECRET: crypto.randomUUID(),
  // HubSpot deliberately has no configuration; it must not affect Slack.
};
const post = (profile: string, action: string, body: unknown) => new Request(`${origin}/nano/bridge/v1/${profile}/${action}`, { method: 'POST', body: JSON.stringify(body) });
const begin = { state_digest: state, pkce_challenge: challenge, scopes: ['users:read'] };

describe('NanoAI bridge deployment contract', () => {
  it('keeps the existing relay and Omega routes while placing new callbacks ahead of the wildcard', () => {
    const toml = readFileSync(new URL('../../netlify.toml', import.meta.url), 'utf8');
    expect(config).toEqual({ path: '/nano/bridge/v1/*' });
    expect(typeof nanoFunction).toBe('function');
    for (const name of ['nano.slack', 'nano.hubspot']) {
      const route = `from = "${origin}/oauth/${name}/callback"`;
      expect(toml).toContain(route);
      expect(toml.indexOf(route)).toBeLessThan(toml.indexOf('from = "https://plugins.omega2ai.com/oauth/*"'));
      expect(toml).toContain(`to = "/nano/bridge/v1/${name}/callback"`);
    }
    expect(toml).toContain('to = "http://127.0.0.1:7420/oauth/callback"');
    expect(toml).toContain('to = "/bridge/v1/slack.desktop/callback"');
  });

  it('returns only a sealed handle to Nano port 7420 and exchanges the code with the server-only secret', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ access_token: 'at-fixture', token_type: 'Bearer', refresh_token: 'rt-fixture', private_provider_field: 'drop' })));
    const handler = createNanoBridgeHandler({ env, fetch: fetchImpl });
    const started = await handler(post('nano.slack', 'begin', begin));
    expect(started.status).toBe(200);
    const authorize = new URL((await started.json()).authorization_url);
    expect(authorize.origin + authorize.pathname).toBe('https://slack.com/oauth/v2_user/authorize');
    expect(authorize.searchParams.get('client_id')).toBe('nano-slack-fixture');
    expect(authorize.searchParams.get('redirect_uri')).toBe(`${origin}/oauth/nano.slack/callback`);
    expect(authorize.searchParams.get('code_challenge_method')).toBe('S256');
    const rawCode = crypto.randomUUID();
    const callback = await handler(new Request(`${origin}/nano/bridge/v1/nano.slack/callback?${new URLSearchParams({ state, code: rawCode, iss: 'https://mcp.slack.com' })}`));
    const local = new URL(callback.headers.get('location')!);
    expect(local.origin + local.pathname).toBe('http://127.0.0.1:7420/oauth/callback');
    expect(local.searchParams.get('code')).toBeNull();
    expect(local.href).not.toContain(rawCode);
    expect(local.searchParams.get('iss')).toBe('https://mcp.slack.com');
    const handle = local.searchParams.get('completion_handle');
    const redeemed = await handler(post('nano.slack', 'redeem', { state_digest: state, completion_handle: handle, pkce_verifier: verifier }));
    expect(await redeemed.json()).toEqual({ access_token: 'at-fixture', token_type: 'Bearer', refresh_token: 'rt-fixture' });
    const [target, init] = fetchImpl.mock.calls[0];
    expect(target).toBe('https://slack.com/api/oauth.v2.user.access');
    expect(init?.redirect).toBe('error');
    const form = new URLSearchParams(String(init?.body));
    expect(form.get('code')).toBe(rawCode);
    expect(form.get('client_secret')).toBe(env.NANO_BRIDGE_SLACK_CLIENT_SECRET);
    expect(form.get('code_verifier')).toBe(verifier);
    expect(form.get('redirect_uri')).toBe(`${origin}/oauth/nano.slack/callback`);
    const wrongState = await handler(post('nano.slack', 'redeem', { state_digest: 'b'.repeat(64), completion_handle: handle, pkce_verifier: verifier }));
    expect(wrongState.status).toBe(400);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('fails closed for missing secrets, unknown profiles, wrong hosts and mismatched issuers', async () => {
    const handler = createNanoBridgeHandler({ env });
    expect((await handler(post('nano.hubspot', 'begin', begin))).status).toBe(503);
    expect((await handler(post('nano.unknown', 'begin', begin))).status).toBe(404);
    expect((await handler(new Request('https://omega2ai.com/nano/bridge/v1/nano.slack/begin', { method: 'POST', body: JSON.stringify(begin) }))).status).toBe(404);
    expect((await handler(new Request(`${origin}/nano/bridge/v1/nano.slack/callback?state=${state}&code=a&iss=https://wrong.example`))).status).toBe(400);
    const unconfigured = createNanoBridgeHandler({ env: { ...env, NANO_BRIDGE_HANDLE_KEY: undefined } });
    expect((await unconfigured(post('nano.slack', 'begin', begin))).status).toBe(503);
    const oldOmega = createBridgeHandler({ env });
    expect((await oldOmega(post('nano.slack', 'begin', begin))).status).toBe(404);
  });

  it('uses HubSpot published v3 token endpoint and lets the provider determine user scopes', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ access_token: 'at-hubspot', token_type: 'Bearer' })));
    const handler = createNanoBridgeHandler({ env: { ...env, NANO_BRIDGE_HUBSPOT_CLIENT_ID: 'nano-hubspot-fixture', NANO_BRIDGE_HUBSPOT_CLIENT_SECRET: crypto.randomUUID() }, fetch: fetchImpl });
    const started = await handler(post('nano.hubspot', 'begin', { ...begin, scopes: [] }));
    expect(started.status).toBe(200);
    const authorize = new URL((await started.json()).authorization_url);
    expect(authorize.origin + authorize.pathname).toBe('https://mcp.hubspot.com/oauth/authorize/user');
    expect(authorize.searchParams.has('scope')).toBe(false);
    const callback = await handler(new Request(`${origin}/nano/bridge/v1/nano.hubspot/callback?state=${state}&code=fixture`));
    const handle = new URL(callback.headers.get('location')!).searchParams.get('completion_handle');
    expect((await handler(post('nano.hubspot', 'redeem', { state_digest: state, pkce_verifier: verifier, completion_handle: handle }))).status).toBe(200);
    expect(fetchImpl.mock.calls[0][0]).toBe('https://mcp.hubspot.com/oauth/v3/token');
  });
});
