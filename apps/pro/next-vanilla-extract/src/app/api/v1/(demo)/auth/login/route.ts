import { postAuthLogin } from '@/server/demo/handlers/auth';
import { demoRoute } from '@/server/demo/route';

export const runtime = 'nodejs';

export const POST = demoRoute(postAuthLogin, { public: true });
