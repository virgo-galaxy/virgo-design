import type { TaskColumnKey } from '../model/table-settings';

export function taskColumnLabelName(key: TaskColumnKey) {
  return key === 'rowNumber'
    ? 'id'
    : key === 'selection'
      ? 'settings.selectionColumn'
      : key === 'title'
        ? 'task'
        : key === 'estimateHours'
          ? 'estimateH'
          : key;
}
