import { createContext, useCallback, useContext } from 'react';

import type { ProjectDto } from '@/api/projects';
import type { TaskMetadataDto } from '@/api/tasks';
import { type RemoteData, useRemoteData } from '@/shared/async/use-remote-data';

import { loadCatalog } from '../data/load-catalog';
export interface CatalogData {
  metadata: TaskMetadataDto;
  projects: ProjectDto[];
}
export const CatalogResourceContext = createContext<RemoteData<CatalogData> | null>(null);
export function useCatalogResource() {
  const value = useContext(CatalogResourceContext);
  if (!value) throw new Error('Catalog resource provider is required');
  return value;
}
export function useTaskCatalog() {
  const resource = useCatalogResource();
  if (!resource.data) throw new Error('CatalogBoundary is required');
  return resource.data;
}

export function useCatalogData(revision: number) {
  const load = useCallback(
    (signal: AbortSignal) => {
      void revision;
      return loadCatalog(signal);
    },
    [revision],
  );
  return useRemoteData(load);
}
