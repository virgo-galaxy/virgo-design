import { useCallback } from 'react';

import { getProjectActivity } from '@/api/analytics';
import { getProjectMemberStats, getProjectModuleStats, getProjectSummary } from '@/api/projects';
import { getTasks } from '@/api/tasks';
import { useTaskDependentQuery } from '@/features/tasks';

/** A record's independent capabilities share identity/invalidation, not an all-or-nothing request. */
export function useProjectResources(projectId: string) {
  const summary = useTaskDependentQuery(
    useCallback((signal: AbortSignal) => getProjectSummary(projectId, signal), [projectId]),
    projectId,
  );
  const modules = useTaskDependentQuery(
    useCallback((signal: AbortSignal) => getProjectModuleStats(projectId, signal), [projectId]),
    projectId,
  );
  const members = useTaskDependentQuery(
    useCallback((signal: AbortSignal) => getProjectMemberStats(projectId, signal), [projectId]),
    projectId,
  );
  const tasks = useTaskDependentQuery(
    useCallback(
      (signal: AbortSignal) => getTasks({ project: projectId, pageSize: 8 }, signal),
      [projectId],
    ),
    projectId,
  );
  const activity = useTaskDependentQuery(
    useCallback((signal: AbortSignal) => getProjectActivity(projectId, signal), [projectId]),
    projectId,
  );
  return { summary, modules, members, tasks, activity };
}
