export interface ProjectDto {
  id: string;
  name: string;
  code: string;
  owner: string;
  health: 'On track' | 'At risk' | 'Planning';
  summary: string;
  objective: string;
  start: string;
  due: string;
  color: number;
  milestones: { title: string; date: string; note: string }[];
}
