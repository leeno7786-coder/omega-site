// @vitest-environment node
import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';

it('publishes a public NanoAI client identity with only fixed PC loopback callbacks and no shared secret', () => {
  const text = readFileSync(new URL('../../public/clients/nanoai-myob.json', import.meta.url), 'utf8');
  const client = JSON.parse(text);
  expect(client.client_id).toBe('https://plugins.omega2ai.com/clients/nanoai-myob.json');
  expect(client.client_name).toBe('NanoAI');
  expect(client.token_endpoint_auth_method).toBe('none');
  expect(client.redirect_uris).toEqual(['http://localhost:7420/oauth/callback', 'http://127.0.0.1:7420/oauth/callback']);
  expect(client.grant_types).toEqual(['authorization_code', 'refresh_token']);
  expect(text).not.toContain('client_secret');
});
