/**
 * Omega hosted OAuth bridge.
 *
 * Contract: Omega3.0 docs/plugin-hosted-oauth-bridge.md. Some providers (Slack's MCP server)
 * accept only a confidential client, so the provider client secret lives here and the bridge
 * performs the token requests. The desktop unit keeps the PKCE verifier, the raw state and the
 * tokens. The bridge is stateless: authorization codes only travel sealed inside a short-lived
 * completion handle, and nothing (code, token, handle, secret, verifier) is ever stored or logged.
 */

export const BRIDGE_HOST = 'plugins.omega2ai.com';
const LOOPBACK_ORIGIN = 'http://127.0.0.1:13310';
const HANDLE_KEY_ENV = 'OMEGA_BRIDGE_HANDLE_KEY';
const HANDLE_TTL_SECONDS = 10 * 60;
const HANDLE_MAX_BYTES = 1024;
const NONCE_BYTES = 12;
const GCM_TAG_BYTES = 16;

export interface BridgeProfile {
  id: string;
  clientId: string;
  /** Name of the environment variable holding this profile's client secret. */
  clientSecretEnv: string;
  issuer: string;
  authorizeEndpoint: string;
  tokenEndpoint: string;
  revocationEndpoint: string | null;
  redirectUri: string;
  resource: string;
  allowedScopes: readonly string[];
}

export const PROFILES: Readonly<Record<string, BridgeProfile>> = Object.freeze({
  'slack.desktop': {
    id: 'slack.desktop',
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
  },
});

/** RFC 6749 §5.2 error codes; any other provider error becomes oauth_provider_rejected. */
const RFC6749_TOKEN_ERRORS = new Set([
  'invalid_request', 'invalid_client', 'invalid_grant', 'unauthorized_client',
  'unsupported_grant_type', 'invalid_scope',
]);
/**
 * Slack's Web API error codes that carry an RFC 6749 s5.2 meaning. Mapping them lets the
 * unit tell a bad or used grant from a misconfigured client secret; anything else stays
 * the generic refusal, so no provider-authored text reaches the unit.
 */
const SLACK_TOKEN_ERRORS: Readonly<Record<string, string>> = {
  invalid_code: 'invalid_grant',
  code_already_used: 'invalid_grant',
  code_expired: 'invalid_grant',
  invalid_refresh_token: 'invalid_grant',
  bad_redirect_uri: 'invalid_grant',
  bad_client_secret: 'invalid_client',
  invalid_client_id: 'invalid_client',
};
/** The token-response fields passed through to the unit, and nothing else. */
const TOKEN_FIELDS = ['access_token', 'refresh_token', 'token_type', 'scope', 'expires_in'] as const;

const STATE_DIGEST = /^[0-9a-f]{64}$/;
const PKCE_CHALLENGE = /^[A-Za-z0-9_-]{43,128}$/;
const PKCE_VERIFIER = /^[A-Za-z0-9._~-]{43,128}$/;
const BASE64URL = /^[A-Za-z0-9_-]+$/;
const BASE64 = /^[A-Za-z0-9+/]+={0,2}$/;

export interface BridgeOptions {
  env: Readonly<Record<string, string | undefined>>;
  fetch?: typeof fetch;
  /** Milliseconds since the epoch. */
  now?: () => number;
  profiles?: Readonly<Record<string, BridgeProfile>>;
}

type Route =
  | { kind: 'action'; profileId: string; action: 'begin' | 'redeem' | 'refresh' | 'revoke' }
  | { kind: 'callback'; profileId: string };

// ---------------------------------------------------------------------------
// Responses. Every response carries Cache-Control: no-store.
// ---------------------------------------------------------------------------

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Cache-Control': 'no-store', 'Content-Type': 'application/json' },
  });
}

const failure = (status: number, error: string): Response => json(status, { error });

function redirect(location: string): Response {
  return new Response(null, {
    status: 302,
    headers: { 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer', Location: location },
  });
}

// ---------------------------------------------------------------------------
// Encoding helpers (Web platform only).
// ---------------------------------------------------------------------------

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToBytes(text: string): Uint8Array<ArrayBuffer> | null {
  if (!BASE64URL.test(text) || text.length % 4 === 1) return null;
  const padded = text.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (text.length % 4)) % 4);
  return binaryToBytes(atob(padded));
}

