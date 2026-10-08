export function taskDetailsPath(id: string, returnTo = '/work/tasks') {
  return `/work/tasks/${encodeURIComponent(id)}?returnTo=${encodeURIComponent(returnTo)}`;
}
export function taskReturnPath(value: string | null) {
  return value &&
    /^\/work\/(tasks|task-cards|projects)(?:\?[^#]*|\/[^?#]+(?:\?[^#]*)?)?$/.test(value)
    ? value
    : '/work/tasks';
}
