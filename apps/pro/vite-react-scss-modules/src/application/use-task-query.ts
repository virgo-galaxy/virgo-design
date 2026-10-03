import { useCallback } from 'react';

import { getTasks, type TaskListQuery } from '@/api/tasks';

import { useProData } from './pro-data-context';
import { useRemoteData } from './use-remote-data';
export function useTaskQuery(query: TaskListQuery) {
  const { revision } = useProData();
  const key = JSON.stringify(query);
  const load = useCallback(
    (signal: AbortSignal) => {
      void revision;
      return getTasks(JSON.parse(key) as TaskListQuery, signal);
    },
    [key, revision],
  );
  return useRemoteData(load);
}