function binaryToBytes(binary: string): Uint8Array<ArrayBuffer> {
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

// ---------------------------------------------------------------------------
// Configuration. A missing or malformed variable is fatal for every endpoint.
// ---------------------------------------------------------------------------

interface Secrets {
  handleKey: CryptoKey;
  clientSecrets: Map<string, string>;
}

async function loadSecrets(
  env: BridgeOptions['env'],
  profiles: Readonly<Record<string, BridgeProfile>>,
): Promise<Secrets | null> {
  const rawKey = env[HANDLE_KEY_ENV];
  if (!rawKey || rawKey.length % 4 !== 0 || !BASE64.test(rawKey)) return null;
  const keyBytes = binaryToBytes(atob(rawKey));
  if (keyBytes.length !== 32) return null;
  const clientSecrets = new Map<string, string>();
  for (const profile of Object.values(profiles)) {
    const secret = env[profile.clientSecretEnv];
    if (!secret) return null;
    clientSecrets.set(profile.id, secret);
  }
  const handleKey = await crypto.subtle.importKey('raw', keyBytes, 'AES-GCM', false, ['encrypt', 'decrypt']);
  return { handleKey, clientSecrets };
}

// ---------------------------------------------------------------------------
// Completion handle: base64url(nonce || AES-256-GCM(key, {"p","c","s","e"}, aad=profile_id)).
// ---------------------------------------------------------------------------

interface HandlePayload {
  p: string;
  c: string;
  s: string;
  e: number;
}

async function sealHandle(key: CryptoKey, payload: HandlePayload): Promise<string> {
  const nonce = crypto.getRandomValues(new Uint8Array(NONCE_BYTES));
  const plaintext = new TextEncoder().encode(JSON.stringify({ p: payload.p, c: payload.c, s: payload.s, e: payload.e }));
  const sealed = new Uint8Array(
    await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: nonce, additionalData: new TextEncoder().encode(payload.p) },
      key,
      plaintext,
    ),
  );
  const combined = new Uint8Array(nonce.length + sealed.length);
  combined.set(nonce, 0);
  combined.set(sealed, nonce.length);
  return bytesToBase64Url(combined);
}

async function openHandle(key: CryptoKey, handle: string, profileId: string): Promise<HandlePayload | null> {
  if (handle.length > HANDLE_MAX_BYTES) return null;
  const combined = base64UrlToBytes(handle);
  if (!combined || combined.length < NONCE_BYTES + GCM_TAG_BYTES + 1) return null;
  let plaintext: ArrayBuffer;
  try {
    plaintext = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: combined.slice(0, NONCE_BYTES),
        additionalData: new TextEncoder().encode(profileId),
      },
      key,
      combined.slice(NONCE_BYTES),
    );
  } catch {
    // Authentication failure: tampered, wrong key, or bound to another profile.
    return null;
  }
  let value: unknown;
  try {
    value = JSON.parse(new TextDecoder().decode(plaintext));
  } catch {
    return null;
  }
  if (!isObject(value)) return null;
  const { p, c, s, e } = value;
  if (typeof p !== 'string' || typeof c !== 'string' || typeof s !== 'string') return null;
  if (typeof e !== 'number' || !Number.isInteger(e)) return null;
  return { p, c, s, e };
}

// ---------------------------------------------------------------------------
// Request parsing.
// ---------------------------------------------------------------------------

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

async function readJsonObject(req: Request): Promise<Record<string, unknown> | null> {
  try {
    const value: unknown = await req.json();
    return isObject(value) ? value : null;
  } catch {
    return null;
  }
}

const nonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.length > 0;

function decodeSegment(segment: string): string | null {
  try {
    return decodeURIComponent(segment);
  } catch {
    return null;
  }
}

