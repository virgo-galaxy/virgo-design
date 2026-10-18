// @vitest-environment jsdom
import { setupServer } from 'msw/node';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { getSession, logout } from '@/api/auth';
import { getNotifications, readAllNotifications } from '@/api/notifications';
import {
  getProfileIdentity,
  getProfilePreferences,
  updateProfileIdentity,
  updateProfilePreferences,
} from '@/api/profile';
import {
  createTask,
  deleteTasks,
  getTask,
  getTasks,
  getTaskSummary,
  updateTask,
} from '@/api/tasks';
import { getLatestWorkflow, prepareHandoff } from '@/api/workflows';
import { enterDemoSession, resetDemo } from '@/demo/client';
import { clearDemoStorage } from '@/demo/client/reset';
import { taskDraft, validateTask } from '@/features/tasks';
import { businessLabel } from '@/lib/formatting/business-labels';
import { handlers } from '@/test/demo-handlers';
import { resetSession } from '@/test/demo-session';

import { getDemoState, resetDemoState } from '../data/store';
import { initialProfile } from '../fixtures/profile';
import { projects } from '../fixtures/projects';
import { createTaskHistory } from '../fixtures/task-history';
import { createDemoTaskId } from '../fixtures/task-id';
import { initialTaskState, taskAssignees, taskProjects } from '../fixtures/tasks';
import { users } from '../fixtures/team';
import { readAnalytics } from './reporting-data.test-helper';

const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(() => {
  clearDemoStorage();
  resetDemoState();
  resetSession();
});

describe('coherent demonstration catalog', () => {
  it('keeps seed IDs, project membership, task dates and translations internally consistent', () => {
    expect(projects.length).toBeGreaterThan(0);
    const ids = new Set(initialTaskState.tasks.map((task) => task.id));
    expect(ids.size).toBe(initialTaskState.tasks.length);
    expect(ids.has(createDemoTaskId(initialTaskState.nextId))).toBe(false);
    expect(createTaskHistory()).toEqual(initialTaskState.tasks);
    for (const project of projects) {
      expect(new Set(project.modules.map((module) => module.id)).size).toBe(project.modules.length);
      expect(project.memberIds).toContain(project.owner);
      expect(users.find((user) => user.id === project.owner)?.managedProjects).toContain(
        project.id,
      );
    }
    for (const task of initialTaskState.tasks) {
      expect(
        validateTask(
          taskDraft(task),
          taskProjects,
          taskAssignees.map((person) => person.id),
          projects,
        ),
      ).toEqual({});
      expect(businessLabel(task.title, 'zh-CN')).not.toBe(task.title);
      expect(businessLabel(task.description, 'zh-CN')).not.toBe(task.description);
      expect(Number.isFinite(Date.parse(task.createdAt))).toBe(true);
      if (task.completedAt) expect(task.createdAt < task.completedAt).toBe(true);
    }
    expect(businessLabel('Custom user title', 'zh-CN')).toBe('Custom user title');
    expect(businessLabel('Anika Rao', 'zh-CN')).toBe('Anika Rao（阿妮卡）');
  });

  it('rejects cross-project modules and non-participating people without mutating records', async () => {
    const draft = taskDraft(initialTaskState.tasks[0]!);
    await expect(createTask({ ...draft, module: 'booking-system-1' })).rejects.toMatchObject({
      data: { fields: { module: expect.any(Array) } },
    });
    await expect(
      updateTask(initialTaskState.tasks[0]!.id, { assignee: 'leo' }),
    ).rejects.toMatchObject({ data: { fields: { assignee: expect.any(Array) } } });
    expect((await getTasks()).total).toBe(initialTaskState.tasks.length);
    expect(await getTask(initialTaskState.tasks[0]!.id)).toEqual(initialTaskState.tasks[0]);
    const result = await getTasks({ module: 'online-store-1' });
    expect(result.total).toBe(
      initialTaskState.tasks.filter((task) => task.module === 'online-store-1').length,
    );
    expect(result.items.every((task) => task.project === 'online-store')).toBe(true);
    expect((await getTasks({ search: '制定交付计划' })).total).toBeGreaterThan(0);
    expect((await getTasks({ search: '阿妮卡' })).total).toBeGreaterThan(0);
  });
});

