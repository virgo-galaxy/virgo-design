export type UserGender = 'male' | 'female';

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
  projects: string[];
  managedProjects: string[];
}
