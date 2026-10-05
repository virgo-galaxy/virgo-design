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

const find = (overrides: Partial<typeof emptyDataQuery>) =>
  initialTaskState.tasks.filter((task) =>
    matchesDataQuery(task, { ...emptyDataQuery, ...overrides }, taskAssignees, taskReferenceDate),
  );

describe('complex task queries', () => {
  it('combines text, ownership, stage, priority, creation dates and estimate', () => {
    expect(
      find({
        search: 'ranking',
        project: 'Discovery',
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
        project: 'Discovery',
        assignee: 'leo',
        minimumHours: '13',
        createdFrom: '2026-09-23',
      }),
    ).toEqual([]);
    expect(find({ search: 'Ava Brooks' })).toHaveLength(
      initialTaskState.tasks.filter((task) => task.assignee === 'ava').length,
    );
  });
  it('round trips multiple conditions through URL history and combines values within a field', () => {
    const query: DataQuery = {
      ...emptyDataQuery,
      status: ['todo', 'in_progress'],
      priority: ['high', 'urgent'],
      project: ['Workspace', 'Discovery'],
      assignee: ['ava', 'leo'],
      due: ['overdue', 'unscheduled'],
    };
    const params = queryParams(query);
    expect(params.getAll('status')).toEqual(['todo', 'in_progress']);
    expect(queryFromParams(params)).toEqual(query);
    expect(find(query)).toEqual(
      initialTaskState.tasks.filter(
        (task) =>
          ['todo', 'in_progress'].includes(task.status) &&
          ['high', 'urgent'].includes(task.priority) &&
          ['Workspace', 'Discovery'].includes(task.project) &&
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
          task.status !== 'done' && task.dueDate >= '2026-10-02' && task.dueDate <= '2026-10-09',
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
      project: 'Design system',
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
    expect(queryFromParams(new URLSearchParams('project=Workspace')).project).toBe('Workspace');
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
    const matching = sortTasks(find({ project: 'Workspace', createdFrom: '2026-09-23' }), {
      column: 'estimateHours',
      direction: 'descending',
    });
    expect(paginateTasks(matching, 1, 2).tasks.map((task) => task.estimateHours)).toEqual([16, 8]);
    expect(paginateTasks(matching, 3, 2).tasks.map((task) => task.estimateHours)).toEqual([3, 1]);
    expect(paginateTasks(matching, 99, 5).page).toBe(2);
  });
});
