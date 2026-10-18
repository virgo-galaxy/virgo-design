import { useCallback } from 'react';

import { prepareHandoff } from '@/api/workflows';

import { type HandoffDraft, handoffFromReceipt, type WorkflowReceipt } from '../model/handoff';
import { useHandoffStore } from '../store';

export function useHandoffSession() {
  const draft = useHandoffStore((state) => state.draft);
  const stage = useHandoffStore((state) => state.stage);
  const initialize = useHandoffStore((state) => state.initialize);
  const setDraft = useHandoffStore((state) => state.setDraft);
  const setStage = useHandoffStore((state) => state.setStage);
  const restoreDraft = useHandoffStore((state) => state.restoreDraft);
  const getDraft = useHandoffStore((state) => state.getDraft);
  const finishPreparation = useHandoffStore((state) => state.finishPreparation);

  const prepare = useCallback(
    (next?: HandoffDraft) => prepareHandoff(next ?? getDraft()),
    [getDraft],
  );

  const recover = useCallback(
    (receipt: WorkflowReceipt) => restoreDraft(handoffFromReceipt(receipt), 1),
    [restoreDraft],
  );

  const retry = useCallback(
    async (receipt: WorkflowReceipt) => {
      const next = { ...handoffFromReceipt(receipt), audience: 'team' as const, confirmed: true };
      restoreDraft(next, 1);

      const result = await prepareHandoff(next);
      finishPreparation(next, result.outcome === 'success');

      return result;
    },
    [restoreDraft, finishPreparation],
  );

  return { initialize, draft, setDraft, stage, setStage, prepare, recover, retry };
}
