import { getUsersId } from '@/server/demo/handlers/users';
import { demoRoute } from '@/server/demo/route';

export const runtime = 'nodejs';

export const GET = demoRoute(getUsersId);
