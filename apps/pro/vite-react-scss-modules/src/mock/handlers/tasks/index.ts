import { http } from 'msw';

import {
  TASK_PRIORITY_CODES,
  TASK_STATUS_CODES,
  type TaskDto,
  type TaskListDto,
  type TaskRequest,
} from '@/api/tasks';
import { API_ERROR_CODES } from '@/contracts/gateway/error-codes';
import { canManageProject, canViewTask, taskStatusChoices } from '@/lib/auth/permissions';
import { isRecord } from '@/lib/validation/is-record';

import { forbidden } from '../../auth/access';
import { requestUser, scopedTasks } from '../../auth/session';
import { getDemoReferenceDate } from '../../data/reporting-date';
import { getDemoState, updateDemoState } from '../../data/store';
import { projects } from '../../fixtures/projects';
import { createMockTaskId } from '../../fixtures/task-id';
import { initialTaskState, taskAssignees, taskProjects } from '../../fixtures/tasks';
import { endpoint, failure, success } from '../../http/response';
import { queryTasks, taskDataColumns } from '../../model/task-query';
import { appendTaskRecord, seedNotifications, seedTaskRecords } from '../../model/task-records';

export function resetTasks() {
  updateDemoState((previous) => ({
    ...previous,
    tasks: structuredClone(initialTaskState.tasks),
    nextId: initialTaskState.nextId,
    records: seedTaskRecords(initialTaskState.tasks),
    notifications: seedNotifications(
      initialTaskState.tasks,
      seedTaskRecords(initialTaskState.tasks),
    ),
  }));
}

export function getBackendTasks(): TaskDto[] {
  return structuredClone(getDemoState().tasks);
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

  const project = projects.find((entry) => entry.id === value.project);
  if (
    typeof value.module !== 'string' ||
    !project?.modules.some((module) => module.id === value.module)
  )
    fields.module = ['Select a module in this project'];
  if (value.assignee && !project?.memberIds.includes(String(value.assignee)))
    fields.assignee = ['Select a member of this project'];
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
    module: draft.module,
    assignee: draft.assignee,
    dueDate: draft.dueDate,
    estimateHours: draft.estimateHours,
  };
}

function list(params: URLSearchParams, request: Request, all = false): TaskListDto {
  return queryTasks(
    scopedTasks(getDemoState().tasks, request),
    params,
    getDemoReferenceDate(),
    all,
  );
}

type CollectionSnapshot = { owner: string; expiresAt: number; data: TaskListDto };
const collectionSnapshots = new Map<string, CollectionSnapshot>();
function snapshotPage(params: URLSearchParams, snapshotId: string, data: TaskListDto): TaskListDto {
  const pageSize = Math.min(100, Math.max(1, Number(params.get('pageSize')) || 10));
  const pageNum = Math.min(
    Math.max(1, Number(params.get('pageNum')) || 1),
    Math.max(1, Math.ceil(data.total / pageSize)),
  );

  return {
    ...data,
    snapshotId,
    pageSize,
    pageNum,
    items: data.items.slice((pageNum - 1) * pageSize, pageNum * pageSize),
  };
}

function taskSummary(request: Request) {
  const tasks = scopedTasks(getDemoState().tasks, request);
  const week = new Date(`${getDemoReferenceDate()}T00:00:00Z`);
  week.setUTCDate(week.getUTCDate() + 7);
  const through = week.toISOString().slice(0, 10);

  const overview = {
    total: tasks.length,
    inProgress: tasks.filter((t) => t.status === 'in_progress').length,
    completed: tasks.filter((t) => t.status === 'done').length,
    dueSoon: tasks.filter(
      (t) => t.status !== 'done' && t.dueDate >= getDemoReferenceDate() && t.dueDate <= through,
    ).length,
  };

  return overview;
}

