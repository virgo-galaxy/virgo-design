export type UserGender = 'male' | 'female';

/** Current work base, independent of nationality or birthplace. */
export interface WorkLocationDto {
  region: string;
  city: string;
}

export interface UserDetailsDto {
  id: string;
  name: string;
  initials: string;
  employeeNumber: string;
  jobTitle: string;
  department: string;
  gender?: UserGender;
  workLocation?: WorkLocationDto;
  phone: string;
  email: string;
  avatarUrl: string;
  /** Stable project IDs, resolved to names by the application catalog. */
  projects: string[];
  /** Project IDs managed by this member; empty for other team members. */
  managedProjects: string[];
}
