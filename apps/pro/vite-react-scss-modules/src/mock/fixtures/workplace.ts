import type { TokenUsageDayDto, TrendPointDto as TrendPoint } from '@/api/analytics';
import type { MemberDto as Member } from '@/api/tasks';
import { endpoint } from '@/mock/response';
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

// Stable workspace-wide daily usage fixture. Token counts are raw input/output totals,
// independent of task deadlines; no future usage is recorded beyond the snapshot.
export const tokenUsage: TokenUsageDayDto[] = Array.from({ length: 365 }, (_, index) => {
  const day = new Date(Date.UTC(2026, 0, index + 1));
  const date = day.toISOString().slice(0, 10);
  const weekend = day.getUTCDay() === 0 || day.getUTCDay() === 6;
  const seed = (index * 17 + Math.floor(index / 7) * 13) % 31;
  const total =
    date > snapshot.date || seed < 5
      ? 0
      : Math.round((12000000 + seed * 9700000) * (weekend ? 0.12 : 1));
  const inputTokens = Math.round(total * 0.78);
  return { date, inputTokens, outputTokens: total - inputTokens };
});

const memberIdentities: Member[] = [
  { id: 'ava', name: 'Ava Brooks', initials: 'AB' },
  { id: 'leo', name: 'Leo Park', initials: 'LP' },
  { id: 'nina', name: 'Nina Wu', initials: 'NW' },
  { id: 'eli', name: 'Eli Morgan', initials: 'EM' },
  { id: 'mira', name: 'Mira Patel', initials: 'MP' },
  { id: 'owen', name: 'Owen Hayes', initials: 'OH' },
  { id: 'hana', name: 'Hana Kim', initials: 'HK' },
  { id: 'noah', name: 'Noah Wilson', initials: 'NW' },
  { id: 'sara', name: 'Sara Ahmed', initials: 'SA' },
  { id: 'luca', name: 'Luca Rossi', initials: 'LR' },
  { id: 'maya', name: 'Maya Singh', initials: 'MS' },
  { id: 'theo', name: 'Theo Martin', initials: 'TM' },
  { id: 'james', name: 'James Turner', initials: 'JT' },
  { id: 'emma', name: 'Emma Scott', initials: 'ES' },
  { id: 'oliver', name: 'Oliver Reed', initials: 'OR' },
  { id: 'sophia', name: 'Sophia Carter', initials: 'SC' },
  { id: 'daniel', name: 'Daniel Stone', initials: 'DS' },
  { id: 'grace', name: 'Grace Lee', initials: 'GL' },
  { id: 'lucas', name: 'Lucas Brown', initials: 'LB' },
  { id: 'isla', name: 'Isla Moore', initials: 'IM' },
  { id: 'ethan', name: 'Ethan Davis', initials: 'ED' },
  { id: 'chloe', name: 'Chloe Martin', initials: 'CM' },
  { id: 'henry', name: 'Henry Clark', initials: 'HC' },
  { id: 'zoe', name: 'Zoe Taylor', initials: 'ZT' },
];

export const members: Member[] = memberIdentities.map((member, index) => ({
  ...member,
  avatarUrl: endpoint(`/avatars/user_${index + 1}.png`),
}));

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
    name: 'Ava Brooks',
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
