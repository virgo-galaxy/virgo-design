import { routePath } from '@/routing';
export const shortcuts = [
  { path: routePath('tasks'), icon: 'tasks' },
  { path: routePath('projects'), icon: 'projects' },
  { path: routePath('analytics'), icon: 'analytics' },
] as const;
