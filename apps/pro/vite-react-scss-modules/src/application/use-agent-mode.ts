import { useCallback, useState } from 'react';

import { readAgentMode, saveAgentMode } from './agent-mode';

export function useAgentMode() {
  const [agentMode, setMode] = useState(readAgentMode);
  const setAgentMode = useCallback((active: boolean) => {
    // Save immediately so a navigation right after clicking retains the mode.
    saveAgentMode(active);
    setMode(active);
  }, []);
  return { agentMode, setAgentMode };
}
