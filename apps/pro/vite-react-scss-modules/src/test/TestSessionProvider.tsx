import type { ReactNode } from 'react';

import { SessionContext } from '@/features/auth';
import { TaskTableStoreProvider } from '@/features/tasks/store';
import { isAdmin } from '@/lib/auth/permissions';
import { getStoredUser } from '@/lib/auth/session';
import { ResourceStoreProvider } from '@/store/resources';

export function TestSessionProvider({ children }: { children: ReactNode }) {
  const user = getStoredUser();

  if (!user) throw new Error('Sign in before rendering the test session');

  return (
    <SessionContext value={{ user, signOut: async () => {}, endSession: () => {} }}>
      <ResourceStoreProvider>
        <TaskTableStoreProvider canPersist={isAdmin(user)}>{children}</TaskTableStoreProvider>
      </ResourceStoreProvider>
    </SessionContext>
  );
}
