import { isRecord } from '@/lib/validation/is-record';

import {
  defaultTableSettings,
  normalizeTaskPins,
  taskColumnKeys,
  type TaskTableSettings,
} from './table-settings';

export const taskTableStorageKey = 'virgo-pro.tasks-table.v1';

export function serializeTaskTableSettings(settings: TaskTableSettings): string {
  return JSON.stringify({
    version: 1,
    settings,
  });
}

const choices = {
  size: ['mini', 'small', 'medium', 'large'],
  widthMode: ['fill', 'content'],
  border: ['none', 'rows', 'all'],
  paginationAlign: ['left', 'center', 'right'],
} as const;

const columnChoices = {
  align: ['start', 'center', 'end'],
} as const;

function bounded(value: unknown, fallback: number, min: number, max: number) {
  const number = typeof value === 'number' && Number.isFinite(value) ? value : fallback;

  return Math.max(min, Math.min(max, Math.round(number)));
}

export function parseTaskTableSettings(raw: string | null): TaskTableSettings {
  const defaults = defaultTableSettings();

  try {
    const saved: unknown = JSON.parse(raw ?? 'null');

    if (!isRecord(saved) || saved.version !== 1 || !isRecord(saved.settings)) return defaults;

    const value = saved.settings;
    const next: TaskTableSettings = { ...defaults };

    for (const [key, fallback] of Object.entries(defaults))
      if (typeof fallback === 'boolean' && typeof value[key] === 'boolean')
        Object.assign(next, { [key]: value[key] });

    for (const [key, options] of Object.entries(choices))
      if (options.some((option) => option === value[key]))
        Object.assign(next, { [key]: value[key] });

    next.viewportHeight = bounded(value.viewportHeight, defaults.viewportHeight, 160, 1200);

    if (Array.isArray(value.selectionActions))
      next.selectionActions = [...new Set(value.selectionActions)].filter((entry) =>
        defaults.selectionActions.includes(entry),
      );

    if (Array.isArray(value.pageSizeOptions))
      next.pageSizeOptions = [...new Set(value.pageSizeOptions)]
        .filter((entry) => Number.isInteger(entry) && entry > 0 && entry <= 100)
        .sort((a, b) => a - b);

    const remaining = new Map(defaults.columns.map((column) => [column.key, column]));
    const columns: TaskTableSettings['columns'] = [];

    for (const entry of Array.isArray(value.columns) ? value.columns : []) {
      if (!isRecord(entry)) continue;

      const fallback = defaults.columns.find((column) => column.key === entry.key);
      if (!fallback || !remaining.has(fallback.key)) continue;

      const column = { ...fallback };
      for (const key of ['visible'] as const)
        if (typeof entry[key] === 'boolean') column[key] = entry[key];
      for (const key of Object.keys(columnChoices) as (keyof typeof columnChoices)[])
        if (columnChoices[key].some((option) => option === entry[key]))
          Object.assign(column, { [key]: entry[key] });

      const controls = isRecord(entry.controls) ? entry.controls : {};
      const sorting = isRecord(controls.sort) ? controls.sort : null;
      column.controls = {
        ...fallback.controls,
        sort: { ...fallback.controls.sort },
      };
      if (controls.layout === 'separate' || controls.layout === 'joined')
        column.controls.layout = controls.layout;
      for (const key of ['filter', 'search'] as const)
        if (typeof controls[key] === 'boolean') column.controls[key] = controls[key];

      const placement = controls.align;
      if (['start', 'center', 'end'].includes(String(placement)))
        column.controls.align = placement as typeof column.controls.align;

      if (sorting) {
        if (typeof sorting.enabled === 'boolean') column.controls.sort.enabled = sorting.enabled;
        if (['both', 'ascending', 'descending'].includes(String(sorting.mode)))
          column.controls.sort.mode = sorting.mode as typeof column.controls.sort.mode;
      }

      column.minWidth = bounded(entry.minWidth, fallback.minWidth, 24, 3000);
      column.maxWidth = bounded(entry.maxWidth, fallback.maxWidth, column.minWidth, 3000);
      column.width = bounded(entry.width, fallback.width, column.minWidth, column.maxWidth);

      columns.push(column);
      remaining.delete(column.key);
    }

    for (const column of remaining.values()) {
      const beforeActions = columns.findIndex((entry) => entry.key === 'actions');
      if (beforeActions !== -1) columns.splice(beforeActions, 0, column);
      else columns.push(column);
    }

    if (
      !columns.some(
        (column) => column.visible && !['selection', 'rowNumber', 'actions'].includes(column.key),
      )
    )
      columns.find((column) => column.key === 'title')!.visible = true;

    next.columns = [
      columns.find((column) => column.key === 'selection')!,
      columns.find((column) => column.key === 'rowNumber')!,
      ...columns.filter((column) => column.key !== 'selection' && column.key !== 'rowNumber'),
    ];

    if (isRecord(value.pinnedColumns)) {
      const pins = { ...defaults.pinnedColumns };
      for (const edge of ['start', 'end'] as const) {
        const key = value.pinnedColumns[edge];
        if (key === null || taskColumnKeys.some((column) => column === key))
          pins[edge] = key as (typeof pins)[typeof edge];
      }
      next.pinnedColumns = pins;
    }

    return normalizeTaskPins(next);
  } catch {
    return defaults;
  }
}
