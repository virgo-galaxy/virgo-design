import { routePath } from '@/routes';

export const shortcuts = [
  { path: routePath('work.tasks'), icon: 'tasks' },
  { path: routePath('work.projects'), icon: 'projects' },
  { path: routePath('visualization.analytics'), icon: 'analytics' },
] as const;
