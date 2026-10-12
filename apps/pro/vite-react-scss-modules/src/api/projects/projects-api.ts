import { http } from '@/lib/http';

import type { ProjectDto, ProjectOverviewDto } from './contract';
export function getProjects(signal?: AbortSignal): Promise<ProjectDto[]> {
  return http.get('/projects', signal ? { signal } : undefined);
}

export function getProjectOverviews(
  projectId?: string,
  signal?: AbortSignal,
): Promise<ProjectOverviewDto[]> {
  return http.get('/projects/overview', {
    params: projectId ? { projectId } : {},
    ...(signal ? { signal } : {}),
  });
}
