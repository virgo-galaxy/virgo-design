import { type ReactNode, useState } from 'react';

import type { SessionUser } from '@/api/auth/types';
import { WorkspaceStoreProvider } from '@/features/ai-workspace/store';
import { HandoffStoreProvider } from '@/features/handoff/store';
import { TaskTableStoreProvider } from '@/features/tasks/store';
import { isAdmin } from '@/lib/auth/permissions';

import { createSessionStores } from './session-stores';

interface Props {
  user: SessionUser;
  children: ReactNode;
}

function SessionStoreScope({ user, children }: Props) {
  const admin = isAdmin(user);
  const [stores] = useState(() => createSessionStores(admin));

  return (
    <HandoffStoreProvider initialStore={stores.handoff}>
      <TaskTableStoreProvider initialStore={stores.tasks} canPersist={admin}>
        <WorkspaceStoreProvider initialStore={stores.workspace} allowed={admin}>
          {children}
        </WorkspaceStoreProvider>
      </TaskTableStoreProvider>
    </HandoffStoreProvider>
  );
}

export function SessionStoreProvider({ user, children }: Props) {
  return (
    <SessionStoreScope key={user.id} user={user}>
      {children}
    </SessionStoreScope>
  );
}
