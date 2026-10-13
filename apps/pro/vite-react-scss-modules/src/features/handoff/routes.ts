// Public route entry: each page keeps its existing lazy loading boundary.
export const loadProjectHandoffPage = () =>
  import('./ProjectHandoffPage').then((module) => ({ default: module.ProjectHandoffPage }));
