import { routePath } from '@/routes';

export function taskDetailsPath(id: string, returnTo = routePath('work.tasks')) {
  return routePath('work.tasks.[id]', { id }) + '?returnTo=' + encodeURIComponent(returnTo);
}

export function taskEditPath(id: string, returnTo: string) {
  return routePath('work.tasks.[id].edit', { id }) + '?returnTo=' + encodeURIComponent(returnTo);
}

export function taskCreatePath(returnTo: string) {
  return routePath('work.tasks.new') + '?returnTo=' + encodeURIComponent(returnTo);
}

const escapePattern = (path: string) => path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const returnRoots = [
  routePath('work.tasks'),
  routePath('work.task-cards'),
  routePath('work.projects'),
];
const businessReturn = new RegExp(
  '^(?:' + returnRoots.map(escapePattern).join('|') + ')(?:\\?[^#]*|/[^?#]+(?:\\?[^#]*)?)?$',
);

export function taskReturnPath(value: string | null) {
  return value &&
    (businessReturn.test(value) ||
      value === routePath('result.success') ||
      value === routePath('result.error'))
    ? value
    : routePath('work.tasks');
}
