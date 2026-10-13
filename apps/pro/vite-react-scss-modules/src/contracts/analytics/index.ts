import type { MemberDto, TaskPriorityDto, TaskRecordKind, TaskStatusDto } from '../tasks';
export type { TaskRecordKind } from '../tasks';
export interface TrendPointDto {
  date: string;
  completed: number;
  planned: number;
}
export interface ActivityDto {
  id: string;
  name: string;
  project: string;
  taskTitle?: string;
  action?: TaskRecordKind | 'completed';
  time: string;
  dateTime: string;
  status: 'active' | 'complete' | 'pending';
}
export interface TokenUsageDayDto {
  /** Reporting date (YYYY-MM-DD); raw totals in the current identity scope. */
  date: string;
  inputTokens: number;
  outputTokens: number;
}
export interface TaskRecordDto {
  id: string;
  taskId: string;
  taskTitle: string;
  project: string;
  module: string;
  userId: string;
  kind: TaskRecordKind;
  recordedAt: string;
  fromStatus?: TaskStatusDto;
  toStatus?: TaskStatusDto;
  inputTokens: number;
  outputTokens: number;
}
export interface AnalyticsOverviewDto {
  taskCount: number;
  statusDistribution: { status: TaskStatusDto; count: number }[];
  ownerCapacity: { memberId: string; count: number; hours: number }[];
  trendPoints: TrendPointDto[];
  projectDelivery: ProjectDeliveryDayDto[];
  activity: ActivityDto[];
}
export interface ProjectDeliveryDayDto {
  date: string;
  deliveries: { projectId: string; completed: number }[];
}
export interface WorkplaceOverviewDto {
  tokenUsage: TokenUsageDayDto[];
  tokenRecords: TaskRecordDto[];
  reportingYears: number[];
  reportingScope: 'workspace' | 'projects' | 'personal';
  snapshot: {
    date: string;
    displayDate: string;
    workspace: string;
    user: MemberDto;
    activeProjects: number;
    openTasks: number;
    teamMembers: number;
    completionRate: number;
  };
  metrics: { value: number | string; icon: 'projects' | 'tasks' | 'members' | 'completion' }[];
  recentTasks: {
    id: string;
    title: string;
    project: string;
    status: TaskStatusDto;
    priority: TaskPriorityDto;
    assignee: MemberDto;
    due: string;
  }[];
  projectDistribution: { name: string; count: number; share: number; color: number }[];
  announcements: { id: 'release' }[];
}
