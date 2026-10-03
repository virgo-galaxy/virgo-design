import { http } from '@/lib/http';

import type { AnalyticsOverviewDto, WorkplaceOverviewDto } from './contract';
export function getAnalyticsOverview(signal?: AbortSignal): Promise<AnalyticsOverviewDto> {
  return http.get('/analytics/overview', signal ? { signal } : undefined);
}
export function getWorkplaceOverview(signal?: AbortSignal): Promise<WorkplaceOverviewDto> {
  return http.get('/workplace/overview', signal ? { signal } : undefined);
}
