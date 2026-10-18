import { postTasksBatchDelete } from '@/server/demo/handlers/tasks';
import { demoRoute } from '@/server/demo/route';

export const runtime = 'nodejs';

export const POST = demoRoute(postTasksBatchDelete);
