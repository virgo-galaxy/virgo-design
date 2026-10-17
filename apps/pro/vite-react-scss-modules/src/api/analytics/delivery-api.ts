import { http } from '@/lib/http';

import type { ProjectDeliveryDayDto, TrendPointDto } from './types';

export function getDeliveryTrend(signal?: AbortSignal): Promise<TrendPointDto[]> {
  return http.get('/analytics/delivery-trend', signal ? { signal } : undefined);
}

export function getProjectDelivery(signal?: AbortSignal): Promise<ProjectDeliveryDayDto[]> {
  return http.get('/analytics/project-delivery', signal ? { signal } : undefined);
}
