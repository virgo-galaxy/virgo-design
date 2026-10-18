'use client';

import type { ReactNode } from 'react';

import { RemoteState } from '@/components/feedback/remote-state';
import { userDetailsCache } from '@/features/users';
import { clearStoredSessionState, SessionStoreProvider } from '@/store';
import type { ResourceSubscriber } from '@/store/resources';

import { useSessionState } from '../hooks/use-session-state';
import { AppSessionContext } from './app-session-context';
import { SessionContext } from './session-context';

function clearSessionState() {
  clearStoredSessionState();
  userDetailsCache.clear();
}

export function AppSessionProvider({
  children,
  subscribeToChanges,
}: {
  children: ReactNode;
  subscribeToChanges?: ResourceSubscriber | undefined;
}) {
  const state = useSessionState({
    onSessionStart: clearSessionState,
    onSessionEnd: clearSessionState,
  });
  if (!state.current)
    return (
      <RemoteState
        loading={state.resource.loading}
        error={state.resource.error}
        retry={state.resource.retry}
      />
    );
  const content = <AppSessionContext value={state}>{children}</AppSessionContext>;
  const user = state.current.authenticated ? state.current.user : undefined;
  return user ? (
    <SessionContext value={{ user, signOut: state.signOut, endSession: state.endSession }}>
      <SessionStoreProvider user={user} subscribeToChanges={subscribeToChanges}>
        {content}
      </SessionStoreProvider>
    </SessionContext>
  ) : (
    content
  );
}
