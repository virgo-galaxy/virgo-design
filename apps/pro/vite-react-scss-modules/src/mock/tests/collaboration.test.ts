// @vitest-environment jsdom
import { setupServer } from 'msw/node';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { login, logout, resetDemo } from '@/api/auth';
import { getNotifications, readAllNotifications, readNotification } from '@/api/notifications';
import {
  deleteTasks,
  getTask,
  getTaskHistory,
  getTaskMetadata,
  updateTask,
  updateTaskStatus,
} from '@/api/tasks';
import { buildTokenUsageCalendar } from '@/pages/workplace/model/token-usage-calendar';
import { readAnalytics, readWorkspace } from '@/test/reporting-data';

import { demoStorageKey, getDemoState, resetDemoState, unloadDemoState } from '../data/store';
import { initialTaskState } from '../fixtures/tasks';
import { users } from '../fixtures/team';
import { handlers } from '../handlers';

const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(() => resetDemoState());
const signIn = (account: string) => login({ account, password: 'virgo123' });
const sum = (items: readonly { inputTokens: number; outputTokens: number }[]) =>
  items.reduce((total, item) => total + item.inputTokens + item.outputTokens, 0);
const task = initialTaskState.tasks.find(
  (task) => task.assignee === 'hana' && task.status === 'todo',
)!;
const manager = task.project === 'online-store' ? 'ava' : 'leo';

