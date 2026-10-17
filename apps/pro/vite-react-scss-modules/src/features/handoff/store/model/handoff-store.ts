import { createStore } from 'zustand/vanilla';

import type { HandoffRequest } from '@/api/workflows/types';

import { initialHandoff } from '../../model/handoff';

type StateUpdate<T> = T | ((previous: T) => T);

export interface HandoffState {
  draft: HandoffRequest;
  stage: number;
  initialized: boolean;
  initialize: (date: string, projectId: string) => void;
  setDraft: (update: StateUpdate<HandoffRequest>) => void;
  setStage: (update: StateUpdate<number>) => void;
  restoreDraft: (draft: HandoffRequest, stage: number) => void;
  getDraft: () => HandoffRequest;
  finishPreparation: (draft: HandoffRequest, successful: boolean) => void;
}

export function createHandoffStore() {
  return createStore<HandoffState>()((set, get) => ({
    draft: { ...initialHandoff, taskIds: [] },
    stage: 0,
    initialized: false,
    initialize: (date, projectId) =>
      set((state) =>
        state.initialized
          ? state
          : { initialized: true, draft: { ...state.draft, date, projectId } },
      ),
    setDraft: (update) =>
      set((state) => ({ draft: typeof update === 'function' ? update(state.draft) : update })),
    setStage: (update) =>
      set((state) => ({ stage: typeof update === 'function' ? update(state.stage) : update })),
    restoreDraft: (draft, stage) => set({ draft, stage, initialized: true }),
    getDraft: () => get().draft,
    finishPreparation: (draft, successful) =>
      set((state) => (state.draft === draft ? { stage: successful ? 2 : 1 } : state)),
  }));
}

export type HandoffStore = ReturnType<typeof createHandoffStore>;
