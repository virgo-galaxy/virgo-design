export const loadTaskWorkspacePage = () =>
  import('../pages/TaskWorkspacePage').then((module) => ({ default: module.TaskWorkspacePage }));
export const loadTaskCardsPage = () =>
  import('../pages/TaskCardsPage').then((module) => ({ default: module.TaskCardsPage }));
export const loadTasksPage = () =>
  import('../pages/TasksPage').then((module) => ({ default: module.TasksPage }));
