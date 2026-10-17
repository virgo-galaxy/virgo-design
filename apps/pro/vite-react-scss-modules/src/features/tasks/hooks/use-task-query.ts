import { useCallback } from 'react';

import { getTasks, type TaskListQuery } from '@/api/tasks';
import { useRemoteData } from '@/shared/async/use-remote-data';

import { useTaskRevision } from '../data/operations';
import { getTaskCollection } from '../data/queries';
export function useTaskQuery(query: TaskListQuery, mode: 'page' | 'collection' = 'page') {
  const revision = useTaskRevision();
  const key = JSON.stringify(query);
  const load = useCallback(
    async (signal: AbortSignal) => ({
      key,
      mode,
      result: await (mode === 'collection' ? getTaskCollection : getTasks)(
        JSON.parse(key) as TaskListQuery,
        signal,
      ),
    }),
    [key, mode],
  );
  // Keep the mounted table and its focused header controls while its query refreshes.
  const resource = useRemoteData(load, { revision });
  const current = resource.data?.key === key && resource.data.mode === mode;
  return {
    data: resource.data?.result ?? null,
    error: resource.error,
    loading: resource.loading || (!current && !resource.error),
    retry: resource.retry,
  };
}
