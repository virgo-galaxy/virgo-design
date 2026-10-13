import {
  TASK_PRIORITY_CODES,
  TASK_STATUS_CODES,
  type TaskPriorityDto,
  type TaskStatusDto,
} from '@/api/tasks';
import type { ProjectDto } from '@/contracts/projects';
import type { TaskDto, TaskRequest, TaskValidationCode } from '@/contracts/tasks';

export function projectTaskErrors(
  draft: { project: string; module: string; assignee: string },
  projects: readonly ProjectDto[],
) {
  const project = projects.find((entry) => entry.id === draft.project);
  return {
    ...(!project?.modules.some((module) => module.id === draft.module)
      ? { module: 'moduleRequired' as const }
      : {}),
    ...(draft.assignee && !project?.memberIds.includes(draft.assignee)
      ? { assignee: 'projectMemberRequired' as const }
      : {}),
  };
}

export const taskStatuses = TASK_STATUS_CODES;
export const taskPriorities = TASK_PRIORITY_CODES;
export type TaskStatus = TaskStatusDto;
export type TaskPriority = TaskPriorityDto;

export type TaskDraft = TaskRequest;

export type Task = TaskDto;

export interface TaskFilters {
  search: string;
  status: TaskStatus | 'all' | readonly TaskStatus[];
  priority: TaskPriority | 'all' | readonly TaskPriority[];
  project: string | readonly string[];
  module: string | readonly string[];
  assignee: string | readonly string[];
}

export interface TaskState {
  tasks: Task[];
}
export type TaskAction =
  | { type: 'create'; draft: TaskDraft }
  | { type: 'edit'; id: string; draft: TaskDraft }
  | { type: 'status'; id: string; status: TaskStatus };
export type TaskErrors = Partial<Record<keyof TaskDraft, TaskValidationCode>>;

export const emptyTaskDraft: TaskDraft = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  project: '',
  module: '',
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
    module: task.module,
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
  catalog?: readonly ProjectDto[],
): TaskErrors {
  const errors: TaskErrors = catalog ? projectTaskErrors(draft, catalog) : {};
  if (!draft.module) errors.module = 'moduleRequired';
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

export function filterValues(filter: string | readonly string[]): readonly string[] {
  return typeof filter === 'string' ? (filter === 'all' ? [] : [filter]) : filter;
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
    (typeof filters.module === 'string' ? filters.module !== 'all' : filters.module.length > 0) ||
    (typeof filters.assignee === 'string'
      ? filters.assignee !== 'all'
      : filters.assignee.length > 0)
  );
}

export function isOverdue(task: Task, today: string) {
  return task.status !== 'done' && task.dueDate !== '' && task.dueDate < today;
}
