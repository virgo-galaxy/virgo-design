import { type ReactNode, useEffect, useMemo, useState } from 'react';

import type { WorkspaceStore } from '../model/workspace-store';
import { createStoredWorkspaceStore, startWorkspaceSync } from '../persistence/agent-mode';
import { WorkspaceStoreContext } from './workspace-store-context';

export function WorkspaceStoreProvider({
  initialStore,
  allowed,
  children,
}: {
  initialStore?: WorkspaceStore;
  allowed: boolean;
  children: ReactNode;
}) {
  const [store] = useState(() => initialStore ?? createStoredWorkspaceStore(allowed));

  useEffect(() => startWorkspaceSync(store, allowed), [store, allowed]);

  const value = useMemo(() => ({ store, allowed }), [store, allowed]);

  return <WorkspaceStoreContext value={value}>{children}</WorkspaceStoreContext>;
}
