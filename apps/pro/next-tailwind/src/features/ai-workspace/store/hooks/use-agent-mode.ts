import { useCallback, useContext } from 'react';
import { useStore } from 'zustand';

import { WorkspaceStoreContext } from '../context/workspace-store-context';

export function useAgentMode() {
  const context = useContext(WorkspaceStoreContext);

  if (!context) throw new Error('WorkspaceStoreProvider is required');

  const { store, allowed } = context;
  const agentMode = useStore(store, (state) => state.agentMode);
  const update = useStore(store, (state) => state.setAgentMode);
  const setAgentMode = useCallback(
    (active: boolean) => update(allowed && active),
    [allowed, update],
  );

  return { agentMode: allowed && agentMode, setAgentMode };
}
