import { useRemoteData } from '@/hooks/use-remote-data';

import { useTaskRevision } from '../data/operations';

export function useTaskDependentQuery<T>(load: (signal: AbortSignal) => Promise<T>, key?: string) {
  const revision = useTaskRevision();
  return useRemoteData(load, { key, revision });
}
