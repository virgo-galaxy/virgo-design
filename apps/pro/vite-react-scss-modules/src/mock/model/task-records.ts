import type { TaskRecordDto, TaskRecordKind, TokenUsageDayDto } from '@/api/analytics/types';
import type { SessionUser } from '@/api/auth/types';
import type { NotificationDto, NotificationKind } from '@/api/notifications/types';
import type { TaskDto } from '@/api/tasks/types';
import { canViewTask } from '@/lib/auth/permissions';

import { demoDate } from '../fixtures/dates';
import { createProjects, projects } from '../fixtures/projects';
import { users } from '../fixtures/team';
import type { DemoState, StoredNotification } from './state';

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

export function seedTaskRecords(tasks: readonly TaskDto[], through = demoDate()): TaskRecordDto[] {
  return tasks.flatMap((task) => {
    const manager = projects.find((project) => project.id === task.project)!.owner;
    const start = Date.parse(task.createdAt);
    const end = Date.parse(task.completedAt ?? `${through}T00:00:00Z`);
    const at = (fraction: number) =>
      new Date(start + Math.max(0, end - start) * fraction).toISOString();
    const records = [receipt(task, manager, 'created', at(0), `seed-${task.id}-created`)];
    if (['in_progress', 'in_review', 'done'].includes(task.status) && task.assignee)
      records.push(receipt(task, task.assignee, 'started', at(0.35), `seed-${task.id}-started`));
    if (['in_review', 'done'].includes(task.status) && task.assignee)
      records.push(receipt(task, task.assignee, 'submitted', at(0.8), `seed-${task.id}-submitted`));
    if (task.status === 'done')
      records.push(receipt(task, manager, 'approved', at(1), `seed-${task.id}-approved`));

    return records;
  });
}

export function isDemoUsageRecord(record: TaskRecordDto) {
  return record.kind === 'assisted' && record.id.startsWith('seed-');
}

export function seedUsageRecords(tasks: readonly TaskDto[], through: string): TaskRecordDto[] {
  const byPerson = new Map<string, TaskDto[]>();

  for (const task of tasks) {
    if (!task.assignee) continue;

    const assigned = byPerson.get(task.assignee) ?? [];
    assigned.push(task);
    byPerson.set(task.assignee, assigned);
  }

  const records: TaskRecordDto[] = [];
  const start = `${Number(through.slice(0, 4)) - 1}-01-01`;
  const recent = demoDate(-13, through);

  for (let date = start; date <= through; date = demoDate(1, date)) {
    for (const [person, assigned] of byPerson) {
      let seed = 0;

      for (const character of `${date}:${person}`)
        seed = (Math.imul(seed, 31) + character.charCodeAt(0)) >>> 0;

      if (date < recent && seed % 4 !== 0) continue;

      const available = assigned.filter((task) => task.createdAt.slice(0, 10) <= date);
      const task = available[seed % available.length];

      if (!task) continue;

      const record = receipt(
        task,
        person,
        'assisted',
        `${date}T00:00:00.000Z`,
        `seed-usage-${date}-${person}`,
      );
      const variation = 0.5 + (seed % 16) / 10;

      records.push({
        ...record,
        inputTokens: Math.round(record.inputTokens * variation),
        outputTokens: Math.round(record.outputTokens * variation),
      });
    }
  }

  return records;
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
  through = demoDate(),
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
      createdAt: `${through}T00:00:00Z`,
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
function taskRecordKind(
  before: TaskDto | undefined,
  task: TaskDto,
  deleted: boolean,
): TaskRecordKind {
  if (deleted) return 'deleted';
  if (!before) return 'created';
  if (before.assignee !== task.assignee) return 'assigned';
  if (before.status === task.status) return 'updated';

  if (task.status === 'done') return 'approved';
  if (task.status === 'in_review') return 'submitted';
  if (before.status === 'in_review') return 'returned';
  if (task.status === 'in_progress') return 'started';

  return 'updated';
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

  const kind = taskRecordKind(before, task, deleted);
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

export function reportingYears(records: readonly TaskRecordDto[], date: string) {
  const start = Math.min(
    Number(date.slice(0, 4)) - 1,
    ...createProjects(date).map((project) => Number(project.start.slice(0, 4))),
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
