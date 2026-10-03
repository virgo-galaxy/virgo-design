import type { TaskPriorityDto, TaskStatusDto } from '@/api/tasks';

// Presentation types and helpers; business records are loaded through the API.
export interface Member {
  id: string;
  name: string;
  initials: string;
}
export type TaskStatus = TaskStatusDto;
export type TaskPriority = TaskPriorityDto;
export interface Task {
  id: string;
  title: string;
  project: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: Member;
  due: string;
}
export interface TrendPoint {
  date: string;
  completed: number;
  planned: number;
}
export type TrendPeriod = '7d' | '14d';

export const shortcuts = [
  {
    path: '/work/tasks',
    icon: 'tasks',
  },
  { path: '/work/projects', icon: 'projects' },
  {
    path: '/dashboard/analytics',
    icon: 'analytics',
  },
] as const;

export function formatDueDate(date: string, locale = 'en-US') {
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}
