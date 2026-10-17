import type { TaskDto, TaskListDto } from '@/contracts/tasks';
import { businessLabel } from '@/lib/demo/labels';
import { isRecord } from '@/lib/validation/is-record';

import { projects } from '../fixtures/projects';
import { taskAssignees } from '../fixtures/tasks';
import { sortTasks, type TaskSortColumn } from './task-sort';

function overdue(task: TaskDto, referenceDate: string) {
  return task.status !== 'done' && Boolean(task.dueDate) && task.dueDate < referenceDate;
}

export const taskDataColumns = [
  'completedAt',
  'title',
  'status',
  'priority',
  'project',
  'module',
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
        !taskDataColumns.some((column) => column === key) ||
        (name === 'columnSearch'
          ? typeof entry !== 'string'
          : !Array.isArray(entry) || !entry.every((item) => typeof item === 'string')),
    )
  )
    throw new Error('Invalid column conditions');

  return value;
}

export function queryTasks(
  tasks: readonly TaskDto[],
  params: URLSearchParams,
  referenceDate: string,
  all = false,
): TaskListDto {
  const week = new Date(`${referenceDate}T00:00:00Z`);
  week.setUTCDate(week.getUTCDate() + 7);
  const through = week.toISOString().slice(0, 10);
  const search = (params.get('search') ?? '').trim().toLowerCase();
  const filters = columnConditions(params, 'columnFilters');
  const queries = columnConditions(params, 'columnSearch');

  let matching = tasks.filter((task) => {

    const ids = params.getAll('ids');
    if (ids.length && !ids.includes(task.id)) return false;

    for (const key of ['status', 'priority', 'project', 'module', 'assignee'] as const) {
      const values = params.getAll(key).filter((value) => value !== 'all');
      if (
        values.length &&
        !values.includes(task[key]) &&
        !(key === 'module' && values.includes(JSON.stringify([task.project, task.module])))
      )
        return false;
    }

    const name = taskAssignees.find((member) => member.id === task.assignee)?.name ?? '';
    if (
      search &&
      ![
        task.id,
        task.title,
        task.description,
        projects.find((project) => project.id === task.project)?.name ?? task.project,
        task.module,
        projects.find((p) => p.id === task.project)?.modules.find((m) => m.id === task.module)
          ?.name ?? '',
        task.status,
        task.priority,
        name,
      ]
        .flatMap((text) => [text, businessLabel(text, 'zh-CN')])
        .join(' ')
        .toLowerCase()
        .includes(search)
    )
      return false;

    for (const key of taskDataColumns) {
      const values = filters[key] as string[] | undefined;
      if (
        values?.length &&
        !values.includes(
          key === 'module' ? JSON.stringify([task.project, task.module]) : String(task[key] ?? ''),
        )
      )
        return false;
      const query = (queries[key] as string | undefined)?.trim().toLowerCase();
      const text =
        key === 'assignee'
          ? `${task.assignee} ${name}`
          : key === 'module'
            ? (projects
                .find((project) => project.id === task.project)
                ?.modules.find((module) => module.id === task.module)?.name ?? task.module)
            : key === 'project'
              ? (projects.find((project) => project.id === task.project)?.name ?? task.project)
              : key === 'title'
                ? `${task.id} ${task.title} ${businessLabel(task.title, 'zh-CN')}`
                : String(task[key] ?? '').replaceAll('_', ' ');
      if (query && !`${text} ${businessLabel(text, 'zh-CN')}`.toLowerCase().includes(query))
        return false;
    }

    const scope = params.get('scope');
    if (
      (scope === 'open' && task.status === 'done') ||
      (scope === 'review' && task.status !== 'in_review') ||
      (scope === 'done' && task.status !== 'done')
    )
      return false;

    const from = params.get('createdFrom');
    const to = params.get('createdTo');
    const minimum = params.get('minimumHours');
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
          (value === 'overdue' && overdue(task, referenceDate)) ||
          (value === 'unscheduled' && !task.dueDate) ||
          (value === 'week' &&
            task.status !== 'done' &&
            task.dueDate >= referenceDate &&
            task.dueDate <= through),
      )
    )
      return false;

    return true;
  });

  const column = params.get('sortBy');
  if (column && taskDataColumns.some((key) => key === column)) {
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
    items: all ? matching : matching.slice((page - 1) * pageSize, page * pageSize),
    total,
    pageNum: page,
    pageSize,
  };
}
