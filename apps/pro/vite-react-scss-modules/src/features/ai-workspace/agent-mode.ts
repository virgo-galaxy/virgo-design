import { sessionStorageAccess } from '@/lib/storage';
const storageKey = 'virgo-pro.workspace.agent-mode';

// This tab retains the presentation mode across routes; useAgentMode checks admin access.
export function readAgentMode(): boolean {
  return sessionStorageAccess.get(storageKey).value === 'true';
}

export function saveAgentMode(active: boolean): void {
  if (active) sessionStorageAccess.set(storageKey, 'true');
  else sessionStorageAccess.remove(storageKey);
}
