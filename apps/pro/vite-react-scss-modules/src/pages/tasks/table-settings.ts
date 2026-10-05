import type { ButtonSize, TableDensity, TableSortMode } from '@virgo-design/ui';

import configuredDefaults from '@/config/task-table.json';

export const taskColumnKeys = [
  'selection',
  'rowNumber',
  'title',
  'status',
  'priority',
  'project',
  'assignee',
  'estimateHours',
  'createdAt',
  'dueDate',
  'completedAt',
  'actions',
] as const;
export type TaskColumnKey = (typeof taskColumnKeys)[number];
export type TaskDataColumn = Exclude<TaskColumnKey, 'selection' | 'rowNumber' | 'actions'>;
export type SelectionAction = 'all' | 'invert' | 'none' | 'odd' | 'even';
export interface TaskColumnSettings {
  key: TaskColumnKey;
  visible: boolean;
  width: number;
  minWidth: number;
  maxWidth: number;
  align: 'start' | 'center' | 'end';
  controls: {
    layout: 'separate' | 'joined';
    align: 'start' | 'center' | 'end';
    sort: { enabled: boolean; mode: TableSortMode };
    filter: boolean;
    search: boolean;
  };
}
export interface TaskTableSettings {
  size: ButtonSize;
  widthMode: 'fill' | 'content';
  showHeader: boolean;
  headerDividers: boolean;
  border: 'none' | 'rows' | 'all';
  striped: boolean;
  hoverable: boolean;
  selection: boolean;
  showId: boolean;
  selectionMenu: boolean;
  selectionActions: SelectionAction[];
  resizable: boolean;
  reorderColumns: boolean;
  stickyHeader: boolean;
  viewportHeight: number;
  pagination: boolean;
  showTotal: boolean;
  showSizeChanger: boolean;
  showQuickJumper: boolean;
  paginationAlign: 'left' | 'center' | 'right';
  pageSizeOptions: number[];
  /** Inclusive boundaries; columns keep the same order in settings and the table. */
  pinnedColumns: { start: TaskColumnKey | null; end: TaskColumnKey | null };
  columns: TaskColumnSettings[];
}
export const tableDensity: Record<ButtonSize, TableDensity> = {
  mini: 'mini',
  small: 'compact',
  medium: 'default',
  large: 'comfortable',
};
function configChoice<T extends string>(value: string, choices: readonly T[]): T {
  const choice = choices.find((entry) => entry === value);
  if (choice === undefined) throw new Error(`Invalid option ${value} in config/task-table.json`);
  return choice;
}

function readDefaultTableSettings(): TaskTableSettings {
  const defaults = configuredDefaults.settings;
  const columns = defaults.columns.map((column): TaskColumnSettings => {
    if (
      ![column.minWidth, column.width, column.maxWidth].every(Number.isInteger) ||
      column.minWidth < 24 ||
      column.maxWidth > 3000 ||
      column.width < column.minWidth ||
      column.width > column.maxWidth
    )
      throw new Error(`Invalid column widths for ${column.key} in config/task-table.json`);
    return {
      ...column,
      key: configChoice(column.key, taskColumnKeys),
      align: configChoice(column.align, ['start', 'center', 'end']),
      controls: {
        ...column.controls,
        layout: configChoice(column.controls.layout, ['separate', 'joined']),
        align: configChoice(column.controls.align, ['start', 'center', 'end']),
        sort: {
          ...column.controls.sort,
          mode: configChoice(column.controls.sort.mode, ['both', 'ascending', 'descending']),
        },
      },
    };
  });
  if (
    columns.length !== taskColumnKeys.length ||
    new Set(columns.map((column) => column.key)).size !== taskColumnKeys.length ||
    columns[0]?.key !== 'selection' ||
    columns[1]?.key !== 'rowNumber'
  )
    throw new Error('Invalid default columns in config/task-table.json');
  if (
    !Number.isInteger(defaults.viewportHeight) ||
    defaults.viewportHeight < 160 ||
    defaults.viewportHeight > 1200 ||
    !defaults.pageSizeOptions.length ||
    defaults.pageSizeOptions.some((size) => !Number.isInteger(size) || size < 1 || size > 100) ||
    !Number.isInteger(configuredDefaults.pageSize) ||
    !defaults.pageSizeOptions.includes(configuredDefaults.pageSize)
  )
    throw new Error('Invalid pagination or viewport defaults in config/task-table.json');
  return {
    ...defaults,
    size: configChoice(defaults.size, ['mini', 'small', 'medium', 'large']),
    widthMode: configChoice(defaults.widthMode, ['fill', 'content']),
    border: configChoice(defaults.border, ['none', 'rows', 'all']),
    paginationAlign: configChoice(defaults.paginationAlign, ['left', 'center', 'right']),
    selectionActions: defaults.selectionActions.map((action) =>
      configChoice(action, ['all', 'invert', 'none', 'odd', 'even']),
    ),
    pinnedColumns: {
      start:
        defaults.pinnedColumns.start === null
          ? null
          : configChoice(defaults.pinnedColumns.start, taskColumnKeys),
      end:
        defaults.pinnedColumns.end === null
          ? null
          : configChoice(defaults.pinnedColumns.end, taskColumnKeys),
    },
    columns,
  };
}

