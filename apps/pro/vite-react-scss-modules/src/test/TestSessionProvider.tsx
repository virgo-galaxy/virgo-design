import type { ReactNode } from 'react';

import { SessionContext } from '@/features/auth';
import { TaskTableStoreProvider } from '@/features/tasks/store';
import { isAdmin } from '@/lib/auth/permissions';
import { getStoredUser } from '@/lib/auth/session';

export function TestSessionProvider({ children }: { children: ReactNode }) {
  const user = getStoredUser();

  if (!user) throw new Error('Sign in before rendering the test session');

  return (
    <SessionContext value={{ user, signOut: async () => {}, resetDemo: async () => {} }}>
      <TaskTableStoreProvider canPersist={isAdmin(user)}>{children}</TaskTableStoreProvider>
    </SessionContext>
  );
}
