// Public route entry: each page keeps its existing lazy loading boundary.
export const loadProjectDetailPage = () =>
  import('./ProjectDetailPage').then((module) => ({ default: module.ProjectDetailPage }));
export const loadProjectsPage = () =>
  import('./ProjectsPage').then((module) => ({ default: module.ProjectsPage }));
