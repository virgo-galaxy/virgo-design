import { demoResetCompleteEvent } from '@/lib/demo/reset';
import { sessionStorageAccess } from '@/lib/storage';

import { createWorkspaceStore, type WorkspaceStore } from '../model/workspace-store';

const storageKey = 'virgo-pro.workspace.agent-mode';

export function readAgentMode(): boolean {
  return sessionStorageAccess.get(storageKey).value === 'true';
}

export function createStoredWorkspaceStore(allowed: boolean) {
  return createWorkspaceStore(allowed && readAgentMode());
}

export function clearWorkspaceMode(): void {
  sessionStorageAccess.remove(storageKey);
}

export function startWorkspaceSync(store: WorkspaceStore, allowed: boolean) {
  if (!allowed) {
    clearWorkspaceMode();
    store.getState().setAgentMode(false);
  }

  const unsubscribe = store.subscribe((state, previous) => {
    if (state.agentMode === previous.agentMode) return;

    if (allowed && state.agentMode) sessionStorageAccess.set(storageKey, 'true');
    else clearWorkspaceMode();
  });

  const reset = () => store.getState().setAgentMode(false);

  window.addEventListener(demoResetCompleteEvent, reset);

  return () => {
    unsubscribe();
    window.removeEventListener(demoResetCompleteEvent, reset);
  };
}
