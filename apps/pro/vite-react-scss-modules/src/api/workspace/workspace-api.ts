import { http } from '@/lib/http';

import type { AnnouncementDto, WorkspaceSummaryDto } from './types';

export function getWorkspaceSummary(signal?: AbortSignal): Promise<WorkspaceSummaryDto> {
  return http.get('/workspace/summary', signal ? { signal } : undefined);
}

export function getAnnouncements(signal?: AbortSignal): Promise<AnnouncementDto[]> {
  return http.get('/announcements', signal ? { signal } : undefined);
}
