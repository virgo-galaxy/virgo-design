import type {
  ActivityDto,
  OwnerCapacityDto,
  ProjectDeliveryDayDto,
  TaskRecordDto,
  TaskStatusSummaryDto,
  TrendPointDto,
} from '@/contracts/analytics';
import { TASK_STATUS_CODES, type TaskDto } from '@/contracts/tasks';

import { projects } from '../fixtures/projects';
import { members } from '../fixtures/team';

function reportDates(through: string) {
  return Array.from({ length: 14 }, (_, index) => {
    const date = new Date(`${through}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() - 13 + index);

    return date.toISOString().slice(0, 10);
  });
}

export function taskStatusSummary(tasks: readonly TaskDto[]): TaskStatusSummaryDto {
  return {
    taskCount: tasks.length,
    statusDistribution: TASK_STATUS_CODES.map((status) => ({
      status,
      count: tasks.filter((task) => task.status === status).length,
    })),
  };
}

export function ownerCapacity(
  tasks: readonly TaskDto[],
  memberIds?: readonly string[],
): OwnerCapacityDto[] {
  return members
    .filter((member) => !memberIds || memberIds.includes(member.id))
    .map((member) => {
      const open = tasks.filter((task) => task.assignee === member.id && task.status !== 'done');

      return {
        memberId: member.id,
        count: open.length,
        hours: open.reduce((sum, task) => sum + task.estimateHours, 0),
      };
    });
}

export function deliveryTrend(tasks: readonly TaskDto[], through: string): TrendPointDto[] {
  return reportDates(through).map((date) => ({
    date,
    completed: tasks.filter(
      (task) => task.status === 'done' && task.completedAt?.slice(0, 10) === date,
    ).length,
    planned: tasks.filter((task) => task.dueDate === date).length,
  }));
}

export function projectDelivery(
  tasks: readonly TaskDto[],
  through: string,
  projectIds?: readonly string[],
): ProjectDeliveryDayDto[] {
  return reportDates(through).map((date) => ({
    date,
    deliveries: projects
      .filter((project) => !projectIds || projectIds.includes(project.id))
      .map((project) => ({
        projectId: project.id,
        completed: tasks.filter(
          (task) =>
            task.project === project.id &&
            task.status === 'done' &&
            task.completedAt?.slice(0, 10) === date,
        ).length,
      })),
  }));
}

export function recentActivity(
  tasks: readonly TaskDto[],
  records?: readonly TaskRecordDto[],
): ActivityDto[] {
  return records
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
        .sort((a, b) => (b.completedAt ?? b.createdAt).localeCompare(a.completedAt ?? a.createdAt))
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
        }));
}
