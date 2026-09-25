// Netlify Function (v2) entry for Omega's hosted OAuth bridge. The logic lives in
// ../bridge/oauth-bridge.ts; secrets are read from the environment on each request so a
// missing variable is always answered with 503 bridge_unconfigured.
//
// The function claims only /bridge/v1/*. The Slack callback
// (https://plugins.omega2ai.com/oauth/slack.desktop/callback) is rewritten here by a
// host-scoped rule in netlify.toml, so every other /oauth/* profile keeps the plain relay.
// Requests on any host other than plugins.omega2ai.com are answered 404 by the handler.
import { createBridgeHandler } from '../bridge/oauth-bridge';

export default async (req: Request): Promise<Response> =>
  createBridgeHandler({ env: process.env })(req);

export const config = { path: '/bridge/v1/*' };
