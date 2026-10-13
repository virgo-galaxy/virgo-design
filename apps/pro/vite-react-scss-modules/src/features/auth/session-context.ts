import { createContext, useContext } from 'react';

import type { SessionUser } from '@/api/auth';

export const SessionContext = createContext<{
  user: SessionUser;
  signOut: () => Promise<void>;
  resetDemo: () => Promise<void>;
} | null>(null);

export function useSession() {
  const session = useContext(SessionContext);
  if (!session) throw new Error('An authenticated session is required');
  return session;
}

export function useCurrentUser() {
  return useSession().user;
}
