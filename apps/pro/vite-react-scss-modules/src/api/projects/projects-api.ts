import { http } from '@/lib/http';

import type { ProjectDto } from './contract';
export function getProjects(signal?: AbortSignal): Promise<ProjectDto[]> {
  return http.get('/projects', signal ? { signal } : undefined);
}
