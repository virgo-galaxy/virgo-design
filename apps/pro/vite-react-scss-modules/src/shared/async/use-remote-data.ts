import { useCallback, useEffect, useRef, useState } from 'react';
export interface RemoteData<T> {
  data: T | null;
  error: unknown;
  loading: boolean;
  retry: () => void;
  setData: (data: T) => void;
}
interface RemoteDataOptions {
  /** Different identities must never share data or errors, even before the next effect runs. */
  key?: string | undefined;
  /** Refresh the same resource while preserving its last successful result. */
  revision?: number;
}
export function useRemoteData<T>(
  load: (signal: AbortSignal) => Promise<T>,
  { key, revision = 0 }: RemoteDataOptions = {},
): RemoteData<T> {
  const [state, setState] = useState<{
    key: string | undefined;
    data: T | null;
    error: unknown;
    loading: boolean;
  }>({
    key,
    data: null,
    error: null,
    loading: true,
  });
  const activeRequest = useRef<{ key: string | undefined; controller: AbortController } | null>(
    null,
  );
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((value) => value + 1), []);
  useEffect(() => {
    const controller = new AbortController();
    activeRequest.current = { key, controller };
    // Keep the previous successful result during refresh, but never show stale errors.
    setState((previous) => ({
      key,
      data: previous.key === key ? previous.data : null,
      loading: true,
      error: null,
    }));
    async function read() {
      try {
        const data = await load(controller.signal);
        if (!controller.signal.aborted) setState({ key, data, loading: false, error: null });
      } catch (error) {
        if (!controller.signal.aborted)
          setState((previous) => ({ ...previous, loading: false, error }));
      }
    }
    void read();
    return () => controller.abort();
  }, [load, key, revision, attempt]);
  const setData = useCallback(
    (data: T) => {
      const request = activeRequest.current;
      if (!request || request.key !== key) return;
      request.controller.abort();
      setState({ key, data, loading: false, error: null });
    },
    [key],
  );
  const current = state.key === key ? state : { data: null, error: null, loading: true };
  return { data: current.data, error: current.error, loading: current.loading, retry, setData };
}
