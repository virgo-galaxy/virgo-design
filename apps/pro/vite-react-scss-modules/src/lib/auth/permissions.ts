import type { SessionUser } from '@/api/auth/contract';
import type { TaskDto, TaskStatusDto } from '@/api/tasks/contract';
export const isAdmin = (user?: SessionUser) => user?.role === 'admin';
export const canManageProject = (user: SessionUser | undefined, project: string) =>
  isAdmin(user) || Boolean(user?.managedProjects.includes(project));
export const canViewTask = (user: SessionUser | undefined, task: TaskDto) =>
  isAdmin(user) ||
  (user?.role === 'manager'
    ? user.managedProjects.includes(task.project)
    : user?.id === task.assignee && user.projects.includes(task.project));
export const canEditTask = (user: SessionUser | undefined, task: TaskDto) =>
  canViewTask(user, task) && canManageProject(user, task.project);
export const canCreateTask = (user?: SessionUser) => isAdmin(user) || user?.role === 'manager';
export const isAdminShowcasePage = (page: string) =>
  ['success', 'error', 'exception-403', 'exception-404', 'exception-500'].includes(page);
export function taskStatusChoices(user: SessionUser | undefined, task?: TaskDto): TaskStatusDto[] {
  if (isAdmin(user)) return ['backlog', 'todo', 'in_progress', 'in_review', 'done'];
  if (!task) return canCreateTask(user) ? ['backlog', 'todo'] : [];
  if (!canViewTask(user, task)) return [];
  const next: TaskStatusDto[] = [];
  if (user?.role === 'manager') {
    if (task.status === 'backlog') next.push('todo');
    if (task.status === 'in_review') next.push('done', 'in_progress');
  }
  if (user?.id === task.assignee) {
    if (task.status === 'todo') next.push('in_progress');
    if (task.status === 'in_progress') next.push('in_review');
  }
  return [task.status, ...next];
}
export function canVisitPage(user: SessionUser | undefined, page: string) {
  if (isAdminShowcasePage(page)) return isAdmin(user);
  if (['basic-form', 'step-form', 'task-create', 'task-edit'].includes(page))
    return canCreateTask(user);
  return true;
}
