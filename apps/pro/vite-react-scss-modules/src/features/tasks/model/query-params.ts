import { isTaskPriority, isTaskStatus, type TaskFilters } from './task';

export type DueCondition = 'overdue' | 'week' | 'unscheduled';
export interface TaskQuery extends TaskFilters {
  createdFrom: string;
  createdTo: string;
  due: 'all' | DueCondition | readonly DueCondition[];
  minimumHours: string;
}
export const emptyTaskQuery: TaskQuery = {
  search: '',
  status: 'all',
  priority: 'all',
  project: 'all',
  module: 'all',
  assignee: 'all',
  createdFrom: '',
  createdTo: '',
  due: 'all',
  minimumHours: '',
};
function validQueryDate(value: string) {
  const date = new Date(`${value}T00:00:00Z`);
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}
export function queryError(query: TaskQuery, limits?: { maxCreatedDate?: string }) {
  if (
    (query.createdFrom && !validQueryDate(query.createdFrom)) ||
    (query.createdTo && !validQueryDate(query.createdTo))
  )
    return 'invalidDates';
  if (query.createdFrom && query.createdTo && query.createdFrom > query.createdTo)
    return 'dateOrder';
  if (
    limits?.maxCreatedDate &&
    (query.createdFrom > limits.maxCreatedDate || query.createdTo > limits.maxCreatedDate)
  )
    return 'futureDates';
  if (
    query.minimumHours &&
    (!Number.isInteger(Number(query.minimumHours)) ||
      Number(query.minimumHours) < 0 ||
      Number(query.minimumHours) > 999)
  )
    return 'invalidEstimate';
  return '';
}
export function queryFromParams(params: URLSearchParams): TaskQuery {
  const query = { ...emptyTaskQuery };
  query.search = params.get('search') ?? '';
  const collapse = <T extends string>(values: T[]): 'all' | T | T[] =>
    values.length > 1 ? values : (values[0] ?? 'all');
  query.status = collapse(params.getAll('status').filter(isTaskStatus));
  query.priority = collapse(params.getAll('priority').filter(isTaskPriority));
  query.module = collapse(params.getAll('module').filter((value) => value !== 'all'));
  query.project = collapse(params.getAll('project').filter((value) => value !== 'all'));
  query.assignee = collapse(params.getAll('assignee').filter((value) => value !== 'all'));
  query.due = collapse(
    params
      .getAll('due')
      .filter(
        (value): value is DueCondition =>
          value === 'overdue' || value === 'week' || value === 'unscheduled',
      ),
  );
  for (const key of ['createdFrom', 'createdTo'] as const) {
    const value = params.get(key);
    if (value && validQueryDate(value)) query[key] = value;
  }
  const hours = params.get('minimumHours');
  if (hours && /^\d+$/.test(hours) && Number(hours) <= 999) query.minimumHours = hours;

  return query;
}
export function queryParams(query: TaskQuery) {
  const params = new URLSearchParams();
  for (const key of Object.keys(query) as Array<keyof TaskQuery>) {
    const value = query[key];
    if (Array.isArray(value)) value.forEach((entry) => params.append(key, entry));
    else if (value !== emptyTaskQuery[key]) params.set(key, value as string);
  }
  return params;
}
