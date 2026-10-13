import type { ReactNode } from 'react';

import { HandoffSessionContext, useHandoffState } from './handoff-session-context';
export function HandoffSessionProvider({ children }: { children: ReactNode }) {
  return <HandoffSessionContext value={useHandoffState()}>{children}</HandoffSessionContext>;
}