function matchRoute(pathname: string): Route | null {
  const callback = /^\/oauth\/([^/]+)\/callback$/.exec(pathname);
  if (callback) {
    const profileId = decodeSegment(callback[1]);
    return profileId === null ? null : { kind: 'callback', profileId };
  }
  const bridge = /^\/bridge\/v1\/([^/]+)\/([^/]+)$/.exec(pathname);
  if (!bridge) return null;
  const profileId = decodeSegment(bridge[1]);
  if (profileId === null) return null;
  const action = bridge[2];
  // The Slack callback reaches this function through a host-scoped rewrite; depending on how
  // the platform presents a rewritten request, it may arrive at this path.
  if (action === 'callback') return { kind: 'callback', profileId };
  if (action === 'begin' || action === 'redeem' || action === 'refresh' || action === 'revoke') {
    return { kind: 'action', profileId, action };
  }
  return null;
}

/** Returns the value of a query parameter that must appear at most once and non-empty. */
function singleParam(params: URLSearchParams, name: string): string | null | undefined {
  const values = params.getAll(name);
  if (values.length === 0) return undefined;
  if (values.length > 1 || values[0] === '') return null;
  return values[0];
}

// ---------------------------------------------------------------------------
// Token requests.
// ---------------------------------------------------------------------------

async function tokenRequest(
  fetchImpl: typeof fetch,
  profile: BridgeProfile,
  form: Record<string, string>,
): Promise<Response> {
  let providerResponse: Response;
  try {
    providerResponse = await fetchImpl(profile.tokenEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body: new URLSearchParams(form).toString(),
    });
  } catch {
    return failure(502, 'provider_unavailable');
  }
  let body: unknown;
  try {
    body = await providerResponse.json();
  } catch {
    // Could not run (provider side) is not the same as a refusal.
    return providerResponse.status >= 500
      ? failure(502, 'provider_unavailable')
      : failure(400, 'oauth_provider_rejected');
  }
  if (!isObject(body)) {
    return providerResponse.status >= 500
      ? failure(502, 'provider_unavailable')
      : failure(400, 'oauth_provider_rejected');
  }
  // Slack's Web API reports refusals as HTTP 200 with "ok": false.
  const refused = !providerResponse.ok || body.ok === false || !nonEmptyString(body.access_token);
  if (refused) {
    const raw = typeof body.error === 'string' ? body.error : '';
    const code = RFC6749_TOKEN_ERRORS.has(raw)
      ? raw
      : (SLACK_TOKEN_ERRORS[raw] ?? 'oauth_provider_rejected');
    return failure(400, code);
  }
  const passed: Record<string, unknown> = {};
  for (const field of TOKEN_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(body, field)) passed[field] = body[field];
  }
  return json(200, passed);
}

// ---------------------------------------------------------------------------
// Handler.
// ---------------------------------------------------------------------------

