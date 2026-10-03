import type { TrendPointDto as TrendPoint } from '@/api/analytics';
import type { MemberDto as Member } from '@/api/tasks';
export const snapshot = {
  date: '2026-10-01',
  displayDate: 'Thursday, October 1, 2026',
  workspace: 'Virgo Studio',
  user: { id: 'mystic', name: 'Mystic', initials: 'MY' },
  activeProjects: 12,
  openTasks: 42,
  teamMembers: 24,
  completionRate: 84,
} as const;

export const members: [Member, Member, Member, Member] = [
  { id: 'ava', name: 'Ava Chen', initials: 'AC' },
  { id: 'leo', name: 'Leo Park', initials: 'LP' },
  { id: 'nina', name: 'Nina Wu', initials: 'NW' },
  { id: 'eli', name: 'Eli Morgan', initials: 'EM' },
];

export const trendPoints: TrendPoint[] = [
  { date: '2026-09-18', completed: 6, planned: 10 },
  { date: '2026-09-19', completed: 8, planned: 11 },
  { date: '2026-09-20', completed: 7, planned: 12 },
  { date: '2026-09-21', completed: 10, planned: 14 },
  { date: '2026-09-22', completed: 9, planned: 12 },
  { date: '2026-09-23', completed: 12, planned: 14 },
  { date: '2026-09-24', completed: 10, planned: 15 },
  { date: '2026-09-25', completed: 6, planned: 8 },
  { date: '2026-09-26', completed: 9, planned: 10 },
  { date: '2026-09-27', completed: 8, planned: 11 },
  { date: '2026-09-28', completed: 14, planned: 15 },
  { date: '2026-09-29', completed: 12, planned: 16 },
  { date: '2026-09-30', completed: 17, planned: 19 },
  { date: '2026-10-01', completed: 18, planned: 21 },
];

export const activity = [
  {
    id: 'a1',
    name: 'Ava Chen',
    project: 'Workspace',
    time: '10:42',
    dateTime: '2026-10-01T10:42:00+08:00',
    status: 'active',
  },
  {
    id: 'a2',
    name: 'Eli Morgan',
    project: 'Design system',
    time: '09:36',
    dateTime: '2026-10-01T09:36:00+08:00',
    status: 'complete',
  },
  {
    id: 'a3',
    name: 'Leo Park',
    project: 'Onboarding',
    time: '09:12',
    dateTime: '2026-10-01T09:12:00+08:00',
    status: 'pending',
  },
] as const;

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
