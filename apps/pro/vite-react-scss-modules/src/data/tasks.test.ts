import { describe, expect, it } from 'vitest';

import {
  draftHasChanges,
  emptyTaskDraft,
  emptyTaskFilters,
  hasTaskFilters,
  isOverdue,
  matchesTask,
  nextTaskStatus,
  paginateTasks,
  type Task,
  type TaskDraft,
  taskDraft,
  type TaskFilters,
  taskOverview,
  tasksReducer,
  validateTask,
} from './tasks';
import {
  initialTaskState,
  taskAssignees,
  taskProjects,
  taskReferenceDate,
  withTaskEstimates,
} from './tasks.seed';

const draft: TaskDraft = {
  title: 'Review keyboard paths',
  description: 'Check nested panels and return focus.',
  status: 'Todo',
  priority: 'High',
  project: 'Workspace',
  assignee: 'ava',
  dueDate: '2026-10-05',
  estimateHours: 4,
};
const task: Task = { ...draft, id: 'VD-139', createdAt: '2026-10-02T08:00:00Z' };
const visible = (tasks: Task[], filters: TaskFilters) =>
  tasks.filter((item) =>
    matchesTask(
      item,
      filters,
      taskAssignees.find((member) => member.id === item.assignee)?.name ?? '',
    ),
  );
const errors = (value: TaskDraft) =>
  validateTask(
    value,
    taskProjects,
    taskAssignees.map((member) => member.id),
  );

describe('task filters', () => {
  it.each(['keyboard', 'NESTED PANELS', ' vd-139 ', 'Workspace', taskAssignees[0].name])(
    'searches task content and ownership: %s',
    (search) => {
      expect(visible([task], { ...emptyTaskFilters, search })).toEqual([task]);
    },
  );

  it('combines search and every facet with AND semantics', () => {
    const filters: TaskFilters = {
      search: 'keyboard',
      status: 'Todo',
      priority: 'High',
      project: 'Workspace',
      assignee: 'ava',
    };
    expect(visible([task], filters)).toEqual([task]);
    const mismatches: Partial<TaskFilters>[] = [
      { search: 'missing' },
      { status: 'Done' },
      { priority: 'Low' },
      { project: 'Discovery' },
      { assignee: 'leo' },
    ];
    for (const mismatch of mismatches)
      expect(visible([task], { ...filters, ...mismatch })).toEqual([]);
  });

  it('recovers a filtered-empty result by resetting all filters', () => {
    const filters = { ...emptyTaskFilters, search: 'missing' };
    expect(hasTaskFilters(filters)).toBe(true);
    expect(visible(initialTaskState.tasks, filters)).toEqual([]);
    expect(hasTaskFilters(emptyTaskFilters)).toBe(false);
    expect(hasTaskFilters({ ...emptyTaskFilters, search: '   ' })).toBe(false);
    expect(visible(initialTaskState.tasks, emptyTaskFilters)).toHaveLength(16);
  });
});

describe('task pagination', () => {
  it('returns distinct pages and the real range on a partial final page', () => {
    const first = paginateTasks(initialTaskState.tasks, 1, 10);
    const second = paginateTasks(initialTaskState.tasks, 2, 10);
    expect(first.tasks).toEqual(initialTaskState.tasks.slice(0, 10));
    expect(first.range).toEqual([1, 10]);
    expect(second.tasks).toEqual(initialTaskState.tasks.slice(10));
    expect(second.range).toEqual([11, 16]);
    expect(second.pageCount).toBe(2);
    expect(new Set([...first.tasks, ...second.tasks].map((item) => item.id)).size).toBe(16);
  });

  it('paginates filtered data and clamps when the result or page size shrinks the page count', () => {
    const filtered = visible(initialTaskState.tasks, { ...emptyTaskFilters, status: 'Todo' });
    const result = paginateTasks(filtered, 2, 10);
    expect(result.page).toBe(1);
    expect(result.tasks).toEqual(filtered);
    expect(result.range).toEqual([1, filtered.length]);
    expect(paginateTasks(initialTaskState.tasks, 2, 20).page).toBe(1);
    expect(paginateTasks(initialTaskState.tasks, 2, 20).tasks).toHaveLength(16);
    expect(paginateTasks([], 2, 10)).toEqual({ tasks: [], page: 1, pageCount: 1, range: [0, 0] });
  });

  it('includes a created task on page one and preserves an edit on the last page', () => {
    const created = tasksReducer(initialTaskState, {
      type: 'create',
      draft,
      createdAt: task.createdAt,
    });
    expect(paginateTasks(created.tasks, 1, 10).tasks[0]).toEqual(task);
    const last = created.tasks.at(-1)!;
    const edited = tasksReducer(created, {
      type: 'edit',
      id: last.id,
      draft: { ...taskDraft(last), title: 'Edited on page two' },
    });
    expect(paginateTasks(edited.tasks, 2, 10).tasks.at(-1)?.title).toBe('Edited on page two');
    expect(paginateTasks(edited.tasks, 2, 10).range).toEqual([11, 17]);
  });
});

