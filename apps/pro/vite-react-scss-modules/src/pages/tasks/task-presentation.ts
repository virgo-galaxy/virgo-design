import type { TagIntent } from '@virgo-design/ui';
import type { TFunction } from 'i18next';

import type { TaskPriority, TaskStatus } from '@/data/tasks';
import type { TaskStatus as WorkplaceTaskStatus } from '@/data/workplace';

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

const statusKeys = {
  Backlog: 'tasks.statusLabels.backlog',
  Todo: 'tasks.statusLabels.todo',
  'In Progress': 'tasks.statusLabels.inProgress',
  'In progress': 'tasks.statusLabels.inProgress',
  'In Review': 'tasks.statusLabels.inReview',
  'In review': 'tasks.statusLabels.inReview',
  Done: 'tasks.statusLabels.done',
  Blocked: 'tasks.statusLabels.blocked',
} as const;
const priorityKeys = {
  Low: 'tasks.priorityLabels.low',
  Medium: 'tasks.priorityLabels.medium',
  High: 'tasks.priorityLabels.high',
  Urgent: 'tasks.priorityLabels.urgent',
} as const;
export function getTaskStatusLabel(t: TFunction, status: TaskStatus | WorkplaceTaskStatus) {
  return t(statusKeys[status]);
}
export function getTaskPriorityLabel(t: TFunction, priority: TaskPriority) {
  return t(priorityKeys[priority]);
}
