import type { ActivityDto } from '@/contracts/analytics';
import { http } from '@/lib/http';
export function getActivity(signal?: AbortSignal): Promise<ActivityDto[]> {
  return http.get('/activity', signal ? { signal } : undefined);
}

export function getProjectActivity(
  projectId: string,
  signal?: AbortSignal,
): Promise<ActivityDto[]> {
  return http.get('/activity', { params: { projectId }, ...(signal ? { signal } : {}) });
}