describe('task mutations', () => {
  it('creates a normalized task with a unique ID and updates totals without mutating the seed', () => {
    const before = structuredClone(initialTaskState);
    const state = tasksReducer(initialTaskState, {
      type: 'create',
      draft: { ...draft, title: `  ${draft.title}  `, description: `  ${draft.description}  ` },
      createdAt: task.createdAt,
    });
    expect(state.tasks[0]).toEqual(task);
    expect(state.nextId).toBe(140);
    expect(taskOverview(state.tasks, taskReferenceDate).total).toBe(17);
    expect(taskOverview(state.tasks, taskReferenceDate).dueSoon).toBe(
      taskOverview(before.tasks, taskReferenceDate).dueSoon + 1,
    );
    expect(initialTaskState).toEqual(before);
    expect(
      visible(state.tasks, { ...emptyTaskFilters, search: 'keyboard paths', status: 'Todo' }),
    ).toEqual([task]);
    expect(visible([task], { ...emptyTaskFilters, status: 'Done' })).toEqual([]);
    expect(
      tasksReducer(state, { type: 'create', draft, createdAt: task.createdAt }).tasks[0]?.id,
    ).toBe('VD-140');
  });

  it('edits all fields while preserving identity and creation time, and reapplies filters', () => {
    const edited: TaskDraft = {
      title: 'Ship the accessibility review',
      description: 'All acceptance checks passed.',
      status: 'Done',
      priority: 'Low',
      project: 'Design system',
      assignee: 'eli',
      dueDate: '',
      estimateHours: 8,
    };
    const state = tasksReducer(
      { tasks: [task], nextId: 140 },
      { type: 'edit', id: task.id, draft: edited },
    );
    expect(state.tasks).toEqual([{ ...task, ...edited }]);
    expect(state.nextId).toBe(140);
    expect(task.title).toBe(draft.title);
    expect(visible(state.tasks, { ...emptyTaskFilters, status: 'Todo' })).toEqual([]);
    expect(
      visible(state.tasks, {
        ...emptyTaskFilters,
        status: 'Done',
        project: 'Design system',
        assignee: 'eli',
      }),
    ).toHaveLength(1);
    expect(taskOverview(state.tasks, taskReferenceDate)).toEqual({
      total: 1,
      inProgress: 0,
      dueSoon: 0,
      completed: 1,
    });
  });

  it('advances Todo → In Progress → In Review → Done and synchronizes summary/filter results', () => {
    let state = { tasks: [task], nextId: 140 };
    for (const status of ['In Progress', 'In Review', 'Done'] as const) {
      expect(nextTaskStatus(state.tasks[0]!.status)).toBe(status);
      state = tasksReducer(state, { type: 'status', id: task.id, status });
      expect(state.tasks[0]).toEqual({ ...task, status });
      expect(visible(state.tasks, { ...emptyTaskFilters, status })).toHaveLength(1);
      expect(visible(state.tasks, { ...emptyTaskFilters, status: 'Todo' })).toEqual([]);
      expect(taskOverview(state.tasks, taskReferenceDate).inProgress).toBe(
        status === 'In Progress' ? 1 : 0,
      );
      expect(taskOverview(state.tasks, taskReferenceDate).completed).toBe(
        status === 'Done' ? 1 : 0,
      );
    }
    expect(nextTaskStatus('Done')).toBeUndefined();
    expect(nextTaskStatus('Backlog')).toBe('Todo');
    expect(
      tasksReducer(state, { type: 'status', id: task.id, status: 'Todo' }).tasks[0]?.status,
    ).toBe('Todo');
  });

  it('supports the initial empty workspace and leaves unrelated tasks untouched', () => {
    expect(taskOverview([], taskReferenceDate)).toEqual({
      total: 0,
      inProgress: 0,
      dueSoon: 0,
      completed: 0,
    });
    expect(
      tasksReducer({ tasks: [], nextId: 139 }, { type: 'create', draft, createdAt: task.createdAt })
        .tasks,
    ).toEqual([task]);
    expect(tasksReducer(initialTaskState, { type: 'edit', id: 'unknown', draft }).tasks).toEqual(
      initialTaskState.tasks,
    );
    expect(
      tasksReducer(initialTaskState, { type: 'status', id: 'unknown', status: 'Done' }).tasks,
    ).toEqual(initialTaskState.tasks);
  });
});

