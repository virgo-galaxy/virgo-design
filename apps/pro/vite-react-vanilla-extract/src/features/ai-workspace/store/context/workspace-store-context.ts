import { createContext } from 'react';

import type { WorkspaceStore } from '../model/workspace-store';

export const WorkspaceStoreContext = createContext<{
  store: WorkspaceStore;
  allowed: boolean;
} | null>(null);
