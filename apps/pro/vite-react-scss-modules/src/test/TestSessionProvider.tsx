import type { ReactNode } from 'react';

import { SessionContext } from '@/application/session-context';
import { getStoredUser } from '@/lib/auth/session';

/** Tests choose the authenticated identity explicitly; production reads only SessionContext. */
export function TestSessionProvider({ children }: { children: ReactNode }) {
  const user = getStoredUser();
  if (!user) throw new Error('Sign in before rendering the test session');
  return (
    <SessionContext value={{ user, signOut: async () => {}, resetDemo: async () => {} }}>
      {children}
    </SessionContext>
  );
}
