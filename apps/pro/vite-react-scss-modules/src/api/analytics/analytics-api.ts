import { http } from '@/lib/http';

import type { ActivityDto, AnalyticsOverviewDto, WorkplaceOverviewDto } from './contract';
export function getAnalyticsOverview(signal?: AbortSignal): Promise<AnalyticsOverviewDto> {
  return http.get('/analytics/overview', signal ? { signal } : undefined);
}
export function getWorkplaceOverview(signal?: AbortSignal): Promise<WorkplaceOverviewDto> {
  return http.get('/workplace/overview', signal ? { signal } : undefined);
}

export function getActivity(signal?: AbortSignal): Promise<ActivityDto[]> {
  return http.get('/activity', signal ? { signal } : undefined);
}
