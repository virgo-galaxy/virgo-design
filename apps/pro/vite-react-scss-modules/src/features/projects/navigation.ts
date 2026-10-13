import { routePath } from '@/routing';

import type { Project } from './model';
export function projectDetailPath(project: Project) {
  return routePath('project-detail', { projectId: project.id });
}
export function projectTasksPath(project: Project) {
  return routePath('tasks') + '?project=' + encodeURIComponent(project.id);
}

export const projectHandoffPath = (projectId: string) =>
  routePath('project-handoff', { projectId });
