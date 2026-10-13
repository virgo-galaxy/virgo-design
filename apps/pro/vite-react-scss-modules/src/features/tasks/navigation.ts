import { routePath, routePaths } from '@/routing';
export function taskDetailsPath(id: string, returnTo = routePath('tasks')) {
  return routePath('task-details', { id }) + '?returnTo=' + encodeURIComponent(returnTo);
}
export function taskEditPath(id: string, returnTo: string) {
  return routePath('task-edit', { id }) + '?returnTo=' + encodeURIComponent(returnTo);
}
export function taskCreatePath(returnTo: string) {
  return routePath('task-create') + '?returnTo=' + encodeURIComponent(returnTo);
}
const escapePattern = (path: string) => path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const returnRoots = [routePaths.tasks, routePaths['task-cards'], routePaths.projects];
const businessReturn = new RegExp(
  '^(?:' + returnRoots.map(escapePattern).join('|') + ')(?:\\?[^#]*|/[^?#]+(?:\\?[^#]*)?)?$',
);
export function taskReturnPath(value: string | null) {
  return value &&
    (businessReturn.test(value) || value === routePaths.success || value === routePaths.error)
    ? value
    : routePath('tasks');
}
