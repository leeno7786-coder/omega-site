// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';

import bridgeFunction, { config as bridgeFunctionConfig } from '../functions/oauth-bridge';
import {
  BRIDGE_HOST,
  PROFILES,
  createBridgeHandler,
  type BridgeProfile,
} from './oauth-bridge';

// ---------------------------------------------------------------------------
// Fixtures. No secret is ever written here: the handle key and the client
// secret are generated per run.
// ---------------------------------------------------------------------------

function randomBase64(bytes: number): string {
  const raw = crypto.getRandomValues(new Uint8Array(bytes));
  let binary = '';
  for (const byte of raw) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function randomToken(prefix: string): string {
  return `${prefix}-${randomBase64(24).replace(/[^A-Za-z0-9]/g, '')}`;
}

const HANDLE_KEY = randomBase64(32);
const CLIENT_SECRET = randomToken('secret');
const ENV = {
  OMEGA_BRIDGE_HANDLE_KEY: HANDLE_KEY,
  OMEGA_BRIDGE_SLACK_CLIENT_SECRET: CLIENT_SECRET,
};

const SLACK = 'slack.desktop';
const STATE = 'a'.repeat(64);
const OTHER_STATE = 'b'.repeat(64);
const CHALLENGE = 'E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM';
const VERIFIER = 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk';
// Shape of a real Slack authorization code: team.user.hex-digest.
const SLACK_CODE = `11998542640562.11996630453446.${'0123456789abcdef'.repeat(4)}`;
const T0 = Date.UTC(2026, 8, 25, 12, 0, 0);

const TEST_PROFILE: BridgeProfile = {
  id: 'test.revocable',
  clientId: 'test-client-id',
  clientSecretEnv: 'OMEGA_BRIDGE_SLACK_CLIENT_SECRET',
  issuer: 'https://issuer.example',
  authorizeEndpoint: 'https://issuer.example/authorize',
  tokenEndpoint: 'https://issuer.example/token',
  revocationEndpoint: 'https://issuer.example/revoke',
  redirectUri: 'https://plugins.omega2ai.com/oauth/test.revocable/callback',
  resource: 'https://issuer.example/mcp',
  allowedScopes: ['read'],
};

type FetchMock = ReturnType<typeof vi.fn<typeof fetch>>;

function makeHandler(options: {
  env?: Record<string, string | undefined>;
  fetchImpl?: FetchMock;
  now?: () => number;
  withTestProfile?: boolean;
} = {}) {
  const fetchImpl = options.fetchImpl ?? vi.fn<typeof fetch>();
  const handler = createBridgeHandler({
    env: options.env ?? ENV,
    fetch: fetchImpl,
    now: options.now ?? (() => T0),
    profiles: options.withTestProfile ? { ...PROFILES, [TEST_PROFILE.id]: TEST_PROFILE } : PROFILES,
  });
  return { handler, fetchImpl };
}

function post(path: string, body: unknown, host = BRIDGE_HOST): Request {
  return new Request(`https://${host}${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

function get(pathAndQuery: string, host = BRIDGE_HOST): Request {
  return new Request(`https://${host}${pathAndQuery}`, { method: 'GET' });
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

async function callbackHandle(
  handler: (req: Request) => Promise<Response>,
  profile = SLACK,
  state = STATE,
  code = SLACK_CODE,
): Promise<string> {
  const query = new URLSearchParams({ code, state });
  const response = await handler(get(`/oauth/${profile}/callback?${query}`));
  expect(response.status).toBe(302);
  const location = new URL(response.headers.get('location') ?? '');
  const handle = location.searchParams.get('completion_handle');
  expect(handle).toBeTruthy();
  return handle as string;
}

function sentForm(fetchImpl: FetchMock, call = 0): { url: string; form: Record<string, string>; init: RequestInit } {
  const [input, init] = fetchImpl.mock.calls[call];
  const body = (init as RequestInit).body;
  const params = new URLSearchParams(typeof body === 'string' ? body : (body as URLSearchParams).toString());
  return { url: String(input), form: Object.fromEntries(params), init: init as RequestInit };
}

afterEach(() => {
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------

describe('profile configuration', () => {
  it('carries the published slack.desktop profile exactly', () => {
    expect(PROFILES[SLACK]).toEqual({
      id: SLACK,
      clientId: '11998542640562.11996630453446',
      clientSecretEnv: 'OMEGA_BRIDGE_SLACK_CLIENT_SECRET',
      issuer: 'https://mcp.slack.com',
      authorizeEndpoint: 'https://slack.com/oauth/v2_user/authorize',
      tokenEndpoint: 'https://slack.com/api/oauth.v2.user.access',
      revocationEndpoint: null,
      redirectUri: 'https://plugins.omega2ai.com/oauth/slack.desktop/callback',
      resource: 'https://mcp.slack.com',
      allowedScopes: [
        'channels:history', 'channels:read', 'chat:write', 'groups:history', 'groups:read',
        'im:history', 'im:read', 'search:read.public', 'users:read',
      ],
    });
  });

  it('routes the function only under /bridge/v1/ (the slack callback arrives by a host-scoped rewrite)', () => {
    expect(bridgeFunctionConfig).toEqual({ path: '/bridge/v1/*' });
    expect(typeof bridgeFunction).toBe('function');
  });
});

describe('POST /bridge/v1/{profile}/begin', () => {
  const scopes = ['users:read', 'channels:read', 'chat:write'];

  it('builds exactly the specified authorize URL', async () => {
    const { handler, fetchImpl } = makeHandler();
    const response = await handler(
      post(`/bridge/v1/${SLACK}/begin`, { state_digest: STATE, pkce_challenge: CHALLENGE, scopes }),
    );
    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).toBe('no-store');
    const body = await response.json();
    expect(Object.keys(body)).toEqual(['authorization_url']);
    const url = new URL(body.authorization_url);
    expect(`${url.origin}${url.pathname}`).toBe('https://slack.com/oauth/v2_user/authorize');
    expect([...url.searchParams.keys()].sort()).toEqual([
      'client_id', 'code_challenge', 'code_challenge_method', 'redirect_uri', 'resource',
      'response_type', 'scope', 'state',
    ]);
    expect(Object.fromEntries(url.searchParams)).toEqual({
      client_id: '11998542640562.11996630453446',
      code_challenge: CHALLENGE,
      code_challenge_method: 'S256',
      redirect_uri: 'https://plugins.omega2ai.com/oauth/slack.desktop/callback',
      resource: 'https://mcp.slack.com',
      response_type: 'code',
      scope: 'channels:read chat:write users:read',
      state: STATE,
    });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it.each([
    ['uppercase digest', { state_digest: 'A'.repeat(64), pkce_challenge: CHALLENGE, scopes }],
    ['short digest', { state_digest: 'a'.repeat(63), pkce_challenge: CHALLENGE, scopes }],
    ['missing digest', { pkce_challenge: CHALLENGE, scopes }],
    ['short challenge', { state_digest: STATE, pkce_challenge: 'a'.repeat(42), scopes }],
    ['long challenge', { state_digest: STATE, pkce_challenge: 'a'.repeat(129), scopes }],
    ['non-base64url challenge', { state_digest: STATE, pkce_challenge: `${'a'.repeat(42)}=`, scopes }],
    ['empty scopes', { state_digest: STATE, pkce_challenge: CHALLENGE, scopes: [] }],
    ['duplicate scopes', { state_digest: STATE, pkce_challenge: CHALLENGE, scopes: ['users:read', 'users:read'] }],
    ['disallowed scope', { state_digest: STATE, pkce_challenge: CHALLENGE, scopes: ['users:read', 'admin'] }],
    ['non-string scope', { state_digest: STATE, pkce_challenge: CHALLENGE, scopes: [7] }],
    ['scopes not a list', { state_digest: STATE, pkce_challenge: CHALLENGE, scopes: 'users:read' }],
  ])('rejects %s', async (_label, body) => {
    const { handler } = makeHandler();
    const response = await handler(post(`/bridge/v1/${SLACK}/begin`, body));
    expect(response.status).toBe(400);
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(await response.json()).toEqual({ error: 'invalid_request' });
  });

  it('rejects a body that is not a JSON object', async () => {
    const { handler } = makeHandler();
    for (const body of ['not json', '[]', 'null']) {
      const response = await handler(post(`/bridge/v1/${SLACK}/begin`, body));
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({ error: 'invalid_request' });
    }
  });

  it('answers 404 unknown_profile for a profile the bridge does not hold', async () => {
    const { handler } = makeHandler();
    const response = await handler(
      post('/bridge/v1/github.desktop/begin', { state_digest: STATE, pkce_challenge: CHALLENGE, scopes }),
    );
    expect(response.status).toBe(404);
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(await response.json()).toEqual({ error: 'unknown_profile' });
  });
});

describe('GET /oauth/{profile}/callback', () => {
  it('turns a success into a loopback redirect carrying state, handle and iss, and never the code', async () => {
    const { handler } = makeHandler();
    const query = new URLSearchParams({ code: SLACK_CODE, state: STATE });
    const response = await handler(get(`/oauth/${SLACK}/callback?${query}`));
    expect(response.status).toBe(302);
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(response.headers.get('referrer-policy')).toBe('no-referrer');
    const raw = response.headers.get('location') ?? '';
    expect(raw).not.toContain(SLACK_CODE);
    expect(raw).not.toContain(encodeURIComponent(SLACK_CODE));
    const location = new URL(raw);
    expect(`${location.origin}${location.pathname}`).toBe('http://127.0.0.1:13310/oauth/slack.desktop/callback');
    expect([...location.searchParams.keys()]).toEqual(['state', 'completion_handle', 'iss']);
    expect(location.searchParams.get('state')).toBe(STATE);
    expect(location.searchParams.get('iss')).toBe('https://mcp.slack.com');
    const handle = location.searchParams.get('completion_handle') ?? '';
    expect(handle).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(handle.length).toBeLessThanOrEqual(1024);
    expect(await response.text()).toBe('');
  });

  it('is also served at the rewritten function path', async () => {
    const { handler } = makeHandler();
    const query = new URLSearchParams({ code: SLACK_CODE, state: STATE });
    const response = await handler(get(`/bridge/v1/${SLACK}/callback?${query}`));
    expect(response.status).toBe(302);
    expect(new URL(response.headers.get('location') ?? '').searchParams.get('completion_handle')).toBeTruthy();
  });

  it('keeps the handle within 1024 bytes for a long realistic code', async () => {
    const { handler } = makeHandler();
    const longCode = `11998542640562.11996630453446.${'f'.repeat(512)}`;
    const handle = await callbackHandle(handler, SLACK, STATE, longCode);
    expect(new TextEncoder().encode(handle).length).toBeLessThanOrEqual(1024);
  });

  it('refuses a code too long to fit a 1024-byte handle', async () => {
    const { handler } = makeHandler();
    const query = new URLSearchParams({ code: 'c'.repeat(2000), state: STATE });
    const response = await handler(get(`/oauth/${SLACK}/callback?${query}`));
    expect(response.status).toBe(400);
    expect(response.headers.get('location')).toBeNull();
  });

  it('turns a provider error into a loopback redirect carrying state, error and iss, and no handle', async () => {
    const { handler } = makeHandler();
    const query = new URLSearchParams({ error: 'access_denied', state: STATE });
    const response = await handler(get(`/oauth/${SLACK}/callback?${query}`));
    expect(response.status).toBe(302);
    expect(response.headers.get('cache-control')).toBe('no-store');
    const location = new URL(response.headers.get('location') ?? '');
    expect(`${location.origin}${location.pathname}`).toBe('http://127.0.0.1:13310/oauth/slack.desktop/callback');
    expect([...location.searchParams.keys()]).toEqual(['state', 'error', 'iss']);
    expect(location.searchParams.get('error')).toBe('access_denied');
    expect(location.searchParams.get('state')).toBe(STATE);
    expect(location.searchParams.get('iss')).toBe('https://mcp.slack.com');
  });

  it.each([
    ['nothing', ''],
    ['code without state', `code=${SLACK_CODE}`],
    ['error without state', 'error=access_denied'],
    ['state alone', `state=${STATE}`],
    ['code and error together', `code=${SLACK_CODE}&error=access_denied&state=${STATE}`],
    ['empty code', `code=&state=${STATE}`],
    ['state that is not a digest', `code=${SLACK_CODE}&state=not-a-digest`],
    ['repeated code', `code=${SLACK_CODE}&code=other&state=${STATE}`],
    ['repeated state', `code=${SLACK_CODE}&state=${STATE}&state=${OTHER_STATE}`],
  ])('answers 400 to %s', async (_label, query) => {
    const { handler } = makeHandler();
    const response = await handler(get(`/oauth/${SLACK}/callback?${query}`));
    expect(response.status).toBe(400);
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(response.headers.get('location')).toBeNull();
  });

  it('answers 404 unknown_profile for a callback of a profile without a bridge entry', async () => {
    const { handler } = makeHandler();
    const response = await handler(get(`/oauth/github.desktop/callback?code=x&state=${STATE}`));
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: 'unknown_profile' });
  });
});

describe('POST /bridge/v1/{profile}/redeem', () => {
  const tokenBody = {
    ok: true,
    access_token: 'xoxp-access',
    refresh_token: 'xoxe-refresh',
    token_type: 'user',
    scope: 'users:read,channels:read',
    expires_in: 43200,
    team: { id: 'T1' },
  };

  it('decrypts the handle and POSTs exactly the specified form', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(jsonResponse(tokenBody));
    const { handler } = makeHandler({ fetchImpl });
    const handle = await callbackHandle(handler);
    const response = await handler(
      post(`/bridge/v1/${SLACK}/redeem`, { completion_handle: handle, state_digest: STATE, pkce_verifier: VERIFIER }),
    );
    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const { url, form, init } = sentForm(fetchImpl);
    expect(url).toBe('https://slack.com/api/oauth.v2.user.access');
    expect(init.method).toBe('POST');
    expect(new Headers(init.headers).get('content-type')).toBe('application/x-www-form-urlencoded');
    expect(form).toEqual({
      client_id: '11998542640562.11996630453446',
      client_secret: CLIENT_SECRET,
      code: SLACK_CODE,
      code_verifier: VERIFIER,
      grant_type: 'authorization_code',
      redirect_uri: 'https://plugins.omega2ai.com/oauth/slack.desktop/callback',
      resource: 'https://mcp.slack.com',
    });
  });

  it('passes the provider token fields through unchanged and invents nothing', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(jsonResponse(tokenBody));
    const { handler } = makeHandler({ fetchImpl });
    const handle = await callbackHandle(handler);
    const response = await handler(
      post(`/bridge/v1/${SLACK}/redeem`, { completion_handle: handle, state_digest: STATE, pkce_verifier: VERIFIER }),
    );
    expect(await response.json()).toEqual({
      access_token: 'xoxp-access',
      refresh_token: 'xoxe-refresh',
      token_type: 'user',
      scope: 'users:read,channels:read',
      expires_in: 43200,
    });
  });

  it('leaves absent token fields absent', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(jsonResponse({ access_token: 'only', token_type: 'Bearer' }));
    const { handler } = makeHandler({ fetchImpl });
    const handle = await callbackHandle(handler);
    const response = await handler(
      post(`/bridge/v1/${SLACK}/redeem`, { completion_handle: handle, state_digest: STATE, pkce_verifier: VERIFIER }),
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ access_token: 'only', token_type: 'Bearer' });
  });

  it.each([
    ['invalid_grant', 'invalid_grant'],
    ['invalid_client', 'invalid_client'],
    ['invalid_request', 'invalid_request'],
    ['unauthorized_client', 'unauthorized_client'],
    ['unsupported_grant_type', 'unsupported_grant_type'],
    ['invalid_scope', 'invalid_scope'],
    // Slack's own codes carry the RFC 6749 s5.2 meaning, so the unit can tell a bad
    // grant from a misconfigured client secret.
    ['invalid_code', 'invalid_grant'],
    ['code_already_used', 'invalid_grant'],
    ['code_expired', 'invalid_grant'],
    ['invalid_refresh_token', 'invalid_grant'],
    ['bad_redirect_uri', 'invalid_grant'],
    ['bad_client_secret', 'invalid_client'],
    ['invalid_client_id', 'invalid_client'],
    ['something_unexpected', 'oauth_provider_rejected'],
  ])('maps Slack ok:false error %s to %s', async (providerError, mapped) => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(jsonResponse({ ok: false, error: providerError }));
    const { handler } = makeHandler({ fetchImpl });
    const handle = await callbackHandle(handler);
    const response = await handler(
      post(`/bridge/v1/${SLACK}/redeem`, { completion_handle: handle, state_digest: STATE, pkce_verifier: VERIFIER }),
    );
    expect(response.status).toBe(400);
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(await response.json()).toEqual({ error: mapped });
  });

  it('maps an RFC-style HTTP 400 refusal and a refusal without a code', async () => {
    for (const [provider, mapped] of [
      [jsonResponse({ error: 'invalid_grant', error_description: 'expired' }, 400), 'invalid_grant'],
      [jsonResponse({ ok: false }, 200), 'oauth_provider_rejected'],
      [jsonResponse({ token_type: 'Bearer' }, 200), 'oauth_provider_rejected'],
      [new Response('denied', { status: 401 }), 'oauth_provider_rejected'],
    ] as const) {
      const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(provider);
      const { handler } = makeHandler({ fetchImpl });
      const handle = await callbackHandle(handler);
      const response = await handler(
        post(`/bridge/v1/${SLACK}/redeem`, { completion_handle: handle, state_digest: STATE, pkce_verifier: VERIFIER }),
      );
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({ error: mapped });
    }
  });

  it('does not report an unreachable provider as a refusal', async () => {
    for (const fetchImpl of [
      vi.fn<typeof fetch>().mockRejectedValue(new TypeError('network down')),
      vi.fn<typeof fetch>().mockResolvedValue(new Response('<html>bad gateway</html>', { status: 502 })),
    ]) {
      const { handler } = makeHandler({ fetchImpl });
      const handle = await callbackHandle(handler);
      const response = await handler(
        post(`/bridge/v1/${SLACK}/redeem`, { completion_handle: handle, state_digest: STATE, pkce_verifier: VERIFIER }),
      );
      expect(response.status).toBe(502);
      expect(response.headers.get('cache-control')).toBe('no-store');
      expect(await response.json()).toEqual({ error: 'provider_unavailable' });
    }
  });

  it('rejects a tampered handle as invalid_grant without calling the provider', async () => {
    const { handler, fetchImpl } = makeHandler();
    const handle = await callbackHandle(handler);
    const index = 20;
    const swapped = handle[index] === 'A' ? 'B' : 'A';
    const tampered = `${handle.slice(0, index)}${swapped}${handle.slice(index + 1)}`;
    for (const bad of [tampered, handle.slice(0, -4), 'AAAA', `${handle}AAAA`]) {
      const response = await handler(
        post(`/bridge/v1/${SLACK}/redeem`, { completion_handle: bad, state_digest: STATE, pkce_verifier: VERIFIER }),
      );
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({ error: 'invalid_grant' });
    }
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('rejects a handle redeemed under another profile (AAD binding)', async () => {
    const { handler, fetchImpl } = makeHandler({ withTestProfile: true });
    const handle = await callbackHandle(handler, SLACK);
    const response = await handler(
      post(`/bridge/v1/${TEST_PROFILE.id}/redeem`, { completion_handle: handle, state_digest: STATE, pkce_verifier: VERIFIER }),
    );
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'invalid_grant' });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('rejects a handle presented with the wrong state digest', async () => {
    const { handler, fetchImpl } = makeHandler();
    const handle = await callbackHandle(handler);
    const response = await handler(
      post(`/bridge/v1/${SLACK}/redeem`, { completion_handle: handle, state_digest: OTHER_STATE, pkce_verifier: VERIFIER }),
    );
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'invalid_grant' });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('honours the handle for ten minutes and rejects it after', async () => {
    let now = T0;
    const fetchImpl = vi.fn<typeof fetch>().mockImplementation(async () => jsonResponse(tokenBody));
    const { handler } = makeHandler({ fetchImpl, now: () => now });
    const handle = await callbackHandle(handler);
    const redeem = () => handler(
      post(`/bridge/v1/${SLACK}/redeem`, { completion_handle: handle, state_digest: STATE, pkce_verifier: VERIFIER }),
    );
    now = T0 + 9 * 60 * 1000 + 59 * 1000;
    expect((await redeem()).status).toBe(200);
    now = T0 + 10 * 60 * 1000;
    const expired = await redeem();
    expect(expired.status).toBe(400);
    expect(await expired.json()).toEqual({ error: 'invalid_grant' });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('rejects a handle sealed under a different key', async () => {
    const { handler: other } = makeHandler({ env: { ...ENV, OMEGA_BRIDGE_HANDLE_KEY: randomBase64(32) } });
    const foreign = await callbackHandle(other);
    const { handler, fetchImpl } = makeHandler();
    const response = await handler(
      post(`/bridge/v1/${SLACK}/redeem`, { completion_handle: foreign, state_digest: STATE, pkce_verifier: VERIFIER }),
    );
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'invalid_grant' });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it.each([
    ['missing verifier', { completion_handle: 'AAAA', state_digest: STATE }],
    ['bad verifier', { completion_handle: 'AAAA', state_digest: STATE, pkce_verifier: 'short' }],
    ['bad digest', { completion_handle: 'AAAA', state_digest: 'nope', pkce_verifier: VERIFIER }],
    ['missing handle', { state_digest: STATE, pkce_verifier: VERIFIER }],
  ])('rejects a malformed request (%s)', async (_label, body) => {
    const { handler, fetchImpl } = makeHandler();
    const response = await handler(post(`/bridge/v1/${SLACK}/redeem`, body));
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'invalid_request' });
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});

describe('POST /bridge/v1/{profile}/refresh', () => {
  it('POSTs exactly the specified form and passes the tokens through', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      jsonResponse({ ok: true, access_token: 'new-access', refresh_token: 'new-refresh', token_type: 'user', expires_in: 43200 }),
    );
    const { handler } = makeHandler({ fetchImpl });
    const response = await handler(
      post(`/bridge/v1/${SLACK}/refresh`, { refresh_token: 'xoxe-old-refresh', state_digest: STATE }),
    );
    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(await response.json()).toEqual({
      access_token: 'new-access', refresh_token: 'new-refresh', token_type: 'user', expires_in: 43200,
    });
    const { url, form } = sentForm(fetchImpl);
    expect(url).toBe('https://slack.com/api/oauth.v2.user.access');
    expect(form).toEqual({
      client_id: '11998542640562.11996630453446',
      client_secret: CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: 'xoxe-old-refresh',
      resource: 'https://mcp.slack.com',
    });
  });

  it('maps a refusal to its RFC code, else oauth_provider_rejected', async () => {
    for (const [providerError, mapped] of [
      ['invalid_grant', 'invalid_grant'],
      ['invalid_refresh_token', 'invalid_grant'],
      ['something_unexpected', 'oauth_provider_rejected'],
    ]) {
      const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(jsonResponse({ ok: false, error: providerError }));
      const { handler } = makeHandler({ fetchImpl });
      const response = await handler(post(`/bridge/v1/${SLACK}/refresh`, { refresh_token: 'r', state_digest: STATE }));
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({ error: mapped });
    }
  });

  it('rejects a malformed request', async () => {
    const { handler, fetchImpl } = makeHandler();
    for (const body of [{ state_digest: STATE }, { refresh_token: '', state_digest: STATE }, { refresh_token: 'r', state_digest: 'x' }]) {
      const response = await handler(post(`/bridge/v1/${SLACK}/refresh`, body));
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({ error: 'invalid_request' });
    }
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});

describe('POST /bridge/v1/{profile}/revoke', () => {
  it('answers endpoint_advertised false and calls nothing when the profile has no revocation endpoint', async () => {
    const { handler, fetchImpl } = makeHandler();
    const response = await handler(post(`/bridge/v1/${SLACK}/revoke`, { refresh_token: 'r', state_digest: STATE }));
    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(await response.json()).toEqual({ endpoint_advertised: false, provider_request_sent: false });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('calls an advertised revocation endpoint and says so', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 200 }));
    const { handler } = makeHandler({ fetchImpl, withTestProfile: true });
    const response = await handler(
      post(`/bridge/v1/${TEST_PROFILE.id}/revoke`, { refresh_token: 'r-token', state_digest: STATE }),
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ endpoint_advertised: true, provider_request_sent: true });
    const { url, form } = sentForm(fetchImpl);
    expect(url).toBe('https://issuer.example/revoke');
    expect(form).toEqual({
      client_id: 'test-client-id',
      client_secret: CLIENT_SECRET,
      token: 'r-token',
      token_type_hint: 'refresh_token',
    });
  });

  it('rejects a malformed request', async () => {
    const { handler } = makeHandler();
    const response = await handler(post(`/bridge/v1/${SLACK}/revoke`, { state_digest: STATE }));
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'invalid_request' });
  });
});

