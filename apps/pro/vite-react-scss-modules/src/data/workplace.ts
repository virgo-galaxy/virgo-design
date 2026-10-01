// Product fixture v1. Dates and values are fixed, independent of the device clock.
// This module contains domain data only; no React or styling dependencies.
export interface Member {
  id: string;
  name: string;
  initials: string;
}
export type TaskStatus = 'In progress' | 'In review' | 'Blocked' | 'Done';
export type TaskPriority = 'High' | 'Medium' | 'Low';
export interface Task {
  id: string;
  title: string;
  project: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: Member;
  due: string;
}
export interface TrendPoint {
  date: string;
  completed: number;
  planned: number;
}
export type TrendPeriod = '7d' | '14d';

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
const [ava, leo, nina, eli] = members;

export const recentTasks: Task[] = [
  {
    id: 'VD-128',
    title: 'Review workspace navigation',
    project: 'Workspace',
    status: 'In review',
    priority: 'High',
    assignee: ava,
    due: '2026-10-02',
  },
  {
    id: 'VD-127',
    title: 'Map onboarding touchpoints',
    project: 'Onboarding',
    status: 'In progress',
    priority: 'Medium',
    assignee: leo,
    due: '2026-10-03',
  },
  {
    id: 'VD-126',
    title: 'Resolve export permission states',
    project: 'Workspace',
    status: 'Blocked',
    priority: 'High',
    assignee: nina,
    due: '2026-10-02',
  },
  {
    id: 'VD-125',
    title: 'Ship keyboard navigation audit',
    project: 'Design system',
    status: 'Done',
    priority: 'Medium',
    assignee: eli,
    due: '2026-10-01',
  },
  {
    id: 'VD-124',
    title: 'Refine search empty states',
    project: 'Discovery',
    status: 'In progress',
    priority: 'Low',
    assignee: ava,
    due: '2026-10-05',
  },
  {
    id: 'VD-123',
    title: 'Validate release acceptance criteria',
    project: 'Design system',
    status: 'In review',
    priority: 'High',
    assignee: leo,
    due: '2026-10-06',
  },
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

export const projectDistribution = [
  { name: 'Workspace', count: 16, share: 38, color: 1 },
  { name: 'Design system', count: 12, share: 29, color: 2 },
  { name: 'Onboarding', count: 8, share: 19, color: 3 },
  { name: 'Discovery', count: 6, share: 14, color: 4 },
] as const;

export const activity = [
  {
    id: 'a1',
    name: 'Ava Chen',
    action: 'requested a navigation review.',
    project: 'Workspace',
    time: '10:42',
    dateTime: '2026-10-01T10:42:00+08:00',
    status: 'active',
  },
  {
    id: 'a2',
    name: 'Eli Morgan',
    action: 'completed the keyboard audit.',
    project: 'Design system',
    time: '09:36',
    dateTime: '2026-10-01T09:36:00+08:00',
    status: 'complete',
  },
  {
    id: 'a3',
    name: 'Leo Park',
    action: 'updated the onboarding brief.',
    project: 'Onboarding',
    time: '09:12',
    dateTime: '2026-10-01T09:12:00+08:00',
    status: 'pending',
  },
] as const;

export const announcements = [
  {
    id: 'release',
    title: 'Release checkpoint · October 6',
    body: 'Attach acceptance notes and clear review requests before the team checkpoint.',
  },
] as const;

export const shortcuts = [
  {
    label: 'Task queue',
    detail: 'Prioritize the next delivery',
    path: '/work/tasks',
    icon: 'tasks',
  },
  { label: 'Projects', detail: 'See the bigger picture', path: '/work/projects', icon: 'projects' },
  {
    label: 'Analytics',
    detail: 'Explore team performance',
    path: '/dashboard/analytics',
    icon: 'analytics',
  },
] as const;

export const metrics = [
  {
    label: 'Active projects',
    value: snapshot.activeProjects,
    change: '+2',
    detail: 'vs. last week',
    icon: 'projects',
  },
  {
    label: 'Open tasks',
    value: snapshot.openTasks,
    change: '8 due soon',
    detail: 'next 7 days',
    icon: 'tasks',
  },
  {
    label: 'Team members',
    value: snapshot.teamMembers,
    change: '4 teams',
    detail: 'working together',
    icon: 'members',
  },
  {
    label: 'Completion rate',
    value: `${snapshot.completionRate}%`,
    change: '+6 pp',
    detail: 'vs. last week',
    icon: 'completion',
  },
] as const;

export function formatDueDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}
