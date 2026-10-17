import type { TaskRecordDto } from '@/api/analytics/types';
import type { TaskDto } from '@/api/tasks/types';

import {
  deliveryTrend,
  ownerCapacity,
  projectDelivery as projectDeliveryFor,
  recentActivity,
  taskStatusSummary,
} from '../model/analytics';
import { initialTaskState, taskReferenceDate } from './tasks';

export function analyticsSnapshot(
  tasks: readonly TaskDto[],
  through = taskReferenceDate,
  records?: readonly TaskRecordDto[],
) {
  return {
    ...taskStatusSummary(tasks),
    ownerCapacity: ownerCapacity(tasks),
    trendPoints: deliveryTrend(tasks, through),
    projectDelivery: projectDeliveryFor(tasks, through),
    activity: recentActivity(tasks, records),
  };
}

export const { trendPoints, projectDelivery, activity } = analyticsSnapshot(initialTaskState.tasks);
