// @vitest-environment jsdom
import { delay, http as mswHttp, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { getAllTasks } from '@/application/task-queries';
import { http, HttpError } from '@/lib/http';
import { initialTaskState, taskReferenceDate } from '@/mock/fixtures/tasks';
import { handlers } from '@/mock/handlers';
import { resetProfile } from '@/mock/handlers/profile';
import { resetTasks } from '@/mock/handlers/tasks';

import { getAnalyticsOverview, getWorkplaceOverview } from './analytics';
import { API_ERROR_CODES } from './error-codes';
import { getProfile, updateProfile } from './profile';
import { getProjects } from './projects';
import {
  createTask,
  getTask,
  getTaskMetadata,
  getTasks,
  TASK_PRIORITY_CODES,
  TASK_STATUS_CODES,
  updateTask,
  updateTaskStatus,
} from './tasks';
import { prepareHandoff } from './workflows';
const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
beforeEach(() => {
  resetTasks();
  resetProfile();
});
afterAll(() => server.close());
const draft = {
  title: 'Created through Axios',
  description: 'Network fixture',
  status: 'todo' as const,
  priority: 'high' as const,
  project: 'Workspace',
  assignee: 'ava',
  dueDate: '2026-10-06',
  estimateHours: 3,
};
describe('consumer → API → Axios → MSW', () => {
  it('unwraps list data and performs stateful create/detail/edit/status updates', async () => {
    const before = await getTasks({ page: 1, pageSize: 5 });
    expect(before.items).toHaveLength(5);
    expect(before.total).toBe(256);
    const finalPage = await getTasks({ page: 26, pageSize: 10 });
    expect(finalPage.items).toHaveLength(6);
    expect(finalPage.page).toBe(26);
    const allTasks = await getAllTasks({});
    expect(allTasks).toHaveLength(256);
    expect(new Set(allTasks.map((item) => item.id)).size).toBe(256);
    expect(new Set(allTasks.map((item) => item.title)).size).toBe(256);
    expect([...new Set(allTasks.map((item) => item.status))].sort()).toEqual(
      [...TASK_STATUS_CODES].sort(),
    );
    expect([...new Set(allTasks.map((item) => item.priority))].sort()).toEqual(
      [...TASK_PRIORITY_CODES].sort(),
    );
    expect(
      allTasks.some(
        (item) => item.dueDate && item.dueDate < taskReferenceDate && item.status !== 'done',
      ),
    ).toBe(true);
    expect(allTasks.some((item) => item.dueDate === '')).toBe(true);
    const created = await createTask(draft);
    expect(created.id).toBe(`VD-${initialTaskState.nextId}`);
    expect(await getTask(created.id)).toEqual(created);
    const updated = await updateTask(created.id, {
      title: 'Edited through HTTP',
      estimateHours: 9,
    });
    expect(updated.title).toBe('Edited through HTTP');
    expect(updated.estimateHours).toBe(9);
    await updateTaskStatus(created.id, 'done');
    const matching = await getTasks({
      search: 'Edited through HTTP',
      status: 'done',
      project: 'Workspace',
      page: 1,
      pageSize: 5,
    });
    expect(matching.total).toBe(1);
    expect(matching.items[0]?.status).toBe('done');
    expect(matching.overview.total).toBe(257);
  });
  it.each([
    ['status', 'In Progress'],
    ['priority', 'High'],
  ] as const)('rejects a display label in the %s wire field', async (key, label) => {
    await expect(http.post('/tasks', { ...draft, [key]: label })).rejects.toMatchObject({
      kind: 'api',
      code: API_ERROR_CODES.TASK_VALIDATION_FAILED,
      status: 422,
      data: { fields: { [key]: expect.any(Array) } },
    });
    await expect(http.get('/tasks', { params: { [key]: label } })).rejects.toMatchObject({
      kind: 'api',
      code: API_ERROR_CODES.INVALID_QUERY,
      status: 400,
      data: { fields: { [key]: expect.any(Array) } },
    });
  });
  it('keeps malformed request codes separate from validation and not-found codes', async () => {
    await expect(http.patch('/tasks/VD-138', [])).rejects.toMatchObject({
      kind: 'api',
      code: API_ERROR_CODES.INVALID_REQUEST,
      status: 400,
    });
    await expect(http.get('/tasks', { params: { page: 'invalid' } })).rejects.toMatchObject({
      kind: 'api',
      code: API_ERROR_CODES.INVALID_QUERY,
      status: 400,
    });
    await expect(
      prepareHandoff({
        title: 'Invalid scope',
        projectId: 'workspace',
        date: '2026-10-06',
        time: '10:00',
        taskIds: ['VD-137'],
        audience: 'team',
        notes: '',
        confirmed: true,
      }),
    ).rejects.toMatchObject({
      kind: 'api',
      code: API_ERROR_CODES.HANDOFF_SCOPE_INVALID,
      status: 422,
    });
  });
  it('queries search/filter/sort/pagination on the backend', async () => {
    const first = await getTasks({
      sortBy: 'estimateHours',
      sortDirection: 'descending',
      page: 1,
      pageSize: 3,
    });
    const second = await getTasks({
      sortBy: 'estimateHours',
      sortDirection: 'descending',
      page: 2,
      pageSize: 3,
    });
    expect(first.items.map((task) => task.estimateHours)).toEqual([40, 40, 40]);
    expect(second.page).toBe(2);
    expect(second.items.every((task) => !first.items.some((item) => item.id === task.id))).toBe(
      true,
    );
    expect(
      (
        await getTasks({ assignee: 'nina', priority: 'urgent', createdFrom: '2026-09-23' })
      ).items.map((task) => task.id),
    ).toEqual(['VD-138']);
    expect((await getTasks({ search: 'no matching task' })).total).toBe(0);
    expect(
      (await getTasks({ due: 'overdue', createdFrom: '2026-09-23' })).items.map((task) => task.id),
    ).toEqual(['VD-129']);
    expect(
      (await getTasks({ minimumHours: '20', createdFrom: '2026-09-23' })).items.map(
        (task) => task.id,
      ),
    ).toEqual(['VD-123']);
  });
  it('returns API validation and not-found errors with field and tracing metadata', async () => {
    try {
      await createTask({ ...draft, title: '' });
      throw new Error('Expected rejection');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error).toMatchObject({
        kind: 'api',
        code: API_ERROR_CODES.TASK_VALIDATION_FAILED,
        status: 422,
        data: { fields: { title: expect.any(Array) } },
        requestId: expect.any(String),
        traceparent: expect.stringMatching(/^00-/),
      });
    }
    await expect(getTask('missing')).rejects.toMatchObject({
      kind: 'api',
      code: API_ERROR_CODES.TASK_NOT_FOUND,
      status: 404,
      data: { detail: 'Task not found' },
    });
    expect((await getTasks()).total).toBe(256);
  });
  it('loads projects/metadata/analytics and persists profile patches through HTTP', async () => {
    const [projects, metadata, analytics, profile] = await Promise.all([
      getProjects(),
      getTaskMetadata(),
      getAnalyticsOverview(),
      getProfile(),
    ]);
    expect(projects).toHaveLength(4);
    expect(metadata.members).toHaveLength(4);
    expect(analytics.trendPoints).toHaveLength(14);
    const saved = await updateProfile({ name: 'Remote profile', digest: false });
    expect(saved.name).toBe('Remote profile');
    expect(saved.headline).toBe(profile.headline);
    expect((await getProfile()).digest).toBe(false);
    await expect(updateProfile({ focusProject: 'missing' })).rejects.toMatchObject({
      code: API_ERROR_CODES.PROFILE_VALIDATION_FAILED,
      status: 422,
      data: { fields: { focusProject: expect.any(Array) } },
    });
    const task = await createTask(draft);
    await updateTaskStatus(task.id, 'done');
    const workplace = await getWorkplaceOverview();
    expect(workplace.projectDistribution.reduce((sum, project) => sum + project.count, 0)).toBe(
      workplace.snapshot.openTasks,
    );
    expect(workplace.recentTasks.find((item) => item.id === 'VD-138')).toMatchObject({
      status: 'todo',
      priority: 'urgent',
    });
    expect((await getWorkplaceOverview()).snapshot).toMatchObject({
      activeProjects: 4,
      openTasks: initialTaskState.tasks.filter((item) => item.status !== 'done').length,
      teamMembers: 4,
    });
  });
  it('submits workflow operations to the fake backend', async () => {
    const receipt = await prepareHandoff({
      title: 'Team handoff',
      projectId: 'workspace',
      date: '2026-10-06',
      time: '10:00',
      taskIds: ['VD-128'],
      audience: 'team',
      notes: 'Ready',
      confirmed: true,
    });
    expect(receipt).toMatchObject({ outcome: 'success', kind: 'handoff', taskIds: ['VD-128'] });
    const restricted = await prepareHandoff({
      title: 'External handoff',
      projectId: 'workspace',
      date: '2026-10-06',
      time: '10:00',
      taskIds: ['VD-128'],
      audience: 'external',
      notes: 'Ready',
      confirmed: true,
    });
    expect(restricted.outcome).toBe('error');
  });
  it.each([
    { body: { data: {} }, label: 'invalid envelope' },
    { body: { code: 0, msg: 'ok', data: {} }, label: 'invalid success message' },
    {
      body: { code: 7, msg: 'bad', data: { detail: 'bad', timestamp: 'invalid' } },
      label: 'invalid error metadata',
    },
  ])('rejects $label as an invalid protocol', async ({ body }) => {
    server.use(
      mswHttp.get('/api/v1/protocol', () =>
        HttpResponse.json(body, {
          headers: { 'x-request-id': 'request-7', traceparent: 'trace-7' },
        }),
      ),
    );
    await expect(http.get('/protocol')).rejects.toMatchObject({
      kind: 'protocol',
      status: 200,
      requestId: 'request-7',
      traceparent: 'trace-7',
    });
  });
  it.each([200, 422])(
    'preserves the same business code independently of HTTP %i',
    async (status) => {
      server.use(
        mswHttp.get('/api/v1/business', () =>
          HttpResponse.json(
            {
              code: API_ERROR_CODES.TASK_VALIDATION_FAILED,
              msg: 'Denied',
              data: { detail: 'Permission denied', timestamp: new Date().toISOString() },
            },
            { status },
          ),
        ),
      );
      await expect(http.get('/business')).rejects.toMatchObject({
        kind: 'api',
        code: API_ERROR_CODES.TASK_VALIDATION_FAILED,
        status,
      });
    },
  );
  it('normalizes a non-envelope HTTP error and preserves transport metadata', async () => {
    server.use(
      mswHttp.get(
        '/api/v1/http-error',
        () =>
          new HttpResponse('Bad gateway', {
            status: 502,
            headers: { 'x-request-id': 'gateway-1', traceparent: 'trace-1' },
          }),
      ),
    );
    await expect(http.get('/http-error')).rejects.toMatchObject({
      kind: 'http',
      code: null,
      status: 502,
      requestId: 'gateway-1',
      traceparent: 'trace-1',
    });
  });
  it('distinguishes network failure and cancellation', async () => {
    server.use(
      mswHttp.get('/api/v1/slow', async () => {
        await delay(100);
        return HttpResponse.json({ code: 0, msg: 'success', data: {} });
      }),
      mswHttp.get('/api/v1/offline', () => HttpResponse.error()),
    );
    await expect(http.get('/offline')).rejects.toMatchObject({ kind: 'network' });
    const controller = new AbortController();
    const pending = http.get('/slow', { signal: controller.signal });
    controller.abort();
    await expect(pending).rejects.toMatchObject({ kind: 'cancelled' });
  });
});
