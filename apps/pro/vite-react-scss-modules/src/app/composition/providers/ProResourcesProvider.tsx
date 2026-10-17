import { type ReactNode, useCallback, useEffect, useState } from 'react';

import { CatalogResourceContext, useCatalogData } from '@/features/catalog';
import { WorkflowRevisionContext } from '@/features/handoff';
import { NotificationRevisionContext } from '@/features/notifications';
import {
  ProfileIdentityResourceContext,
  ProfileRevisionContext,
  useProfileIdentityData,
} from '@/features/profile';
import { TaskOperationsContext, TaskRevisionContext, useTaskCommands } from '@/features/tasks';
import { demoDataStorageKey } from '@/lib/demo/data-events';
import { localStorageAccess } from '@/lib/storage';

import { demoStorageChanges } from './demo-storage-changes';

export function ProResourcesProvider({ children }: { children: ReactNode }) {
  const [taskRevision, setTaskRevision] = useState(0);
  const [catalogRevision, setCatalogRevision] = useState(0);
  const [profileRevision, setProfileRevision] = useState(0);
  const [notificationRevision, setNotificationRevision] = useState(0);
  const [workflowRevision, setWorkflowRevision] = useState(0);
  const catalog = useCatalogData(catalogRevision);
  const profile = useProfileIdentityData(profileRevision);
  const invalidateTasks = useCallback(() => {
    setTaskRevision((value) => value + 1);
    setCatalogRevision((value) => value + 1);
    setNotificationRevision((value) => value + 1);
  }, []);
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (!localStorageAccess.matchesEvent(event)) return;
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
  const operations = useTaskCommands(invalidateTasks);
  return (
    <TaskOperationsContext.Provider value={operations}>
      <TaskRevisionContext.Provider value={taskRevision}>
        <NotificationRevisionContext.Provider value={notificationRevision}>
          <WorkflowRevisionContext.Provider value={workflowRevision}>
            <CatalogResourceContext.Provider value={catalog}>
              <ProfileRevisionContext value={profileRevision}>
                <ProfileIdentityResourceContext.Provider value={profile}>
                  {children}
                </ProfileIdentityResourceContext.Provider>
              </ProfileRevisionContext>
            </CatalogResourceContext.Provider>
          </WorkflowRevisionContext.Provider>
        </NotificationRevisionContext.Provider>
      </TaskRevisionContext.Provider>
    </TaskOperationsContext.Provider>
  );
}
