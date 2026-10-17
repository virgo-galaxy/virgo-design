import type { TaskRecordDto } from '@/contracts/analytics';
import type { TaskDto } from '@/contracts/tasks';

import {
  deliveryTrend,
  ownerCapacity,
  projectDelivery as projectDeliveryFor,
  recentActivity,
  taskStatusSummary,
} from '../model/analytics';
import { initialTaskState, taskReferenceDate } from './tasks';

/** Seed/test composition; each runtime endpoint computes only its own capability. */
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
