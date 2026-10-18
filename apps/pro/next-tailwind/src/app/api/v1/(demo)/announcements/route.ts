import { getAnnouncements } from '@/server/demo/handlers/workspace';
import { demoRoute } from '@/server/demo/route';

export const runtime = 'nodejs';

export const GET = demoRoute(getAnnouncements);