describe('task collaboration notifications', () => {
  it('routes start/review/approval to the right identities and retains read state through logout/reload', async () => {
    await signIn(manager);
    const before = await getNotifications();
    await signIn('hana');
    await updateTaskStatus(task.id, 'in_progress');
    await updateTaskStatus(task.id, 'in_review');
    await signIn(manager);
    const inbox = await getNotifications();
    const review = inbox.items.find(
      (item) => item.taskId === task.id && item.kind === 'submitted',
    )!;
    expect(inbox.unreadCount).toBe(before.unreadCount + 2);
    expect(review).toMatchObject({
      recipientId: manager,
      actorId: 'hana',
      available: true,
      readAt: null,
    });
    expect((await readAnalytics()).activity[0]).toMatchObject({
      taskTitle: task.title,
      action: 'submitted',
    });
    await signIn(manager === 'ava' ? 'leo' : 'ava');
    expect((await getNotifications()).items.some((item) => item.id === review.id)).toBe(false);
    await expect(readNotification(review.id)).rejects.toMatchObject({ status: 403 });
    await signIn(manager);
    const read = await readNotification(review.id);
    expect(read.readAt).toBeTruthy();
    expect((await readNotification(review.id)).readAt).toBe(read.readAt);
    await updateTaskStatus(task.id, 'done');
    await logout();
    unloadDemoState();
    await signIn('hana');
    const approved = (await getNotifications()).items.find(
      (item) => item.taskId === task.id && item.kind === 'approved',
    );
    expect(approved).toMatchObject({
      recipientId: 'hana',
      actorId: manager,
      available: true,
      readAt: null,
    });
    expect((await getTask(task.id)).status).toBe('done');
    expect((await readAllNotifications()).unreadCount).toBe(0);
    await signIn(manager);
    expect((await getNotifications()).items.find((item) => item.id === review.id)?.readAt).toBe(
      read.readAt,
    );
    expect((await getNotifications()).unreadCount).toBeGreaterThan(0);
  });
  it('shares scoped task history with actor and transition, without exposing personal token receipts', async () => {
    await signIn('hana');
    for (const change of [
      { title: 'Forbidden edit' },
      { description: 'Forbidden edit' },
      { estimateHours: 99 },
    ])
      await expect(updateTask(task.id, change)).rejects.toMatchObject({ status: 403 });
    await updateTaskStatus(task.id, 'in_progress');
    await updateTaskStatus(task.id, 'in_review');
    await signIn(manager);
    await updateTaskStatus(task.id, 'done');
    const history = await getTaskHistory(task.id);
    expect(history.slice(0, 3)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: 'started',
          actorId: 'hana',
          fromStatus: 'todo',
          toStatus: 'in_progress',
        }),
        expect.objectContaining({
          kind: 'submitted',
          actorId: 'hana',
          fromStatus: 'in_progress',
          toStatus: 'in_review',
        }),
        expect.objectContaining({
          kind: 'approved',
          actorId: manager,
          fromStatus: 'in_review',
          toStatus: 'done',
        }),
      ]),
    );
    expect(
      history.every((record) => !('inputTokens' in record) && !('outputTokens' in record)),
    ).toBe(true);
    expect((await getTaskMetadata()).referenceDate).toBe((await readWorkspace()).snapshot.date);
    await signIn(manager === 'ava' ? 'leo' : 'ava');
    await expect(getTaskHistory(task.id)).rejects.toMatchObject({ status: 403 });
    await signIn('hana');
    expect((await getTaskHistory(task.id)).some((record) => record.kind === 'approved')).toBe(true);
  });
  it('lets a project manager carry their own assigned task through the same simple workflow', async () => {
    await signIn('ava');
    const own = initialTaskState.tasks.find(
      (task) => task.assignee === 'ava' && task.status === 'todo',
    )!;
    expect((await updateTaskStatus(own.id, 'in_progress')).status).toBe('in_progress');
    expect((await updateTaskStatus(own.id, 'in_review')).status).toBe('in_review');
    expect((await updateTaskStatus(own.id, 'done')).status).toBe('done');
  });
  it('notifies reassignment and cancellation, and makes obsolete task links unavailable', async () => {
    await signIn(manager);
    const nextPerson = users.find(
      (user) =>
        user.id !== task.assignee && user.id !== manager && user.projects.includes(task.project),
    )!;
    await updateTask(task.id, { assignee: nextPerson.id });
    await signIn(nextPerson.id);
    expect(
      (await getNotifications()).items.find(
        (item) => item.taskId === task.id && item.kind === 'assigned',
      ),
    ).toMatchObject({ available: true });
    await signIn(manager);
    await deleteTasks({ ids: [task.id] });
    await signIn(nextPerson.id);
    const inbox = await getNotifications();
    expect(
      inbox.items.find((item) => item.taskId === task.id && item.kind === 'deleted'),
    ).toMatchObject({ available: false });
    expect(
      inbox.items.filter((item) => item.taskId === task.id).every((item) => !item.available),
    ).toBe(true);
  });
  it('returns a review to its engineer and permits resubmission', async () => {
    await signIn('hana');
    await updateTaskStatus(task.id, 'in_progress');
    await updateTaskStatus(task.id, 'in_review');
    await signIn(manager);
    await updateTaskStatus(task.id, 'in_progress');
    await signIn('hana');
    expect(
      (await getNotifications()).items.find(
        (item) => item.taskId === task.id && item.kind === 'returned',
      ),
    ).toMatchObject({ available: true, readAt: null });
    await updateTaskStatus(task.id, 'in_review');
    expect((await getTask(task.id)).status).toBe('in_review');
  });
});

