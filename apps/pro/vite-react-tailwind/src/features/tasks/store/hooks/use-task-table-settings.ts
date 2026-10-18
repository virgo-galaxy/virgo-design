import { useContext } from 'react';
import { useStore } from 'zustand';

import { TaskTableStoreContext } from '../context/task-table-store-context';

export function useTaskTableSettings() {
  const store = useContext(TaskTableStoreContext);

  if (!store) throw new Error('TaskTableStoreProvider is required');

  const settings = useStore(store, (state) => state.settings);
  const storageAvailable = useStore(store, (state) => state.storageAvailable);
  const setSettings = useStore(store, (state) => state.setSettings);

  return { settings, setSettings, storageAvailable };
}
