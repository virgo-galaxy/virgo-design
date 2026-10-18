import { type ReactNode, useEffect, useState } from 'react';

import type { TaskTableStore } from '../model/task-table-store';
import { startTaskTableSync } from '../persistence/browser-sync';
import { createStoredTaskTableStore } from '../persistence/storage';
import { TaskTableStoreContext } from './task-table-store-context';

export function TaskTableStoreProvider({
  initialStore,
  canPersist,
  children,
}: {
  initialStore?: TaskTableStore;
  canPersist: boolean;
  children: ReactNode;
}) {
  const [store] = useState(() => initialStore ?? createStoredTaskTableStore());

  useEffect(() => startTaskTableSync(store, canPersist), [store, canPersist]);

  return <TaskTableStoreContext value={store}>{children}</TaskTableStoreContext>;
}
