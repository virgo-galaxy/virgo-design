import type { Task } from './tasks';
import { taskAssignees } from './tasks.seed';

function csvCell(value: string) {
  // Keep user-entered text as text when the CSV is opened in a spreadsheet.
  const text = /^\s*[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${text.replaceAll('"', '""')}"`;
}

export function createTasksCsv(tasks: readonly Task[]) {
  const rows = [
    [
      'ID',
      'Task',
      'Status',
      'Priority',
      'Project',
      'Assignee',
      'Due date',
      'Estimate (h)',
      'Created at',
      'Description',
    ],
    ...tasks.map((task) => [
      task.id,
      task.title,
      task.status,
      task.priority,
      task.project,
      taskAssignees.find((member) => member.id === task.assignee)?.name ?? task.assignee,
      task.dueDate,
      String(task.estimateHours),
      task.createdAt,
      task.description,
    ]),
  ];
  // UTF-8 BOM preserves non-Latin task titles in spreadsheet applications.
  return `\uFEFF${rows.map((row) => row.map(csvCell).join(',')).join('\r\n')}\r\n`;
}
