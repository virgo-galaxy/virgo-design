export const loadProjectHandoffPage = () =>
  import('../pages/ProjectHandoffPage').then((module) => ({ default: module.ProjectHandoffPage }));
