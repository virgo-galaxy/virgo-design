import { useCallback, useEffect, useState } from 'react';
export function useRemoteData<T>(load: (signal: AbortSignal) => Promise<T>) {
  const [state, setState] = useState<{ data: T | null; error: unknown; loading: boolean }>({
    data: null,
    error: null,
    loading: true,
  });
  const [revision, setRevision] = useState(0);
  const retry = useCallback(() => setRevision((value) => value + 1), []);
  useEffect(() => {
    const controller = new AbortController();
    // Keep the previous successful result during refresh, but never show stale errors.
    setState((previous) => ({ ...previous, loading: true, error: null }));
    void load(controller.signal).then(
      (data) => {
        if (!controller.signal.aborted) setState({ data, loading: false, error: null });
      },
      (error: unknown) => {
        if (!controller.signal.aborted)
          setState((previous) => ({ ...previous, loading: false, error }));
      },
    );
    return () => controller.abort();
  }, [load, revision]);
  return { ...state, retry };
}
