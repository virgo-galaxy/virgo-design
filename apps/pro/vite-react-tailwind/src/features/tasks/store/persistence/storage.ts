import { localStorageAccess } from '@/lib/storage';

import { parseTaskTableSettings, taskTableStorageKey } from '../../model/table-preferences';
import { createTaskTableStore } from '../model/task-table-store';

export function createStoredTaskTableStore() {
  const stored = localStorageAccess.get(taskTableStorageKey);

  return createTaskTableStore(parseTaskTableSettings(stored.value), stored.ok);
}
