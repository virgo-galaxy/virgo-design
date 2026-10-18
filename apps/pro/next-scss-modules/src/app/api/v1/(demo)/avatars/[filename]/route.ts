import { getAvatarsFilename } from '@/server/demo/handlers/avatars';
import { demoRoute } from '@/server/demo/route';

export const runtime = 'nodejs';

export const GET = demoRoute(getAvatarsFilename, { asset: true });
