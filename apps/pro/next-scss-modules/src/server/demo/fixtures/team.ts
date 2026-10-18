import 'server-only';

import type { MemberDto } from '@/api/tasks/types';
import type { UserDetailsDto, UserGender, WorkLocationDto } from '@/api/users/types';

import { systemPresetAvatarManifest, type SystemPresetUserId } from '../avatars/preset-manifest';
import { endpoint } from '../http/response';

export const projectIds = [
  'online-store',
  'booking-system',
  'support-desk',
  'inventory-system',
] as const;

export const projectNames = [
  'Online Store',
  'Booking System',
  'Support Desk',
  'Inventory System',
] as const;

export type TeamJob =
  'manager' | 'product' | 'design' | 'frontend' | 'backend' | 'qa' | 'operations';

const jobs: Record<TeamJob, [string, string]> = {
  manager: ['Project manager', 'Project management'],
  product: ['Product manager', 'Product'],
  design: ['Product designer', 'Design'],
  frontend: ['Frontend engineer', 'Engineering'],
  backend: ['Backend engineer', 'Engineering'],
  qa: ['QA engineer', 'Quality assurance'],
  operations: ['DevOps engineer', 'Operations'],
};

export const teamAssignments: {
  id: SystemPresetUserId;
  name: string;
  job: TeamJob;
  gender: UserGender;
  workLocation: WorkLocationDto;
  projects: number[];
}[] = [
  {
    id: 'ava',
    name: 'Anika Rao',
    gender: 'female',
    workLocation: { region: 'Singapore', city: 'Singapore' },
    job: 'manager',
    projects: [0, 2],
  },
  {
    id: 'leo',
    name: 'Leo Martin',
    gender: 'male',
    workLocation: { region: 'United Kingdom', city: 'London' },
    job: 'manager',
    projects: [1, 3],
  },
  {
    id: 'nina',
    name: 'Nina Wu',
    gender: 'female',
    workLocation: { region: 'China', city: 'Shanghai' },
    job: 'product',
    projects: [0, 3],
  },
  {
    id: 'eli',
    name: 'Ren Sato',
    gender: 'male',
    workLocation: { region: 'Japan', city: 'Tokyo' },
    job: 'product',
    projects: [1, 2],
  },
  {
    id: 'mira',
    name: 'Mei Lin',
    gender: 'female',
    workLocation: { region: 'Singapore', city: 'Singapore' },
    job: 'design',
    projects: [0, 2],
  },
  {
    id: 'owen',
    name: 'Arjun Mehta',
    gender: 'male',
    workLocation: { region: 'India', city: 'Bengaluru' },
    job: 'design',
    projects: [1, 3],
  },
  {
    id: 'hana',
    name: 'Maya Singh',
    gender: 'female',
    workLocation: { region: 'United Kingdom', city: 'London' },
    job: 'frontend',
    projects: [0, 1],
  },
  {
    id: 'noah',
    name: 'Adi Pratama',
    gender: 'male',
    workLocation: { region: 'Indonesia', city: 'Jakarta' },
    job: 'frontend',
    projects: [0],
  },
  {
    id: 'sara',
    name: 'Linh Nguyen',
    gender: 'female',
    workLocation: { region: 'Singapore', city: 'Singapore' },
    job: 'frontend',
    projects: [1, 2],
  },
  {
    id: 'luca',
    name: 'Paolo Santos',
    gender: 'male',
    workLocation: { region: 'Philippines', city: 'Manila' },
    job: 'frontend',
    projects: [2],
  },
  {
    id: 'maya',
    name: 'Nour Haddad',
    gender: 'female',
    workLocation: { region: 'United Arab Emirates', city: 'Dubai' },
    job: 'frontend',
    projects: [3, 0],
  },
  {
    id: 'theo',
    name: 'Omar Nasser',
    gender: 'male',
    workLocation: { region: 'United Kingdom', city: 'London' },
    job: 'frontend',
    projects: [3],
  },
  {
    id: 'james',
    name: 'Salma Mansour',
    gender: 'female',
    workLocation: { region: 'United Arab Emirates', city: 'Dubai' },
    job: 'backend',
    projects: [0, 2],
  },
  {
    id: 'emma',
    name: 'Kwame Mensah',
    gender: 'male',
    workLocation: { region: 'Ghana', city: 'Accra' },
    job: 'backend',
    projects: [0],
  },
  {
    id: 'oliver',
    name: 'Ama Boateng',
    gender: 'female',
    workLocation: { region: 'United Kingdom', city: 'London' },
    job: 'backend',
    projects: [1, 3],
  },
  {
    id: 'sophia',
    name: 'Malik Johnson',
    gender: 'male',
    workLocation: { region: 'United States', city: 'New York' },
    job: 'backend',
    projects: [1],
  },
  {
    id: 'daniel',
    name: 'Zuri Okafor',
    gender: 'female',
    workLocation: { region: 'Nigeria', city: 'Lagos' },
    job: 'backend',
    projects: [2, 3],
  },
  {
    id: 'grace',
    name: 'Ethan Reed',
    gender: 'male',
    workLocation: { region: 'United States', city: 'New York' },
    job: 'backend',
    projects: [3, 2],
  },
  {
    id: 'lucas',
    name: 'Clara Evans',
    gender: 'female',
    workLocation: { region: 'United Kingdom', city: 'London' },
    job: 'qa',
    projects: [0, 2],
  },
  {
    id: 'isla',
    name: 'Jun Park',
    gender: 'male',
    workLocation: { region: 'South Korea', city: 'Seoul' },
    job: 'qa',
    projects: [1, 3],
  },
  {
    id: 'ethan',
    name: 'Elena Meyer',
    gender: 'female',
    workLocation: { region: 'Germany', city: 'Berlin' },
    job: 'qa',
    projects: [2, 0],
  },
  {
    id: 'chloe',
    name: 'Mateo Silva',
    gender: 'male',
    workLocation: { region: 'Brazil', city: 'São Paulo' },
    job: 'qa',
    projects: [3, 1],
  },
  {
    id: 'henry',
    name: 'Lucia Moreno',
    gender: 'female',
    workLocation: { region: 'Mexico', city: 'Mexico City' },
    job: 'operations',
    projects: [0, 1, 2, 3],
  },
  {
    id: 'zoe',
    name: 'Alex Rivera',
    gender: 'male',
    workLocation: { region: 'Singapore', city: 'Singapore' },
    job: 'operations',
    projects: [0, 1, 2, 3],
  },
];

export const users: UserDetailsDto[] = teamAssignments.map((person, index) => ({
  id: person.id,
  name: person.name,
  initials: person.name
    .split(' ')
    .map((part) => part[0])
    .join(''),
  employeeNumber: `VD-${String(index + 1).padStart(4, '0')}`,
  jobTitle: jobs[person.job][0],
  department: jobs[person.job][1],
  gender: person.gender,
  workLocation: person.workLocation,
  phone: `+1 202 555 ${String(100 + index).padStart(4, '0')}`,
  email: `${person.name.toLowerCase().replaceAll(' ', '.')}@virgo.example`,
  avatarUrl: endpoint(`/avatars/${systemPresetAvatarManifest[person.id].apiId}.webp`),
  projects: person.projects.map((project) => projectIds[project]!),
  managedProjects:
    person.job === 'manager' ? person.projects.map((project) => projectIds[project]!) : [],
}));

export const members: MemberDto[] = users.map(({ id, name, initials, avatarUrl }) => ({
  id,
  name,
  initials,
  avatarUrl,
}));