const configuredTableSettings = readDefaultTableSettings();
export const defaultTaskPageSize = configuredDefaults.pageSize;

export function defaultTableSettings(): TaskTableSettings {
  return structuredClone(configuredTableSettings);
}
export function moveItem<T>(items: readonly T[], from: number, to: number): T[] {
  if (from < 0 || to < 0 || from >= items.length || to >= items.length || from === to)
    return [...items];
  const next = [...items];
  next.splice(to, 0, next.splice(from, 1)[0]!);
  return next;
}
export function isLeadingTaskColumn(key: TaskColumnKey) {
  return key === 'selection' || key === 'rowNumber';
}
export function moveTaskColumn(
  columns: readonly TaskColumnSettings[],
  key: TaskColumnKey,
  to: number,
) {
  if (isLeadingTaskColumn(key) || to < 2) return [...columns];
  return moveItem(
    columns,
    columns.findIndex((column) => column.key === key),
    to,
  );
}
export function visibleColumns(settings: TaskTableSettings) {
  return settings.columns.filter(
    (column) =>
      column.visible &&
      (column.key !== 'selection' || settings.selection) &&
      (column.key !== 'rowNumber' || settings.showId),
  );
}

export function normalizeTaskPins(settings: TaskTableSettings): TaskTableSettings {
  const index = (key: TaskColumnKey | null) =>
    settings.columns.findIndex((column) => column.key === key);
  const start = index(settings.pinnedColumns.start);
  const end = index(settings.pinnedColumns.end);
  return {
    ...settings,
    pinnedColumns: {
      start: start < 0 ? null : settings.pinnedColumns.start,
      end: end < 0 || (start >= 0 && end <= start) ? null : settings.pinnedColumns.end,
    },
  };
}
export function pinTaskColumns(
  settings: TaskTableSettings,
  key: TaskColumnKey,
  edge: 'start' | 'end' | null,
): TaskTableSettings {
  const pinnedColumns = { ...settings.pinnedColumns };
  const index = settings.columns.findIndex((column) => column.key === key);
  if (index < 0) return settings;
  if (edge === 'start') {
    pinnedColumns.start = key;
    if (settings.columns.findIndex((column) => column.key === pinnedColumns.end) <= index)
      pinnedColumns.end = null;
  } else if (edge === 'end') {
    pinnedColumns.end = key;
    if (settings.columns.findIndex((column) => column.key === pinnedColumns.start) >= index)
      pinnedColumns.start = null;
  } else {
    if (pinnedColumns.start === key) pinnedColumns.start = null;
    if (pinnedColumns.end === key) pinnedColumns.end = null;
  }
  return { ...settings, pinnedColumns };
}
export function taskPinnedCells(settings: TaskTableSettings) {
  const { pinnedColumns } = normalizeTaskPins(settings);
  const start = settings.columns.findIndex((column) => column.key === pinnedColumns.start);
  const end = settings.columns.findIndex((column) => column.key === pinnedColumns.end);
  const cells = new Map<TaskColumnKey, { fixed: 'start' | 'end'; stickyOffset: number }>();
  let startOffset = 0;
  let endOffset = 0;
  for (const column of visibleColumns(settings)) {
    const index = settings.columns.findIndex((entry) => entry.key === column.key);
    if (start >= 0 && index <= start) {
      cells.set(column.key, { fixed: 'start', stickyOffset: startOffset });
      startOffset += column.width;
    }
  }
  for (const column of visibleColumns(settings).reverse()) {
    const index = settings.columns.findIndex((entry) => entry.key === column.key);
    if (end >= 0 && index >= end) {
      cells.set(column.key, { fixed: 'end', stickyOffset: endOffset });
      endOffset += column.width;
    }
  }
  return cells;
}
