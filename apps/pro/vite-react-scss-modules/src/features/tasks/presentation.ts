import type { TagIntent } from '@virgo-design/ui';
import type { TFunction } from 'i18next';

import type { TaskPriority, TaskStatus } from '@/features/tasks/model';

export const taskStatusIntent: Record<TaskStatus, TagIntent> = {
  backlog: 'neutral',
  todo: 'info',
  in_progress: 'accent',
  in_review: 'warning',
  done: 'success',
};
export const taskPriorityIntent: Record<TaskPriority, TagIntent> = {
  low: 'neutral',
  medium: 'info',
  high: 'warning',
  urgent: 'danger',
};

const statusKeys = {
  backlog: 'tasks.statusLabels.backlog',
  todo: 'tasks.statusLabels.todo',
  in_progress: 'tasks.statusLabels.inProgress',
  in_review: 'tasks.statusLabels.inReview',
  done: 'tasks.statusLabels.done',
} as const satisfies Record<TaskStatus, string>;
const priorityKeys = {
  low: 'tasks.priorityLabels.low',
  medium: 'tasks.priorityLabels.medium',
  high: 'tasks.priorityLabels.high',
  urgent: 'tasks.priorityLabels.urgent',
} as const satisfies Record<TaskPriority, string>;
export function getTaskStatusLabel(t: TFunction, status: TaskStatus) {
  return t(statusKeys[status]);
}
export function getTaskPriorityLabel(t: TFunction, priority: TaskPriority) {
  return t(priorityKeys[priority]);
}
export function getTaskExportLabels(t: TFunction) {
  return {
    status: (code: TaskStatus) => getTaskStatusLabel(t, code),
    priority: (code: TaskPriority) => getTaskPriorityLabel(t, code),
  };
}
