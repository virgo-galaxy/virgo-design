import { useQueryParams } from '@/routes/navigation';

import { emptyTaskQuery, type TaskQuery } from '../model/query-params';
import type { TaskSort } from '../model/sort';
import {
  hasTaskTableFilters,
  reconcileTaskTableQuery,
  setTaskTableParam,
  taskListQuery,
  taskTableQueryFromParams,
  withTaskFilters,
} from '../model/table-query';
import type { TaskDataColumn, TaskTableSettings } from '../model/table-settings';

export function useTaskTableQuery(settings: TaskTableSettings) {
  const [params, setParams] = useQueryParams();
  const state = taskTableQueryFromParams(params);

  const commit = (change: (next: URLSearchParams) => URLSearchParams | void) => {
    const next = new URLSearchParams(params);
    const updated = change(next) ?? next;

    if (updated.toString() !== params.toString()) setParams(updated, { replace: true });
  };

  return {
    ...state,
    params,
    query: taskListQuery(state, settings.pagination),
    filtered: hasTaskTableFilters(state),
    changeFilters: (filters: TaskQuery) => commit((next) => withTaskFilters(next, filters)),
    resetFilters: () =>
      commit((next) => {
        next.delete('columnFilters');
        next.delete('columnSearch');

        return withTaskFilters(next, emptyTaskQuery);
      }),
    changeColumnFilter: (key: TaskDataColumn, values: string[]) =>
      commit((next) => {
        const current = taskTableQueryFromParams(next);
        setTaskTableParam(next, 'columnFilters', { ...current.columnFilters, [key]: values });
        next.delete('page');
      }),
    changeColumnSearch: (key: TaskDataColumn, value: string) =>
      commit((next) => {
        const current = taskTableQueryFromParams(next);
        setTaskTableParam(next, 'columnSearch', { ...current.columnSearch, [key]: value });
        next.delete('page');
      }),
    changeSort: (sort: TaskSort) =>
      commit((next) => {
        setTaskTableParam(next, 'sort', sort.direction === 'none' ? null : sort);
        next.delete('page');
      }),
    changePage: (page: number, pageSize: number) =>
      commit((next) => {
        if (page === 1) next.delete('page');
        else next.set('page', String(page));

        next.set('pageSize', String(pageSize));
      }),
    reconcileSettings: (nextSettings: TaskTableSettings) =>
      commit((next) => reconcileTaskTableQuery(next, settings, nextSettings)),
  };
}
