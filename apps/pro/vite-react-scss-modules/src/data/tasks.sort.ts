import type { Task } from './tasks';

export type TaskSortColumn = 'createdAt' | 'estimateHours' | 'dueDate';
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
    if (column === 'createdAt') return sign * (Date.parse(a.createdAt) - Date.parse(b.createdAt));
    return sign * (a.estimateHours - b.estimateHours);
  });
}
