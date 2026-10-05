import { createContext, useContext } from 'react';

export const SessionContext = createContext<{ signOut: () => Promise<void> } | null>(null);

export function useSession() {
  const session = useContext(SessionContext);
  if (!session) throw new Error('SessionBoundary is required');
  return session;
}
