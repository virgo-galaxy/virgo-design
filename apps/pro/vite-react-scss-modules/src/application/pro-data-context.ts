import { createContext, useContext } from 'react';

import type { AnalyticsOverviewDto, ProfileDto, WorkplaceOverviewDto } from '@/api';
import type { Task, TaskAction, TaskState } from '@/data/tasks';

import type { loadProData } from './load-pro-data';
export type BootstrapData = Awaited<ReturnType<typeof loadProData>>;
export interface ProData extends BootstrapData, AnalyticsOverviewDto, WorkplaceOverviewDto {
  taskAssignees: BootstrapData['metadata']['members'];
  taskProjects: string[];
  taskReferenceDate: string;
  state: TaskState;
  revision: number;
  removeTasks: (ids: readonly string[]) => Promise<string[]>;
  refreshOverview: (signal: AbortSignal) => Promise<void>;
  loadTaskCollection: (signal: AbortSignal) => Promise<boolean>;
  dispatch: (action: TaskAction) => Promise<Task>;
  saveProfile: (profile: ProfileDto | ((previous: ProfileDto) => ProfileDto)) => Promise<void>;
}
export const ProDataContext = createContext<ProData | null>(null);
export function useProData(): ProData {
  const value = useContext(ProDataContext);
  if (!value) throw new Error('ProDataProvider is required');
  return value;
}
