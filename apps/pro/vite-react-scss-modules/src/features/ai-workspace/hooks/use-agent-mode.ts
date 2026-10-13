import { useCallback, useEffect, useState } from 'react';

import { readAgentMode, saveAgentMode } from '../model/agent-mode';

export function useAgentMode(allowed: boolean) {
  const [agentMode, setMode] = useState(() => allowed && readAgentMode());
  useEffect(() => {
    if (!allowed) {
      saveAgentMode(false);
      setMode(false);
    }
  }, [allowed]);
  const setAgentMode = useCallback(
    (active: boolean) => {
      const next = allowed && active;
      // Save immediately so a navigation right after clicking retains the mode.
      saveAgentMode(next);
      setMode(next);
    },
    [allowed],
  );
  return { agentMode: allowed && agentMode, setAgentMode };
}
