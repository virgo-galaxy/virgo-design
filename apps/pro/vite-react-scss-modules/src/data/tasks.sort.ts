export type TaskSortColumn =
  | 'completedAt'
  | 'title'
  | 'status'
  | 'priority'
  | 'project'
  | 'module'
  | 'assignee'
  | 'createdAt'
  | 'estimateHours'
  | 'dueDate';
export interface TaskSort {
  column: TaskSortColumn;
  direction: 'none' | 'ascending' | 'descending';
}
