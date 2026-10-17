// @vitest-environment jsdom
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, beforeEach, expect, it } from 'vitest';

import { getProjectModuleStats, getProjects, getProjectSummaries } from '@/api/projects';
import { createTask, getTasks, updateTask, updateTaskStatus } from '@/api/tasks';
import { moduleFilterKey, moduleName } from '@/features/catalog';
import { demoStorageKey, getDemoState, unloadDemoState, updateDemoState } from '@/mock/data/store';
import { projects } from '@/mock/fixtures/projects';
import { handlers } from '@/mock/handlers';
import { resetTasks } from '@/mock/handlers/tasks';

import { getTaskCollection } from '../data/queries';
import { canonicalTaskParams } from '../hooks/use-task-search-params';
import { taskDraft } from '../model/task';
const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => resetTasks());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
it('keeps relations and permissions stable through display-name changes and resolves scoped module IDs', async () => {
  const project = projects[0]!;
  const original = project.name;
  try {
    project.name = 'Renamed store';
    const catalog = await getProjects();
    expect((await getTasks({ project: project.id })).total).toBeGreaterThan(0);
    const record = (await getTasks({ project: project.id })).items[0]!;
    expect((await updateTask(record.id, { title: 'After rename' })).project).toBe(project.id);
    expect(catalog.find((item) => item.id === project.id)?.name).toBe('Renamed store');
  } finally {
    project.name = original;
  }
  const firstModule = projects[0]!.modules[0]!;
  const secondModule = projects[1]!.modules[0]!;
  try {
    projects[0]!.modules[0] = { ...firstModule, id: 'shared-module' };
    projects[1]!.modules[0] = { ...secondModule, id: 'shared-module' };
    const template = taskDraft(getDemoState().tasks[0]!);
    for (const project of projects.slice(0, 2))
      await createTask({
        ...template,
        title: 'Scoped module task',
        status: 'todo',
        project: project.id,
        module: 'shared-module',
        assignee: project.owner,
      });
    const first = await getTasks({ module: moduleFilterKey(projects[0]!.id, 'shared-module') });
    expect(first.total).toBe(1);
    expect(first.items.every((task) => task.project === projects[0]!.id)).toBe(true);
    const second = await getTasks({ module: moduleFilterKey(projects[1]!.id, 'shared-module') });
    expect(second.total).toBe(1);
    expect(second.items.every((task) => task.project === projects[1]!.id)).toBe(true);
  } finally {
    projects[0]!.modules[0] = firstModule;
    projects[1]!.modules[0] = secondModule;
  }
  const catalog = structuredClone(projects);
  catalog[0]!.modules[0] = { id: 'shared-module', name: 'Store module' };
  catalog[1]!.modules[0] = { id: 'shared-module', name: 'Booking module' };
  expect(moduleName(catalog[0]!.id, 'shared-module', catalog)).toBe('Store module');
  expect(moduleName(catalog[1]!.id, 'shared-module', catalog)).toBe('Booking module');
  expect(moduleFilterKey(catalog[0]!.id, 'shared-module')).not.toBe(
    moduleFilterKey(catalog[1]!.id, 'shared-module'),
  );
  expect(
    canonicalTaskParams(
      new URLSearchParams('project=Online+Store&module=online-store-1'),
      projects,
    ).getAll('module'),
  ).toEqual([moduleFilterKey('online-store', 'online-store-1')]);
});
it('serves bounded project summaries and synchronizes them with real saved completion', async () => {
  const before = (await getProjectSummaries('online-store'))[0]!;
  expect(
    (await getTasks({ project: 'online-store', pageSize: 8 })).items.length,
  ).toBeLessThanOrEqual(8);
  const task = (await getTasks({ project: 'online-store', status: 'todo' })).items[0]!;
  await updateTaskStatus(task.id, 'done');
  const after = (await getProjectSummaries('online-store'))[0]!;
  expect(after.completed).toBe(before.completed + 1);
  expect(after.open).toBe(before.open - 1);
  expect(
    (await getProjectModuleStats('online-store')).reduce((total, item) => total + item.total, 0),
  ).toBe(after.total);
});
it('migrates version-2 name associations without losing task edits or history', () => {
  const saved = structuredClone(getDemoState());
  saved.tasks[0]!.title = 'Local edited title';
  for (const entries of [saved.tasks, saved.records, saved.notifications])
    for (const entry of entries)
      entry.project =
        projects.find((project) => project.id === entry.project)?.name ?? entry.project;
  localStorage.setItem(demoStorageKey, JSON.stringify({ version: 2, state: saved }));
  unloadDemoState();
  const loaded = getDemoState();
  expect(loaded.tasks[0]!.title).toBe('Local edited title');
  expect(loaded.tasks[0]!.project).toBe('online-store');
  expect(loaded.records.map((record) => record.id)).toEqual(
    saved.records.map((record) => record.id),
  );
  expect(
    loaded.records.every((record) => projects.some((project) => project.id === record.project)),
  ).toBe(true);
});
it('reads an immutable snapshot with at most three active page requests during concurrent mutation', async () => {
  const template = getDemoState().tasks[0]!;
  updateDemoState((state) => ({
    ...state,
    tasks: Array.from({ length: 801 }, (_, index) => ({ ...template, id: `snapshot-${index}` })),
  }));
  let active = 0,
    max = 0,
    mutated = false;
  server.use(
    http.get('/api/v1/tasks', async ({ request }) => {
      const params = new URL(request.url).searchParams;
      if (params.get('snapshot') === 'create') return undefined;
      active++;
      max = Math.max(max, active);
      if (!mutated) {
        mutated = true;
        updateDemoState((state) => ({ ...state, tasks: state.tasks.slice(1) }));
      }
      await delay(20);
      active--;
      return undefined;
    }),
  );
  const data = await getTaskCollection();
  expect(data.total).toBe(801);
  expect(data.items.map((task) => task.id)).toEqual(
    Array.from({ length: 801 }, (_, index) => `snapshot-${index}`),
  );
  expect(max).toBe(3);
  expect(getDemoState().tasks).toHaveLength(800);
});
it('rejects an expired snapshot and never silently returns a partial collection', async () => {
  const first = await getTasks({ snapshot: 'create', pageSize: 100 });
  expect(first.snapshotId).toBeTruthy();
  await expect(getTasks({ snapshot: 'missing-snapshot', pageNum: 2 })).rejects.toMatchObject({
    status: 409,
  });
  server.use(
    http.get('/api/v1/tasks', () =>
      HttpResponse.json({ code: 0, msg: 'success', data: { ...first, snapshotId: undefined } }),
    ),
  );
  await expect(getTaskCollection()).rejects.toThrow('consistent server snapshot');
});
it('creates normalized records through the current API and manages completion timestamps', async () => {
  const draft = taskDraft(getDemoState().tasks[0]!);
  const created = await createTask({ ...draft, status: 'todo', title: '  Normalized task  ' });
  expect(created.title).toBe('Normalized task');
  expect(created.completedAt).toBeNull();
  const completed = await updateTaskStatus(created.id, 'done');
  expect(completed.completedAt).toBeTruthy();
  expect((await updateTask(created.id, { title: 'Edited after completion' })).completedAt).toBe(
    completed.completedAt,
  );
  expect((await updateTaskStatus(created.id, 'todo')).completedAt).toBeNull();
});
