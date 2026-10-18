import { type ReactNode, useState } from 'react';

import { createHandoffStore, type HandoffStore } from '../model/handoff-store';
import { HandoffStoreContext } from './handoff-store-context';

export function HandoffStoreProvider({
  initialStore,
  children,
}: {
  initialStore?: HandoffStore;
  children: ReactNode;
}) {
  const [store] = useState(() => initialStore ?? createHandoffStore());

  return <HandoffStoreContext value={store}>{children}</HandoffStoreContext>;
}
