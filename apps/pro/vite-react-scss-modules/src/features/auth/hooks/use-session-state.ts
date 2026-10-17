import { useEffect, useState } from 'react';

import { getSession, type LoginDto, logout, resetDemo, type SessionDto } from '@/api/auth';
import {
  clearAuthSession,
  expireAuthSession,
  getSessionExpiresAt,
  sessionExpiredEvent,
} from '@/lib/auth/session';
import { useRemoteData } from '@/shared/async/use-remote-data';

export function useSessionState({
  onSessionEnd,
  onSessionStart,
  onDemoReset,
}: {
  onSessionEnd: () => void;
  onSessionStart: () => void;
  onDemoReset: () => Promise<unknown>;
}) {
  const resource = useRemoteData(getSession);
  const [session, setSession] = useState<SessionDto | null>(null);
  const [expired, setExpired] = useState(false);
  const current = session ?? resource.data;

  const finish = () => {
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

    return () => window.removeEventListener(sessionExpiredEvent, onExpired);
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

      setExpired(false);
      finish();
    },
    async resetDemo() {
      const next = await resetDemo();
      if (next.authenticated) throw new Error('Demo reset did not end the session');

      await onDemoReset();

      setExpired(false);
      finish();
    },
  };
}
