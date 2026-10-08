import type { MemberDto } from '@/api/tasks';
import type { UserDetailsDto } from '@/api/users';
import { endpoint } from '@/mock/response';

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
// Explicit project participation is independent of current task assignments.
export const teamAssignments: { id: string; name: string; job: TeamJob; projects: number[] }[] = [
  { id: 'ava', name: 'Ava Brooks', job: 'manager', projects: [0, 2] },
  { id: 'leo', name: 'Leo Park', job: 'manager', projects: [1, 3] },
  { id: 'nina', name: 'Nina Wu', job: 'product', projects: [0, 3] },
  { id: 'eli', name: 'Eli Morgan', job: 'product', projects: [1, 2] },
  { id: 'mira', name: 'Mira Patel', job: 'design', projects: [0, 2] },
  { id: 'owen', name: 'Owen Hayes', job: 'design', projects: [1, 3] },
  { id: 'hana', name: 'Hana Kim', job: 'frontend', projects: [0, 1] },
  { id: 'noah', name: 'Noah Wilson', job: 'frontend', projects: [0] },
  { id: 'sara', name: 'Sara Ahmed', job: 'frontend', projects: [1, 2] },
  { id: 'luca', name: 'Luca Rossi', job: 'frontend', projects: [2] },
  { id: 'maya', name: 'Maya Singh', job: 'frontend', projects: [3, 0] },
  { id: 'theo', name: 'Theo Martin', job: 'frontend', projects: [3] },
  { id: 'james', name: 'James Turner', job: 'backend', projects: [0, 2] },
  { id: 'emma', name: 'Emma Scott', job: 'backend', projects: [0] },
  { id: 'oliver', name: 'Oliver Reed', job: 'backend', projects: [1, 3] },
  { id: 'sophia', name: 'Sophia Carter', job: 'backend', projects: [1] },
  { id: 'daniel', name: 'Daniel Stone', job: 'backend', projects: [2, 3] },
  { id: 'grace', name: 'Grace Lee', job: 'backend', projects: [3, 2] },
  { id: 'lucas', name: 'Lucas Brown', job: 'qa', projects: [0, 2] },
  { id: 'isla', name: 'Isla Moore', job: 'qa', projects: [1, 3] },
  { id: 'ethan', name: 'Ethan Davis', job: 'qa', projects: [2, 0] },
  { id: 'chloe', name: 'Chloe Martin', job: 'qa', projects: [3, 1] },
  { id: 'henry', name: 'Henry Clark', job: 'operations', projects: [0, 1, 2, 3] },
  { id: 'zoe', name: 'Zoe Taylor', job: 'operations', projects: [0, 1, 2, 3] },
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
  phone: `+1 202 555 ${String(100 + index).padStart(4, '0')}`,
  email: `${person.name.toLowerCase().replaceAll(' ', '.')}@virgo.example`,
  avatarUrl: endpoint(`/avatars/user_${index + 1}.png`),
  projects: person.projects.map((project) => projectNames[project]!),
  managedProjects:
    person.job === 'manager' ? person.projects.map((project) => projectNames[project]!) : [],
}));
export const members: MemberDto[] = users.map(({ id, name, initials, avatarUrl }) => ({
  id,
  name,
  initials,
  avatarUrl,
}));
