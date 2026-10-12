import { createContext, useContext } from 'react';

import type { ProfileDto, ProjectDto, TaskMetadataDto } from '@/api';
import type { Task, TaskAction } from '@/data/tasks';

import type { RemoteData } from './use-remote-data';

export interface CatalogData {
  metadata: TaskMetadataDto;
  projects: ProjectDto[];
}
export interface TaskOperations {
  dispatch: (action: TaskAction) => Promise<Task>;
  removeTasks: (ids: readonly string[]) => Promise<string[]>;
}
export const CatalogResourceContext = createContext<RemoteData<CatalogData> | null>(null);
export const TaskOperationsContext = createContext<TaskOperations | null>(null);
export const TaskRevisionContext = createContext(0);
export const NotificationRevisionContext = createContext(0);
export const WorkflowRevisionContext = createContext(0);
export const ProfileResourceContext = createContext<
  | (RemoteData<ProfileDto> & {
      saveProfile: (next: ProfileDto | ((previous: ProfileDto) => ProfileDto)) => Promise<void>;
    })
  | null
>(null);
export function useCatalogResource() {
  const value = useContext(CatalogResourceContext);
  if (!value) throw new Error('ProDataProvider is required');
  return value;
}
export function useTaskCatalog() {
  const resource = useCatalogResource();
  if (!resource.data) throw new Error('CatalogBoundary is required');
  return resource.data;
}
export function useTaskOperations() {
  const value = useContext(TaskOperationsContext);
  if (!value) throw new Error('ProDataProvider is required');
  return value;
}
export function useProfileResource() {
  const value = useContext(ProfileResourceContext);
  if (!value) throw new Error('ProDataProvider is required');
  return value;
}
export const useTaskRevision = () => useContext(TaskRevisionContext);
export const useNotificationRevision = () => useContext(NotificationRevisionContext);
export const useWorkflowRevision = () => useContext(WorkflowRevisionContext);
