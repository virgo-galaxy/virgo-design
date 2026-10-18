import { useEffect, useState } from 'react';

import { getSession, logout } from '@/api/auth';
import type { LoginDto, SessionDto } from '@/api/auth/types';
import { useRemoteData } from '@/hooks/async/use-remote-data';
import {
  clearAuthSession,
  expireAuthSession,
  getSessionExpiresAt,
  sessionExpiredEvent,
} from '@/lib/auth/session';
import { subscribeToSessionReset } from '@/lib/auth/session-reset';

export function useSessionState({
  onSessionEnd,
  onSessionStart,
}: {
  onSessionEnd: () => void;
  onSessionStart: () => void;
}) {
  const resource = useRemoteData(getSession);
  const [session, setSession] = useState<SessionDto | null>(null);
  const [expired, setExpired] = useState(false);
  const current = session ?? resource.data;

  const endSession = () => {
    setExpired(false);
    clearAuthSession();
    onSessionEnd();
    setSession({ authenticated: false });
  };

  useEffect(() => {
    const onExpired = () => {
      clearAuthSession();
      onSessionEnd();
      setSession({ authenticated: false });
      setExpired(true);
    };

    window.addEventListener(sessionExpiredEvent, onExpired);
    const stopResetSync = subscribeToSessionReset(onExpired);

    return () => {
      window.removeEventListener(sessionExpiredEvent, onExpired);
      stopResetSync();
    };
  }, [onSessionEnd]);

  useEffect(() => {
    if (current && !current.authenticated) {
      clearAuthSession();
    }
  }, [current]);

  useEffect(() => {
    if (!current?.authenticated) return;

    const expiresAt = getSessionExpiresAt();
    if (!expiresAt) return;

    const remaining = Date.parse(expiresAt) - Date.now();
    if (!Number.isFinite(remaining)) return;

    const timer = window.setTimeout(expireAuthSession, Math.max(0, remaining));

    return () => window.clearTimeout(timer);
  }, [current]);

  return {
    current,
    expired,
    resource,
    onLogin(next: LoginDto) {
      onSessionStart();
      setExpired(false);
      setSession(next);
    },
    async signOut() {
      await logout();

      endSession();
    },
    endSession,
  };
}
