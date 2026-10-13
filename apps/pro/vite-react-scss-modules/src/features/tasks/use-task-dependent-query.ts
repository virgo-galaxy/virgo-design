import { useCallback } from 'react';

import { useRemoteData } from '@/shared/async/use-remote-data';

import { useTaskRevision } from './operations';
// Page-owned server resources share task invalidation, never a second stored task collection.
export function useTaskDependentQuery<T>(load: (signal: AbortSignal) => Promise<T>) {
  const revision = useTaskRevision();
  const refresh = useCallback(
    (signal: AbortSignal) => {
      void revision;
      return load(signal);
    },
    [load, revision],
  );
  return useRemoteData(refresh);
}
