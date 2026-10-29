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
  /** Omitted for Google's REST APIs, which take no resource indicator. */
  resource?: string;
  allowedScopes: readonly string[];
  authorizationParams?: Readonly<Record<string, string>>;
};

const google = (resource: string | undefined, scopes: readonly string[]): NanoPublisherProvider => ({
  clientIdEnv: 'NANO_BRIDGE_GOOGLE_WEB_CLIENT_ID',
  clientSecretEnv: 'NANO_BRIDGE_GOOGLE_WEB_CLIENT_SECRET',
  issuer: 'https://accounts.google.com',
  authorizeEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  ...(resource === undefined ? {} : { resource: `https://${resource}` }),
  allowedScopes: scopes.map(scope => `https://www.googleapis.com/auth/${scope}`),
  authorizationParams: { access_type: 'offline', prompt: 'consent' },
});

export const remainingNanoProviders: Readonly<Record<string, NanoPublisherProvider>> = Object.freeze({
  'nano.github': {
    clientIdEnv: 'NANO_BRIDGE_GITHUB_CLIENT_ID', clientSecretEnv: 'NANO_BRIDGE_GITHUB_CLIENT_SECRET',
    issuer: 'https://github.com/login/oauth',
    authorizeEndpoint: 'https://github.com/login/oauth/authorize', tokenEndpoint: 'https://github.com/login/oauth/access_token',
    resource: 'https://api.githubcopilot.com/mcp',
    allowedScopes: ['public_repo', 'repo', 'read:org', 'read:user', 'user:email', 'notifications', 'gist'],
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
  // Every Workspace plugin runs on Nano's own connectors over Google's REST APIs, not the Workspace MCP preview, so
  // these profiles send no resource. Each asks only for what its connector's tools use, all on the NanoAI Google
  // project's Data Access list: Gmail's label tools need gmail.modify; Calendar writes need calendar.events; Docs,
  // Sheets and Slides edit with their own scope and find files through Drive search (drive.readonly).
  'nano.gmail': google(undefined, ['gmail.modify']),
  'nano.google-calendar': google(undefined, ['calendar.events', 'calendar.calendarlist.readonly', 'calendar.events.freebusy']),
  'nano.google-chat': google(undefined, ['chat.spaces.readonly', 'chat.memberships.readonly', 'chat.messages.readonly', 'chat.messages.create']),
  'nano.google-compute': google('compute.googleapis.com/mcp', ['compute']),
  'nano.google-docs': google(undefined, ['documents', 'drive.readonly']),
  'nano.google-drive': google(undefined, ['drive.readonly', 'drive.file']),
  'nano.google-gke': google('container.googleapis.com/mcp', ['container']),
  'nano.google-maps': google('mapstools.googleapis.com/mcp', ['maps-platform.mapstools']),
  'nano.google-sheets': google(undefined, ['spreadsheets', 'drive.readonly']),
  'nano.google-slides': google(undefined, ['presentations', 'drive.readonly']),
  // Analytics reports through Nano's connector over the Admin and Data APIs; it only reads.
  'nano.google-analytics': google(undefined, ['analytics.readonly']),
});