export function createBridgeHandler(options: BridgeOptions): (req: Request) => Promise<Response> {
  const fetchImpl = options.fetch ?? fetch;
  const now = options.now ?? Date.now;
  const profiles = options.profiles ?? PROFILES;

  return async (req: Request): Promise<Response> => {
    const url = new URL(req.url);
    if (url.hostname !== BRIDGE_HOST) return failure(404, 'not_found');

    const route = matchRoute(url.pathname);
    if (!route) return failure(404, 'not_found');
    const expectedMethod = route.kind === 'callback' ? 'GET' : 'POST';
    if (req.method !== expectedMethod) return failure(405, 'method_not_allowed');

    const secrets = await loadSecrets(options.env, profiles);
    if (!secrets) return failure(503, 'bridge_unconfigured');

    const profile = Object.prototype.hasOwnProperty.call(profiles, route.profileId)
      ? profiles[route.profileId]
      : undefined;
    if (!profile) return failure(404, 'unknown_profile');
    const clientSecret = secrets.clientSecrets.get(profile.id) as string;

    if (route.kind === 'callback') {
      return callback(url.searchParams, profile, secrets.handleKey, now);
    }

    const body = await readJsonObject(req);
    if (!body) return failure(400, 'invalid_request');
    const stateDigest = body.state_digest;
    if (typeof stateDigest !== 'string' || !STATE_DIGEST.test(stateDigest)) return failure(400, 'invalid_request');

    switch (route.action) {
      case 'begin': {
        const { pkce_challenge: challenge, scopes } = body;
        if (typeof challenge !== 'string' || !PKCE_CHALLENGE.test(challenge)) return failure(400, 'invalid_request');
        if (!Array.isArray(scopes) || scopes.length === 0) return failure(400, 'invalid_request');
        if (!scopes.every((scope): scope is string => typeof scope === 'string')) return failure(400, 'invalid_request');
        if (new Set(scopes).size !== scopes.length) return failure(400, 'invalid_request');
        if (!scopes.every((scope) => profile.allowedScopes.includes(scope))) return failure(400, 'invalid_request');
        const query = new URLSearchParams({
          client_id: profile.clientId,
          code_challenge: challenge,
          code_challenge_method: 'S256',
          redirect_uri: profile.redirectUri,
          resource: profile.resource,
          response_type: 'code',
          scope: [...scopes].sort().join(' '),
          state: stateDigest,
        });
        return json(200, { authorization_url: `${profile.authorizeEndpoint}?${query.toString()}` });
      }
      case 'redeem': {
        const { completion_handle: handle, pkce_verifier: verifier } = body;
        if (!nonEmptyString(handle)) return failure(400, 'invalid_request');
        if (typeof verifier !== 'string' || !PKCE_VERIFIER.test(verifier)) return failure(400, 'invalid_request');
        const payload = await openHandle(secrets.handleKey, handle, profile.id);
        const nowSeconds = Math.floor(now() / 1000);
        if (!payload || payload.p !== profile.id || payload.s !== stateDigest || !(nowSeconds < payload.e)) {
          return failure(400, 'invalid_grant');
        }
        return tokenRequest(fetchImpl, profile, {
          client_id: profile.clientId,
          client_secret: clientSecret,
          code: payload.c,
          code_verifier: verifier,
          grant_type: 'authorization_code',
          redirect_uri: profile.redirectUri,
          resource: profile.resource,
        });
      }
      case 'refresh': {
        const refreshToken = body.refresh_token;
        if (!nonEmptyString(refreshToken)) return failure(400, 'invalid_request');
        return tokenRequest(fetchImpl, profile, {
          client_id: profile.clientId,
          client_secret: clientSecret,
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          resource: profile.resource,
        });
      }
      case 'revoke': {
        const refreshToken = body.refresh_token;
        if (!nonEmptyString(refreshToken)) return failure(400, 'invalid_request');
        if (!profile.revocationEndpoint) {
          return json(200, { endpoint_advertised: false, provider_request_sent: false });
        }
        try {
          await fetchImpl(profile.revocationEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: profile.clientId,
              client_secret: clientSecret,
              token: refreshToken,
              token_type_hint: 'refresh_token',
            }).toString(),
          });
        } catch {
          return failure(502, 'provider_unavailable');
        }
        return json(200, { endpoint_advertised: true, provider_request_sent: true });
      }
    }
  };
}

async function callback(
  params: URLSearchParams,
  profile: BridgeProfile,
  handleKey: CryptoKey,
  now: () => number,
): Promise<Response> {
  const code = singleParam(params, 'code');
  const error = singleParam(params, 'error');
  const state = singleParam(params, 'state');
  if (code === null || error === null || !state || !STATE_DIGEST.test(state)) return failure(400, 'invalid_request');
  const loopback = `${LOOPBACK_ORIGIN}/oauth/${encodeURIComponent(profile.id)}/callback`;

  if (code !== undefined && error === undefined) {
    const handle = await sealHandle(handleKey, {
      p: profile.id,
      c: code,
      s: state,
      e: Math.floor(now() / 1000) + HANDLE_TTL_SECONDS,
    });
    if (handle.length > HANDLE_MAX_BYTES) return failure(400, 'invalid_request');
    const query = new URLSearchParams({ state, completion_handle: handle, iss: profile.issuer });
    return redirect(`${loopback}?${query.toString()}`);
  }
  if (error !== undefined && code === undefined) {
    const query = new URLSearchParams({ state, error, iss: profile.issuer });
    return redirect(`${loopback}?${query.toString()}`);
  }
  return failure(400, 'invalid_request');
}
