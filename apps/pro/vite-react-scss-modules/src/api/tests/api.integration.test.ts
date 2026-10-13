// @vitest-environment jsdom
import { delay, http as mswHttp, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { API_ERROR_CODES } from '@/contracts/gateway/error-codes';
import { getAllTasks } from '@/features/tasks';
import { http, HttpError } from '@/lib/http';
import { createMockTaskId } from '@/mock/fixtures/task-id';
import { initialTaskState, taskReferenceDate } from '@/mock/fixtures/tasks';
import { handlers } from '@/mock/handlers';
import { resetProfile } from '@/mock/handlers/profile';
import { resetTasks } from '@/mock/handlers/tasks';

import { getAnalyticsOverview, getWorkplaceOverview } from '../analytics';
import { getProfile, updateProfile } from '../profile';
import { getProjects } from '../projects';
import {
  createTask,
  deleteTasks,
  getTask,
  getTaskMetadata,
  getTasks,
  TASK_PRIORITY_CODES,
  TASK_STATUS_CODES,
  updateTask,
  updateTaskStatus,
} from '../tasks';
import { prepareHandoff } from '../workflows';
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
  project: 'online-store',
  module: 'online-store-1',
  assignee: 'ava',
  dueDate: '2026-10-06',
  estimateHours: 3,
};
describe('consumer → API → Axios → MSW', () => {
  it('combines multi-value filters as OR within a field and AND across fields, including all-page export', async () => {
    const query = {
      status: ['todo', 'in_progress'] as const,
      priority: ['high', 'urgent'] as const,
      project: ['online-store', 'inventory-system'],
      assignee: ['ava', 'leo'],
    };
    const expected = initialTaskState.tasks.filter(
      (task) =>
        query.status.some((status) => task.status === status) &&
        query.priority.some((priority) => task.priority === priority) &&
        query.project.includes(task.project) &&
        query.assignee.includes(task.assignee),
    );
    const result = await getTasks({ ...query, pageSize: 5 });
    expect(result.total).toBe(expected.length);
    expect(result.items).toEqual(expected.slice(0, 5));
    expect(await getAllTasks(query)).toEqual(expected);
    expect((await getTasks({ status: [], priority: [] })).total).toBe(240);
    await expect(getTasks({ status: ['todo', 'invalid'] as never })).rejects.toMatchObject({
      code: API_ERROR_CODES.INVALID_QUERY,
    });
  });
  it('combines multiple due conditions for queries and export', async () => {
    const expected = initialTaskState.tasks.filter(
      (task) => !task.dueDate || (task.status !== 'done' && task.dueDate < taskReferenceDate),
    );
    expect(await getAllTasks({ due: ['overdue', 'unscheduled'] })).toEqual(expected);
    await expect(getTasks({ due: ['overdue', 'invalid'] as never })).rejects.toMatchObject({
      code: API_ERROR_CODES.INVALID_QUERY,
    });
  });
  it('deletes a selected batch atomically, deduplicates IDs and refreshes totals and pagination', async () => {
    const before = await getTasks();
    const ids = before.items.slice(0, 2).map((task) => task.id);
    await expect(deleteTasks({ ids: [ids[0]!, 'unknown'] })).rejects.toMatchObject({
      code: API_ERROR_CODES.TASK_NOT_FOUND,
    });
    expect((await getTasks()).total).toBe(before.total);
    expect(await getTask(ids[0]!)).toEqual(before.items[0]);
    expect(await deleteTasks({ ids: [...ids, ids[0]!] })).toEqual({ deletedIds: ids });
    const after = await getTasks({ pageNum: 100, pageSize: 10 });
    expect(after.total).toBe(before.total - 2);
    expect(after.overview.total).toBe(before.overview.total - 2);
    expect(after.items).toHaveLength(8);
    await expect(getTask(ids[0]!)).rejects.toMatchObject({ code: API_ERROR_CODES.TASK_NOT_FOUND });
    expect((await getAllTasks()).some((task) => ids.includes(task.id))).toBe(false);
    await expect(deleteTasks({ ids: [] })).rejects.toMatchObject({
      code: API_ERROR_CODES.TASK_VALIDATION_FAILED,
    });
    await expect(deleteTasks({ ids: [42] as never })).rejects.toMatchObject({
      code: API_ERROR_CODES.TASK_VALIDATION_FAILED,
    });
    expect((await getTasks()).total).toBe(before.total - 2);
  });
  it('unwraps list data and performs stateful create/detail/edit/status updates', async () => {
    const before = await getTasks({ pageNum: 1, pageSize: 5 });
    expect(before.items).toHaveLength(5);
    expect(before.total).toBe(240);
    const finalPage = await getTasks({ pageNum: 100, pageSize: 10 });
    expect(finalPage.items).toHaveLength(10);
    expect(finalPage.pageNum).toBe(24);
    const allTasks = await getAllTasks({});
    expect(allTasks).toHaveLength(240);
    expect(new Set(allTasks.map((item) => item.id)).size).toBe(240);
    expect(new Set(allTasks.map((item) => item.title)).size).toBe(240);
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
    expect(created.id).toBe(createMockTaskId(initialTaskState.nextId));
    expect(created.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}$/);
    expect(initialTaskState.tasks.map((task) => task.id)).not.toContain(created.id);
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
      project: 'online-store',
      module: 'online-store-1',
      pageNum: 1,
      pageSize: 5,
    });
    expect(matching.total).toBe(1);
    expect(matching.items[0]?.status).toBe('done');
    expect(matching.overview.total).toBe(241);
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
    await expect(http.patch('/tasks/49e7996a-311b', [])).rejects.toMatchObject({
      kind: 'api',
      code: API_ERROR_CODES.INVALID_REQUEST,
      status: 400,
    });
    await expect(http.get('/tasks', { params: { pageNum: 'invalid' } })).rejects.toMatchObject({
      kind: 'api',
      code: API_ERROR_CODES.INVALID_QUERY,
      status: 400,
    });
    await expect(
      prepareHandoff({
        title: 'Invalid scope',
        projectId: 'booking-system',
        date: '2026-10-06',
        time: '10:00',
        taskIds: ['abb01fb9-ab2f'],
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
      pageNum: 1,
      pageSize: 3,
    });
    const second = await getTasks({
      sortBy: 'estimateHours',
      sortDirection: 'descending',
      pageNum: 2,
      pageSize: 3,
    });
    expect(first.items.map((task) => task.estimateHours)).toEqual([12, 12, 12]);
    expect(second.pageNum).toBe(2);
    expect(second.items.every((task) => !first.items.some((item) => item.id === task.id))).toBe(
      true,
    );
    const ownerResult = await getTasks({
      assignee: 'ava',
      priority: 'urgent',
      createdFrom: '2026-10-01',
    });
    expect(ownerResult.items.map((task) => task.id)).toEqual(['49e7996a-311b']);
    expect((await getTasks({ search: 'no matching task' })).total).toBe(0);
    const overdue = await getAllTasks({ due: 'overdue' });
    expect(overdue.length).toBeGreaterThan(0);
    expect(
      overdue.every((task) => task.status !== 'done' && task.dueDate < taskReferenceDate),
    ).toBe(true);
    expect((await getTasks({ minimumHours: '20' })).items).toEqual([]);
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
    expect((await getTasks()).total).toBe(240);
  });
  it('loads projects/metadata/analytics and persists profile patches through HTTP', async () => {
    const [projects, metadata, analytics, profile] = await Promise.all([
      getProjects(),
      getTaskMetadata(),
      getAnalyticsOverview(),
      getProfile(),
    ]);
    expect(projects).toHaveLength(4);
    expect(metadata.members).toHaveLength(24);
    expect(analytics.trendPoints).toHaveLength(14);
    expect(analytics.projectDelivery).toHaveLength(14);
    for (const [index, day] of analytics.projectDelivery.entries()) {
      expect(day.date).toBe(analytics.trendPoints[index]!.date);
      expect(day.deliveries.map((entry) => entry.projectId)).toEqual(
        projects.map((project) => project.id),
      );
      expect(
        day.deliveries.every((entry) => Number.isInteger(entry.completed) && entry.completed >= 0),
      ).toBe(true);
      expect(day.deliveries.reduce((sum, entry) => sum + entry.completed, 0)).toBe(
        analytics.trendPoints[index]!.completed,
      );
    }
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
    expect(workplace.reportingYears).toEqual([2025, 2026]);
    expect(workplace.tokenUsage.length).toBeGreaterThan(1);
    expect(new Set(workplace.tokenUsage.map((day) => day.date)).size).toBe(
      workplace.tokenUsage.length,
    );
    expect(
      workplace.tokenUsage.reduce((sum, day) => sum + day.inputTokens + day.outputTokens, 0),
    ).toBe(
      workplace.tokenRecords.reduce(
        (sum, record) => sum + record.inputTokens + record.outputTokens,
        0,
      ),
    );
    expect(
      workplace.tokenUsage.every(
        (day) =>
          Number.isInteger(day.inputTokens) &&
          Number.isInteger(day.outputTokens) &&
          day.inputTokens >= 0 &&
          day.outputTokens >= 0,
      ),
    ).toBe(true);
    expect(
      workplace.tokenUsage
        .filter((day) => day.date > workplace.snapshot.date)
        .every((day) => day.inputTokens === 0 && day.outputTokens === 0),
    ).toBe(true);
    expect(workplace.projectDistribution.reduce((sum, project) => sum + project.count, 0)).toBe(
      workplace.snapshot.openTasks,
    );
    expect(workplace.recentTasks.find((item) => item.id === '49e7996a-311b')).toMatchObject({
      status: 'todo',
      priority: 'urgent',
    });
    expect((await getWorkplaceOverview()).snapshot).toMatchObject({
      activeProjects: 4,
      openTasks: initialTaskState.tasks.filter((item) => item.status !== 'done').length,
      teamMembers: 24,
    });
  });
  it('submits workflow operations to the fake backend', async () => {
    const receipt = await prepareHandoff({
      title: 'Team handoff',
      projectId: 'online-store',
      date: '2026-10-06',
      time: '10:00',
      taskIds: ['1bbcd880-f5e5'],
      audience: 'team',
      notes: 'Ready',
      confirmed: true,
    });
    expect(receipt).toMatchObject({
      outcome: 'success',
      kind: 'handoff',
      taskIds: ['1bbcd880-f5e5'],
    });
    const restricted = await prepareHandoff({
      title: 'External handoff',
      projectId: 'online-store',
      date: '2026-10-06',
      time: '10:00',
      taskIds: ['1bbcd880-f5e5'],
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

it('combines column search and exact filters before sorting and all-page export', async () => {
  const query = {
    columnFilters: JSON.stringify({ status: ['todo', 'in_progress'] }),
    columnSearch: JSON.stringify({ project: 'store', title: 'main' }),
    sortBy: 'title' as const,
    sortDirection: 'ascending' as const,
  };
  const result = await getTasks(query);
  expect(result.total).toBeGreaterThan(0);
  for (const task of result.items) {
    expect(['todo', 'in_progress']).toContain(task.status);
    expect(task.project.toLowerCase()).toContain('store');
    expect(task.title.toLowerCase()).toContain('main');
  }
  expect(result.items.map((task) => task.title)).toEqual(
    result.items.map((task) => task.title).sort((a, b) => a.localeCompare(b)),
  );
  expect((await getAllTasks(query)).length).toBe(result.total);
  await expect(getTasks({ columnFilters: '{invalid' })).rejects.toThrow();
});

it('records completion once, preserves it on edits, clears it on reopen, and creates completed tasks with a timestamp', async () => {
  const created = await createTask(draft);
  expect(created.completedAt).toBeNull();
  const completed = await updateTaskStatus(created.id, 'done');
  expect(Number.isFinite(Date.parse(completed.completedAt!))).toBe(true);
  expect((await updateTask(created.id, { title: 'Updated completed task' })).completedAt).toBe(
    completed.completedAt,
  );
  expect((await updateTaskStatus(created.id, 'todo')).completedAt).toBeNull();
  const completedOnCreate = await createTask({ ...draft, status: 'done' });
  expect(completedOnCreate.completedAt).toBeTruthy();
  const rows = await getAllTasks({ sortBy: 'completedAt', sortDirection: 'descending' });
  const times = rows
    .filter((task) => task.completedAt)
    .map((task) => Date.parse(task.completedAt!));
  expect(times).toEqual([...times].sort((a, b) => b - a));
  expect(rows.at(-1)?.completedAt).toBeNull();
});
