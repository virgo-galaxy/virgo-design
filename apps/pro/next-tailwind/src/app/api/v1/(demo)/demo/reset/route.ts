import { postDemoReset } from '@/server/demo/handlers/demo';
import { demoRoute } from '@/server/demo/route';

export const runtime = 'nodejs';

export const POST = demoRoute(postDemoReset);
