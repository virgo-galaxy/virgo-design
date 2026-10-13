import { useCallback, useMemo } from 'react';

import { createTask, deleteTasks, updateTask, updateTaskStatus } from '@/api/tasks';

import type { TaskAction } from './model';
export function useTaskCommands(onChanged: () => void) {
  const dispatch = useCallback(
    async (action: TaskAction) => {
      const task =
        action.type === 'create'
          ? await createTask(action.draft)
          : action.type === 'edit'
            ? await updateTask(action.id, action.draft)
            : await updateTaskStatus(action.id, action.status);
      onChanged();
      return task;
    },
    [onChanged],
  );
  const removeTasks = useCallback(
    async (ids: readonly string[]) => {
      const result = await deleteTasks({ ids });
      onChanged();
      return result.deletedIds;
    },
    [onChanged],
  );
  const operations = useMemo(() => ({ dispatch, removeTasks }), [dispatch, removeTasks]);
  return operations;
}
