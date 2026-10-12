import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import {
  createTask,
  deleteTasks,
  getProfile,
  type ProfileDto,
  updateProfile,
  updateTask,
  updateTaskStatus,
} from '@/api';
import type { TaskAction } from '@/data/tasks';
import { demoDataStorageKey } from '@/lib/data-events';

import { demoStorageChanges } from './demo-storage-changes';
import { loadProData } from './load-pro-data';
import {
  CatalogResourceContext,
  NotificationRevisionContext,
  ProfileResourceContext,
  TaskOperationsContext,
  TaskRevisionContext,
  WorkflowRevisionContext,
} from './pro-data-context';
import { useRemoteData } from './use-remote-data';

export function ProDataProvider({ children }: { children: ReactNode }) {
  const [taskRevision, setTaskRevision] = useState(0);
  const [catalogRevision, setCatalogRevision] = useState(0);
  const [profileRevision, setProfileRevision] = useState(0);
  const [notificationRevision, setNotificationRevision] = useState(0);
  const [workflowRevision, setWorkflowRevision] = useState(0);
  const catalogLoader = useCallback(
    (signal: AbortSignal) => {
      void catalogRevision;
      return loadProData(signal);
    },
    [catalogRevision],
  );
  const profileLoader = useCallback(
    (signal: AbortSignal) => {
      void profileRevision;
      return getProfile(signal);
    },
    [profileRevision],
  );
  const catalog = useRemoteData(catalogLoader);
  const profile = useRemoteData(profileLoader);
  const { setData: setProfileData } = profile;
  const invalidateTasks = useCallback(() => {
    setTaskRevision((value) => value + 1);
    setCatalogRevision((value) => value + 1);
    setNotificationRevision((value) => value + 1);
  }, []);
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.storageArea && event.storageArea !== window.localStorage) return;
      if (event.key !== demoDataStorageKey && event.key !== null) return;
      const changes = demoStorageChanges(event.oldValue, event.newValue);
      if (changes.tasks) invalidateTasks();
      else if (changes.notifications) setNotificationRevision((value) => value + 1);
      if (changes.catalog) setCatalogRevision((value) => value + 1);
      if (changes.profile) setProfileRevision((value) => value + 1);
      if (changes.workflows) setWorkflowRevision((value) => value + 1);
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, [invalidateTasks]);
  const dispatch = useCallback(
    async (action: TaskAction) => {
      const task =
        action.type === 'create'
          ? await createTask(action.draft)
          : action.type === 'edit'
            ? await updateTask(action.id, action.draft)
            : await updateTaskStatus(action.id, action.status);
      invalidateTasks();
      return task;
    },
    [invalidateTasks],
  );
  const removeTasks = useCallback(
    async (ids: readonly string[]) => {
      const result = await deleteTasks({ ids });
      invalidateTasks();
      return result.deletedIds;
    },
    [invalidateTasks],
  );
  const saveProfile = useCallback(
    async (next: ProfileDto | ((previous: ProfileDto) => ProfileDto)) => {
      if (typeof next === 'function' && !profile.data)
        throw new Error('Profile must be loaded before saving');
      const saved = await updateProfile(typeof next === 'function' ? next(profile.data!) : next);
      setProfileData(saved);
    },
    [profile.data, setProfileData],
  );
  const operations = useMemo(() => ({ dispatch, removeTasks }), [dispatch, removeTasks]);
  return (
    <TaskOperationsContext.Provider value={operations}>
      <TaskRevisionContext.Provider value={taskRevision}>
        <NotificationRevisionContext.Provider value={notificationRevision}>
          <WorkflowRevisionContext.Provider value={workflowRevision}>
            <CatalogResourceContext.Provider value={catalog}>
              <ProfileResourceContext.Provider value={{ ...profile, saveProfile }}>
                {children}
              </ProfileResourceContext.Provider>
            </CatalogResourceContext.Provider>
          </WorkflowRevisionContext.Provider>
        </NotificationRevisionContext.Provider>
      </TaskRevisionContext.Provider>
    </TaskOperationsContext.Provider>
  );
}
