export const TASK_STATUS_CODES = ['backlog', 'todo', 'in_progress', 'in_review', 'done'] as const;
export const TASK_PRIORITY_CODES = ['low', 'medium', 'high', 'urgent'] as const;
export type TaskStatusDto = (typeof TASK_STATUS_CODES)[number];
export type TaskPriorityDto = (typeof TASK_PRIORITY_CODES)[number];
export interface TaskRequest {
  title: string;
  description: string;
  status: TaskStatusDto;
  priority: TaskPriorityDto;
  project: string;
  assignee: string;
  dueDate: string;
  estimateHours: number;
}
export interface TaskDto extends TaskRequest {
  /** Server-assigned opaque identifier; Mock uses two hexadecimal segments (8-4). */
  id: string;
  createdAt: string;
}
export interface MemberDto {
  id: string;
  name: string;
  initials: string;
}
export interface TaskMetadataDto {
  members: MemberDto[];
  projects: string[];
  referenceDate: string;
}
export interface TaskListQuery {
  search?: string;
  status?: TaskStatusDto | 'all' | readonly TaskStatusDto[];
  priority?: TaskPriorityDto | 'all' | readonly TaskPriorityDto[];
  project?: string | readonly string[];
  assignee?: string | readonly string[];
  scope?: 'all' | 'open' | 'review' | 'done';
  createdFrom?: string;
  createdTo?: string;
  due?:
    'all' | 'overdue' | 'week' | 'unscheduled' | readonly ('overdue' | 'week' | 'unscheduled')[];
  minimumHours?: string;
  sortBy?: 'createdAt' | 'estimateHours' | 'dueDate';
  sortDirection?: 'ascending' | 'descending';
  page?: number;
  pageSize?: number;
}
export interface TaskListDto {
  items: TaskDto[];
  total: number;
  page: number;
  pageSize: number;
  overview: { total: number; inProgress: number; dueSoon: number; completed: number };
}

export interface TaskDeleteRequest {
  ids: readonly string[];
}
export interface TaskDeleteResult {
  deletedIds: string[];
}
