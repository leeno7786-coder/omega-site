# NanoAI plugin sign-in service

Prepared 2026-10-20. The owner approved deployment and configuration of the existing NanoAI Slack app, followed by creation of the NanoAI HubSpot MCP connector and private production credential hosting. Their IDs/secrets and a fresh Nano handle key are configured in Netlify; sensitive values are marked secret and are not committed. Production deployment and acceptance are recorded separately.

The existing Netlify site hosts `plugins.omega2ai.com`. The new function claims `/nano/bridge/v1/*`, separate from Omega's `/bridge/v1/*`. Existing Omega callbacks and Nano's legacy `/oauth/plugin-hub/callback` relay remain compatible. Unknown profiles and non-plugin hosts are refused.

## Server configuration

Configure sensitive values in the Netlify function environment, not committed files or frontend build variables:

| Variable | Purpose |
| --- | --- |
| `NANO_BRIDGE_HANDLE_KEY` | A fresh base64-encoded 32-byte encryption key. Keep separate from Omega's key. |
| `NANO_BRIDGE_SLACK_CLIENT_ID` | NanoAI's existing Slack app ID. Do not substitute Omega's app. |
| `NANO_BRIDGE_SLACK_CLIENT_SECRET` | That NanoAI app's secret. |
| `NANO_BRIDGE_HUBSPOT_CLIENT_ID` | A registered NanoAI HubSpot MCP connector ID. |
| `NANO_BRIDGE_HUBSPOT_CLIENT_SECRET` | That connector's secret. |

Only the selected profile's configuration is loaded. Missing HubSpot credentials do not disable Slack or Omega. Missing configuration returns `503 bridge_unconfigured`; it never falls back to another identity or sends users to a different app.

### Remaining prepared profiles (not configured)

Source now prepares `nano.github`, `nano.asana`, `nano.box` and eleven Google connector profiles. Each binds a scope allowlist and, where the server takes one, an exact resource. The seven Google Workspace profiles (Gmail, Calendar, Drive, Docs, Sheets, Slides and Chat) bind none, because Nano's built-in connectors call Google's REST APIs instead of the Workspace MCP Developer Preview. Caller JSON cannot choose endpoints, callbacks, authorization options or a resource. Google requests offline access and consent from publisher-controlled configuration. The existing Omega profile keeps its previous defaults.

The GitHub, Asana and Box families use `NANO_BRIDGE_{GITHUB|ASANA|BOX}_CLIENT_ID` and matching `_CLIENT_SECRET` variables. Register `https://plugins.omega2ai.com/oauth/nano.{github|asana|box}/callback` with the corresponding application before enabling a preset. Preserve the currently working desktop registrations. GitHub OAuth apps support one callback: prepare a separate hosted publisher app if the existing callback is still needed by installed direct clients.

Google uses **a web application registration**, with `NANO_BRIDGE_GOOGLE_WEB_CLIENT_ID` and `_CLIENT_SECRET`. Do not substitute the existing desktop client, which does not register these HTTPS redirects. Add these exact paths on `https://plugins.omega2ai.com`, all ending in `/callback`:

- `/oauth/nano.bigquery`, `/oauth/nano.gmail`
- `/oauth/nano.google-calendar`, `/oauth/nano.google-chat`, `/oauth/nano.google-compute`
- `/oauth/nano.google-docs`, `/oauth/nano.google-drive`, `/oauth/nano.google-gke`
- `/oauth/nano.google-maps`, `/oauth/nano.google-sheets`, `/oauth/nano.google-slides`

Keep the OAuth audience, project APIs, requested scopes and any required Google verification aligned with the product. These profiles do not implement the separate local Google Analytics CLI flow. No family becomes active just because its handler exists: publisher registration, owner-approved secret hosting, deployment and accountless preparation precede catalog promotion. Individual account/tool tests remain deferred to beta.

Provider metadata was read afresh on 2026-10-20; the Nano repository records the sanitized receipt in `docs/releases/plugin-publisher-preparation-2026-10-20.json`. Asana and Box preserve the working scope-omission behavior, with permissions determined by their app registration. Google's four cloud connectors use their declared resource-specific scopes, not a blanket cloud-platform grant.

Register these additional exact callback URLs with the corresponding publisher apps before activation:

- Slack: `https://plugins.omega2ai.com/oauth/nano.slack/callback`
- HubSpot: `https://plugins.omega2ai.com/oauth/nano.hubspot/callback`

Keep the existing Slack callback during migration. The bridge's fixed return URL is `http://127.0.0.1:7420/oauth/callback`; arbitrary return destinations are not accepted. This first version supports a browser on the same Windows PC. Do not advertise paired-phone completion through the phone's own loopback.

## Contract

POST JSON to `/nano/bridge/v1/{profile}/begin`, with `state_digest` (64 lowercase hex characters), `pkce_challenge` (S256 base64url) and `scopes`. It returns `authorization_url`. Slack scopes must be in the server allowlist. HubSpot uses `scopes: []`: its user consent determines permissions, and the bridge does not invent OAuth scopes.

The provider callback seals the code in an AES-GCM handle, bound to profile, state and a ten-minute expiry. Only `state`, `completion_handle` and the pinned `iss` return to the desktop. POST those handle/state values with `pkce_verifier` to `redeem`. The provider checks PKCE and one-use codes; the desktop also consumes its pending state. Refresh uses `refresh_token` and a fresh `state_digest`. Secrets are added only to fixed provider token endpoints, with redirects forbidden. The bridge stores no codes, handles, tokens or verifiers, and does not log request bodies. Configure platform access logs/error tracing to avoid sensitive query values.

`revoke` currently reports that no provider endpoint is advertised. Desktop sign-out forgets local tokens even if the bridge is unavailable; it does not claim provider-side revocation. Users can remove app access in their provider's account controls.

The public document `/clients/nanoai-myob.json` is a separate secret-free client identity for MYOB's advertised Client ID Metadata Document support. It must be deployed and accepted by MYOB before its candidate Nano preset is promoted. Metadata support alone does not prove that MYOB accepts this client or its scopes.

## Activation and verification

1. Obtain approval for this deployment and for storing NanoAI's confidential app secret in this Netlify environment. Do not copy the developer's encrypted credential store or any customer access/refresh tokens.
2. Register callbacks and configure only approved publisher credentials. HubSpot's MCP connector must have supported distribution; one account's connector is not proof of cross-customer access.
3. Deploy through the site's existing Netlify production deployment. The legacy GitHub Pages workflow is not this service's host.
4. Check host isolation, configuration errors, the new public metadata document and a fresh accountless authorization request. Do not submit customer consent as part of this check.
5. Promote the reviewed NanoAI candidate presets only for configured, accepted profiles. Keep existing installed manifests and saved user accounts untouched.

Individual account/tool testing is deferred to MVP beta. Shared protocol/negative-path tests remain required. This service does not resolve ZoomInfo vendor approval, Similarweb's registration refusal, Google public-audience approval, or token/resource/CLI connectors that still need their own supported account flow.

Provider sources: [HubSpot connector setup](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server), [HubSpot current OAuth metadata](https://mcp.hubspot.com/.well-known/oauth-authorization-server), [Slack current OAuth metadata](https://mcp.slack.com/.well-known/oauth-authorization-server), [MYOB current OAuth metadata](https://id.myob.com/.well-known/oauth-authorization-server).