describe('configuration from the environment', () => {
  const requests = (): Request[] => [
    post(`/bridge/v1/${SLACK}/begin`, { state_digest: STATE, pkce_challenge: CHALLENGE, scopes: ['users:read'] }),
    get(`/oauth/${SLACK}/callback?code=${SLACK_CODE}&state=${STATE}`),
    post(`/bridge/v1/${SLACK}/redeem`, { completion_handle: 'AAAA', state_digest: STATE, pkce_verifier: VERIFIER }),
    post(`/bridge/v1/${SLACK}/refresh`, { refresh_token: 'r', state_digest: STATE }),
    post(`/bridge/v1/${SLACK}/revoke`, { refresh_token: 'r', state_digest: STATE }),
  ];

  it.each([
    ['no handle key', { OMEGA_BRIDGE_SLACK_CLIENT_SECRET: CLIENT_SECRET }],
    ['no client secret', { OMEGA_BRIDGE_HANDLE_KEY: HANDLE_KEY }],
    ['empty client secret', { OMEGA_BRIDGE_HANDLE_KEY: HANDLE_KEY, OMEGA_BRIDGE_SLACK_CLIENT_SECRET: '' }],
    ['a handle key that is not 32 bytes', { OMEGA_BRIDGE_HANDLE_KEY: randomBase64(16), OMEGA_BRIDGE_SLACK_CLIENT_SECRET: CLIENT_SECRET }],
    ['a handle key that is not base64', { OMEGA_BRIDGE_HANDLE_KEY: '!'.repeat(44), OMEGA_BRIDGE_SLACK_CLIENT_SECRET: CLIENT_SECRET }],
  ])('fails every endpoint with 503 bridge_unconfigured given %s', async (_label, env) => {
    const { handler, fetchImpl } = makeHandler({ env });
    for (const request of requests()) {
      const response = await handler(request);
      expect(response.status).toBe(503);
      expect(response.headers.get('cache-control')).toBe('no-store');
      expect(response.headers.get('location')).toBeNull();
      expect(await response.json()).toEqual({ error: 'bridge_unconfigured' });
    }
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});

describe('host scoping and routing', () => {
  it('serves nothing on the marketing domain or any other host', async () => {
    const { handler } = makeHandler();
    for (const host of ['omega2ai.com', 'www.omega2ai.com', 'omega-site.netlify.app']) {
      for (const request of [
        post(`/bridge/v1/${SLACK}/begin`, { state_digest: STATE, pkce_challenge: CHALLENGE, scopes: ['users:read'] }, host),
        get(`/oauth/${SLACK}/callback?code=${SLACK_CODE}&state=${STATE}`, host),
      ]) {
        const response = await handler(request);
        expect(response.status).toBe(404);
        expect(response.headers.get('cache-control')).toBe('no-store');
        expect(await response.json()).toEqual({ error: 'not_found' });
      }
    }
  });

  it('answers 404 to unknown actions and 405 to wrong methods', async () => {
    const { handler } = makeHandler();
    const unknown = await handler(post(`/bridge/v1/${SLACK}/exchange`, {}));
    expect(unknown.status).toBe(404);
    expect(unknown.headers.get('cache-control')).toBe('no-store');
    expect(await unknown.json()).toEqual({ error: 'not_found' });

    const wrongMethod = await handler(get(`/bridge/v1/${SLACK}/begin`));
    expect(wrongMethod.status).toBe(405);
    expect(wrongMethod.headers.get('cache-control')).toBe('no-store');
    expect(await wrongMethod.json()).toEqual({ error: 'method_not_allowed' });

    const postCallback = await handler(post(`/oauth/${SLACK}/callback`, {}));
    expect(postCallback.status).toBe(405);

    const badEscape = await handler(post('/bridge/v1/%E0%A4%A/begin', {}));
    expect(badEscape.status).toBe(404);
    expect(await badEscape.json()).toEqual({ error: 'not_found' });
  });

  it('never logs', async () => {
    const spies = (['log', 'info', 'warn', 'error', 'debug'] as const).map((level) => vi.spyOn(console, level));
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(jsonResponse({ ok: false, error: 'invalid_code' }));
    const { handler } = makeHandler({ fetchImpl });
    const handle = await callbackHandle(handler);
    await handler(post(`/bridge/v1/${SLACK}/redeem`, { completion_handle: handle, state_digest: STATE, pkce_verifier: VERIFIER }));
    await handler(post(`/bridge/v1/${SLACK}/redeem`, { completion_handle: 'garbage', state_digest: STATE, pkce_verifier: VERIFIER }));
    for (const spy of spies) expect(spy).not.toHaveBeenCalled();
  });
});

describe('review hardening', () => {
  it.each([500, 502, 503])(
    'reports a JSON %i from the token endpoint as provider_unavailable, never as a refusal',
    async (status) => {
      const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(jsonResponse({ error: 'server_error' }, status));
      const { handler } = makeHandler({ fetchImpl });
      const handle = await callbackHandle(handler);
      const response = await handler(
        post(`/bridge/v1/${SLACK}/redeem`, { completion_handle: handle, state_digest: STATE, pkce_verifier: VERIFIER }),
      );
      expect(response.status).toBe(502);
      expect(await response.json()).toEqual({ error: 'provider_unavailable' });
    },
  );

  it('never follows a redirect on a request that carries the client secret', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 200 }));
    const { handler } = makeHandler({ fetchImpl, withTestProfile: true });
    const handle = await callbackHandle(handler);
    await handler(
      post(`/bridge/v1/${SLACK}/redeem`, { completion_handle: handle, state_digest: STATE, pkce_verifier: VERIFIER }),
    );
    await handler(post(`/bridge/v1/${SLACK}/refresh`, { refresh_token: 'r', state_digest: STATE }));
    await handler(post(`/bridge/v1/${TEST_PROFILE.id}/revoke`, { refresh_token: 'r', state_digest: STATE }));
    expect(fetchImpl).toHaveBeenCalledTimes(3);
    for (const [, init] of fetchImpl.mock.calls) {
      expect(init?.redirect).toBe('error');
    }
  });

  it.each(['toString', 'constructor', '__proto__', 'hasOwnProperty'])(
    'maps the inherited-key error %s to the generic refusal',
    async (providerError) => {
      const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(jsonResponse({ ok: false, error: providerError }));
      const { handler } = makeHandler({ fetchImpl });
      const handle = await callbackHandle(handler);
      const response = await handler(
        post(`/bridge/v1/${SLACK}/redeem`, { completion_handle: handle, state_digest: STATE, pkce_verifier: VERIFIER }),
      );
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({ error: 'oauth_provider_rejected' });
    },
  );
});
