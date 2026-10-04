import type { MemberDto, TaskPriorityDto, TaskStatusDto } from '../tasks/contract';
export interface TrendPointDto {
  date: string;
  completed: number;
  planned: number;
}
export interface ActivityDto {
  id: string;
  name: string;
  project: string;
  time: string;
  dateTime: string;
  status: 'active' | 'complete' | 'pending';
}
export interface TokenUsageDayDto {
  /** Reporting date (YYYY-MM-DD); counts are raw workspace-wide tokens. */
  date: string;
  inputTokens: number;
  outputTokens: number;
}
export interface AnalyticsOverviewDto {
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
