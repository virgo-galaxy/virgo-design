import { createStore } from 'zustand/vanilla';

export interface WorkspaceState {
  agentMode: boolean;
  setAgentMode: (active: boolean) => void;
}

export function createWorkspaceStore(agentMode = false) {
  return createStore<WorkspaceState>()((set) => ({
    agentMode,
    setAgentMode: (active) => set({ agentMode: active }),
  }));
}

export type WorkspaceStore = ReturnType<typeof createWorkspaceStore>;
