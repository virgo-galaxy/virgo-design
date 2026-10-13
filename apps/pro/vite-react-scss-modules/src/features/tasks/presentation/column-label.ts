import type { TaskColumnKey } from '../config/table-settings';
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
