import { type ReactNode, useEffect, useState } from 'react';

import { enableMocking } from '@/mock';

import { ProDataProvider } from './ProDataProvider';
import { RemoteState } from './RemoteState';
export function AppBootstrap({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    void enableMocking().then(
      () => {
        if (active) setReady(true);
      },
      (failure: unknown) => {
        if (active) setError(failure);
      },
    );
    return () => {
      active = false;
    };
  }, [attempt]);
  if (!ready)
    return (
      <RemoteState
        loading={!error}
        error={error}
        retry={() => {
          setError(null);
          setAttempt((v) => v + 1);
        }}
      />
    );
  return <ProDataProvider>{children}</ProDataProvider>;
}
