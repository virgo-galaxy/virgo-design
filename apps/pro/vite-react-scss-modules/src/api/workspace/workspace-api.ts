import type { AnnouncementDto, WorkspaceSummaryDto } from '@/contracts/workspace';
import { http } from '@/lib/http';

export function getWorkspaceSummary(signal?: AbortSignal): Promise<WorkspaceSummaryDto> {
  return http.get('/workspace/summary', signal ? { signal } : undefined);
}

export function getAnnouncements(signal?: AbortSignal): Promise<AnnouncementDto[]> {
  return http.get('/announcements', signal ? { signal } : undefined);
}
