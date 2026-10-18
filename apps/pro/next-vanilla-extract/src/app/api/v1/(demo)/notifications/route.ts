import { getNotifications } from '@/server/demo/handlers/notifications';
import { demoRoute } from '@/server/demo/route';

export const runtime = 'nodejs';

export const GET = demoRoute(getNotifications);
