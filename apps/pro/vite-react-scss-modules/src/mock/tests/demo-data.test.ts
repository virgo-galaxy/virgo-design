// @vitest-environment jsdom
import { setupServer } from 'msw/node';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { enterDemoSession, getSession, logout, resetDemo } from '@/api/auth';
import { updateProfileIdentity, updateProfilePreferences } from '@/api/profile';
import { getTaskSummary } from '@/api/tasks';
import { createTask, deleteTasks, getTask, getTasks, updateTask } from '@/api/tasks';
import { getLatestWorkflow, prepareHandoff } from '@/api/workflows';
import { taskDraft, validateTask } from '@/features/tasks';
import { businessLabel } from '@/lib/demo/labels';
import { clearDemoStorage } from '@/lib/demo/reset';
import { readProfile } from '@/test/profile';
import { readAnalytics } from '@/test/reporting-data';

import { demoStorageKey, getDemoState, resetDemoState, unloadDemoState } from '../data/store';
import { initialProfile } from '../fixtures/profile';
import { projects } from '../fixtures/projects';
import { createTaskHistory } from '../fixtures/task-history';
import { initialTaskState, taskAssignees, taskProjects } from '../fixtures/tasks';
import { teamAssignments, users } from '../fixtures/team';
import { handlers } from '../handlers';
import { resetSession } from '../handlers/auth';

const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(() => {
  clearDemoStorage();
  resetDemoState();
  resetSession();
});

describe('coherent demonstration catalog', () => {
  it('has four projects, six modules each and 240 unique valid tasks assigned to participating people', () => {
    expect(projects).toHaveLength(4);
    expect(
      projects.map(
        (project) => initialTaskState.tasks.filter((task) => task.project === project.id).length,
      ),
    ).toEqual([68, 54, 60, 58]);
    expect(teamAssignments).toHaveLength(24);
    expect(
      teamAssignments
        .filter((person) => person.job === 'manager')
        .map((person) => person.projects.length),
    ).toEqual([2, 2]);
    expect(new Set(initialTaskState.tasks.map((task) => task.title)).size).toBe(240);
    expect(createTaskHistory()).toEqual(initialTaskState.tasks);
    for (const project of projects) {
      expect(project.modules).toHaveLength(6);
      expect(project.memberIds).toContain(project.owner);
      expect(users.find((user) => user.id === project.owner)?.managedProjects).toContain(
        project.id,
      );
      for (const module of project.modules)
        expect(initialTaskState.tasks.some((task) => task.module === module.id)).toBe(true);
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
    expect((await getTasks()).total).toBe(240);
    expect(await getTask(initialTaskState.tasks[0]!.id)).toEqual(initialTaskState.tasks[0]);
    const result = await getTasks({ module: 'online-store-1' });
    expect(result.total).toBe(12);
    expect(result.items.every((task) => task.project === 'online-store')).toBe(true);
    expect((await getTasks({ search: '制定交付计划' })).total).toBe(24);
    expect((await getTasks({ search: '阿妮卡' })).total).toBeGreaterThan(0);
  });
});

describe('local demonstration persistence', () => {
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
    expect(localStorage.getItem(demoStorageKey)).toBeTruthy();
    await logout();
    expect((await getSession()).authenticated).toBe(false);
    unloadDemoState();
    await enterDemoSession();
    expect(await getTask(task.id)).toEqual(finished);
    await expect(getTask(deleted.id)).rejects.toMatchObject({ status: 404 });
    expect((await readProfile()).name).toBe('Saved Admin');
    expect((await getLatestWorkflow('success')).reference).toBe(receipt.reference);
    const analytics = await readAnalytics();
    const date = finished.completedAt!.slice(0, 10);
    expect(analytics.trendPoints.find((point) => point.date === date)?.completed).toBe(1);
    expect(await getTaskSummary()).toMatchObject({ total: 240, completed: 81 });
    const next = await createTask({ ...taskDraft(finished), title: 'Next task' });
    expect(next.id).not.toBe(task.id);
  });

  it('clears only Pro data/settings and ends the session; re-entry restores the full seed', async () => {
    await deleteTasks({ ids: initialTaskState.tasks.slice(0, 3).map((task) => task.id) });
    await updateProfileIdentity({ name: 'Changed' });
    localStorage.setItem('virgo-pro:settings:v1', 'custom');
    localStorage.setItem('virgo-pro.tasks-table.v1', 'custom');
    sessionStorage.setItem('virgo-pro.workspace.agent-mode', 'true');
    localStorage.setItem('other-app', 'keep');
    sessionStorage.setItem('other-session', 'keep');
    expect(await resetDemo()).toEqual({ authenticated: false });
    expect(localStorage.getItem(demoStorageKey)).toBeNull();
    expect(localStorage.getItem('virgo-pro:settings:v1')).toBeNull();
    expect(localStorage.getItem('virgo-pro.tasks-table.v1')).toBeNull();
    expect(sessionStorage.getItem('virgo-pro.workspace.agent-mode')).toBeNull();
    expect(localStorage.getItem('other-app')).toBe('keep');
    expect(sessionStorage.getItem('other-session')).toBe('keep');
    expect((await getSession()).authenticated).toBe(false);
    unloadDemoState();
    await enterDemoSession();
    expect((await getTasks()).total).toBe(240);
    expect(await readProfile()).toEqual(initialProfile);
  });

  it('recovers safely from damaged, unsupported and inconsistent stored snapshots', () => {
    for (const raw of [
      '{',
      JSON.stringify({ version: 3, state: getDemoState() }),
      JSON.stringify({
        version: 1,
        state: {
          ...getDemoState(),
          tasks: [{ ...initialTaskState.tasks[0], module: 'wrong-project' }],
        },
      }),
    ]) {
      localStorage.setItem(demoStorageKey, raw);
      unloadDemoState();
      expect(getDemoState().tasks).toEqual(initialTaskState.tasks);
    }
  });
});
