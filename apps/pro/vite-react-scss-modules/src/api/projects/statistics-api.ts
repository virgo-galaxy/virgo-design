import { http } from '@/lib/http';

import type {
  ProjectDistributionDto,
  ProjectMemberStatsDto,
  ProjectModuleStatsDto,
  ProjectSummaryDto,
} from './types';

export function getProjectSummaries(
  projectId?: string,
  signal?: AbortSignal,
): Promise<ProjectSummaryDto[]> {
  return http.get('/projects/summaries', {
    params: projectId ? { projectId } : {},
    ...(signal ? { signal } : {}),
  });
}

export function getProjectDistribution(signal?: AbortSignal): Promise<ProjectDistributionDto[]> {
  return http.get('/projects/distribution', signal ? { signal } : undefined);
}

export function getProjectModuleStats(
  projectId: string,
  signal?: AbortSignal,
): Promise<ProjectModuleStatsDto[]> {
  return http.get(
    `/projects/${encodeURIComponent(projectId)}/module-stats`,
    signal ? { signal } : undefined,
  );
}

export function getProjectMemberStats(
  projectId: string,
  signal?: AbortSignal,
): Promise<ProjectMemberStatsDto[]> {
  return http.get(
    `/projects/${encodeURIComponent(projectId)}/member-stats`,
    signal ? { signal } : undefined,
  );
}

export function getProjectSummary(
  projectId: string,
  signal?: AbortSignal,
): Promise<ProjectSummaryDto> {
  return http.get(
    `/projects/${encodeURIComponent(projectId)}/summary`,
    signal ? { signal } : undefined,
  );
}
