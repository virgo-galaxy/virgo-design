import { http } from '@/lib/http';

import type { OwnerCapacityDto, TaskStatusSummaryDto } from './types';

export function getOwnerCapacity(signal?: AbortSignal): Promise<OwnerCapacityDto[]> {
  return http.get('/analytics/owner-capacity', signal ? { signal } : undefined);
}

export function getTaskStatusSummary(signal?: AbortSignal): Promise<TaskStatusSummaryDto> {
  return http.get('/analytics/task-status', signal ? { signal } : undefined);
}
