import { type ReactNode, useEffect, useState } from 'react';

import { getSession, type LoginDto, logout, resetDemo, type SessionDto } from '@/api/auth';
import { resetAppLocale } from '@/i18n/runtime';
import { clearAuthSession, sessionExpiredEvent } from '@/lib/auth/session';

import { saveAgentMode } from './agent-mode';
import { LoginPage } from './LoginPage';
import { ProDataProvider } from './ProDataProvider';
import { RemoteState } from './RemoteState';
import { SessionContext } from './session-context';
import { useRemoteData } from './use-remote-data';
import { userDetailsCache } from './user-details-cache';
export function SessionBoundary({ children }: { children: ReactNode }) {
  const resource = useRemoteData(getSession);
  const [session, setSession] = useState<SessionDto | null>(null);
  const [expired, setExpired] = useState(false);
  const current = session ?? resource.data;
  const finish = () => {
    clearAuthSession();
    saveAgentMode(false);
    userDetailsCache.clear();
    window.history.replaceState(null, '', '/login');
    setSession({ authenticated: false });
  };
  useEffect(() => {
    const onExpired = () => {
      clearAuthSession();
      saveAgentMode(false);
      userDetailsCache.clear();
      window.history.replaceState(null, '', '/login');
      setSession({ authenticated: false });
      setExpired(true);
    };
    window.addEventListener(sessionExpiredEvent, onExpired);
    return () => window.removeEventListener(sessionExpiredEvent, onExpired);
  }, []);
  useEffect(() => {
    if (current && !current.authenticated) {
      clearAuthSession();
      window.history.replaceState(null, '', '/login');
    }
  }, [current]);
  if (!current)
    return <RemoteState loading={resource.loading} error={resource.error} retry={resource.retry} />;
  if (!current.authenticated || !current.user)
    return (
      <LoginPage
        expired={expired}
        onLogin={(next: LoginDto) => {
          userDetailsCache.clear();
          setExpired(false);
          window.history.replaceState(null, '', '/dashboard/workplace');
          setSession(next);
        }}
      />
    );
  return (
    <SessionContext.Provider
      value={{
        user: current.user,
        signOut: async () => {
          await logout();
          setExpired(false);
          finish();
        },
        resetDemo: async () => {
          const next = await resetDemo();
          if (next.authenticated) throw new Error('Demo reset did not end the session');
          await resetAppLocale();
          setExpired(false);
          finish();
        },
      }}
    >
      <ProDataProvider key={current.user.id}>{children}</ProDataProvider>
    </SessionContext.Provider>
  );
}
