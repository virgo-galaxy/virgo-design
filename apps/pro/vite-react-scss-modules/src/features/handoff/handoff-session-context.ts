import { createContext, useCallback, useContext, useRef, useState } from 'react';

import { prepareHandoff } from '@/api/workflows';

import {
  type HandoffDraft,
  handoffFromReceipt,
  initialHandoff,
  type WorkflowReceipt,
} from './model';

export function useHandoffState() {
  const [draft, setDraft] = useState<HandoffDraft>({ ...initialHandoff, taskIds: [] });
  const started = useRef(false);
  const initialize = useCallback((date: string, projectId: string) => {
    if (started.current) return;
    started.current = true;
    setDraft((previous) => ({ ...previous, date, projectId }));
  }, []);
  const [stage, setStage] = useState(0);
  const [receipts, setReceipts] = useState<Partial<Record<'success' | 'error', WorkflowReceipt>>>(
    {},
  );
  const prepare = async (next = draft) => {
    const receipt = await prepareHandoff(next);
    setReceipts((previous) => ({ ...previous, [receipt.outcome]: receipt }));
    return receipt;
  };
  const recover = (receipt: WorkflowReceipt) => {
    started.current = true;
    setDraft(handoffFromReceipt(receipt));
    setStage(1);
  };
  const retry = async (receipt: WorkflowReceipt) => {
    started.current = true;
    const next = { ...handoffFromReceipt(receipt), audience: 'team' as const, confirmed: true };
    setDraft(next);
    const result = await prepare(next);
    setStage(result.outcome === 'success' ? 2 : 1);
    return result;
  };
  return { initialize, draft, setDraft, stage, setStage, receipts, prepare, recover, retry };
}
export const HandoffSessionContext = createContext<ReturnType<typeof useHandoffState> | null>(null);
export function useHandoffSession() {
  const value = useContext(HandoffSessionContext);
  if (!value) throw new Error('HandoffSessionProvider is required');
  return value;
}
