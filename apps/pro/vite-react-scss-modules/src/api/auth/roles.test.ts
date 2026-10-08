// @vitest-environment jsdom
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { getWorkplaceOverview } from '@/api/analytics';
import { getProfile, updateProfile } from '@/api/profile';
import { getProjects } from '@/api/projects';
import {
  createTask,
  deleteTasks,
  getTask,
  getTasks,
  updateTask,
  updateTaskStatus,
} from '@/api/tasks';
import { clearAuthSession, getAccessToken, sessionExpiredEvent } from '@/lib/auth/session';
import { initialTaskState } from '@/mock/fixtures/tasks';
import { handlers } from '@/mock/handlers';
import { resetDemoState } from '@/mock/store';

import { getDemoAccounts, getSession, login, logout, resetDemo } from './index';
const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
beforeEach(() => resetDemoState());
const signIn = (account: string) => login({ account, password: 'virgo123' });
describe('Bearer accounts and project permissions', () => {
  it('provides 25 demo identities, checks passwords and requires a token', async () => {
    clearAuthSession();
    const demo = await getDemoAccounts();
    expect(demo.accounts).toHaveLength(25);
    expect(demo.accounts.filter((user) => user.role === 'manager')).toHaveLength(2);
    expect(await getSession()).toEqual({ authenticated: false });
    await expect(login({ account: 'admin', password: 'incorrect' })).rejects.toMatchObject({
      status: 401,
    });
    await expect(getTasks()).rejects.toMatchObject({ status: 401 });
    const session = await signIn('admin');
    expect(getAccessToken()).toBe(session.accessToken);
    expect(Date.parse(session.expiresAt)).toBeGreaterThan(Date.now());
    expect((await getSession()).user?.id).toBe('admin');
    const headers: string[] = [];
    const capture = ({ request }: { request: Request }) =>
      headers.push(request.headers.get('authorization') ?? '');
    server.events.on('request:start', capture);
    await getTasks();
    server.events.removeListener('request:start', capture);
    expect(headers).toContain(`Bearer ${session.accessToken}`);
  });
  it('scopes both managers independently, including totals and project lists', async () => {
    for (const account of ['ava', 'leo']) {
      const session = await signIn(account);
      const expected = initialTaskState.tasks.filter((task) =>
        session.user.managedProjects.includes(task.project),
      );
      const tasks = await getTasks({ pageSize: 100 });
      expect(tasks.total).toBe(expected.length);
      expect(tasks.overview.total).toBe(expected.length);
      expect(tasks.items.every((task) => session.user.managedProjects.includes(task.project))).toBe(
        true,
      );
      expect((await getProjects()).map((project) => project.name)).toEqual(
        session.user.managedProjects,
      );
      const other = initialTaskState.tasks.find(
        (task) => !session.user.managedProjects.includes(task.project),
      )!;
      await expect(getTask(other.id)).rejects.toMatchObject({ status: 403 });
      await expect(updateTaskStatus(other.id, 'todo')).rejects.toMatchObject({ status: 403 });
      await expect(resetDemo()).rejects.toMatchObject({ status: 403 });
    }
  });
  it('gives members only their own tasks, fixed assignments and permitted transitions', async () => {
    await signIn('hana');
    const tasks = await getTasks({ pageSize: 100 });
    const expected = initialTaskState.tasks.filter((task) => task.assignee === 'hana');
    expect(tasks.total).toBe(expected.length);
    expect(tasks.items.every((task) => task.assignee === 'hana')).toBe(true);
    expect((await getProfile()).name).toBe('Hana Kim');
    expect((await getWorkplaceOverview()).snapshot.openTasks).toBe(
      expected.filter((task) => task.status !== 'done').length,
    );
    const task = expected.find((task) => task.status === 'todo')!;
    await expect(updateTaskStatus(task.id, 'done')).rejects.toMatchObject({ status: 403 });
    expect((await updateTaskStatus(task.id, 'in_progress')).status).toBe('in_progress');
    expect((await updateTaskStatus(task.id, 'in_review')).status).toBe('in_review');
    await expect(
      updateTask(task.id, {
        ...task,
        assignee: task.project === 'Online Store' ? 'ava' : 'leo',
        status: 'in_review',
      }),
    ).rejects.toMatchObject({ status: 403 });
    await expect(createTask({ ...task, title: 'Unauthorized' })).rejects.toMatchObject({
      status: 403,
    });
    await expect(deleteTasks({ ids: [task.id] })).rejects.toMatchObject({ status: 403 });
    await expect(updateProfile({ digest: false })).rejects.toMatchObject({ status: 403 });
    await expect(resetDemo()).rejects.toMatchObject({ status: 403 });
    await signIn(task.project === 'Online Store' ? 'ava' : 'leo');
    expect((await updateTaskStatus(task.id, 'done')).status).toBe('done');
  });
  it('revokes the old token on logout and retains task changes across account switches', async () => {
    const session = await signIn('ava');
    const task = initialTaskState.tasks.find((task) => task.project === 'Online Store')!;
    await updateTask(task.id, { ...task, title: 'Persisted across users' });
    await logout();
    expect(getAccessToken()).toBeUndefined();
    const old = await fetch('http://localhost:3000/api/v1/tasks', {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });
    expect(old.status).toBe(401);
    await signIn(task.assignee);
    expect((await getTask(task.id)).title).toBe('Persisted across users');
  });
  it('rejects an expired token, emits a sign-in event and permits a new login', async () => {
    const session = await signIn('hana');
    const tokens = JSON.parse(sessionStorage.getItem('virgo-pro.mock-tokens.v1')!);
    tokens[session.accessToken].expiresAt = '2000-01-01T00:00:00Z';
    sessionStorage.setItem('virgo-pro.mock-tokens.v1', JSON.stringify(tokens));
    let expired = false;
    const listener = () => {
      expired = true;
    };
    window.addEventListener(sessionExpiredEvent, listener);
    await expect(getTasks()).rejects.toMatchObject({ status: 401 });
    window.removeEventListener(sessionExpiredEvent, listener);
    expect(expired).toBe(true);
    expect(getAccessToken()).toBeUndefined();
    expect((await signIn('hana')).accessToken).not.toBe(session.accessToken);
    expect((await getSession()).user?.id).toBe('hana');
  });
});
