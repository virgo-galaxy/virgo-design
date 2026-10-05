import { describe, expect, it } from 'vitest';

import { initialTaskState } from '@/mock/fixtures/tasks';

import { sortTasks } from './tasks.sort';

describe('task sorting', () => {
  it('sorts hours numerically across the full set without mutating data, and restores order on cancel', () => {
    const base = initialTaskState.tasks[0]!;
    const rows = [2, 12, 1, 0, 24].map((estimateHours) => ({ ...base, estimateHours }));
    expect(
      sortTasks(rows, { column: 'estimateHours', direction: 'ascending' }).map(
        (task) => task.estimateHours,
      ),
    ).toEqual([0, 1, 2, 12, 24]);
    expect(
      sortTasks(rows, { column: 'estimateHours', direction: 'descending' }).map(
        (task) => task.estimateHours,
      ),
    ).toEqual([24, 12, 2, 1, 0]);
    expect(rows.map((task) => task.estimateHours)).toEqual([2, 12, 1, 0, 24]);
    expect(sortTasks(rows, null)).toEqual(rows);
    expect(sortTasks(rows, { column: 'estimateHours', direction: 'none' })).toEqual(rows);
  });
  it.each(['ascending', 'descending'] as const)(
    'puts empty due dates last in %s and keeps equal dates stable',
    (direction) => {
      const base = initialTaskState.tasks[0]!;
      const rows = [
        { ...base, id: 'a', dueDate: '2026-10-09' },
        { ...base, id: 'b', dueDate: '' },
        { ...base, id: 'c', dueDate: '2026-10-09' },
        { ...base, id: 'd', dueDate: '2026-10-01' },
      ];
      expect(sortTasks(rows, { column: 'dueDate', direction }).map((task) => task.id)).toEqual(
        direction === 'ascending' ? ['d', 'a', 'c', 'b'] : ['a', 'c', 'd', 'b'],
      );
    },
  );
  it('sorts creation timestamps chronologically, including same-day times and offsets', () => {
    const base = initialTaskState.tasks[0]!;
    const rows = [
      { ...base, id: 'a', createdAt: '2026-10-01T08:00:00Z' },
      { ...base, id: 'b', createdAt: '2026-10-01T12:00:00+08:00' },
      { ...base, id: 'c', createdAt: '2026-10-01T04:00:00Z' },
    ];
    expect(
      sortTasks(rows, { column: 'createdAt', direction: 'ascending' }).map((task) => task.id),
    ).toEqual(['b', 'c', 'a']);
    expect(
      sortTasks(rows, { column: 'createdAt', direction: 'descending' }).map((task) => task.id),
    ).toEqual(['a', 'b', 'c']);
  });
});

it.each(['ascending', 'descending'] as const)(
  'sorts completion timestamps in %s with incomplete tasks last',
  (direction) => {
    const base = initialTaskState.tasks[0]!;
    const rows = [
      { ...base, id: 'a', completedAt: '2026-10-01T08:00:00Z' },
      { ...base, id: 'b', completedAt: null },
      { ...base, id: 'c', completedAt: '2026-10-01T12:00:00+08:00' },
    ];
    expect(sortTasks(rows, { column: 'completedAt', direction }).map((task) => task.id)).toEqual(
      direction === 'ascending' ? ['c', 'a', 'b'] : ['a', 'c', 'b'],
    );
  },
);
