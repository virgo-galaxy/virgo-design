import { useCallback } from 'react';

import { useTaskRevision } from './pro-data-context';
import { useRemoteData } from './use-remote-data';
// Page-owned server resources share task invalidation, never a second stored task collection.
export function useResourceQuery<T>(load: (signal: AbortSignal) => Promise<T>) {
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
