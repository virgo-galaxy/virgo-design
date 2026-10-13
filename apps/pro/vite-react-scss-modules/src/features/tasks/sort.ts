import type { TaskListQuery } from '@/api/tasks';
export type TaskSortColumn = NonNullable<TaskListQuery['sortBy']>;
export interface TaskSort {
  column: TaskSortColumn;
  direction: 'none' | 'ascending' | 'descending';
}
