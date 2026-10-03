import { describe, expect, it } from 'vitest';

import {
  emptyDataQuery,
  matchesDataQuery,
  queryError,
  queryFromParams,
  queryParams,
} from './data-query';
import { paginateTasks } from './tasks';
import { initialTaskState } from './tasks.seed';
import { sortTasks } from './tasks.sort';

const find = (overrides: Partial<typeof emptyDataQuery>) =>
  initialTaskState.tasks.filter((task) =>
    matchesDataQuery(task, { ...emptyDataQuery, ...overrides }),
  );

describe('complex task queries', () => {
  it('combines text, ownership, stage, priority, creation dates and estimate', () => {
    expect(
      find({
        search: 'ranking',
        project: 'Discovery',
        assignee: 'leo',
        status: 'In Progress',
        priority: 'High',
        createdFrom: '2026-09-30',
        createdTo: '2026-09-30',
        minimumHours: '12',
      }).map((task) => task.id),
    ).toEqual(['VD-137']);
    expect(find({ project: 'Discovery', assignee: 'leo', minimumHours: '13' })).toEqual([]);
    expect(find({ search: 'Ava Chen' })).toHaveLength(4);
  });
  it('uses inclusive UTC date boundaries independent of browser timezone', () => {
    expect(
      find({ createdFrom: '2026-09-30', createdTo: '2026-09-30' }).map((task) => task.id),
    ).toEqual(['VD-137', 'VD-136']);
    expect(find({ createdFrom: '2026-10-01' }).map((task) => task.id)).toEqual(['VD-138']);
  });
  it('excludes completed work from overdue and due-soon conditions', () => {
    expect(find({ due: 'overdue' }).map((task) => task.id)).toEqual(['VD-129']);
    expect(
      find({ due: 'week' }).every(
        (task) =>
          task.status !== 'Done' && task.dueDate >= '2026-10-02' && task.dueDate <= '2026-10-09',
      ),
    ).toBe(true);
    expect(find({ due: 'unscheduled' }).map((task) => task.id)).toEqual(['VD-134']);
  });
  it('rejects inverted date ranges and invalid estimates', () => {
    expect(
      queryError({ ...emptyDataQuery, createdFrom: '2026-10-03', createdTo: '2026-10-01' }),
    ).toContain('start date');
    for (const minimumHours of ['-1', '1.5', '1000', 'abc'])
      expect(queryError({ ...emptyDataQuery, minimumHours })).toContain('whole number');
    expect(queryError({ ...emptyDataQuery, minimumHours: '0' })).toBe('');
  });
  it('round trips applied conditions through URL history and omits defaults', () => {
    const query = {
      ...emptyDataQuery,
      project: 'Design system',
      search: 'keyboard & focus',
      createdFrom: '2026-09-24',
      minimumHours: '6',
    };
    expect(queryFromParams(queryParams(query))).toEqual(query);
    expect(queryParams(emptyDataQuery).toString()).toBe('');
    expect(queryFromParams(new URLSearchParams('project=Workspace')).project).toBe('Workspace');
  });
  it('ignores invalid URL enum values, dates and estimates', () => {
    expect(
      queryFromParams(
        new URLSearchParams(
          'status=Blocked&priority=Critical&project=Unknown&assignee=unknown&due=yesterday&createdFrom=2026-02-31&createdTo=not-a-date&minimumHours=-9',
        ),
      ),
    ).toEqual(emptyDataQuery);
  });
  it('rejects impossible dates before a query is applied', () => {
    expect(queryError({ ...emptyDataQuery, createdFrom: '2026-02-31' })).toContain(
      'valid creation dates',
    );
  });
  it('sorts the entire matching set before pagination', () => {
    const matching = sortTasks(find({ project: 'Workspace' }), {
      column: 'estimateHours',
      direction: 'descending',
    });
    expect(paginateTasks(matching, 1, 2).tasks.map((task) => task.estimateHours)).toEqual([16, 8]);
    expect(paginateTasks(matching, 3, 2).tasks.map((task) => task.estimateHours)).toEqual([3, 1]);
    expect(paginateTasks(matching, 99, 5).page).toBe(2);
  });
});
