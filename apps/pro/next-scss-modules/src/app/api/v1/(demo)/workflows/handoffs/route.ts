import { postWorkflowsHandoffs } from '@/server/demo/handlers/workflows';
import { demoRoute } from '@/server/demo/route';

export const runtime = 'nodejs';

export const POST = demoRoute(postWorkflowsHandoffs);
