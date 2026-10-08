import type { ProjectDto } from '@/api/projects/contract';

export function moduleName(id: string, projects: readonly ProjectDto[]) {
  return (
    projects.flatMap((project) => project.modules).find((module) => module.id === id)?.name ?? id
  );
}
export function projectTaskErrors(
  draft: { project: string; module: string; assignee: string },
  projects: readonly ProjectDto[],
) {
  const project = projects.find((entry) => entry.name === draft.project);
  return {
    ...(!project?.modules.some((module) => module.id === draft.module)
      ? { module: 'moduleRequired' as const }
      : {}),
    ...(draft.assignee && !project?.memberIds.includes(draft.assignee)
      ? { assignee: 'projectMemberRequired' as const }
      : {}),
  };
}
