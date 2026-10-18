import { type ReactNode, useState } from 'react';

import type { SessionUser } from '@/api/auth/types';
import { WorkspaceStoreProvider } from '@/features/ai-workspace/store';
import { HandoffStoreProvider } from '@/features/handoff/store';
import { TaskTableStoreProvider } from '@/features/tasks/store';
import { isAdmin } from '@/lib/auth/permissions';

import { ResourceStoreProvider, type ResourceSubscriber } from '../resources';
import { createSessionStores } from './session-stores';

interface Props {
  user: SessionUser;
  subscribeToChanges?: ResourceSubscriber | undefined;
  children: ReactNode;
}

function SessionStoreScope({ user, subscribeToChanges, children }: Props) {
  const admin = isAdmin(user);
  const [stores] = useState(() => createSessionStores(admin));

  return (
    <ResourceStoreProvider initialStore={stores.resources} subscribeToChanges={subscribeToChanges}>
      <HandoffStoreProvider initialStore={stores.handoff}>
        <TaskTableStoreProvider initialStore={stores.tasks} canPersist={admin}>
          <WorkspaceStoreProvider initialStore={stores.workspace} allowed={admin}>
            {children}
          </WorkspaceStoreProvider>
        </TaskTableStoreProvider>
      </HandoffStoreProvider>
    </ResourceStoreProvider>
  );
}

export function SessionStoreProvider({ user, subscribeToChanges, children }: Props) {
  return (
    <SessionStoreScope key={user.id} user={user} subscribeToChanges={subscribeToChanges}>
      {children}
    </SessionStoreScope>
  );
}
