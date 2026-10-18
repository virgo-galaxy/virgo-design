import { getAuthDemoAccounts } from '@/server/demo/handlers/auth';
import { demoRoute } from '@/server/demo/route';

export const runtime = 'nodejs';

export const GET = demoRoute(getAuthDemoAccounts, { public: true });
