import type { TaskRecordKind, TaskStatusDto } from '@/contracts/tasks';

export type { TaskRecordKind } from '@/contracts/tasks';

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

export interface TaskStatusSummaryDto {
  taskCount: number;
  statusDistribution: { status: TaskStatusDto; count: number }[];
}

export interface OwnerCapacityDto {
  memberId: string;
  count: number;
  hours: number;
}

export interface TokenUsageReportDto {
  referenceDate: string;
  tokenUsage: TokenUsageDayDto[];
  tokenRecords: TaskRecordDto[];
  reportingYears: number[];
  reportingScope: 'workspace' | 'projects' | 'personal';
}

export interface ProjectDeliveryDayDto {
  date: string;
  deliveries: { projectId: string; completed: number }[];
}
