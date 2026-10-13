export interface ProjectModuleDto {
  id: string;
  name: string;
}
export interface ProjectDto {
  id: string;
  name: string;
  code: string;
  owner: string;
  /** Explicit membership, including the project's manager. */
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

export interface ProjectOverviewDto {
  projectId: string;
  total: number;
  completed: number;
  open: number;
  progress: number;
  hours: number;
  overdue: number;
  review: number;
  modules: { id: string; total: number; completed: number }[];
  memberTaskCounts: Record<string, number>;
  /** At most eight scoped tasks; this is a preview, never the full register. */
  tasks: import('../tasks').TaskDto[];
  activity: import('../analytics').ActivityDto[];
}
