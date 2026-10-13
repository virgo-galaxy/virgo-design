import { useCallback } from 'react';

import { getTasks, type TaskListQuery } from '@/api/tasks';
import { getTaskCollection } from '@/features/tasks/queries';
import { useRemoteData } from '@/shared/async/use-remote-data';

import { useTaskRevision } from './operations';
export function useTaskQuery(query: TaskListQuery, all = false) {
  const revision = useTaskRevision();
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
