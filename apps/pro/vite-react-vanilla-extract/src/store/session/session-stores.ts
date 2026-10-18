import { clearWorkspaceMode, createStoredWorkspaceStore } from '@/features/ai-workspace/store';
import { createHandoffStore } from '@/features/handoff/store';
import { createStoredTaskTableStore } from '@/features/tasks/store';

import { createResourceStore } from '../resources';

export function createSessionStores(admin: boolean) {
  return {
    resources: createResourceStore(),
    handoff: createHandoffStore(),
    tasks: createStoredTaskTableStore(),
    workspace: createStoredWorkspaceStore(admin),
  };
}

export function clearStoredSessionState() {
  clearWorkspaceMode();
}
