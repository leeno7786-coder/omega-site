import { createNanoBridgeHandler } from '../bridge/nano-oauth-bridge';

export default async (req: Request): Promise<Response> => createNanoBridgeHandler({ env: process.env })(req);
export const config = { path: '/nano/bridge/v1/*' };
