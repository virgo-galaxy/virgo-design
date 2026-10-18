import type { TagIntent } from '@virgo-design/ui';

import type { TaskPriority, TaskStatus } from '../model/task';

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

export const taskStatusLabelNames = {
  backlog: 'backlog',
  todo: 'todo',
  in_progress: 'inProgress',
  in_review: 'inReview',
  done: 'done',
} as const satisfies Record<TaskStatus, string>;
