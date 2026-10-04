import {
  TASK_PRIORITY_CODES,
  TASK_STATUS_CODES,
  type TaskPriorityDto,
  type TaskStatusDto,
} from '@/api/tasks';
import type { tasksEnUS } from '@/pages/tasks/locales/en-US';
export const taskStatuses = TASK_STATUS_CODES;
export const taskPriorities = TASK_PRIORITY_CODES;
export type TaskStatus = TaskStatusDto;
export type TaskPriority = TaskPriorityDto;

export interface TaskDraft {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  project: string;
  assignee: string;
  dueDate: string;
  estimateHours: number;
}

export interface Task extends TaskDraft {
  id: string;
  createdAt: string;
}

export interface TaskFilters {
  search: string;
  status: TaskStatus | 'all' | readonly TaskStatus[];
  priority: TaskPriority | 'all' | readonly TaskPriority[];
  project: string | readonly string[];
  assignee: string | readonly string[];
}

export interface TaskState {
  tasks: Task[];
}
export type TaskAction =
  | { type: 'create'; draft: TaskDraft }
  | { type: 'edit'; id: string; draft: TaskDraft }
  | { type: 'status'; id: string; status: TaskStatus };
export type TaskDispatch = (action: TaskAction) => Promise<Task>;
export type TaskErrorKey = keyof typeof tasksEnUS.validation;
export type TaskErrors = Partial<Record<keyof TaskDraft, TaskErrorKey>>;

export const emptyTaskFilters: TaskFilters = {
  search: '',
  status: 'all',
  priority: 'all',
  project: 'all',
  assignee: 'all',
};
export const emptyTaskDraft: TaskDraft = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  project: '',
  assignee: '',
  dueDate: '',
  estimateHours: 0,
};

export function isTaskStatus(value: string): value is TaskStatus {
  return taskStatuses.some((status) => status === value);
}
export function isTaskPriority(value: string): value is TaskPriority {
  return taskPriorities.some((priority) => priority === value);
}

export function normalizeTaskDraft(draft: TaskDraft): TaskDraft {
  return { ...draft, title: draft.title.trim(), description: draft.description.trim() };
}

export function taskDraft(task: Task): TaskDraft {
  return {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    project: task.project,
    assignee: task.assignee,
    dueDate: task.dueDate,
    estimateHours: task.estimateHours,
  };
}

export function draftHasChanges(draft: TaskDraft, baseline: TaskDraft) {
  return (Object.keys(baseline) as Array<keyof TaskDraft>).some(
    (key) => draft[key] !== baseline[key],
  );
}

export function validateTask(
  draft: TaskDraft,
  projects: readonly string[],
  assigneeIds: readonly string[],
): TaskErrors {
  const errors: TaskErrors = {};
  if (!draft.title.trim()) errors.title = 'titleRequired';
  else if (draft.title.trim().length > 120) errors.title = 'titleTooLong';
  if (draft.description.length > 2000) errors.description = 'descriptionTooLong';
  if (!isTaskStatus(draft.status)) errors.status = 'invalidStatus';
  if (!isTaskPriority(draft.priority)) errors.priority = 'invalidPriority';
  if (!projects.includes(draft.project)) errors.project = 'projectRequired';
  if (!assigneeIds.includes(draft.assignee)) errors.assignee = 'assigneeRequired';
  if (
    !Number.isInteger(draft.estimateHours) ||
    draft.estimateHours < 0 ||
    draft.estimateHours > 999
  )
    errors.estimateHours = 'invalidEstimate';
  if (draft.dueDate) {
    const date = new Date(`${draft.dueDate}T00:00:00Z`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(draft.dueDate) ||
      Number.isNaN(date.getTime()) ||
      date.toISOString().slice(0, 10) !== draft.dueDate
    )
      errors.dueDate = 'invalidDueDate';
  }
  return errors;
}

function matchesFilter(value: string, filter: string | readonly string[]) {
  return typeof filter === 'string'
    ? filter === 'all' || value === filter
    : !filter.length || filter.includes(value);
}
export function filterValues(filter: string | readonly string[]): readonly string[] {
  return typeof filter === 'string' ? (filter === 'all' ? [] : [filter]) : filter;
}

export function matchesTask(
  task: TaskDraft & { id?: string },
  filters: TaskFilters,
  assigneeName: string,
) {
  const query = filters.search.trim().toLowerCase();
  const text = [task.id ?? '', task.title, task.description, task.project, assigneeName]
    .join(' ')
    .toLowerCase();
  return (
    (!query || text.includes(query)) &&
    matchesFilter(task.status, filters.status) &&
    matchesFilter(task.priority, filters.priority) &&
    matchesFilter(task.project, filters.project) &&
    matchesFilter(task.assignee, filters.assignee)
  );
}

export function hasTaskFilters(filters: TaskFilters) {
  return (
    filters.search.trim() !== '' ||
    (typeof filters.status === 'string' ? filters.status !== 'all' : filters.status.length > 0) ||
    (typeof filters.priority === 'string'
      ? filters.priority !== 'all'
      : filters.priority.length > 0) ||
    (typeof filters.project === 'string'
      ? filters.project !== 'all'
      : filters.project.length > 0) ||
    (typeof filters.assignee === 'string'
      ? filters.assignee !== 'all'
      : filters.assignee.length > 0)
  );
}

export function isOverdue(task: Task, today: string) {
  return task.status !== 'done' && task.dueDate !== '' && task.dueDate < today;
}

export function taskOverview(tasks: readonly Task[], today: string) {
  const cutoff = new Date(`${today}T00:00:00Z`);
  cutoff.setUTCDate(cutoff.getUTCDate() + 7);
  const weekEnd = cutoff.toISOString().slice(0, 10);
  return {
    total: tasks.length,
    inProgress: tasks.filter((task) => task.status === 'in_progress').length,
    dueSoon: tasks.filter(
      (task) => task.status !== 'done' && task.dueDate >= today && task.dueDate <= weekEnd,
    ).length,
    completed: tasks.filter((task) => task.status === 'done').length,
  };
}

export function nextTaskStatus(status: TaskStatus): TaskStatus | undefined {
  return taskStatuses[taskStatuses.indexOf(status) + 1];
}

export function paginateTasks(tasks: Task[], requestedPage: number, pageSize: number) {
  const pageCount = Math.max(1, Math.ceil(tasks.length / pageSize));
  const page = Math.max(1, Math.min(requestedPage, pageCount));
  const start = (page - 1) * pageSize;
  const items = tasks.slice(start, start + pageSize);
  return {
    tasks: items,
    page,
    pageCount,
    range: [items.length ? start + 1 : 0, start + items.length] as const,
  };
}
