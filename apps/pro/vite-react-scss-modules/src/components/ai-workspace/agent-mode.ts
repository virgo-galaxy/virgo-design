const storageKey = 'virgo-pro.workspace.agent-mode';

// This tab retains the presentation mode across routes; useAgentMode checks admin access.
export function readAgentMode(): boolean {
  try {
    return window.sessionStorage.getItem(storageKey) === 'true';
  } catch {
    return false;
  }
}

export function saveAgentMode(active: boolean): void {
  try {
    if (active) window.sessionStorage.setItem(storageKey, 'true');
    else window.sessionStorage.removeItem(storageKey);
  } catch {
    // The UI still switches in memory when browser storage is unavailable.
  }
}
