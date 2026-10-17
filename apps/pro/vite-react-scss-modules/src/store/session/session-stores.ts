import { clearWorkspaceMode, createStoredWorkspaceStore } from '@/features/ai-workspace/store';
import { createHandoffStore } from '@/features/handoff/store';
import { createStoredTaskTableStore } from '@/features/tasks/store';

export function createSessionStores(admin: boolean) {
  return {
    handoff: createHandoffStore(),
    tasks: createStoredTaskTableStore(),
    workspace: createStoredWorkspaceStore(admin),
  };
}

export function clearStoredSessionState() {
  clearWorkspaceMode();
}
