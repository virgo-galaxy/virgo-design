import type { MemberDto } from '@/api/tasks';

import type { Task } from './tasks';

function csvCell(value: string) {
  // Keep user-entered text as text when the CSV is opened in a spreadsheet.
  const text = /^\s*[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${text.replaceAll('"', '""')}"`;
}

export interface TaskExportLabels {
  status: (code: Task['status']) => string;
  text?: (value: string) => string;
  module?: (id: string) => string;
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
      labels.text?.(task.project) ?? task.project,
      labels.module?.(task.module) ?? task.module,
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
  // UTF-8 BOM preserves non-Latin task titles in spreadsheet applications.
  return `\uFEFF${rows.map((row) => row.map(csvCell).join(',')).join('\r\n')}\r\n`;
}
