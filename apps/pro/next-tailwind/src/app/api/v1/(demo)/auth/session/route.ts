import { getAuthSession } from '@/server/demo/handlers/auth';
import { demoRoute } from '@/server/demo/route';

export const runtime = 'nodejs';

export const GET = demoRoute(getAuthSession, { public: true });
