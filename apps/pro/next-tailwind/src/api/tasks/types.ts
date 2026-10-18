import type { TASK_PRIORITY_CODES, TASK_STATUS_CODES } from './constants';

export type TaskStatusDto = (typeof TASK_STATUS_CODES)[number];
export type TaskPriorityDto = (typeof TASK_PRIORITY_CODES)[number];

export interface TaskRequest {
  title: string;
  description: string;
  status: TaskStatusDto;
  priority: TaskPriorityDto;
  project: string;
  module: string;
  assignee: string;
  dueDate: string;
  estimateHours: number;
}

export interface TaskDto extends TaskRequest {
  id: string;
  createdAt: string;
  completedAt: string | null;
}

export interface MemberDto {
  id: string;
  name: string;
  initials: string;
  avatarUrl?: string;
}

export interface TaskMetadataDto {
  members: MemberDto[];
  projects: string[];
  referenceDate: string;
  columnFilterOptions?: Partial<Record<NonNullable<TaskListQuery['sortBy']>, string[]>>;
}

export interface TaskListQuery {
  ids?: readonly string[];
  snapshot?: string;
  search?: string;
  status?: TaskStatusDto | 'all' | readonly TaskStatusDto[];
  priority?: TaskPriorityDto | 'all' | readonly TaskPriorityDto[];
  project?: string | readonly string[];
  module?: string | readonly string[];
  assignee?: string | readonly string[];
  scope?: 'all' | 'open' | 'review' | 'done';
  createdFrom?: string;
  createdTo?: string;
  due?:
    'all' | 'overdue' | 'week' | 'unscheduled' | readonly ('overdue' | 'week' | 'unscheduled')[];
  minimumHours?: string;
  sortBy?:
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
  columnFilters?: string;
  columnSearch?: string;
  sortDirection?: 'ascending' | 'descending';
  pageNum?: number;
  pageSize?: number;
}

export interface TaskListDto {
  snapshotId?: string;
  items: TaskDto[];
  total: number;
  pageNum: number;
  pageSize: number;
}

export interface TaskDeleteRequest {
  ids: readonly string[];
}

export interface TaskDeleteResult {
  deletedIds: string[];
}

export interface TaskHistoryEntry {
  id: string;
  kind: TaskRecordKind;
  actorId: string;
  actorName: string;
  recordedAt: string;
  fromStatus?: TaskStatusDto;
  toStatus?: TaskStatusDto;
}

export type TaskValidationCode =
  | 'moduleRequired'
  | 'projectMemberRequired'
  | 'titleRequired'
  | 'titleTooLong'
  | 'descriptionTooLong'
  | 'invalidStatus'
  | 'invalidPriority'
  | 'projectRequired'
  | 'assigneeRequired'
  | 'invalidEstimate'
  | 'invalidDueDate';

export type TaskRecordKind =
  | 'created'
  | 'assigned'
  | 'started'
  | 'submitted'
  | 'approved'
  | 'returned'
  | 'updated'
  | 'deleted'
  | 'assisted';

export interface TaskSummaryDto {
  total: number;
  inProgress: number;
  dueSoon: number;
  completed: number;
}
