export interface UserDetailsDto {
  id: string;
  name: string;
  initials: string;
  employeeNumber: string;
  jobTitle: string;
  department: string;
  phone: string;
  email: string;
  avatarUrl: string;
  projects: string[];
  /** Project names managed by this member; empty for other team members. */
  managedProjects: string[];
}