describe('server demonstration session', () => {
  it('retains task CRUD, profile and handoff receipts through reload and sign-out with coherent analytics', async () => {
    const task = await createTask({
      ...taskDraft(initialTaskState.tasks[0]!),
      title: 'Persistent task',
    });
    const finished = await updateTask(task.id, { status: 'done', title: 'Saved completion' });
    const deleted = initialTaskState.tasks.find((task) => task.status !== 'done')!;
    await deleteTasks({ ids: [deleted.id] });
    await updateProfileIdentity({ name: 'Saved Admin' });
    await updateProfilePreferences({ digest: false });
    const receipt = await prepareHandoff({
      title: 'Saved handoff',
      projectId: 'online-store',
      date: '2026-10-06',
      time: '10:00',
      taskIds: [task.id],
      audience: 'team',
      notes: '',
      confirmed: true,
    });
    expect(localStorage.getItem('virgo-pro.demo-data')).toBeNull();
    await logout();
    expect((await getSession()).authenticated).toBe(false);
    await enterDemoSession();
    expect(await getTask(task.id)).toEqual(finished);
    await expect(getTask(deleted.id)).rejects.toMatchObject({ status: 404 });
    expect((await getProfileIdentity()).name).toBe('Saved Admin');
    expect((await getLatestWorkflow('success')).reference).toBe(receipt.reference);
    const analytics = await readAnalytics();
    const date = finished.completedAt!.slice(0, 10);
    expect(analytics.trendPoints.find((point) => point.date === date)?.completed).toBe(1);
    expect(await getTaskSummary()).toMatchObject({
      total: initialTaskState.tasks.length,
      completed: initialTaskState.tasks.filter((task) => task.status === 'done').length + 1,
    });
    const next = await createTask({ ...taskDraft(finished), title: 'Next task' });
    expect(next.id).not.toBe(task.id);
  });

  it('clears only Pro data/settings and ends the session; re-entry restores the full seed', async () => {
    const initial = structuredClone(getDemoState());
    const unreadCount = (await getNotifications()).unreadCount;
    await deleteTasks({ ids: initialTaskState.tasks.slice(0, 3).map((task) => task.id) });
    await updateProfileIdentity({ name: 'Changed' });
    await readAllNotifications();
    localStorage.setItem('virgo-pro:settings', 'custom');
    localStorage.setItem('virgo-pro.tasks-table', 'custom');
    sessionStorage.setItem('virgo-pro.workspace.agent-mode', 'true');
    localStorage.setItem('other-app', 'keep');
    sessionStorage.setItem('other-session', 'keep');
    expect(await resetDemo()).toEqual({ authenticated: false });
    expect(localStorage.getItem('virgo-pro.demo-data')).toBeNull();
    expect(localStorage.getItem('virgo-pro:settings')).toBeNull();
    expect(localStorage.getItem('virgo-pro.tasks-table')).toBeNull();
    expect(sessionStorage.getItem('virgo-pro.workspace.agent-mode')).toBeNull();
    expect(localStorage.getItem('other-app')).toBe('keep');
    expect(sessionStorage.getItem('other-session')).toBe('keep');
    expect((await getSession()).authenticated).toBe(false);
    await enterDemoSession();
    expect(getDemoState().tasks).toEqual(initial.tasks);
    expect(getDemoState().records).toEqual(initial.records);
    expect((await getNotifications()).unreadCount).toBe(unreadCount);
    expect((await getTasks()).total).toBe(initialTaskState.tasks.length);
    const {
      focusProject,
      digest,
      digestTime,
      reviewReminders,
      compactActivity,
      ...expectedIdentity
    } = initialProfile;

    expect(await getProfileIdentity()).toEqual(expectedIdentity);
    expect(await getProfilePreferences()).toEqual({
      focusProject,
      digest,
      digestTime,
      reviewReminders,
      compactActivity,
    });
  });

  it('ignores damaged legacy browser demo data', () => {
    for (const raw of [
      '{',
      JSON.stringify({ tasks: 'invalid' }),
      JSON.stringify({
        ...getDemoState(),
        tasks: [{ ...initialTaskState.tasks[0], module: 'wrong-project' }],
      }),
    ]) {
      localStorage.setItem('virgo-pro.demo-data', raw);
      expect(getDemoState().tasks).toEqual(initialTaskState.tasks);
    }
  });
});
