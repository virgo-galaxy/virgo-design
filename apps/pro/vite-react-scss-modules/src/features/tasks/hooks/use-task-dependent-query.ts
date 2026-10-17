import { useRemoteData } from '@/shared/async/use-remote-data';

import { useTaskRevision } from '../data/operations';
// Page-owned server resources share task invalidation, never a second stored task collection.
export function useTaskDependentQuery<T>(load: (signal: AbortSignal) => Promise<T>, key?: string) {
  const revision = useTaskRevision();
  return useRemoteData(load, { key, revision });
}
