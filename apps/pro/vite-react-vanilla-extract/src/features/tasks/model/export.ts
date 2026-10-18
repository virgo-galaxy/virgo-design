import type { MemberDto } from '@/api/tasks/types';

import type { Task } from './task';

function csvCell(value: string) {
  const text = /^\s*[=+\-@]/.test(value) ? `'${value}` : value;

  return `"${text.replaceAll('"', '""')}"`;
}

export interface TaskExportLabels {
  status: (code: Task['status']) => string;
  text?: (value: string) => string;
  project?: (id: string) => string;
  module?: (projectId: string, id: string) => string;
  priority: (code: Task['priority']) => string;
}

export function createTasksCsv(
  tasks: readonly Task[],
  taskAssignees: readonly MemberDto[],
  labels: TaskExportLabels,
) {
  const rows = [
    [
      'ID',
      'Task',
      'Status',
      'Priority',
      'Project',
      'Module',
      'Assignee',
      'Due date',
      'Estimate (h)',
      'Created at',
      'Completed at',
      'Description',
    ],
    ...tasks.map((task) => [
      task.id,
      labels.text?.(task.title) ?? task.title,
      labels.status(task.status),
      labels.priority(task.priority),
      labels.project?.(task.project) ?? task.project,
      labels.module?.(task.project, task.module) ?? task.module,
      labels.text?.(
        taskAssignees.find((member) => member.id === task.assignee)?.name ?? task.assignee,
      ) ??
        taskAssignees.find((member) => member.id === task.assignee)?.name ??
        task.assignee,
      task.dueDate,
      String(task.estimateHours),
      task.createdAt,
      task.completedAt ?? '',
      labels.text?.(task.description) ?? task.description,
    ]),
  ];

  return `\uFEFF${rows.map((row) => row.map(csvCell).join(',')).join('\r\n')}\r\n`;
}
