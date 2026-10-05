import { http } from 'msw';

import { API_ERROR_CODES } from '@/api/error-codes';
import {
  TASK_PRIORITY_CODES,
  TASK_STATUS_CODES,
  type TaskDto,
  type TaskListDto,
  type TaskRequest,
} from '@/api/tasks';
import { isRecord } from '@/lib/http/protocol';
import { createMockTaskId } from '@/mock/fixtures/task-id';

import {
  initialTaskState,
  taskAssignees,
  taskProjects,
  taskReferenceDate,
} from '../fixtures/tasks';
import { endpoint, failure, success } from '../response';
import { sortTasks, type TaskSortColumn } from '../task-sort';
let tasks: TaskDto[] = structuredClone(initialTaskState.tasks);
let nextId = initialTaskState.nextId;
export function resetTasks() {
  tasks = structuredClone(initialTaskState.tasks);
  nextId = initialTaskState.nextId;
}
export function getBackendTasks(): TaskDto[] {
  return structuredClone(tasks);
}
const statuses = TASK_STATUS_CODES;
const priorities = TASK_PRIORITY_CODES;
function validDate(value: string) {
  const date = new Date(`${value}T00:00:00Z`);
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}
function validateDraft(value: unknown): Record<string, string[]> {
  if (!isRecord(value)) return { body: ['Expected a task object'] };
  const fields: Record<string, string[]> = {};
  if (typeof value.title !== 'string' || !value.title.trim() || value.title.trim().length > 120)
    fields.title = ['Use a title between 1 and 120 characters'];
  if (typeof value.description !== 'string' || value.description.length > 2000)
    fields.description = ['Description must be at most 2000 characters'];
  if (typeof value.status !== 'string' || !statuses.some((status) => status === value.status))
    fields.status = ['Invalid status'];
  if (
    typeof value.priority !== 'string' ||
    !priorities.some((priority) => priority === value.priority)
  )
    fields.priority = ['Invalid priority'];
  if (
    typeof value.project !== 'string' ||
    !taskProjects.some((project) => project === value.project)
  )
    fields.project = ['Project not found'];
  if (
    typeof value.assignee !== 'string' ||
    (value.assignee !== '' && !taskAssignees.some((member) => member.id === value.assignee))
  )
    fields.assignee = ['Assignee not found'];
  if (typeof value.dueDate !== 'string' || (value.dueDate !== '' && !validDate(value.dueDate)))
    fields.dueDate = ['Invalid date'];
  if (
    typeof value.estimateHours !== 'number' ||
    !Number.isInteger(value.estimateHours) ||
    value.estimateHours < 0 ||
    value.estimateHours > 999
  )
    fields.estimateHours = ['Estimate must be between 0 and 999 hours'];
  return fields;
}
function taskRequest(body: unknown): TaskRequest {
  const draft = body as TaskRequest;
  return {
    title: draft.title.trim(),
    description: draft.description.trim(),
    status: draft.status,
    priority: draft.priority,
    project: draft.project,
    assignee: draft.assignee,
    dueDate: draft.dueDate,
    estimateHours: draft.estimateHours,
  };
}
function overdue(task: TaskDto) {
  return task.status !== 'done' && Boolean(task.dueDate) && task.dueDate < taskReferenceDate;
}
const dataColumns = [
  'completedAt',
  'title',
  'status',
  'priority',
  'project',
  'assignee',
  'estimateHours',
  'createdAt',
  'dueDate',
] as const;
function columnConditions(params: URLSearchParams, name: string): Record<string, unknown> {
  const raw = params.get(name);
  if (!raw) return {};
  const value: unknown = JSON.parse(raw);
  if (
    !isRecord(value) ||
    Object.entries(value).some(
      ([key, entry]) =>
        !dataColumns.some((column) => column === key) ||
        (name === 'columnSearch'
          ? typeof entry !== 'string'
          : !Array.isArray(entry) || !entry.every((item) => typeof item === 'string')),
    )
  )
    throw new Error('Invalid column conditions');
  return value;
}
function list(params: URLSearchParams): TaskListDto {
  const week = new Date(`${taskReferenceDate}T00:00:00Z`);
  week.setUTCDate(week.getUTCDate() + 7);
  const through = week.toISOString().slice(0, 10);
  const overview = {
    total: tasks.length,
    inProgress: tasks.filter((t) => t.status === 'in_progress').length,
    completed: tasks.filter((t) => t.status === 'done').length,
    dueSoon: tasks.filter(
      (t) => t.status !== 'done' && t.dueDate >= taskReferenceDate && t.dueDate <= through,
    ).length,
  };
  const search = (params.get('search') ?? '').trim().toLowerCase();
  const filters = columnConditions(params, 'columnFilters');
  const queries = columnConditions(params, 'columnSearch');
  let matching = tasks.filter((task) => {
    for (const key of ['status', 'priority', 'project', 'assignee'] as const) {
      const values = params.getAll(key).filter((value) => value !== 'all');
      if (values.length && !values.includes(task[key])) return false;
    }
    const name = taskAssignees.find((member) => member.id === task.assignee)?.name ?? '';
    if (
      search &&
      ![task.id, task.title, task.description, task.project, task.status, task.priority, name]
        .join(' ')
        .toLowerCase()
        .includes(search)
    )
      return false;
    for (const key of dataColumns) {
      const values = filters[key] as string[] | undefined;
      if (values?.length && !values.includes(String(task[key] ?? ''))) return false;
      const query = (queries[key] as string | undefined)?.trim().toLowerCase();
      const text =
        key === 'assignee'
          ? `${task.assignee} ${name}`
          : key === 'title'
            ? `${task.id} ${task.title}`
            : String(task[key] ?? '').replaceAll('_', ' ');
      if (query && !text.toLowerCase().includes(query)) return false;
    }
    const scope = params.get('scope');
    if (
      (scope === 'open' && task.status === 'done') ||
      (scope === 'review' && task.status !== 'in_review') ||
      (scope === 'done' && task.status !== 'done')
    )
      return false;
    const from = params.get('createdFrom'),
      to = params.get('createdTo'),
      minimum = params.get('minimumHours');
    if (
      (from && task.createdAt.slice(0, 10) < from) ||
      (to && task.createdAt.slice(0, 10) > to) ||
      (minimum && task.estimateHours < Number(minimum))
    )
      return false;
    const due = params.getAll('due').filter((value) => value !== 'all');
    if (
      due.length &&
      !due.some(
        (value) =>
          (value === 'overdue' && overdue(task)) ||
          (value === 'unscheduled' && !task.dueDate) ||
          (value === 'week' &&
            task.status !== 'done' &&
            task.dueDate >= taskReferenceDate &&
            task.dueDate <= through),
      )
    )
      return false;
    return true;
  });
  const column = params.get('sortBy');
  if (column && dataColumns.some((key) => key === column)) {
    if (column === 'assignee') {
      const sign = params.get('sortDirection') === 'ascending' ? 1 : -1;
      const names = new Map(taskAssignees.map((member) => [member.id, member.name]));
      matching = [...matching].sort(
        (a, b) => sign * (names.get(a.assignee) ?? '').localeCompare(names.get(b.assignee) ?? ''),
      );
    } else
      matching = sortTasks(matching, {
        column: column as TaskSortColumn,
        direction: params.get('sortDirection') === 'ascending' ? 'ascending' : 'descending',
      });
  }
  const total = matching.length;
  const pageSize = Math.min(100, Math.max(1, Number(params.get('pageSize')) || 10));
  const page = Math.min(
    Math.max(1, Number(params.get('pageNum')) || 1),
    Math.max(1, Math.ceil(total / pageSize)),
  );
  return {
    items: matching.slice((page - 1) * pageSize, page * pageSize),
    total,
    pageNum: page,
    pageSize,
    overview,
  };
}
export const tasksHandlers = [
  http.get(endpoint('/tasks/metadata'), () =>
    success({
      members: taskAssignees,
      projects: taskProjects,
      referenceDate: taskReferenceDate,
      columnFilterOptions: Object.fromEntries(
        dataColumns.map((key) => [
          key,
          [...new Set(tasks.map((task) => String(task[key] ?? '')))].sort().slice(0, 100),
        ]),
      ),
    }),
  ),
  http.get(endpoint('/tasks'), ({ request }) => {
    const params = new URL(request.url).searchParams;
    for (const [key, codes] of [
      ['status', statuses],
      ['priority', priorities],
      ['due', ['overdue', 'week', 'unscheduled']],
    ] as const) {
      const values = params.getAll(key);
      if (values.some((value) => value && value !== 'all' && !codes.some((code) => code === value)))
        return failure({
          status: 400,
          code: API_ERROR_CODES.INVALID_QUERY,
          detail: 'Invalid task query',
          fields: { [key]: ['Use a supported domain code'] },
        });
    }
    for (const key of ['pageNum', 'pageSize', 'minimumHours']) {
      const value = params.get(key);
      if (value && (!/^\d+$/.test(value) || (key !== 'minimumHours' && Number(value) < 1)))
        return failure({
          status: 400,
          code: API_ERROR_CODES.INVALID_QUERY,
          detail: 'Invalid task query',
          fields: { [key]: ['Use a positive integer'] },
        });
    }
    try {
      return success(list(params));
    } catch {
      return failure({
        status: 422,
        code: API_ERROR_CODES.INVALID_REQUEST,
        detail: 'Invalid column conditions',
      });
    }
  }),
  http.get(endpoint('/tasks/:id'), ({ params }) => {
    const task = tasks.find((t) => t.id === params.id);
    return task
      ? success(task)
      : failure({ status: 404, code: API_ERROR_CODES.TASK_NOT_FOUND, detail: 'Task not found' });
  }),
  http.post(endpoint('/tasks/batch-delete'), async ({ request }) => {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return failure({
        status: 400,
        code: API_ERROR_CODES.INVALID_REQUEST,
        detail: 'Invalid JSON',
      });
    }
    if (
      !isRecord(body) ||
      !Array.isArray(body.ids) ||
      !body.ids.length ||
      !body.ids.every((id) => typeof id === 'string' && id.trim().length > 0)
    ) {
      return failure({
        status: 422,
        code: API_ERROR_CODES.TASK_VALIDATION_FAILED,
        detail: 'Select tasks to delete',
        fields: { ids: ['Provide non-empty task IDs'] },
      });
    }
    const ids = [...new Set(body.ids as string[])];
    if (ids.some((id) => !tasks.some((task) => task.id === id))) {
      return failure({
        status: 404,
        code: API_ERROR_CODES.TASK_NOT_FOUND,
        detail: 'Task not found',
      });
    }
    const removed = new Set(ids);
    tasks = tasks.filter((task) => !removed.has(task.id));
    return success({ deletedIds: ids });
  }),
  http.post(endpoint('/tasks'), async ({ request }) => {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return failure({
        status: 400,
        code: API_ERROR_CODES.INVALID_REQUEST,
        detail: 'Invalid JSON',
      });
    }
    const fields = validateDraft(body);
    if (Object.keys(fields).length)
      return failure({
        status: 422,
        code: API_ERROR_CODES.TASK_VALIDATION_FAILED,
        detail: 'Invalid task',
        fields,
      });
    const task: TaskDto = {
      ...taskRequest(body),
      id: createMockTaskId(nextId++),
      createdAt: new Date().toISOString(),
      completedAt: (body as TaskRequest).status === 'done' ? new Date().toISOString() : null,
    };
    tasks.unshift(task);
    return success(task, 201);
  }),
  http.patch(endpoint('/tasks/:id'), async ({ request, params }) => {
    const index = tasks.findIndex((t) => t.id === params.id);
    if (index === -1)
      return failure({
        status: 404,
        code: API_ERROR_CODES.TASK_NOT_FOUND,
        detail: 'Task not found',
      });
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return failure({
        status: 400,
        code: API_ERROR_CODES.INVALID_REQUEST,
        detail: 'Invalid JSON',
      });
    }
    if (!isRecord(body))
      return failure({
        status: 400,
        code: API_ERROR_CODES.INVALID_REQUEST,
        detail: 'Expected a task object',
      });
    const merged = { ...tasks[index], ...body };
    const fields = validateDraft(merged);
    if (Object.keys(fields).length)
      return failure({
        status: 422,
        code: API_ERROR_CODES.TASK_VALIDATION_FAILED,
        detail: 'Invalid task',
        fields,
      });
    const previous = tasks[index]!;
    const task: TaskDto = {
      ...previous,
      ...taskRequest(merged),
      completedAt:
        merged.status === 'done' ? (previous.completedAt ?? new Date().toISOString()) : null,
    };
    tasks[index] = task;
    return success(task);
  }),
];
