// Public route entry: each page keeps its existing lazy loading boundary.
export const loadProjectHandoffPage = () =>
  import('../pages/ProjectHandoffPage').then((module) => ({ default: module.ProjectHandoffPage }));
