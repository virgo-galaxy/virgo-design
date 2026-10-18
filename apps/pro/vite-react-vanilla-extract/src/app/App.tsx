import { Button, Result, Skeleton } from '@virgo-design/ui';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RouterProvider } from 'react-router';

import { LocaleProvider } from '@/i18n/react';

import {
  type AppInitialization,
  initialApp,
  initializeApp,
  StorageUnavailableError,
} from './bootstrap/initialize';

function StartupFailure({ error, retry }: { error: Error; retry: () => void }) {
  const { t } = useTranslation();
  return (
    <Result
      status="error"
      headingLevel={1}
      title={t('shared.startup.error')}
      description={t(
        error instanceof StorageUnavailableError
          ? 'shared.startup.storage'
          : 'shared.startup.failed',
      )}
      primaryAction={<Button onClick={retry}>{t('shared.remote.retry')}</Button>}
    />
  );
}

export function App() {
  const [result, setResult] = useState<AppInitialization | null>(null);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    void (attempt === 0 ? initialApp : initializeApp()).then((next) => {
      if (active) setResult(next);
    });
    return () => {
      active = false;
    };
  }, [attempt]);

  return (
    <LocaleProvider>
      {result && 'router' in result ? (
        <RouterProvider router={result.router} />
      ) : result && 'error' in result ? (
        <StartupFailure
          error={result.error}
          retry={() => {
            if (!(result.error instanceof StorageUnavailableError)) {
              window.location.reload();
              return;
            }
            setResult(null);
            setAttempt((value) => value + 1);
          }}
        />
      ) : (
        <div
          role="status"
          aria-label="Loading"
          style={{ padding: 'var(--vd-spacing-24)', display: 'grid', gap: 'var(--vd-spacing-16)' }}
        >
          <Skeleton variant="text" />
          <Skeleton style={{ height: 100 }} />
          <Skeleton style={{ height: 220 }} />
        </div>
      )}
    </LocaleProvider>
  );
}
