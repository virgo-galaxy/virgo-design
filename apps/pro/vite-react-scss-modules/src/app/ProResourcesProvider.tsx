import { type ReactNode, useCallback, useEffect, useState } from 'react';

import { demoStorageChanges } from '@/app/demo-storage-changes';
import { CatalogResourceContext, useCatalogData } from '@/features/catalog';
import { WorkflowRevisionContext } from '@/features/handoff';
import { NotificationRevisionContext } from '@/features/notifications';
import { ProfileResourceContext, useProfileData } from '@/features/profile';
import { TaskOperationsContext, TaskRevisionContext, useTaskCommands } from '@/features/tasks';
import { demoDataStorageKey } from '@/lib/data-events';

export function ProResourcesProvider({ children }: { children: ReactNode }) {
  const [taskRevision, setTaskRevision] = useState(0);
  const [catalogRevision, setCatalogRevision] = useState(0);
  const [profileRevision, setProfileRevision] = useState(0);
  const [notificationRevision, setNotificationRevision] = useState(0);
  const [workflowRevision, setWorkflowRevision] = useState(0);
  const catalog = useCatalogData(catalogRevision);
  const profile = useProfileData(profileRevision);
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
  const operations = useTaskCommands(invalidateTasks);
  return (
    <TaskOperationsContext.Provider value={operations}>
      <TaskRevisionContext.Provider value={taskRevision}>
        <NotificationRevisionContext.Provider value={notificationRevision}>
          <WorkflowRevisionContext.Provider value={workflowRevision}>
            <CatalogResourceContext.Provider value={catalog}>
              <ProfileResourceContext.Provider value={profile}>
                {children}
              </ProfileResourceContext.Provider>
            </CatalogResourceContext.Provider>
          </WorkflowRevisionContext.Provider>
        </NotificationRevisionContext.Provider>
      </TaskRevisionContext.Provider>
    </TaskOperationsContext.Provider>
  );
}
