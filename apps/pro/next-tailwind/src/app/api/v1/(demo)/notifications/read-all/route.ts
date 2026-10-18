import { postNotificationsReadAll } from '@/server/demo/handlers/notifications';
import { demoRoute } from '@/server/demo/route';

export const runtime = 'nodejs';

export const POST = demoRoute(postNotificationsReadAll);
