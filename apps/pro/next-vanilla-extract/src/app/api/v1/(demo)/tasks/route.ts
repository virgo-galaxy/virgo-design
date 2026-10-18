import { getTasks, postTasks } from '@/server/demo/handlers/tasks';
import { demoRoute } from '@/server/demo/route';

export const runtime = 'nodejs';

export const GET = demoRoute(getTasks);
export const POST = demoRoute(postTasks);
