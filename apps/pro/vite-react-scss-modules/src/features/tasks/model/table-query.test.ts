import { expect, it } from 'vitest';

import { defaultTableSettings } from '../config/table-settings';
import { emptyTaskQuery } from './query-params';
import {
  reconcileTaskTableQuery,
  taskListQuery,
  taskTableQueryFromParams,
  withTaskFilters,
} from './table-query';

it('recovers from malformed and structural column parameters without sending them to the API', () => {
  const params = new URLSearchParams({
    page: '1.5',
    pageSize: '-20',
    columnFilters: JSON.stringify({ selection: ['a'] }),
    columnSearch: JSON.stringify({ title: 42 }),
    sort: JSON.stringify({ column: 'actions', direction: 'descending' }),
  });
  const state = taskTableQueryFromParams(params);
  expect(state).toMatchObject({
    page: 1,
    pageSize: 10,
    columnFilters: {},
    columnSearch: {},
    sort: null,
  });
  expect(taskListQuery(state, true)).not.toHaveProperty('sortBy');
  expect(taskListQuery(state, true)).not.toHaveProperty('columnFilters');
});

it('replaces business filters and resets pagination while preserving unrelated URL state', () => {
  const params = new URLSearchParams('status=todo&page=4&pageSize=20&returnTo=portfolio');
  const next = withTaskFilters(params, { ...emptyTaskQuery, status: ['in_review', 'done'] });
  expect(next.getAll('status')).toEqual(['in_review', 'done']);
  expect(next.has('page')).toBe(false);
  expect(next.get('pageSize')).toBe('20');
  expect(next.get('returnTo')).toBe('portfolio');
  expect(params.get('page')).toBe('4');
});

it('removes disabled column constraints and incompatible sorting together with a pagination reset', () => {
  const previous = defaultTableSettings();
  const next = defaultTableSettings();
  next.pagination = false;
  const title = next.columns.find((column) => column.key === 'title')!;
  title.visible = false;
  next.columns.find((column) => column.key === 'status')!.controls.sort.mode = 'ascending';
  const params = new URLSearchParams({
    page: '3',
    search: 'release',
    columnFilters: JSON.stringify({ title: ['One'], status: ['todo'] }),
    columnSearch: JSON.stringify({ title: 'one' }),
    sort: JSON.stringify({ column: 'status', direction: 'descending' }),
  });
  const reconciled = reconcileTaskTableQuery(params, previous, next);
  expect(reconciled.get('search')).toBe('release');
  expect(JSON.parse(reconciled.get('columnFilters')!)).toEqual({ status: ['todo'] });
  expect(reconciled.has('columnSearch')).toBe(false);
  expect(reconciled.has('sort')).toBe(false);
  expect(reconciled.has('page')).toBe(false);
});
