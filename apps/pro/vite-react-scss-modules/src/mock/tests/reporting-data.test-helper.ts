import {
  getActivity,
  getDeliveryTrend,
  getOwnerCapacity,
  getProjectDelivery,
  getTaskStatusSummary,
  getTokenUsageReport,
} from '@/api/analytics';
import { getProjectDistribution } from '@/api/projects';
import { getTasks } from '@/api/tasks';
import { getWorkspaceSummary } from '@/api/workspace';

export async function readAnalytics() {
  const [status, ownerCapacity, trendPoints, projectDelivery, activity] = await Promise.all([
    getTaskStatusSummary(),
    getOwnerCapacity(),
    getDeliveryTrend(),
    getProjectDelivery(),
    getActivity(),
  ]);

  return { ...status, ownerCapacity, trendPoints, projectDelivery, activity };
}

export async function readWorkspace() {
  const [snapshot, tokens, projectDistribution, recentTasks] = await Promise.all([
    getWorkspaceSummary(),
    getTokenUsageReport(),
    getProjectDistribution(),
    getTasks({ pageSize: 6 }),
  ]);

  return { snapshot, ...tokens, projectDistribution, recentTasks: recentTasks.items };
}
