export const TASK_STATUS_CODES = ['backlog', 'todo', 'in_progress', 'in_review', 'done'] as const;
export const TASK_PRIORITY_CODES = ['low', 'medium', 'high', 'urgent'] as const;
export type TaskStatusDto = (typeof TASK_STATUS_CODES)[number];
export type TaskPriorityDto = (typeof TASK_PRIORITY_CODES)[number];
export interface TaskRequest {
  title: string;
  description: string;
  status: TaskStatusDto;
  priority: TaskPriorityDto;
  /** Stable ProjectDto.id; the project display name is never a relationship key. */
  project: string;
  /** Stable module ID, scoped to the selected project. */
  module: string;
  assignee: string;
  dueDate: string;
  estimateHours: number;
}
export interface TaskDto extends TaskRequest {
  /** Server-assigned opaque identifier; Mock uses two hexadecimal segments (8-4). */
  id: string;
  createdAt: string;
  /** Actual completion timestamp, cleared when the task is reopened. */
  completedAt: string | null;
}
export interface MemberDto {
  id: string;
  name: string;
  initials: string;
  /** Lightweight avatar reference; full personnel details are fetched by ID. */
  avatarUrl?: string;
}
export interface TaskMetadataDto {
  members: MemberDto[];
  projects: string[];
  referenceDate: string;
  /** Bounded distinct values for column filter menus; independent of the current page. */
  columnFilterOptions?: Partial<Record<NonNullable<TaskListQuery['sortBy']>, string[]>>;
}
export interface TaskListQuery {
  ids?: readonly string[];
  /** "create" starts an immutable, identity-scoped collection snapshot; subsequent pages reuse its ID. */
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
  /** JSON object of column names to exact values; AND across columns, OR within each column. */
  columnFilters?: string;
  /** JSON object of column names to substring queries. */
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
