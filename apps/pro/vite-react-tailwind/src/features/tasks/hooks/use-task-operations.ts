import { useCallback, useMemo } from 'react';

import { createTask, deleteTasks, updateTask, updateTaskStatus } from '@/api/tasks';
import { useInvalidateResources } from '@/store/resources';

import type { TaskAction } from '../model/task';

export function useTaskOperations() {
  const invalidate = useInvalidateResources();

  const dispatch = useCallback(
    async (action: TaskAction) => {
      const task =
        action.type === 'create'
          ? await createTask(action.draft)
          : action.type === 'edit'
            ? await updateTask(action.id, action.draft)
            : await updateTaskStatus(action.id, action.status);

      invalidate({ tasks: true });

      return task;
    },
    [invalidate],
  );

  const removeTasks = useCallback(
    async (ids: readonly string[]) => {
      const result = await deleteTasks({ ids });

      invalidate({ tasks: true });

      return result.deletedIds;
    },
    [invalidate],
  );

  const operations = useMemo(() => ({ dispatch, removeTasks }), [dispatch, removeTasks]);
  return operations;
}
