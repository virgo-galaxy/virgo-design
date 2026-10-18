import { createContext } from 'react';

import type { HandoffStore } from '../model/handoff-store';

export const HandoffStoreContext = createContext<HandoffStore | null>(null);
