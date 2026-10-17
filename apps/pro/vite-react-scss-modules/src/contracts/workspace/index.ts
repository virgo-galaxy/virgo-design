export interface WorkspaceSummaryDto {
  date: string;
  activeProjects: number;
  openTasks: number;
  teamMembers: number;
  completionRate: number;
}
export interface AnnouncementDto {
  id: 'release';
}
