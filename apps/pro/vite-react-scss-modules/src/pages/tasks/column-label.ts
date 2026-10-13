import type { TFunction } from 'i18next';

import type { TaskColumnKey } from './table-settings';
export function taskColumnLabel(key: TaskColumnKey, t: TFunction) {
  return t(
    key === 'rowNumber'
      ? 'tasks.id'
      : key === 'selection'
        ? 'tasks.settings.selectionColumn'
        : key === 'title'
          ? 'tasks.task'
          : key === 'estimateHours'
            ? 'tasks.estimateH'
            : `tasks.${key}`,
  );
}