export const tasksHandlers = [
  http.get(endpoint('/tasks/summary'), ({ request }) => success(taskSummary(request))),
  http.get(endpoint('/tasks/metadata'), ({ request }) => {
    const user = requestUser(request)!;
    const tasks = scopedTasks(getDemoState().tasks, request);

    return success({
      members: taskAssignees.filter(
        (member) =>
          user.role === 'admin' ||
          projects.some(
            (project) =>
              user.projects.includes(project.id) && project.memberIds.includes(member.id),
          ),
      ),
      projects: taskProjects.filter((project) => user.projects.includes(project)),
      referenceDate: getDemoReferenceDate(),
      columnFilterOptions: Object.fromEntries(
        taskDataColumns.map((key) => [
          key,
          [
            ...new Set(
              tasks.map((task) =>
                key === 'module'
                  ? JSON.stringify([task.project, task.module])
                  : String(task[key] ?? ''),
              ),
            ),
          ]
            .sort()
            .slice(0, 100),
        ]),
      ),
    });
  }),
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
      const token = params.get('snapshot');

      if (token) {
        const user = requestUser(request)!;
        for (const [id, entry] of collectionSnapshots)
          if (entry.expiresAt <= Date.now()) collectionSnapshots.delete(id);

        if (token === 'create') {
          const snapshotId = crypto.randomUUID();
          const data = structuredClone(list(params, request, true));
          if (collectionSnapshots.size >= 20)
            collectionSnapshots.delete(collectionSnapshots.keys().next().value!);

          collectionSnapshots.set(snapshotId, {
            owner: user.id,
            expiresAt: Date.now() + 5 * 60 * 1000,
            data,
          });

          return success(snapshotPage(params, snapshotId, data));
        }

        const entry = collectionSnapshots.get(token);
        if (!entry || entry.owner !== user.id)
          return failure({
            status: 409,
            code: API_ERROR_CODES.INVALID_QUERY,
            detail: 'Task snapshot expired or unavailable; retry the collection',
          });

        return success(snapshotPage(params, token, entry.data));
      }

      return success(list(params, request));
    } catch {
      return failure({
        status: 422,
        code: API_ERROR_CODES.INVALID_REQUEST,
        detail: 'Invalid column conditions',
      });
    }
  }),
  http.get(endpoint('/tasks/:id/history'), ({ params, request }) => {
    const state = getDemoState();
    const task = state.tasks.find((task) => task.id === params.id);

    if (!task)
      return failure({
        status: 404,
        code: API_ERROR_CODES.TASK_NOT_FOUND,
        detail: 'Task not found',
      });

    if (!canViewTask(requestUser(request), task)) return forbidden();

    return success(
      state.records
        .filter((record) => record.taskId === task.id && record.kind !== 'assisted')
        .sort((a, b) => b.recordedAt.localeCompare(a.recordedAt))
        .map((record) => ({
          id: record.id,
          kind: record.kind,
          actorId: record.userId,
          actorName: taskAssignees.find((person) => person.id === record.userId)?.name ?? 'Admin',
          recordedAt: record.recordedAt,
          fromStatus: record.fromStatus,
          toStatus: record.toStatus,
        })),
    );
  }),
  http.get(endpoint('/tasks/:id'), ({ params, request }) => {
    const { tasks } = getDemoState();
    const task = tasks.find((t) => t.id === params.id);

    if (task && !canViewTask(requestUser(request), task)) return forbidden();

    return task
      ? success(task)
      : failure({ status: 404, code: API_ERROR_CODES.TASK_NOT_FOUND, detail: 'Task not found' });
  }),
  http.post(endpoint('/tasks/batch-delete'), async ({ request }) => {
    const { tasks } = getDemoState();

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

    if (
      ids.some(
        (id) =>
          !canManageProject(requestUser(request), tasks.find((task) => task.id === id)!.project),
      )
    )
      return forbidden();

    const removed = new Set(ids);
    updateDemoState((previous) => {
      let next = previous;

      for (const task of previous.tasks.filter((task) => removed.has(task.id)))
        next = appendTaskRecord(next, task, task, requestUser(request)!, true);

      return { ...next, tasks: previous.tasks.filter((task) => !removed.has(task.id)) };
    });

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

    const user = requestUser(request);
    if (
      !canManageProject(user, (body as TaskRequest).project) ||
      !taskStatusChoices(user).includes((body as TaskRequest).status)
    )
      return forbidden();

    const task: TaskDto = {
      ...taskRequest(body),
      id: createMockTaskId(getDemoState().nextId),
      createdAt: new Date().toISOString(),
      completedAt: (body as TaskRequest).status === 'done' ? new Date().toISOString() : null,
    };

    updateDemoState((previous) => ({
      ...appendTaskRecord(previous, undefined, task, user!),
      nextId: previous.nextId + 1,
      tasks: [task, ...previous.tasks],
    }));

    return success(task, 201);
  }),
  http.patch(endpoint('/tasks/:id'), async ({ request, params }) => {
    const { tasks } = getDemoState();
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

    const previous = tasks[index]!;
    const merged = { ...previous, ...body };
    const fields = validateDraft(merged);
    if (Object.keys(fields).length)
      return failure({
        status: 422,
        code: API_ERROR_CODES.TASK_VALIDATION_FAILED,
        detail: 'Invalid task',
        fields,
      });

    const user = requestUser(request);

    if (!canViewTask(user, previous) || !taskStatusChoices(user, previous).includes(merged.status))
      return forbidden();
    if (
      user?.role === 'member' &&
      [
        'title',
        'description',
        'estimateHours',
        'project',
        'module',
        'assignee',
        'priority',
        'dueDate',
      ].some((key) => merged[key as keyof TaskDto] !== previous[key as keyof TaskDto])
    )
      return forbidden();

    if (user?.role === 'manager' && !canManageProject(user, merged.project)) return forbidden();

    const task: TaskDto = {
      ...previous,
      ...taskRequest(merged),
      completedAt:
        merged.status === 'done' ? (previous.completedAt ?? new Date().toISOString()) : null,
    };

    updateDemoState((previous) => ({
      ...appendTaskRecord(previous, tasks[index], task, user!),
      tasks: previous.tasks.map((entry) => (entry.id === task.id ? task : entry)),
    }));

    return success(task);
  }),
];
