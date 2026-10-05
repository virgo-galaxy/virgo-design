import { type Task, taskPriorities, taskStatuses } from './tasks';

export type TaskSortColumn =
  | 'completedAt'
  | 'title'
  | 'status'
  | 'priority'
  | 'project'
  | 'assignee'
  | 'createdAt'
  | 'estimateHours'
  | 'dueDate';
export interface TaskSort {
  column: TaskSortColumn;
  direction: 'none' | 'ascending' | 'descending';
}

export function sortTasks(tasks: readonly Task[], sort: TaskSort | null) {
  const result = [...tasks];
  if (!sort || sort.direction === 'none') return result;
  const { column, direction } = sort;
  const sign = direction === 'ascending' ? 1 : -1;
  return result.sort((a, b) => {
    // Undated tasks stay last in either direction.
    if (column === 'dueDate') {
      if (!a.dueDate || !b.dueDate) return Number(!a.dueDate) - Number(!b.dueDate);
      return sign * a.dueDate.localeCompare(b.dueDate);
    }
    if (column === 'completedAt') {
      if (!a.completedAt || !b.completedAt) return Number(!a.completedAt) - Number(!b.completedAt);
      return sign * (Date.parse(a.completedAt) - Date.parse(b.completedAt));
    }
    if (column === 'createdAt') return sign * (Date.parse(a.createdAt) - Date.parse(b.createdAt));
    if (column === 'estimateHours') return sign * (a.estimateHours - b.estimateHours);
    if (column === 'status')
      return sign * (taskStatuses.indexOf(a.status) - taskStatuses.indexOf(b.status));
    if (column === 'priority')
      return sign * (taskPriorities.indexOf(a.priority) - taskPriorities.indexOf(b.priority));
    return sign * a[column].localeCompare(b[column]);
  });
}
