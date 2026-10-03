import { useCallback } from 'react';

import { useProData } from './pro-data-context';
import { useRemoteData } from './use-remote-data';
export function useOverviewRefresh() {
  const { revision, refreshOverview } = useProData();
  const load = useCallback(
    async (signal: AbortSignal) => {
      void revision;
      await refreshOverview(signal);
      return true;
    },
    [revision, refreshOverview],
  );
  return useRemoteData(load);
}
