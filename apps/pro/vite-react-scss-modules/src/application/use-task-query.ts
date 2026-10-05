import { useCallback } from 'react';

import { getTasks, type TaskListQuery } from '@/api/tasks';

import { useProData } from './pro-data-context';
import { getTaskCollection } from './task-queries';
import { useRemoteData } from './use-remote-data';
export function useTaskQuery(query: TaskListQuery, all = false) {
  const { revision } = useProData();
  const key = JSON.stringify(query);
  const load = useCallback(
    (signal: AbortSignal) => {
      void revision;
      return (all ? getTaskCollection : getTasks)(JSON.parse(key) as TaskListQuery, signal);
    },
    [key, revision, all],
  );
  return useRemoteData(load);
}
