/**
 * Prepared publisher registrations, not enabled merely by shipping this source.
 * Endpoints and resource/scope boundaries checked against public discovery 2026-10-20.
 * Google needs a web OAuth registration; do not upload its existing desktop identity.
 */
export type NanoPublisherProvider = {
  clientIdEnv: string;
  clientSecretEnv: string;
  issuer: string;
  authorizeEndpoint: string;
  tokenEndpoint: string;
  resource: string;
  allowedScopes: readonly string[];
  authorizationParams?: Readonly<Record<string, string>>;
};

const google = (resource: string, scopes: readonly string[]): NanoPublisherProvider => ({
  clientIdEnv: 'NANO_BRIDGE_GOOGLE_WEB_CLIENT_ID',
  clientSecretEnv: 'NANO_BRIDGE_GOOGLE_WEB_CLIENT_SECRET',
  issuer: 'https://accounts.google.com',
  authorizeEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  resource: `https://${resource}`,
  allowedScopes: scopes.map(scope => `https://www.googleapis.com/auth/${scope}`),
  authorizationParams: { access_type: 'offline', prompt: 'consent' },
});

export const remainingNanoProviders: Readonly<Record<string, NanoPublisherProvider>> = Object.freeze({
  'nano.github': {
    clientIdEnv: 'NANO_BRIDGE_GITHUB_CLIENT_ID', clientSecretEnv: 'NANO_BRIDGE_GITHUB_CLIENT_SECRET',
    issuer: 'https://github.com/login/oauth',
    authorizeEndpoint: 'https://github.com/login/oauth/authorize', tokenEndpoint: 'https://github.com/login/oauth/access_token',
    resource: 'https://api.githubcopilot.com/mcp',
    allowedScopes: ['repo', 'read:org', 'read:user', 'user:email', 'notifications', 'gist'],
  },
  'nano.asana': {
    clientIdEnv: 'NANO_BRIDGE_ASANA_CLIENT_ID', clientSecretEnv: 'NANO_BRIDGE_ASANA_CLIENT_SECRET',
    issuer: 'https://app.asana.com',
    authorizeEndpoint: 'https://app.asana.com/-/oauth_authorize', tokenEndpoint: 'https://app.asana.com/-/oauth_token',
    resource: 'https://mcp.asana.com/v2/mcp', allowedScopes: [],
  },
  'nano.box': {
    clientIdEnv: 'NANO_BRIDGE_BOX_CLIENT_ID', clientSecretEnv: 'NANO_BRIDGE_BOX_CLIENT_SECRET',
    issuer: 'https://api.box.com',
    authorizeEndpoint: 'https://account.box.com/api/oauth2/authorize', tokenEndpoint: 'https://api.box.com/oauth2/token',
    resource: 'https://mcp.box.com/', allowedScopes: [],
  },
  'nano.bigquery': google('bigquery.googleapis.com/mcp', ['bigquery']),
  'nano.gmail': google('gmailmcp.googleapis.com/mcp/v1', ['gmail.modify']),
  'nano.google-calendar': google('calendarmcp.googleapis.com/mcp/v1', ['calendar']),
  'nano.google-chat': google('chatmcp.googleapis.com/mcp/v1', ['chat.messages', 'chat.spaces.readonly', 'chat.memberships.readonly']),
  'nano.google-compute': google('compute.googleapis.com/mcp', ['compute']),
  'nano.google-docs': google('docsmcp.googleapis.com/mcp/v1', ['documents', 'drive.readonly']),
  'nano.google-drive': google('drivemcp.googleapis.com/mcp/v1', ['drive']),
  'nano.google-gke': google('container.googleapis.com/mcp', ['container']),
  'nano.google-maps': google('mapstools.googleapis.com/mcp', ['maps-platform.mapstools']),
  'nano.google-sheets': google('sheetsmcp.googleapis.com/mcp/v1', ['spreadsheets', 'drive.readonly']),
  'nano.google-slides': google('slidesmcp.googleapis.com/mcp/v1', ['presentations', 'drive.readonly']),
});
