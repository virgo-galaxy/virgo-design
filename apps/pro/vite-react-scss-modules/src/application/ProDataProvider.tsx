import { type ReactNode, useCallback, useState } from 'react';

import {
  createTask,
  getAnalyticsOverview,
  getWorkplaceOverview,
  type ProfileDto,
  updateProfile,
  updateTask,
  updateTaskStatus,
} from '@/api';
import type { TaskAction } from '@/data/tasks';

import { loadProData } from './load-pro-data';
import { type BootstrapData, ProDataContext } from './pro-data-context';
import { RemoteState } from './RemoteState';
import { useRemoteData } from './use-remote-data';
function ReadyData({ initial, children }: { initial: BootstrapData; children: ReactNode }) {
  const [data, setData] = useState(initial);
  const [revision, setRevision] = useState(0);
  const refreshOverview = useCallback(async (signal: AbortSignal) => {
    const [workplace, analytics] = await Promise.all([
      getWorkplaceOverview(signal),
      getAnalyticsOverview(signal),
    ]);
    if (!signal.aborted) setData((previous) => ({ ...previous, workplace, analytics }));
  }, []);
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
    setRevision((value) => value + 1);
    return task;
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
        revision,
        refreshOverview,
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
