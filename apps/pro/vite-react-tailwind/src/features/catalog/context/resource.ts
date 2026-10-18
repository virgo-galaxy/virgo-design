import { createContext, useContext } from 'react';

import type { ProjectDto } from '@/api/projects/types';
import type { TaskMetadataDto } from '@/api/tasks/types';
import { type RemoteData, useRemoteData } from '@/hooks/async/use-remote-data';
import { useResourceRevision } from '@/store/resources';

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

export function useCatalogData() {
  const revision = useResourceRevision('catalog');
  return useRemoteData(loadCatalog, { revision });
}
