'use client';

import { Skeleton } from '@virgo-design/ui';
import { type ReactNode, useEffect, useState } from 'react';

import { RemoteState } from '@/components/feedback/remote-state';
import {
  initializeDemoClient,
  retireMockWorker,
  startDemoSync,
  subscribeToDemoChanges,
} from '@/demo';
import { AppSessionProvider } from '@/features/auth/context/AppSessionProvider';
import { initializeAppLocale } from '@/i18n/bootstrap';
import { LocaleProvider } from '@/i18n/react';
import { startLocaleSync } from '@/i18n/runtime/locale';
import { NavigationProvider } from '@/routes/navigation';
import { disposeAppStores, initializeAppStores } from '@/store/bootstrap';

let starting: Promise<void> | undefined;

function initializeClient() {
  starting ??= (async () => {
    await initializeAppLocale();
    await retireMockWorker();
    if (process.env.NEXT_PUBLIC_DEMO_API === 'true') {
      await initializeDemoClient();
    }
  })().catch((error: unknown) => {
    starting = undefined;
    throw error;
  });
  return starting;
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    initializeAppStores();
    const stopLocaleSync = startLocaleSync();
    const stopDemoSync = process.env.NEXT_PUBLIC_DEMO_API === 'true' ? startDemoSync() : undefined;
    void initializeClient().then(
      () => {
        if (active) {
          setReady(true);
          setError(null);
        }
      },
      (reason: unknown) => {
        if (active) setError(reason instanceof Error ? reason : new Error(String(reason)));
      },
    );
    return () => {
      active = false;
      disposeAppStores();
      stopLocaleSync();
      stopDemoSync?.();
    };
  }, [attempt]);
  if (!ready)
    return error ? (
      <RemoteState error={error} retry={() => setAttempt((value) => value + 1)} />
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
    );
  return (
    <LocaleProvider>
      <NavigationProvider>
        <AppSessionProvider
          subscribeToChanges={
            process.env.NEXT_PUBLIC_DEMO_API === 'true' ? subscribeToDemoChanges : undefined
          }
        >
          {children}
        </AppSessionProvider>
      </NavigationProvider>
    </LocaleProvider>
  );
}
