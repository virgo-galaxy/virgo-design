import { getTasksId, patchTasksId } from '@/server/demo/handlers/tasks';
import { demoRoute } from '@/server/demo/route';

export const runtime = 'nodejs';

export const GET = demoRoute(getTasksId);
export const PATCH = demoRoute(patchTasksId);
