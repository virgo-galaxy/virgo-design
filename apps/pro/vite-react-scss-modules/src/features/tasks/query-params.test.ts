import { describe, expect, it } from 'vitest';

import {
  emptyTaskQuery,
  queryError,
  queryFromParams,
  queryParams,
  type TaskQuery,
} from '@/features/tasks/query-params';

describe('complex task queries', () => {
  it('round trips multiple conditions through URL history and combines values within a field', () => {
    const query: TaskQuery = {
      ...emptyTaskQuery,
      status: ['todo', 'in_progress'],
      priority: ['high', 'urgent'],
      project: ['Online Store', 'Inventory System'],
      assignee: ['ava', 'leo'],
      due: ['overdue', 'unscheduled'],
    };
    const params = queryParams(query);
    expect(params.getAll('status')).toEqual(['todo', 'in_progress']);
    expect(queryFromParams(params)).toEqual(query);
    expect(queryParams({ ...emptyTaskQuery, status: [], due: [] }).toString()).toBe('');
  });
  it('rejects inverted date ranges and invalid estimates', () => {
    expect(
      queryError({ ...emptyTaskQuery, createdFrom: '2026-10-03', createdTo: '2026-10-01' }),
    ).toBe('dateOrder');
    for (const minimumHours of ['-1', '1.5', '1000', 'abc'])
      expect(queryError({ ...emptyTaskQuery, minimumHours })).toBe('invalidEstimate');
    expect(queryError({ ...emptyTaskQuery, minimumHours: '0' })).toBe('');
  });
  it('round trips applied conditions through URL history and omits defaults', () => {
    const query = {
      ...emptyTaskQuery,
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
    expect(queryParams(emptyTaskQuery).toString()).toBe('');
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
    ).toEqual({ ...emptyTaskQuery, project: 'Unknown', assignee: 'unknown' });
  });
  it('rejects impossible dates before a query is applied', () => {
    expect(queryError({ ...emptyTaskQuery, createdFrom: '2026-02-31' })).toBe('invalidDates');
  });
});
