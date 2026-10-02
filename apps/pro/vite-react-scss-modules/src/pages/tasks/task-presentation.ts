import type { TagIntent } from '@virgo-design/ui';

import type { TaskPriority, TaskStatus } from '@/data/tasks';

export const taskStatusIntent: Record<TaskStatus, TagIntent> = {
  Backlog: 'neutral',
  Todo: 'info',
  'In Progress': 'brand',
  'In Review': 'warning',
  Done: 'success',
};
export const taskPriorityIntent: Record<TaskPriority, TagIntent> = {
  Low: 'neutral',
  Medium: 'neutral',
  High: 'warning',
  Urgent: 'danger',
};
