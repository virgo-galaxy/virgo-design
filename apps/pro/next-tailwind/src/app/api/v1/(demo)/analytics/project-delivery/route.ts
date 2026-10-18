import { getAnalyticsProjectDelivery } from '@/server/demo/handlers/analytics';
import { demoRoute } from '@/server/demo/route';

export const runtime = 'nodejs';

export const GET = demoRoute(getAnalyticsProjectDelivery);
