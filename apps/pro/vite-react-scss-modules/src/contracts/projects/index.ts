export interface ProjectModuleDto {
  id: string;
  name: string;
}

export interface ProjectDto {
  id: string;
  name: string;
  code: string;
  owner: string;
  memberIds: string[];
  modules: ProjectModuleDto[];
  health: 'On track' | 'At risk' | 'Planning';
  summary: string;
  objective: string;
  start: string;
  due: string;
  color: number;
  milestones: { title: string; date: string; note: string }[];
}

export interface ProjectSummaryDto {
  projectId: string;
  total: number;
  completed: number;
  open: number;
  progress: number;
  hours: number;
  overdue: number;
  review: number;
}

export interface ProjectDistributionDto {
  projectId: string;
  name: string;
  count: number;
  share: number;
  color: number;
}

export interface ProjectModuleStatsDto {
  id: string;
  total: number;
  completed: number;
}

export interface ProjectMemberStatsDto {
  memberId: string;
  count: number;
}
