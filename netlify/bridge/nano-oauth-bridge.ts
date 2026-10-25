import { BRIDGE_HOST, createBridgeHandler, type BridgeOptions, type BridgeProfile } from './oauth-bridge';
import { remainingNanoProviders, type NanoPublisherProvider } from './nano-publisher-profiles';

/** Separate NanoAI profiles: do not reuse Omega's app identity, secrets or desktop callback. */
const providers: Readonly<Record<string, NanoPublisherProvider>> = {
  ...remainingNanoProviders,
  'nano.slack': {
    clientIdEnv: 'NANO_BRIDGE_SLACK_CLIENT_ID',
    clientSecretEnv: 'NANO_BRIDGE_SLACK_CLIENT_SECRET',
    issuer: 'https://mcp.slack.com',
    authorizeEndpoint: 'https://slack.com/oauth/v2_user/authorize',
    tokenEndpoint: 'https://slack.com/api/oauth.v2.user.access',
    resource: 'https://mcp.slack.com',
    allowedScopes: ['channels:history', 'channels:read', 'chat:write', 'groups:history', 'groups:read', 'im:history', 'im:read', 'search:read.public', 'users:read'],
  },
  'nano.hubspot': {
    clientIdEnv: 'NANO_BRIDGE_HUBSPOT_CLIENT_ID',
    clientSecretEnv: 'NANO_BRIDGE_HUBSPOT_CLIENT_SECRET',
    issuer: 'https://mcp.hubspot.com',
    authorizeEndpoint: 'https://mcp.hubspot.com/oauth/authorize/user',
    tokenEndpoint: 'https://mcp.hubspot.com/oauth/v3/token',
    resource: 'https://mcp.hubspot.com',
    allowedScopes: [],
  },
} as const;

export function createNanoBridgeHandler(options: Omit<BridgeOptions, 'profiles'>) {
  return async (req: Request): Promise<Response> => {
    const url = new URL(req.url);
    const match = /^\/nano\/bridge\/v1\/(nano\.[a-z][a-z-]*)\/(begin|redeem|refresh|revoke|callback|capabilities)$/.exec(url.pathname);
    // Netlify can preserve the original request URL on a 200 rewrite.
    const callback = /^\/oauth\/(nano\.[a-z][a-z-]*)\/callback$/.exec(url.pathname);
    const fail = (status: number, error: string) => new Response(JSON.stringify({ error }), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
    if (url.hostname !== BRIDGE_HOST || (!match && !callback)) return fail(404, 'not_found');
    const id = match?.[1] ?? callback![1];
    const provider = Object.hasOwn(providers, id) ? providers[id] : undefined;
    if (!provider) return fail(404, 'unknown_profile');
    const clientId = options.env[provider.clientIdEnv];
    if (!clientId) return fail(503, 'bridge_unconfigured');
    const profile: BridgeProfile = {
      id, clientId, clientSecretEnv: provider.clientSecretEnv, issuer: provider.issuer,
      authorizeEndpoint: provider.authorizeEndpoint, tokenEndpoint: provider.tokenEndpoint,
      resource: provider.resource, allowedScopes: provider.allowedScopes,
      authorizationParams: provider.authorizationParams,
      revocationEndpoint: null,
      redirectUri: `https://${BRIDGE_HOST}/oauth/${id}/callback`,
      loopbackRedirectUri: 'http://127.0.0.1:7420/oauth/callback',
      ...(id === 'nano.github' ? { callbackTargets: { 'contractops-7421': 'http://127.0.0.1:7421/oauth/callback' }, callbackScopes: { 'contractops-7421': ['public_repo', 'read:user'] } } : {}),
    };
    if (match?.[2] === 'capabilities') {
      if (req.method !== 'GET') return fail(405, 'method_not_allowed');
      if (!options.env[provider.clientSecretEnv] || !options.env.NANO_BRIDGE_HANDLE_KEY) return fail(503, 'bridge_unconfigured');
      return new Response(JSON.stringify({ protocol: 2, profile: id, default_loopback_port: 7420, callback_targets: Object.keys(profile.callbackTargets ?? {}), callback_scopes: profile.callbackScopes ?? {} }), { status: 200, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
    }
    // Load only this Nano profile. An unconfigured HubSpot app must not disable Slack or Omega.
    const handler = createBridgeHandler({ ...options, env: { ...options.env, OMEGA_BRIDGE_HANDLE_KEY: options.env.NANO_BRIDGE_HANDLE_KEY }, profiles: { [id]: profile } });
    url.pathname = `/bridge/v1/${id}/${match?.[2] ?? 'callback'}`;
    return handler(new Request(url, req));
  };
}
