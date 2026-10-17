// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, expect, it, vi } from 'vitest';

import { prepareHandoff } from '@/api/workflows';
import type { WorkflowReceiptDto } from '@/contracts/workflows';
import { sampleError, sampleSuccess } from '@/mock/fixtures/workflows';

import { HandoffStoreProvider } from '../store';
import { useHandoffSession } from './use-handoff-session';

vi.mock('@/api/workflows', () => ({ prepareHandoff: vi.fn() }));
afterEach(() => vi.resetAllMocks());

function wrapper({ children }: { children: ReactNode }) {
  return <HandoffStoreProvider>{children}</HandoffStoreProvider>;
}

it('shares a recovered draft and step between the handoff and result readers', () => {
  const view = renderHook(() => ({ handoff: useHandoffSession(), result: useHandoffSession() }), {
    wrapper,
  });
  act(() => view.result.current.result.recover(sampleError));
  expect(view.result.current.handoff.draft).toMatchObject({
    projectId: sampleError.projectId,
    taskIds: sampleError.taskIds,
    confirmed: false,
  });
  expect(view.result.current.handoff.stage).toBe(1);
  act(() => view.result.current.handoff.initialize('2027-01-01', 'support-desk'));
  expect(view.result.current.result.draft.date).toBe('2026-10-06');
});

it('does not advance an edited draft when an earlier retry completes', async () => {
  let resolve!: (receipt: WorkflowReceiptDto) => void;
  vi.mocked(prepareHandoff).mockReturnValue(
    new Promise((done) => {
      resolve = done;
    }),
  );
  const view = renderHook(useHandoffSession, { wrapper });
  let pending!: Promise<WorkflowReceiptDto>;
  act(() => {
    pending = view.result.current.retry(sampleError);
  });
  expect(prepareHandoff).toHaveBeenCalledWith(
    expect.objectContaining({ audience: 'team', confirmed: true }),
  );
  act(() => {
    view.result.current.setDraft((draft) => ({ ...draft, title: 'Newer draft', confirmed: false }));
    view.result.current.setStage(0);
  });
  await act(async () => {
    resolve(sampleSuccess);
    await pending;
  });
  expect(view.result.current.draft.title).toBe('Newer draft');
  expect(view.result.current.stage).toBe(0);
});

it('advances the current retry after a successful response', async () => {
  vi.mocked(prepareHandoff).mockResolvedValue(sampleSuccess);
  const view = renderHook(useHandoffSession, { wrapper });
  await act(async () => {
    await view.result.current.retry(sampleError);
  });
  expect(view.result.current.stage).toBe(2);
});
