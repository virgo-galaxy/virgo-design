import { http } from '@/lib/http';

import type { ProjectDto } from '../../contracts/projects';
export function getProjects(signal?: AbortSignal): Promise<ProjectDto[]> {
  return http.get('/projects', signal ? { signal } : undefined);
}
