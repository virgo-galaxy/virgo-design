import type { ReactNode } from 'react';

import { HandoffSessionContext, useHandoffState } from '@/features/handoff/handoff-session-context';
export function HandoffSessionProvider({ children }: { children: ReactNode }) {
  return <HandoffSessionContext value={useHandoffState()}>{children}</HandoffSessionContext>;
}
