import type { UserGender, WorkLocationDto } from '@/api/users/types';

export type UserRole = 'admin' | 'manager' | 'member';

export interface SessionUser {
  id: string;
  account: string;
  name: string;
  role: UserRole;
  jobTitle: string;
  department: string;
  gender?: UserGender;
  workLocation?: WorkLocationDto;
  projects: string[];
  managedProjects: string[];
  avatarUrl?: string;
}

export interface SessionDto {
  authenticated: boolean;
  user?: SessionUser;
}

export interface LoginRequest {
  account: string;
  password: string;
}

export interface LoginDto extends SessionDto {
  accessToken: string;
  expiresAt: string;
  user: SessionUser;
}

export interface DemoAccountsDto {
  accounts: SessionUser[];
  password: string;
}
