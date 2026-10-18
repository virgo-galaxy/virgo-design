// @vitest-environment jsdom
import { act, renderHook, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import { useRemoteData } from './use-remote-data';

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<T>((done, fail) => {
    resolve = done;
    reject = fail;
  });
  return { promise, resolve, reject };
}

it('never exposes another resource during the first render of an identity change', async () => {
  const next = deferred<string>();
  const load = vi.fn(async () => 'Project A').mockImplementationOnce(async () => 'Project A');
  const renders: { key: string; data: string | null; error: unknown }[] = [];
  const { result, rerender } = renderHook(
    ({ identity }) => {
      const resource = useRemoteData(load, { key: identity });
      renders.push({ key: identity, data: resource.data, error: resource.error });
      return resource;
    },
    { initialProps: { identity: 'a' } },
  );
  await waitFor(() => expect(result.current.data).toBe('Project A'));
  load.mockImplementation(() => next.promise);
  rerender({ identity: 'b' });
  expect(result.current).toMatchObject({ data: null, error: null, loading: true });
  expect(
    renders.filter((render) => render.key === 'b').every((render) => render.data === null),
  ).toBe(true);
  await act(async () => next.resolve('Project B'));
  expect(result.current.data).toBe('Project B');
});

it('retains the same resource during refresh and failure, then recovers on retry', async () => {
  const refresh = deferred<string>();
  const load = vi.fn(async () => 'Saved data');
  const { result, rerender } = renderHook(
    ({ revision }) => useRemoteData(load, { key: 'project', revision }),
    { initialProps: { revision: 0 } },
  );
  await waitFor(() => expect(result.current.data).toBe('Saved data'));
  load.mockImplementationOnce(() => refresh.promise);
  rerender({ revision: 1 });
  expect(result.current).toMatchObject({ data: 'Saved data', loading: true });
  const failure = new Error('Offline');
  await act(async () => refresh.reject(failure));
  expect(result.current).toMatchObject({ data: 'Saved data', loading: false, error: failure });
  load.mockResolvedValueOnce('Fresh data');
  act(() => result.current.retry());
  await waitFor(() => expect(result.current.data).toBe('Fresh data'));
  expect(result.current.error).toBeNull();
});

it('discards errors from the previous identity', async () => {
  const failure = new Error('Project A unavailable');
  const next = deferred<string>();
  const load = vi.fn<() => Promise<string>>().mockRejectedValueOnce(failure);
  const { result, rerender } = renderHook(
    ({ identity }) => useRemoteData(load, { key: identity }),
    { initialProps: { identity: 'a' } },
  );
  await waitFor(() => expect(result.current.error).toBe(failure));
  load.mockImplementationOnce(() => next.promise);
  rerender({ identity: 'b' });
  expect(result.current).toMatchObject({ data: null, error: null, loading: true });
  await act(async () => next.resolve('Project B'));
});

it('does not let a save from a departed resource cancel or replace the current read', async () => {
  const next = deferred<string>();
  let currentSignal: AbortSignal | undefined;
  const load = vi.fn<(signal: AbortSignal) => Promise<string>>(async () => 'Project A');
  const { result, rerender } = renderHook(
    ({ identity }) => useRemoteData(load, { key: identity }),
    { initialProps: { identity: 'a' } },
  );
  await waitFor(() => expect(result.current.data).toBe('Project A'));
  const savePrevious = result.current.setData;
  load.mockImplementation((signal) => {
    currentSignal = signal;
    return next.promise;
  });
  rerender({ identity: 'b' });
  act(() => savePrevious('Saved project A'));
  expect(currentSignal?.aborted).toBe(false);
  expect(result.current.data).toBeNull();
  await act(async () => next.resolve('Project B'));
  expect(result.current.data).toBe('Project B');
});

it('reports a loader that throws before returning its promise through the resource error state', async () => {
  const failure = new Error('Invalid configuration');
  const load = () => {
    throw failure;
  };
  const { result } = renderHook(() => useRemoteData(load));
  await waitFor(() => expect(result.current.error).toBe(failure));
  expect(result.current.loading).toBe(false);
});

it('aborts a replaced loader and ignores its late result', async () => {
  const previous = deferred<string>();
  let previousSignal: AbortSignal | undefined;
  const first = (signal: AbortSignal) => {
    previousSignal = signal;
    return previous.promise;
  };
  const { result, rerender } = renderHook(({ load }) => useRemoteData(load), {
    initialProps: { load: first },
  });
  rerender({ load: async () => 'Newest result' });
  await waitFor(() => expect(result.current.data).toBe('Newest result'));
  expect(previousSignal?.aborted).toBe(true);
  await act(async () => previous.resolve('Old result'));
  expect(result.current.data).toBe('Newest result');
});

it('keeps a successful save when an older read resolves afterwards', async () => {
  const previous = deferred<string>();
  const load = () => previous.promise;
  const { result } = renderHook(() => useRemoteData(load));
  act(() => result.current.setData('Saved mutation'));
  await act(async () => previous.resolve('Older read'));
  expect(result.current.data).toBe('Saved mutation');
});
