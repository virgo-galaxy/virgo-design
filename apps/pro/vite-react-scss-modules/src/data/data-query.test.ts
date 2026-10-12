import { describe, expect, it } from 'vitest';

import { taskAssignees, taskReferenceDate } from '@/mock/fixtures/tasks';
import { initialTaskState } from '@/mock/fixtures/tasks';

import {
  type DataQuery,
  emptyDataQuery,
  matchesDataQuery,
  queryError,
  queryFromParams,
  queryParams,
} from './data-query';
import { paginateTasks } from './tasks';
import { sortTasks } from './tasks.sort';

// A small deterministic query fixture isolates date/filter semantics from demo content.
const queryTasks = [
  {
    ...initialTaskState.tasks[0]!,
    id: '49e7996a-311b',
    title: 'Store planning',
    status: 'todo' as const,
    assignee: 'ava',
    createdAt: '2026-10-01T03:20:00Z',
    estimateHours: 16,
    dueDate: '2026-10-06',
  },
  {
    ...initialTaskState.tasks[0]!,
    id: 'abb01fb9-ab2f',
    title: 'Search ranking',
    project: 'Inventory System',
    module: 'inventory-system-1',
    assignee: 'leo',
    status: 'in_progress' as const,
    priority: 'high' as const,
    createdAt: '2026-09-30T06:30:00Z',
    estimateHours: 12,
    dueDate: '2026-10-07',
  },
  {
    ...initialTaskState.tasks[0]!,
    id: '0d78a608-2543',
    title: 'Review activation',
    createdAt: '2026-09-30T02:10:00Z',
    estimateHours: 8,
    dueDate: '2026-10-12',
  },
  {
    ...initialTaskState.tasks[0]!,
    id: 'd109b2a6-196b',
    title: 'Plan saved views',
    createdAt: '2026-09-29T03:40:00Z',
    estimateHours: 3,
    dueDate: '',
  },
  {
    ...initialTaskState.tasks[0]!,
    id: 'b9f45231-7bd0',
    title: 'Overdue work',
    createdAt: '2026-09-24T03:40:00Z',
    estimateHours: 1,
    dueDate: '2026-10-01',
  },
  {
    ...initialTaskState.tasks[0]!,
    id: 'completed',
    title: 'Delivered work',
    status: 'done' as const,
    createdAt: '2026-09-28T03:40:00Z',
    estimateHours: 6,
    dueDate: '2026-10-02',
  },
];
const find = (overrides: Partial<typeof emptyDataQuery>) =>
  queryTasks.filter((task) =>
    matchesDataQuery(task, { ...emptyDataQuery, ...overrides }, taskAssignees, taskReferenceDate),
  );

