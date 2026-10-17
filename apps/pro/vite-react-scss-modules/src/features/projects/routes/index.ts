export const loadProjectDetailPage = () =>
  import('../pages/ProjectDetailPage').then((module) => ({ default: module.ProjectDetailPage }));
export const loadProjectsPage = () =>
  import('../pages/ProjectsPage').then((module) => ({ default: module.ProjectsPage }));
