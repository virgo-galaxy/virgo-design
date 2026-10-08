import { type ReactNode, useCallback, useEffect, useState } from 'react';

import {
  createTask,
  deleteTasks,
  getAnalyticsOverview,
  getTaskMetadata,
  getWorkplaceOverview,
  type ProfileDto,
  updateProfile,
  updateTask,
  updateTaskStatus,
} from '@/api';
import type { TaskAction } from '@/data/tasks';
import { demoDataStorageKey, tasksChangedEvent } from '@/lib/data-events';

import { loadProData } from './load-pro-data';
import { type BootstrapData, ProDataContext } from './pro-data-context';
import { RemoteState } from './RemoteState';
import { getAllTasks } from './task-queries';
import { useRemoteData } from './use-remote-data';
function ReadyData({ initial, children }: { initial: BootstrapData; children: ReactNode }) {
  const [data, setData] = useState(initial);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const update = () => setRevision((value) => value + 1);
    const storage = (event: StorageEvent) => {
      if (event.key === demoDataStorageKey) update();
    };
    window.addEventListener(tasksChangedEvent, update);
    window.addEventListener('storage', storage);
    return () => {
      window.removeEventListener(tasksChangedEvent, update);
      window.removeEventListener('storage', storage);
    };
  }, []);
  const loadTaskCollection = useCallback(
    async (signal: AbortSignal) => {
      // Legacy collection-based pages load only on entry, not during application bootstrap.
      void revision;
      const tasks = await getAllTasks({}, signal);
      if (!signal.aborted) setData((previous) => ({ ...previous, tasks }));
      return true;
    },
    [revision],
  );
  const refreshOverview = useCallback(async (signal: AbortSignal) => {
    const [workplace, analytics] = await Promise.all([
      getWorkplaceOverview(signal),
      getAnalyticsOverview(signal),
    ]);
    if (!signal.aborted)
      setData((previous) => ({
        ...previous,
        workplace,
        analytics,
        metadata: { ...previous.metadata, referenceDate: workplace.snapshot.date },
      }));
  }, []);
  const refreshMetadata = useCallback(
    async (signal: AbortSignal) => {
      if (!revision) return;
      const metadata = await getTaskMetadata(signal);
      if (!signal.aborted) setData((previous) => ({ ...previous, metadata }));
    },
    [revision],
  );
  useRemoteData(refreshMetadata);
  const dispatch = async (action: TaskAction) => {
    const task =
      action.type === 'create'
        ? await createTask(action.draft)
        : action.type === 'edit'
          ? await updateTask(action.id, action.draft)
          : await updateTaskStatus(action.id, action.status);
    setData((previous) => ({
      ...previous,
      tasks:
        action.type === 'create'
          ? [task, ...previous.tasks]
          : previous.tasks.map((item) => (item.id === task.id ? task : item)),
    }));
    return task;
  };
  const removeTasks = async (ids: readonly string[]) => {
    const { deletedIds } = await deleteTasks({ ids });
    const removed = new Set(deletedIds);
    setData((previous) => ({
      ...previous,
      tasks: previous.tasks.filter((task) => !removed.has(task.id)),
    }));
    return deletedIds;
  };
  const saveProfile = async (next: ProfileDto | ((previous: ProfileDto) => ProfileDto)) => {
    const profile = await updateProfile(typeof next === 'function' ? next(data.profile) : next);
    setData((previous) => ({ ...previous, profile }));
  };
  return (
    <ProDataContext.Provider
      value={{
        ...data,
        ...data.analytics,
        ...data.workplace,
        taskAssignees: data.metadata.members,
        taskProjects: data.metadata.projects,
        taskReferenceDate: data.metadata.referenceDate,
        state: { tasks: data.tasks },
        dispatch,
        removeTasks,
        revision,
        refreshOverview,
        loadTaskCollection,
        saveProfile,
      }}
    >
      {children}
    </ProDataContext.Provider>
  );
}
export function ProDataProvider({ children }: { children: ReactNode }) {
  const resource = useRemoteData(loadProData);
  if (resource.error || !resource.data)
    return <RemoteState loading={resource.loading} error={resource.error} retry={resource.retry} />;
  return <ReadyData initial={resource.data}>{children}</ReadyData>;
}
