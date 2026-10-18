import { useContext } from 'react';
import { useStore } from 'zustand';

import { HandoffStoreContext } from '../context/handoff-store-context';
import type { HandoffState } from '../model/handoff-store';

export function useHandoffStore<T>(selector: (state: HandoffState) => T): T {
  const store = useContext(HandoffStoreContext);

  if (!store) throw new Error('HandoffStoreProvider is required');

  return useStore(store, selector);
}
