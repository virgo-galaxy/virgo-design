import type { ProjectDto } from '@/api/projects/types';

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