describe('record-based reporting across years', () => {
  it('spans project histories, reconciles raw totals and scopes every person/project independently', async () => {
    await signIn('admin');
    const workspace = await readWorkspace();
    expect(workspace.reportingScope).toBe('workspace');
    expect(workspace.reportingYears).toEqual([2025, 2026]);
    expect(sum(workspace.tokenUsage)).toBe(sum(workspace.tokenRecords));
    expect(workspace.tokenUsage[0]!.date >= '2025-06-02').toBe(true);
    expect(
      workspace.tokenUsage.filter((day) => day.date.startsWith('2025')).length,
    ).toBeGreaterThan(80);
    expect(
      workspace.tokenUsage.filter((day) => day.date.startsWith('2026')).length,
    ).toBeGreaterThan(150);
    const calendar = buildTokenUsageCalendar(workspace.snapshot.date, workspace.tokenUsage, 2025);
    expect(calendar.year).toBe(2025);
    expect(calendar.days.some((day) => day.tokens > 0)).toBe(true);
    expect(calendar.days.every((day) => !day.future)).toBe(true);
    expect(sum(calendar.days)).toBe(
      sum(workspace.tokenUsage.filter((day) => day.date.startsWith('2025'))),
    );
    for (const account of ['ava', 'leo', 'hana', 'noah']) {
      const session = await signIn(account);
      const result = await readWorkspace();
      const expected = workspace.tokenRecords.filter((record) =>
        session.user.role === 'manager'
          ? session.user.managedProjects.includes(record.project)
          : record.userId === account,
      );
      expect(result.tokenRecords).toEqual(expected);
      expect(sum(result.tokenUsage)).toBe(sum(expected));
      expect(sum(result.tokenUsage)).toBeLessThan(sum(workspace.tokenUsage));
      expect(result.snapshot).not.toHaveProperty('user');
    }
  });
  it('charges only successful changed operations, preserves ownership across reassignment and updates delivery counts', async () => {
    await signIn('hana');
    const initial = await readWorkspace();
    await getNotifications();
    await readWorkspace();
    await readAnalytics();
    await updateTaskStatus(task.id, 'todo');
    expect(sum((await readWorkspace()).tokenUsage)).toBe(sum(initial.tokenUsage));
    await expect(updateTaskStatus(task.id, 'done')).rejects.toMatchObject({ status: 403 });
    expect(sum((await readWorkspace()).tokenUsage)).toBe(sum(initial.tokenUsage));
    await updateTaskStatus(task.id, 'in_progress');
    await updateTaskStatus(task.id, 'in_review');
    const submitted = await readWorkspace();
    expect(submitted.tokenRecords.filter((record) => !record.id.startsWith('seed-'))).toHaveLength(
      2,
    );
    expect(submitted.tokenRecords.every((record) => record.userId === 'hana')).toBe(true);
    expect(sum(submitted.tokenUsage)).toBeGreaterThan(sum(initial.tokenUsage));
    await signIn(manager);
    const before = await readAnalytics();
    await updateTaskStatus(task.id, 'done');
    const after = await readAnalytics();
    expect(after.trendPoints.reduce((sum, point) => sum + point.completed, 0)).toBe(
      before.trendPoints.reduce((sum, point) => sum + point.completed, 0) + 1,
    );
    await signIn('hana');
    expect(sum((await readWorkspace()).tokenUsage)).toBe(sum(submitted.tokenUsage));
  });
  it('preserves edited legacy tasks while migrating old dates and resets receipts/read state with demo data', async () => {
    const seed = getDemoState();
    const index = seed.tasks.findIndex((task) => task.status === 'done');
    const existing = seed.tasks[index]!;
    const completed = Date.UTC(2026, 8, 18 + (index % 14), 9 + (index % 7));
    const created = Date.UTC(2026, 8, 30 - Math.floor(index / 10), 2 + (index % 8), index % 60);
    const old = {
      ...seed,
      tasks: seed.tasks.map((task, i) =>
        i === index
          ? {
              ...task,
              title: 'Keep my custom title',
              createdAt: new Date(Math.min(created, completed - 3 * 86400000)).toISOString(),
              completedAt: new Date(completed).toISOString(),
              dueDate: new Date(completed).toISOString().slice(0, 10),
            }
          : task,
      ),
    };
    localStorage.setItem(demoStorageKey, JSON.stringify({ version: 1, state: old }));
    unloadDemoState();
    const migrated = getDemoState();
    expect(migrated.tasks[index]).toMatchObject({
      title: 'Keep my custom title',
      createdAt: existing.createdAt,
      completedAt: existing.completedAt,
    });
    expect(migrated.records.some((record) => record.kind === 'assisted')).toBe(true);
    await signIn('admin');
    await updateTask(initialTaskState.tasks[0]!.id, { title: 'Changed after migration' });
    await readAllNotifications();
    await resetDemo();
    await signIn('admin');
    expect(getDemoState().tasks).toEqual(initialTaskState.tasks);
    expect(getDemoState().records.every((record) => record.id.startsWith('seed-'))).toBe(true);
    expect((await getNotifications()).unreadCount).toBe(1);
  });
});
