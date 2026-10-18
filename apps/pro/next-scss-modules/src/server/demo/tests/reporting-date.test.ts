// @vitest-environment jsdom
import { afterEach, expect, it, vi } from 'vitest';

afterEach(() => vi.resetModules());

it('keeps task, project and reporting APIs aligned when an already loaded demo advances several years', async () => {
  vi.setSystemTime(new Date('2031-12-31T12:00:00Z'));
  vi.resetModules();

  const { setupServer } = await import('msw/node');
  const { handlers } = await import('@/test/demo-handlers');
  const { resetSession } = await import('@/test/demo-session');
  const { resetDemoState } = await import('../data/store');
  const { getProjects } = await import('@/api/projects');
  const { getTasks, getTaskMetadata } = await import('@/api/tasks');
  const { getTokenUsageReport } = await import('@/api/analytics');
  const server = setupServer(...handlers);

  server.listen({ onUnhandledRequest: 'error' });

  try {
    resetSession();
    resetDemoState();
    const previousTasks = await getTasks();
    const previousProjects = await getProjects();

    vi.setSystemTime(new Date('2036-03-01T12:00:00Z'));
    resetSession();

    const tasks = await getTasks();
    const projects = await getProjects();
    const metadata = await getTaskMetadata();
    const report = await getTokenUsageReport();

    expect(metadata.referenceDate).toBe('2036-03-01');
    expect(report.referenceDate).toBe(metadata.referenceDate);
    expect(report.reportingYears).toEqual([2035, 2036]);
    expect(tasks.items[0]!.id).toBe(previousTasks.items[0]!.id);
    expect(tasks.items[0]!.createdAt).not.toBe(previousTasks.items[0]!.createdAt);
    expect(tasks.items.every((task) => task.createdAt >= '2035-01-01')).toBe(true);
    expect(projects[0]!.due).not.toBe(previousProjects[0]!.due);
    expect(projects[0]!.due).toBe('2036-03-16');
    expect(projects[0]!.milestones[1]!.date).toBe('2036-03-05');
  } finally {
    server.close();
  }
});

it.each(['2031-01-01', '2032-02-29'])(
  'generates coherent demo history through %s with current years and populated personal usage',
  async (today) => {
    vi.setSystemTime(new Date(`${today}T12:00:00Z`));
    vi.resetModules();

    const { getDemoState, resetDemoState } = await import('../data/store');
    const { projects } = await import('../fixtures/projects');
    const { users } = await import('../fixtures/team');
    const { reportingYears } = await import('../model/task-records');

    resetDemoState();
    const state = getDemoState();
    const year = Number(today.slice(0, 4));
    const currentRecords = state.records.filter((record) => record.recordedAt.startsWith(today));

    expect(reportingYears(state.records, today)).toEqual([year - 1, year]);
    expect(new Set(currentRecords.map((record) => record.userId))).toEqual(
      new Set(users.map((user) => user.id)),
    );
    expect(state.records.every((record) => record.recordedAt.slice(0, 10) <= today)).toBe(true);
    expect(projects.every((project) => project.start < today && project.due > today)).toBe(true);
    expect(
      state.tasks.every(
        (task) =>
          task.createdAt.slice(0, 10) <= today &&
          (!task.completedAt || task.createdAt < task.completedAt),
      ),
    ).toBe(true);
    expect(getDemoState().records).toEqual(state.records);
  },
);

it('advances untouched demo tasks and receipts while preserving saved edits, deletions and actual operations', async () => {
  vi.setSystemTime(new Date('2031-12-31T12:00:00Z'));
  vi.resetModules();

  const { getDemoState, resetDemoState, updateDemoState } = await import('../data/store');
  const { createTaskHistory } = await import('../fixtures/task-history');
  const { createProjects } = await import('../fixtures/projects');

  resetDemoState();
  const original = getDemoState();
  const receipt = {
    ...original.records[0]!,
    taskId: original.tasks[1]!.id,
    id: 'record-saved-operation',
    recordedAt: '2031-12-31T11:00:00.000Z',
    kind: 'updated' as const,
  };

  updateDemoState((state) => ({
    ...state,
    tasks: state.tasks
      .slice(1)
      .map((task, index) =>
        index === 0 ? { ...task, title: 'Keep this edit', dueDate: '2032-01-10' } : task,
      ),
    profile: { ...state.profile, name: 'Keep this profile' },
    notifications: state.notifications.map((item) => ({ ...item, readAt: receipt.recordedAt })),
    records: [...state.records, receipt],
    workflows: {
      ...state.workflows,
      success: {
        ...state.workflows.success,
        reference: 'HOF-101',
        recordedAt: receipt.recordedAt,
        schedule: '2032-01-10T10:00:00+08:00',
      },
    },
  }));

  const saved = structuredClone(getDemoState());
  expect(localStorage.getItem('virgo-pro.demo-data')).toBeNull();

  vi.setSystemTime(new Date('2032-01-02T12:00:00Z'));
  const expectedTasks = new Map(createTaskHistory().map((task) => [task.id, task]));
  const expectedProjects = createProjects();

  expect(expectedProjects.every((project) => project.start >= '2031-01-01')).toBe(true);
  expect(expectedProjects[0]!.due).toBe('2032-01-17');
  expect(expectedProjects[0]!.milestones[1]!.date).toBe('2032-01-06');

  {
    const current = getDemoState();
    expect(current.tasks[0]).toEqual(saved.tasks[0]);
    expect(current.tasks.some((task) => task.id === original.tasks[0]!.id)).toBe(false);
    expect(current.tasks.slice(1)).toEqual(
      saved.tasks.slice(1).map((task) => expectedTasks.get(task.id)),
    );
    expect(current.tasks[1]!.dueDate).not.toBe(saved.tasks[1]!.dueDate);
    expect(current.profile).toEqual(saved.profile);
    expect(current.notifications.every((item) => item.readAt === receipt.recordedAt)).toBe(true);
    expect(current.notifications.find((item) => item.id === 'welcome-admin')?.createdAt).toBe(
      '2032-01-02T00:00:00Z',
    );
    expect(current.workflows.success).toEqual(saved.workflows.success);
    expect(current.workflows.error.schedule?.slice(0, 10)).toBe('2032-01-03');
    expect(current.records.filter((record) => !record.id.startsWith('seed-'))).toEqual([receipt]);
    const refreshed = current.tasks[1]!;
    expect(
      current.records.find((record) => record.id === `seed-${refreshed.id}-created`)?.recordedAt,
    ).toBe(refreshed.createdAt);
    expect(current.records).toContainEqual(receipt);
    expect(current.records.some((record) => record.recordedAt.startsWith('2032-01-02'))).toBe(true);
    expect(new Set(current.records.map((record) => record.id)).size).toBe(current.records.length);
  }
});
