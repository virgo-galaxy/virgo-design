import {
  isOverdue,
  isTaskPriority,
  isTaskStatus,
  matchesTask,
  type Task,
  type TaskFilters,
} from './tasks';
import { taskAssignees, taskProjects, taskReferenceDate } from './tasks.seed';

export interface DataQuery extends TaskFilters {
  createdFrom: string;
  createdTo: string;
  due: 'all' | 'overdue' | 'week' | 'unscheduled';
  minimumHours: string;
}
export const emptyDataQuery: DataQuery = {
  search: '',
  status: 'all',
  priority: 'all',
  project: 'all',
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
export function queryError(query: DataQuery) {
  if (
    (query.createdFrom && !validQueryDate(query.createdFrom)) ||
    (query.createdTo && !validQueryDate(query.createdTo))
  )
    return 'invalidDates';
  if (query.createdFrom && query.createdTo && query.createdFrom > query.createdTo)
    return 'dateOrder';
  if (
    query.minimumHours &&
    (!Number.isInteger(Number(query.minimumHours)) ||
      Number(query.minimumHours) < 0 ||
      Number(query.minimumHours) > 999)
  )
    return 'invalidEstimate';
  return '';
}
export function matchesDataQuery(task: Task, query: DataQuery) {
  const created = task.createdAt.slice(0, 10);
  const cutoff = new Date(`${taskReferenceDate}T00:00:00Z`);
  cutoff.setUTCDate(cutoff.getUTCDate() + 7);
  const member = taskAssignees.find((person) => person.id === task.assignee);
  return (
    matchesTask(task, query, member?.name ?? '') &&
    (!query.createdFrom || created >= query.createdFrom) &&
    (!query.createdTo || created <= query.createdTo) &&
    (!query.minimumHours || task.estimateHours >= Number(query.minimumHours)) &&
    (query.due === 'all' ||
      (query.due === 'overdue' && isOverdue(task, taskReferenceDate)) ||
      (query.due === 'unscheduled' && !task.dueDate) ||
      (query.due === 'week' &&
        task.status !== 'Done' &&
        task.dueDate >= taskReferenceDate &&
        task.dueDate <= cutoff.toISOString().slice(0, 10)))
  );
}

export function queryFromParams(params: URLSearchParams): DataQuery {
  const query = { ...emptyDataQuery };
  query.search = params.get('search') ?? '';
  const status = params.get('status');
  if (status && isTaskStatus(status)) query.status = status;
  const priority = params.get('priority');
  if (priority && isTaskPriority(priority)) query.priority = priority;
  const project = params.get('project');
  if (project && taskProjects.some((name) => name === project)) query.project = project;
  const assignee = params.get('assignee');
  if (assignee && taskAssignees.some((person) => person.id === assignee)) query.assignee = assignee;
  const due = params.get('due');
  if (due === 'overdue' || due === 'week' || due === 'unscheduled') query.due = due;
  for (const key of ['createdFrom', 'createdTo'] as const) {
    const value = params.get(key);
    if (value && validQueryDate(value)) query[key] = value;
  }
  const hours = params.get('minimumHours');
  if (hours && /^\d+$/.test(hours) && Number(hours) <= 999) query.minimumHours = hours;

  return query;
}
export function queryParams(query: DataQuery) {
  const params = new URLSearchParams();
  for (const key of Object.keys(query) as Array<keyof DataQuery>) {
    if (query[key] !== emptyDataQuery[key]) params.set(key, query[key]);
  }
  return params;
}
