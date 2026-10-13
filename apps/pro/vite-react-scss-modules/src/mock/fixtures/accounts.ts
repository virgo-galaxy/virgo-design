import adminAvatar from '@/assets/avatars/admin.svg';
import type { SessionUser } from '@/contracts/auth';

import { projectIds, users } from './team';
export const demoPassword = 'virgo123';
export const demoAccounts: SessionUser[] = [
  {
    id: 'admin',
    account: 'admin',
    name: 'Admin',
    role: 'admin',
    jobTitle: 'Administrator',
    department: 'Platform',
    projects: [...projectIds],
    managedProjects: [],
    avatarUrl: adminAvatar,
  },
  ...users.map((user) => ({
    id: user.id,
    account: user.id,
    name: user.name,
    role: user.managedProjects.length ? ('manager' as const) : ('member' as const),
    jobTitle: user.jobTitle,
    department: user.department,
    ...(user.gender ? { gender: user.gender } : {}),
    ...(user.workLocation ? { workLocation: user.workLocation } : {}),
    projects: user.projects,
    managedProjects: user.managedProjects,
    avatarUrl: user.avatarUrl,
  })),
];
