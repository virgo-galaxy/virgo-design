'use client';
import { createContext, useContext } from 'react';

import type { useSessionState } from '../hooks/use-session-state';

type AppSession = ReturnType<typeof useSessionState>;
export const AppSessionContext = createContext<AppSession | null>(null);
export function useAppSession() {
  const state = useContext(AppSessionContext);
  if (!state) throw new Error('AppSessionProvider is required');
  return state;
}
