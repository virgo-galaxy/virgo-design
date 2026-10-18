import { getProjects } from '@/server/demo/handlers/projects';
import { demoRoute } from '@/server/demo/route';

export const runtime = 'nodejs';

export const GET = demoRoute(getProjects);
