import { routePath } from '@/routes';

import type { Project } from '../model/project';

export function projectDetailPath(project: Project) {
  return routePath('work.projects.[projectId]', { projectId: project.id });
}

export function projectTasksPath(project: Project) {
  return routePath('work.tasks') + '?project=' + encodeURIComponent(project.id);
}

export const projectHandoffPath = (projectId: string) =>
  routePath('work.projects.[projectId].handoff', { projectId });
