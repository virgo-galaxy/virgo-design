import { createStore } from 'zustand/vanilla';

import { defaultTableSettings, type TaskTableSettings } from '../../model/table-settings';

export interface TaskTableState {
  settings: TaskTableSettings;
  storageAvailable: boolean;
  setSettings: (
    update: TaskTableSettings | ((previous: TaskTableSettings) => TaskTableSettings),
  ) => void;
}

export function createTaskTableStore(settings = defaultTableSettings(), storageAvailable = true) {
  return createStore<TaskTableState>()((set) => ({
    settings,
    storageAvailable,
    setSettings: (update) =>
      set((state) => ({
        settings: typeof update === 'function' ? update(state.settings) : update,
      })),
  }));
}

export type TaskTableStore = ReturnType<typeof createTaskTableStore>;