describe('complex task queries', () => {
  it('combines text, ownership, stage, priority, creation dates and estimate', () => {
    expect(
      find({
        search: 'ranking',
        project: 'Inventory System',
        module: 'inventory-system-1',
        assignee: 'leo',
        status: 'in_progress',
        priority: 'high',
        createdFrom: '2026-09-30',
        createdTo: '2026-09-30',
        minimumHours: '12',
      }).map((task) => task.id),
    ).toEqual(['abb01fb9-ab2f']);
    expect(
      find({
        project: 'Inventory System',
        module: 'inventory-system-1',
        assignee: 'leo',
        minimumHours: '13',
        createdFrom: '2026-09-23',
      }),
    ).toEqual([]);
    expect(find({ search: 'Anika Rao' })).toHaveLength(
      queryTasks.filter((task) => task.assignee === 'ava').length,
    );
  });
  it('round trips multiple conditions through URL history and combines values within a field', () => {
    const query: DataQuery = {
      ...emptyDataQuery,
      status: ['todo', 'in_progress'],
      priority: ['high', 'urgent'],
      project: ['Online Store', 'Inventory System'],
      assignee: ['ava', 'leo'],
      due: ['overdue', 'unscheduled'],
    };
    const params = queryParams(query);
    expect(params.getAll('status')).toEqual(['todo', 'in_progress']);
    expect(queryFromParams(params)).toEqual(query);
    expect(find(query)).toEqual(
      queryTasks.filter(
        (task) =>
          ['todo', 'in_progress'].includes(task.status) &&
          ['high', 'urgent'].includes(task.priority) &&
          ['Online Store', 'Inventory System'].includes(task.project) &&
          ['ava', 'leo'].includes(task.assignee) &&
          (!task.dueDate || task.dueDate < taskReferenceDate),
      ),
    );
    expect(queryParams({ ...emptyDataQuery, status: [], due: [] }).toString()).toBe('');
  });
  it('uses inclusive UTC date boundaries independent of browser timezone', () => {
    expect(
      find({ createdFrom: '2026-09-30', createdTo: '2026-09-30' }).map((task) => task.id),
    ).toEqual(['abb01fb9-ab2f', '0d78a608-2543']);
    expect(find({ createdFrom: '2026-10-01' }).map((task) => task.id)).toEqual(['49e7996a-311b']);
  });
  it('excludes completed work from overdue and due-soon conditions', () => {
    expect(find({ due: 'overdue', createdFrom: '2026-09-23' }).map((task) => task.id)).toEqual([
      'b9f45231-7bd0',
    ]);
    expect(
      find({ due: 'week' }).every(
        (task) =>
          task.status !== 'done' &&
          task.dueDate >= taskReferenceDate &&
          task.dueDate <= '2026-10-12',
      ),
    ).toBe(true);
    expect(find({ due: 'unscheduled', createdFrom: '2026-09-23' }).map((task) => task.id)).toEqual([
      'd109b2a6-196b',
    ]);
  });
  it('rejects inverted date ranges and invalid estimates', () => {
    expect(
      queryError({ ...emptyDataQuery, createdFrom: '2026-10-03', createdTo: '2026-10-01' }),
    ).toBe('dateOrder');
    for (const minimumHours of ['-1', '1.5', '1000', 'abc'])
      expect(queryError({ ...emptyDataQuery, minimumHours })).toBe('invalidEstimate');
    expect(queryError({ ...emptyDataQuery, minimumHours: '0' })).toBe('');
  });
  it('round trips applied conditions through URL history and omits defaults', () => {
    const query = {
      ...emptyDataQuery,
      project: 'Booking System',
      module: 'booking-system-1',
      status: 'in_review' as const,
      priority: 'high' as const,
      search: 'keyboard & focus',
      createdFrom: '2026-09-24',
      minimumHours: '6',
    };
    expect(queryFromParams(queryParams(query))).toEqual(query);
    expect(queryParams(query).get('status')).toBe('in_review');
    expect(queryParams(query).get('priority')).toBe('high');
    expect(queryParams(emptyDataQuery).toString()).toBe('');
    expect(queryFromParams(new URLSearchParams('project=Online+Store')).project).toBe(
      'Online Store',
    );
  });
  it('ignores invalid enums, dates and estimates while preserving backend-owned catalog IDs', () => {
    expect(
      queryFromParams(
        new URLSearchParams(
          'status=Blocked&priority=Critical&project=Unknown&assignee=unknown&due=yesterday&createdFrom=2026-02-31&createdTo=not-a-date&minimumHours=-9',
        ),
      ),
    ).toEqual({ ...emptyDataQuery, project: 'Unknown', assignee: 'unknown' });
  });
  it('rejects impossible dates before a query is applied', () => {
    expect(queryError({ ...emptyDataQuery, createdFrom: '2026-02-31' })).toBe('invalidDates');
  });
  it('sorts the entire matching set before pagination', () => {
    const matching = sortTasks(
      find({ project: 'Online Store', module: 'online-store-1', createdFrom: '2026-09-23' }),
      {
        column: 'estimateHours',
        direction: 'descending',
      },
    );
    expect(paginateTasks(matching, 1, 2).tasks.map((task) => task.estimateHours)).toEqual([16, 8]);
    expect(paginateTasks(matching, 3, 2).tasks.map((task) => task.estimateHours)).toEqual([1]);
    expect(paginateTasks(matching, 99, 5).page).toBe(1);
  });
});
