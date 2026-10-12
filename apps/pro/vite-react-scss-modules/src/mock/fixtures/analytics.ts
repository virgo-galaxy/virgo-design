import type { AnalyticsOverviewDto, TaskRecordDto } from '@/api/analytics';
import { TASK_STATUS_CODES, type TaskDto } from '@/api/tasks';

import { projects } from './projects';
import { initialTaskState, taskReferenceDate } from './tasks';
import { members } from './team';

export function analyticsSnapshot(
  tasks: readonly TaskDto[],
  through = taskReferenceDate,
  records?: readonly TaskRecordDto[],
): AnalyticsOverviewDto {
  const dates = Array.from({ length: 14 }, (_, index) => {
    const date = new Date(`${through}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() - 13 + index);
    return date.toISOString().slice(0, 10);
  });
  return {
    taskCount: tasks.length,
    statusDistribution: TASK_STATUS_CODES.map((status) => ({
      status,
      count: tasks.filter((task) => task.status === status).length,
    })),
    ownerCapacity: members.map((member) => {
      const open = tasks.filter((task) => task.assignee === member.id && task.status !== 'done');
      return {
        memberId: member.id,
        count: open.length,
        hours: open.reduce((sum, task) => sum + task.estimateHours, 0),
      };
    }),
    trendPoints: dates.map((date) => ({
      date,
      completed: tasks.filter(
        (task) => task.status === 'done' && task.completedAt?.slice(0, 10) === date,
      ).length,
      planned: tasks.filter((task) => task.dueDate === date).length,
    })),
    projectDelivery: dates.map((date) => ({
      date,
      deliveries: projects.map((project) => ({
        projectId: project.id,
        completed: tasks.filter(
          (task) =>
            task.project === project.id &&
            task.status === 'done' &&
            task.completedAt?.slice(0, 10) === date,
        ).length,
      })),
    })),
    activity: records
      ? [...records]
          .filter((record) => record.kind !== 'assisted')
          .sort((a, b) => b.recordedAt.localeCompare(a.recordedAt))
          .slice(0, 3)
          .map((record) => ({
            id: record.id,
            name: members.find((member) => member.id === record.userId)?.name ?? 'Admin',
            project: record.project,
            taskTitle: record.taskTitle,
            action: record.kind,
            time: record.recordedAt.slice(11, 16),
            dateTime: record.recordedAt,
            status:
              record.kind === 'approved'
                ? 'complete'
                : record.kind === 'started'
                  ? 'active'
                  : 'pending',
          }))
      : [...tasks]
          .sort((a, b) =>
            (b.completedAt ?? b.createdAt).localeCompare(a.completedAt ?? a.createdAt),
          )
          .slice(0, 3)
          .map((task) => ({
            id: `activity-${task.id}`,
            name: members.find((member) => member.id === task.assignee)?.name ?? 'Unassigned',
            project: task.project,
            taskTitle: task.title,
            action: task.status === 'done' ? 'completed' : 'created',
            time: (task.completedAt ?? task.createdAt).slice(11, 16),
            dateTime: task.completedAt ?? task.createdAt,
            status:
              task.status === 'done'
                ? 'complete'
                : task.status === 'in_progress'
                  ? 'active'
                  : 'pending',
          })),
  };
}
export const { trendPoints, projectDelivery, activity } = analyticsSnapshot(initialTaskState.tasks);