describe('validation and dates', () => {
  it('requires a title and valid ownership while allowing optional description/date', () => {
    expect(errors(emptyTaskDraft)).toEqual({
      title: 'titleRequired',
      project: 'projectRequired',
      assignee: 'assigneeRequired',
    });
    expect(
      errors({ ...draft, title: '  ', project: 'unknown', assignee: 'unknown' }),
    ).toHaveProperty('title');
    expect(errors({ ...draft, description: '', dueDate: '' })).toEqual({});
    expect(
      errors({ ...draft, title: 'x'.repeat(121), description: 'x'.repeat(2001) }),
    ).toMatchObject({ title: expect.any(String), description: expect.any(String) });
    expect(errors({ ...draft, title: 'x'.repeat(120), description: 'x'.repeat(2000) })).toEqual({});
  });

  it.each(['2026-02-29', '2026-02-30', '2026-13-01', 'not-a-date', '2026-1-2'])(
    'rejects invalid civil dates: %s',
    (dueDate) => {
      expect(errors({ ...draft, dueDate })).toHaveProperty('dueDate');
    },
  );

  it('accepts leap days and detects changes across all editable fields', () => {
    expect(errors({ ...draft, dueDate: '2028-02-29' })).toEqual({});
    expect(taskDraft(task)).toEqual(draft);
    expect(draftHasChanges(draft, taskDraft(task))).toBe(false);
    expect(draftHasChanges({ ...draft, description: 'Changed' }, taskDraft(task))).toBe(true);
    expect(draftHasChanges({ ...draft, dueDate: '' }, taskDraft(task))).toBe(true);
  });

  it('counts due soon inclusively and excludes overdue, unscheduled and completed work', () => {
    const dates = ['2026-10-01', '2026-10-02', '2026-10-09', '2026-10-10', ''];
    const tasks = dates.map((dueDate, index) => ({ ...task, id: String(index), dueDate }));
    tasks.push({ ...task, id: 'done', status: 'Done', dueDate: '2026-10-03' });
    expect(taskOverview(tasks, taskReferenceDate)).toEqual({
      total: 6,
      inProgress: 0,
      dueSoon: 2,
      completed: 1,
    });
    expect(isOverdue(tasks[0]!, taskReferenceDate)).toBe(true);
    expect(isOverdue({ ...tasks[0]!, status: 'Done' }, taskReferenceDate)).toBe(false);
    expect(isOverdue({ ...task, dueDate: '' }, taskReferenceDate)).toBe(false);
  });

  it('keeps the parity fixture valid, deterministic and clear of future ID collisions', () => {
    expect(new Set(initialTaskState.tasks.map((item) => item.id)).size).toBe(16);
    for (const item of initialTaskState.tasks) {
      expect(errors(item)).toEqual({});
      expect(Number(item.id.slice(3))).toBeLessThan(initialTaskState.nextId);
      expect(Number.isNaN(new Date(item.createdAt).getTime())).toBe(false);
    }
    expect(taskOverview(initialTaskState.tasks, taskReferenceDate)).toEqual({
      total: 16,
      inProgress: 4,
      dueSoon: 10,
      completed: 3,
    });
  });
});

it.each([-1, 1000, 1.5, NaN, Infinity])('rejects invalid estimated hours %s', (estimateHours) => {
  expect(errors({ ...draft, estimateHours })).toHaveProperty('estimateHours');
});
it.each([0, 1, 999])('accepts whole estimated hours %s', (estimateHours) => {
  expect(errors({ ...draft, estimateHours })).toEqual({});
});

it('fills estimates for all existing session tasks while preserving edits and explicit zero', () => {
  const oldTasks = initialTaskState.tasks.map((task) => ({ ...task, estimateHours: undefined }));
  const restored = withTaskEstimates(
    oldTasks.map((task) => ({ ...task, title: 'An edited title' })),
  );
  expect(restored.map((task) => task.estimateHours)).toEqual(
    initialTaskState.tasks.map((task) => task.estimateHours),
  );
  expect(restored.every((task) => task.estimateHours > 0 && task.title === 'An edited title')).toBe(
    true,
  );
  expect(
    withTaskEstimates([{ ...initialTaskState.tasks[0]!, estimateHours: 0 }])[0]?.estimateHours,
  ).toBe(0);
  expect(withTaskEstimates([{ ...oldTasks[0]!, id: 'VD-999' }])[0]?.estimateHours).toBe(0);
});
