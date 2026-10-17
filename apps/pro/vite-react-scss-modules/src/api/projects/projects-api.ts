import type { ProjectDto } from '@/contracts/projects';
import { http } from '@/lib/http';

export function getProjects(signal?: AbortSignal): Promise<ProjectDto[]> {
  return http.get('/projects', signal ? { signal } : undefined);
}
