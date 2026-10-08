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
