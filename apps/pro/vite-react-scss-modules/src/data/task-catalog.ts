import type { ProjectDto } from '@/api/projects/contract';

export function projectName(id: string, projects: readonly ProjectDto[]) {
  return projects.find((project) => project.id === id)?.name ?? id;
}
export function moduleName(projectId: string, id: string, projects: readonly ProjectDto[]) {
  return (
    projects.find((project) => project.id === projectId)?.modules.find((module) => module.id === id)
      ?.name ?? id
  );
}
export function moduleFilterKey(projectId: string, moduleId: string) {
  return JSON.stringify([projectId, moduleId]);
}
export function projectTaskErrors(
  draft: { project: string; module: string; assignee: string },
  projects: readonly ProjectDto[],
) {
  const project = projects.find((entry) => entry.id === draft.project);
  return {
    ...(!project?.modules.some((module) => module.id === draft.module)
      ? { module: 'moduleRequired' as const }
      : {}),
    ...(draft.assignee && !project?.memberIds.includes(draft.assignee)
      ? { assignee: 'projectMemberRequired' as const }
      : {}),
  };
}
