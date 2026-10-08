export const snapshot = {
  date: '2026-10-05',
  displayDate: 'Monday, October 5, 2026',
  workspace: 'Virgo Studio',
  user: { id: 'mystic', name: 'Mystic', initials: 'MY' },
  activeProjects: 4,
  openTasks: 160,
  teamMembers: 24,
  completionRate: 33,
} as const;

export { activity, trendPoints } from './analytics';
export { members } from './team';

export const announcements = [
  {
    id: 'release',
  },
] as const;

export const metrics = [
  {
    value: snapshot.activeProjects,
    icon: 'projects',
  },
  {
    value: snapshot.openTasks,
    icon: 'tasks',
  },
  {
    value: snapshot.teamMembers,
    icon: 'members',
  },
  {
    value: `${snapshot.completionRate}%`,
    icon: 'completion',
  },
] as const;
