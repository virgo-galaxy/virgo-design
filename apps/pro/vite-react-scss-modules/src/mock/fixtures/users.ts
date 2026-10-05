import type { UserDetailsDto } from '@/api/users';

import { members } from './workplace';

const roles = [
  ['Product manager', 'Product'],
  ['Frontend engineer', 'Engineering'],
  ['Product designer', 'Design'],
  ['Backend engineer', 'Engineering'],
  ['QA engineer', 'Engineering'],
  ['Engineering manager', 'Engineering'],
  ['UX researcher', 'Design'],
  ['Platform engineer', 'Engineering'],
  ['Project manager', 'Operations'],
  ['Design engineer', 'Design'],
  ['Data analyst', 'Data'],
  ['Technical writer', 'Product'],
  ['Security engineer', 'Engineering'],
  ['Product designer', 'Design'],
  ['Backend engineer', 'Engineering'],
  ['Product manager', 'Product'],
  ['Frontend engineer', 'Engineering'],
  ['UX researcher', 'Design'],
  ['Platform engineer', 'Engineering'],
  ['QA engineer', 'Engineering'],
  ['Data engineer', 'Data'],
  ['Project manager', 'Operations'],
  ['Support engineer', 'Operations'],
  ['Design engineer', 'Design'],
] as const;

const projectGroups = [
  ['Workspace', 'Onboarding'],
  ['Discovery', 'Workspace'],
  ['Design system', 'Workspace'],
  ['Onboarding', 'Discovery'],
] as const;

export const users: UserDetailsDto[] = members.map((member, index) => ({
  ...member,
  employeeNumber: `VD-${String(index + 1).padStart(4, '0')}`,
  jobTitle: roles[index]![0],
  department: roles[index]![1],
  phone: `+1 202 555 ${String(100 + index).padStart(4, '0')}`,
  email: `${member.name.toLowerCase().replaceAll(' ', '.')}@virgo.example`,
  avatarUrl: member.avatarUrl ?? '',
  projects: [...projectGroups[index % projectGroups.length]!],
}));
