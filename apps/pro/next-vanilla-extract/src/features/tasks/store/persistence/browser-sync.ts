import { storageResetCompleteEvent, storageResetEvent } from '@/lib/storage';
import { localStorageAccess } from '@/lib/storage';

import {
  parseTaskTableSettings,
  serializeTaskTableSettings,
  taskTableStorageKey,
} from '../../model/table-preferences';
import { defaultTableSettings } from '../../model/table-settings';
import type { TaskTableStore } from '../model/task-table-store';

export function startTaskTableSync(store: TaskTableStore, canPersist: boolean) {
  let timer: number | undefined;
  let dirty = false;
  let restoring = false;
  let resetting = false;

  const cancel = () => {
    window.clearTimeout(timer);
    timer = undefined;
  };

  const flush = () => {
    cancel();

    if (!dirty || resetting || !canPersist) return;

    const storageAvailable = localStorageAccess.set(
      taskTableStorageKey,
      serializeTaskTableSettings(store.getState().settings),
    );

    store.setState({ storageAvailable });

    if (storageAvailable) dirty = false;
  };

  const unsubscribe = store.subscribe((state, previous) => {
    if (restoring || resetting || !canPersist || state.settings === previous.settings) return;

    dirty = true;
    cancel();
    timer = window.setTimeout(flush, 150);
  });

  const restore = (raw: string | null) => {
    restoring = true;
    store.setState({ settings: parseTaskTableSettings(raw), storageAvailable: true });
    restoring = false;
  };

  const onStorage = (event: StorageEvent) => {
    if (!localStorageAccess.matchesEvent(event)) return;
    if (event.key !== null && event.key !== taskTableStorageKey) return;

    if (event.newValue === null) {
      cancel();
      dirty = false;
    }

    if (!dirty) restore(event.newValue);
  };

  const beginReset = () => {
    resetting = true;
    dirty = false;
    cancel();
  };

  const finishReset = () => {
    store.setState({ settings: defaultTableSettings(), storageAvailable: true });
    resetting = false;
  };

  window.addEventListener('storage', onStorage);
  window.addEventListener('pagehide', flush);
  window.addEventListener(storageResetEvent, beginReset);
  window.addEventListener(storageResetCompleteEvent, finishReset);

  return () => {
    unsubscribe();
    flush();

    window.removeEventListener('storage', onStorage);
    window.removeEventListener('pagehide', flush);
    window.removeEventListener(storageResetEvent, beginReset);
    window.removeEventListener(storageResetCompleteEvent, finishReset);
  };
}
