import type { TaskListQuery } from '@/contracts/tasks';
import { isRecord } from '@/lib/validation/is-record';

import { emptyTaskQuery, queryFromParams, queryParams, type TaskQuery } from './query-params';
import type { TaskSort } from './sort';
import {
  defaultTaskPageSize,
  taskColumnKeys,
  type TaskDataColumn,
  type TaskTableSettings,
} from './table-settings';
import { filterValues, hasTaskFilters } from './task';

export type TaskColumnFilters = Partial<Record<TaskDataColumn, string[]>>;
export type TaskColumnSearch = Partial<Record<TaskDataColumn, string>>;

function readJson<T>(
  value: string | null,
  fallback: T,
  validate: (value: Record<string, unknown>) => boolean,
): T {
  try {
    const parsed: unknown = JSON.parse(value ?? 'null');

    return isRecord(parsed) && validate(parsed) ? (parsed as T) : fallback;
  } catch {
    return fallback;
  }
}

function isDataColumn(value: unknown): value is TaskDataColumn {
  return (
    taskColumnKeys.some((column) => column === value) &&
    !['selection', 'rowNumber', 'actions'].includes(String(value))
  );
}

export function taskTableQueryFromParams(params: URLSearchParams) {
  const requestedPage = Number(params.get('page'));
  const requestedPageSize = Number(params.get('pageSize'));

  return {
    filters: queryFromParams(params),
    page: Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1,
    pageSize:
      Number.isSafeInteger(requestedPageSize) && requestedPageSize > 0 && requestedPageSize <= 100
        ? requestedPageSize
        : defaultTaskPageSize,
    columnFilters: readJson<TaskColumnFilters>(params.get('columnFilters'), {}, (value) =>
      Object.entries(value).every(
        ([key, items]) =>
          isDataColumn(key) &&
          Array.isArray(items) &&
          items.every((item) => typeof item === 'string'),
      ),
    ),
    columnSearch: readJson<TaskColumnSearch>(params.get('columnSearch'), {}, (value) =>
      Object.entries(value).every(([key, item]) => isDataColumn(key) && typeof item === 'string'),
    ),
    sort: readJson<TaskSort | null>(
      params.get('sort'),
      null,
      (value) =>
        isDataColumn(value.column) &&
        ['none', 'ascending', 'descending'].includes(String(value.direction)),
    ),
  };
}

export function taskListQuery(
  state: ReturnType<typeof taskTableQueryFromParams>,
  pagination: boolean,
): TaskListQuery {
  return {
    ...state.filters,
    pageNum: state.page,
    pageSize: pagination ? state.pageSize : 100,
    ...(Object.values(state.columnFilters).some((values) => values.length)
      ? { columnFilters: JSON.stringify(state.columnFilters) }
      : {}),
    ...(Object.values(state.columnSearch).some((value) => value.trim())
      ? { columnSearch: JSON.stringify(state.columnSearch) }
      : {}),
    ...(state.sort && state.sort.direction !== 'none'
      ? { sortBy: state.sort.column, sortDirection: state.sort.direction }
      : {}),
  };
}

export function hasTaskTableFilters(state: ReturnType<typeof taskTableQueryFromParams>) {
  const { filters, columnFilters, columnSearch } = state;

  return (
    Object.values(columnFilters).some((values) => values.length) ||
    Object.values(columnSearch).some((value) => value.trim()) ||
    hasTaskFilters(filters) ||
    Boolean(
      filters.createdFrom ||
      filters.createdTo ||
      filters.minimumHours ||
      filterValues(filters.due).length,
    )
  );
}

export function withTaskFilters(params: URLSearchParams, filters: TaskQuery) {
  const next = new URLSearchParams(params);

  for (const key of Object.keys(emptyTaskQuery)) next.delete(key);
  for (const [key, value] of queryParams(filters)) next.append(key, value);
  next.delete('page');

  return next;
}

export function setTaskTableParam(params: URLSearchParams, key: string, value: unknown) {
  if (value === null || (isRecord(value) && !Object.keys(value).length)) params.delete(key);
  else params.set(key, JSON.stringify(value));
}

export function reconcileTaskTableQuery(
  params: URLSearchParams,
  previous: TaskTableSettings,
  settings: TaskTableSettings,
) {
  const next = new URLSearchParams(params);
  const { columnFilters, columnSearch, sort } = taskTableQueryFromParams(params);

  for (const [key, values, control] of [
    ['columnFilters', columnFilters, 'filter'],
    ['columnSearch', columnSearch, 'search'],
  ] as const) {
    setTaskTableParam(
      next,
      key,
      Object.fromEntries(
        Object.entries(values).filter(([key]) =>
          settings.columns.some(
            (column) => column.key === key && column.visible && column.controls[control],
          ),
        ),
      ),
    );
  }

  const column = settings.columns.find((column) => column.key === sort?.column);
  if (
    sort &&
    (!column?.visible ||
      !column.controls.sort.enabled ||
      (column.controls.sort.mode !== 'both' && column.controls.sort.mode !== sort.direction))
  )
    next.delete('sort');

  if (previous.pagination !== settings.pagination) next.delete('page');

  return next;
}
