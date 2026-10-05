import { Button } from '@virgo-design/ui';
import { type ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { enterDemoSession, getSession, logout } from '@/api/auth';

import { saveAgentMode } from './agent-mode';
import { ProDataProvider } from './ProDataProvider';
import { RemoteState } from './RemoteState';
import { SessionContext } from './session-context';
import styles from './SessionBoundary.module.scss';
import { useRemoteData } from './use-remote-data';
import { userDetailsCache } from './user-details-cache';

export function SessionBoundary({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const resource = useRemoteData(getSession);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [entering, setEntering] = useState(false);
  const [error, setError] = useState(false);
  const sessionAuthenticated = authenticated ?? resource.data?.authenticated;

  useEffect(() => {
    if (sessionAuthenticated === false) saveAgentMode(false);
  }, [sessionAuthenticated]);

  if (!resource.data)
    return <RemoteState loading={resource.loading} error={resource.error} retry={resource.retry} />;

  if (!sessionAuthenticated)
    return (
      <main className={styles.screen}>
        <section className={styles.card} aria-labelledby="signed-out-title">
          <h1 id="signed-out-title">{t('app.signedOut')}</h1>
          <p>{t('app.signedOutDescription')}</p>
          {error ? <p role="alert">{t('app.signInFailed')}</p> : null}
          {import.meta.env.VITE_API_MOCKING === 'true' ? (
            <Button
              disabled={entering}
              aria-busy={entering}
              onClick={async () => {
                setEntering(true);
                setError(false);
                try {
                  const session = await enterDemoSession();
                  setAuthenticated(session.authenticated);
                } catch {
                  setError(true);
                } finally {
                  setEntering(false);
                }
              }}
            >
              {t('app.enterDemoWorkspace')}
            </Button>
          ) : null}
        </section>
      </main>
    );

  return (
    <SessionContext.Provider
      value={{
        signOut: async () => {
          const session = await logout();
          if (session.authenticated) throw new Error('Session was not ended');
          saveAgentMode(false);
          userDetailsCache.clear();
          setAuthenticated(false);
        },
      }}
    >
      <ProDataProvider>{children}</ProDataProvider>
    </SessionContext.Provider>
  );
}
