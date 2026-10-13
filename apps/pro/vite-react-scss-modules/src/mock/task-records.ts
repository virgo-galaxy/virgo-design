import type { TaskRecordDto, TaskRecordKind, TokenUsageDayDto } from '@/api/analytics';
import type { SessionUser } from '@/api/auth';
import type { NotificationDto, NotificationKind } from '@/api/notifications';
import type { TaskDto } from '@/api/tasks';
import { canViewTask } from '@/lib/auth/permissions';

import { projects } from './fixtures/projects';
import { taskReferenceDate } from './fixtures/tasks';
import { users } from './fixtures/team';
import type { DemoState, StoredNotification } from './state';

// These are simulated AI assistance receipts, attributed to the person who performed
// each task operation. They are never obtained by counting HTTP requests or deadlines.
const rates: Record<TaskRecordKind, [number, number]> = {
  created: [1800, 600],
  assigned: [800, 200],
  started: [9000, 3000],
  submitted: [4000, 1600],
  approved: [1200, 400],
  returned: [1600, 600],
  updated: [1000, 300],
  deleted: [400, 100],
  assisted: [6000, 2000],
};
export const recordKinds = Object.keys(rates) as TaskRecordKind[];
function receipt(
  task: TaskDto,
  userId: string,
  kind: TaskRecordKind,
  recordedAt: string,
  id: string,
): TaskRecordDto {
  const [input, output] = rates[kind];
  const factor = Math.max(1, task.estimateHours / 4);
  return {
    id,
    taskId: task.id,
    taskTitle: task.title,
    project: task.project,
    module: task.module,
    userId,
    kind,
    recordedAt,
    inputTokens: Math.round(input * factor),
    outputTokens: Math.round(output * factor),
  };
}
export function seedTaskRecords(tasks: readonly TaskDto[]): TaskRecordDto[] {
  return tasks.flatMap((task) => {
    const manager = projects.find((project) => project.id === task.project)!.owner;
    const start = Date.parse(task.createdAt);
    const end = Date.parse(task.completedAt ?? `${taskReferenceDate}T10:00:00Z`);
    const at = (fraction: number) =>
      new Date(start + Math.max(0, end - start) * fraction).toISOString();
    const records = [receipt(task, manager, 'created', at(0), `seed-${task.id}-created`)];
    if (['in_progress', 'in_review', 'done'].includes(task.status) && task.assignee)
      records.push(receipt(task, task.assignee, 'started', at(0.35), `seed-${task.id}-started`));
    if (['in_review', 'done'].includes(task.status) && task.assignee)
      records.push(receipt(task, task.assignee, 'submitted', at(0.8), `seed-${task.id}-submitted`));
    if (task.status === 'done')
      records.push(receipt(task, manager, 'approved', at(1), `seed-${task.id}-approved`));
    if (task.assignee) {
      const sessions = 8 + task.estimateHours;
      const phase = ['done', 'in_review'].includes(task.status) ? 0.75 : 0.95;
      for (let index = 0; index < sessions; index++) {
        const record = receipt(
          task,
          task.assignee,
          'assisted',
          at((phase * (index + 1)) / (sessions + 1)),
          `seed-${task.id}-assistance-${index}`,
        );
        const variation = 0.6 + ((Number.parseInt(task.id.slice(0, 4), 16) + index * 17) % 9) * 0.2;
        records.push({
          ...record,
          inputTokens: Math.round(record.inputTokens * variation),
          outputTokens: Math.round(record.outputTokens * variation),
        });
      }
    }
    return records;
  });
}
function notificationFor(
  record: TaskRecordDto,
  task: TaskDto,
  kind: NotificationKind = record.kind,
): Omit<NotificationDto, 'available' | 'projectName'> | undefined {
  const recipientId = ['started', 'submitted'].includes(kind)
    ? projects.find((project) => project.id === task.project)?.owner
    : task.assignee;
  if (!recipientId || recipientId === record.userId) return undefined;
  return {
    id: `notice-${record.id}`,
    recipientId,
    actorId: record.userId,
    kind,
    taskId: task.id,
    taskTitle: task.title,
    project: task.project,
    createdAt: record.recordedAt,
    readAt: null,
  };
}
export function seedNotifications(
  tasks: readonly TaskDto[],
  records: readonly TaskRecordDto[],
): StoredNotification[] {
  const result: StoredNotification[] = [
    {
      id: 'welcome-admin',
      recipientId: 'admin',
      actorId: 'system',
      kind: 'welcome',
      taskId: null,
      taskTitle: '',
      project: '',
      createdAt: `${taskReferenceDate}T00:00:00Z`,
      readAt: null,
    },
  ];
  for (const record of records) {
    const task = tasks.find((task) => task.id === record.taskId)!;
    const notification = notificationFor(
      record,
      task,
      record.kind === 'created' && task.status === 'todo' ? 'ready' : record.kind,
    );
    if (notification) {
      const waiting =
        (record.kind === 'submitted' && task.status === 'in_review') ||
        (record.kind === 'created' && ['backlog', 'todo'].includes(task.status));
      result.push({ ...notification, readAt: waiting ? null : record.recordedAt });
    }
  }
  return result;
}
export function appendTaskRecord(
  state: DemoState,
  before: TaskDto | undefined,
  task: TaskDto,
  user: SessionUser,
  deleted = false,
): DemoState {
  const changed =
    !before ||
    deleted ||
    [
      'title',
      'description',
      'project',
      'module',
      'assignee',
      'status',
      'priority',
      'estimateHours',
      'dueDate',
    ].some((key) => before[key as keyof TaskDto] !== task[key as keyof TaskDto]);
  if (!changed) return state;
  const kind: TaskRecordKind = deleted
    ? 'deleted'
    : !before
      ? 'created'
      : before.assignee !== task.assignee
        ? 'assigned'
        : before.status !== task.status
          ? task.status === 'done'
            ? 'approved'
            : task.status === 'in_review'
              ? 'submitted'
              : before.status === 'in_review'
                ? 'returned'
                : task.status === 'in_progress'
                  ? 'started'
                  : 'updated'
          : 'updated';
  const record = receipt(
    task,
    user.id,
    kind,
    new Date().toISOString(),
    `record-${crypto.randomUUID()}`,
  );
  const notification = notificationFor(
    record,
    task,
    before?.status === 'backlog' && task.status === 'todo' ? 'ready' : kind,
  );
  return {
    ...state,
    records: [
      ...state.records,
      { ...record, ...(before ? { fromStatus: before.status } : {}), toStatus: task.status },
    ],
    notifications: notification ? [...state.notifications, notification] : state.notifications,
  };
}
export function visibleRecords(
  records: readonly TaskRecordDto[],
  user: SessionUser,
): TaskRecordDto[] {
  return records.filter(
    (record) =>
      user.role === 'admin' ||
      (user.role === 'manager'
        ? user.managedProjects.includes(record.project)
        : record.userId === user.id),
  );
}
export function dailyTokenUsage(records: readonly TaskRecordDto[]): TokenUsageDayDto[] {
  const days = new Map<string, TokenUsageDayDto>();
  for (const record of records) {
    const date = record.recordedAt.slice(0, 10);
    const entry = days.get(date) ?? { date, inputTokens: 0, outputTokens: 0 };
    entry.inputTokens += record.inputTokens;
    entry.outputTokens += record.outputTokens;
    days.set(date, entry);
  }
  return [...days.values()].sort((a, b) => a.date.localeCompare(b.date));
}
export function reportingDate(records: readonly TaskRecordDto[]) {
  return records.reduce(
    (date, record) =>
      record.recordedAt.slice(0, 10) > date ? record.recordedAt.slice(0, 10) : date,
    taskReferenceDate,
  );
}
export function reportingYears(records: readonly TaskRecordDto[], date: string) {
  const start = Math.min(
    Number(date.slice(0, 4)) - 1,
    ...projects.map((project) => Number(project.start.slice(0, 4))),
    ...records.map((record) => Number(record.recordedAt.slice(0, 4))),
  );
  return Array.from({ length: Number(date.slice(0, 4)) - start + 1 }, (_, index) => start + index);
}
export function currentInbox(state: DemoState, user: SessionUser) {
  const items = state.notifications
    .filter((item) => item.recipientId === user.id)
    .map((item) => ({
      ...item,
      projectName: projects.find((project) => project.id === item.project)?.name ?? item.project,
      available:
        item.taskId !== null &&
        state.tasks.some((task) => task.id === item.taskId && canViewTask(user, task)),
    }))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt) || b.id.localeCompare(a.id));
  return { items, unreadCount: items.filter((item) => !item.readAt).length };
}
export const validRecordPerson = (id: string) =>
  id === 'admin' || users.some((user) => user.id === id);
