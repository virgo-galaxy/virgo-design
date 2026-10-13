import { useEffect, useRef, useState } from 'react';

import { demoResetEvent } from '@/lib/demo/reset';
import { isRecord } from '@/lib/http/protocol';
import { localStorageAccess } from '@/lib/storage';

import {
  defaultTableSettings,
  normalizeTaskPins,
  taskColumnKeys,
  type TaskTableSettings,
} from '../config/table-settings';

export const taskTableStorageKey = 'virgo-pro.tasks-table.v1';
export const taskColumnWidthsVersion = 4;
export const taskHeaderControlsVersion = 1;
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
    const next: Record<string, unknown> = { ...defaults };
    for (const [key, fallback] of Object.entries(defaults))
      if (typeof fallback === 'boolean' && typeof value[key] === 'boolean') next[key] = value[key];
    for (const [key, options] of Object.entries(choices))
      if (options.some((option) => option === value[key])) next[key] = value[key];
    // The Pro settings combine the two horizontal-divider variants into rows.
    if (value.border === 'separators') next.border = 'rows';
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
      const fallback = defaults.columns.find(
        (column) => column.key === (entry.key === 'id' ? 'rowNumber' : entry.key),
      );
      if (!fallback || !remaining.has(fallback.key)) continue;
      const column = { ...fallback };
      for (const key of ['visible'] as const)
        if (typeof entry[key] === 'boolean') column[key] = entry[key];
      for (const key of Object.keys(columnChoices) as (keyof typeof columnChoices)[])
        if (columnChoices[key].some((option) => option === entry[key]))
          Object.assign(column, { [key]: entry[key] });
      const controls = isRecord(entry.controls) ? entry.controls : entry;
      const sorting = isRecord(controls.sort) ? controls.sort : null;
      column.controls = {
        ...fallback.controls,
        sort: { ...fallback.controls.sort },
      };
      if (controls.layout === 'separate' || controls.layout === 'joined')
        column.controls.layout = controls.layout;
      for (const key of ['filter', 'search'] as const)
        if (typeof controls[key] === 'boolean') column.controls[key] = controls[key];
      const placement = isRecord(entry.controls) ? controls.align : entry.actionsPlacement;
      if (['start', 'center', 'end'].includes(String(placement)))
        column.controls.align = placement as typeof column.controls.align;
      if (sorting) {
        if (typeof sorting.enabled === 'boolean') column.controls.sort.enabled = sorting.enabled;
        if (['both', 'ascending', 'descending'].includes(String(sorting.mode)))
          column.controls.sort.mode = sorting.mode as typeof column.controls.sort.mode;
      } else if (['none', 'both', 'ascending', 'descending'].includes(String(entry.sortMode))) {
        column.controls.sort.enabled = entry.sortMode !== 'none';
        if (entry.sortMode !== 'none')
          column.controls.sort.mode = entry.sortMode as typeof column.controls.sort.mode;
      }
      if (saved.headerControlsVersion !== taskHeaderControlsVersion) {
        column.controls.sort = { ...fallback.controls.sort };
        column.controls.filter = fallback.controls.filter;
        column.controls.search = fallback.controls.search;
      }
      // Apply the requested width preset once without resetting any other preferences.
      if (
        saved.columnWidthsVersion === taskColumnWidthsVersion ||
        saved.columnWidthsVersion === 2 ||
        saved.columnWidthsVersion === 3
      ) {
        column.minWidth = bounded(entry.minWidth, fallback.minWidth, 24, 3000);
        column.maxWidth = bounded(entry.maxWidth, fallback.maxWidth, column.minWidth, 3000);
        column.width = bounded(entry.width, fallback.width, column.minWidth, column.maxWidth);
      }
      if (saved.columnWidthsVersion === 2 && column.key === 'title') {
        column.minWidth = fallback.minWidth;
        column.maxWidth = Math.max(column.minWidth, column.maxWidth);
        column.width = column.minWidth;
      }
      if (saved.columnWidthsVersion === 2 || saved.columnWidthsVersion === 3) {
        const requestedWidth = ['title', 'createdAt', 'dueDate', 'completedAt'].includes(column.key)
          ? fallback.width
          : null;
        if (requestedWidth !== null)
          column.width = bounded(requestedWidth, column.width, column.minWidth, column.maxWidth);
      }
      columns.push(column);
      remaining.delete(column.key);
    }
    for (const column of remaining.values()) {
      const beforeActions = columns.findIndex((entry) => entry.key === 'actions');
      const afterProject =
        column.key === 'module' ? columns.findIndex((entry) => entry.key === 'project') + 1 : -1;
      if (afterProject > 0) columns.splice(afterProject, 0, column);
      else if (beforeActions !== -1) columns.splice(beforeActions, 0, column);
      else columns.push(column);
    }
    if (
      !columns.some(
        (column) => column.visible && !['selection', 'rowNumber', 'actions'].includes(column.key),
      )
    )
      columns.find((column) => column.key === 'title')!.visible = true;
    // Keep the optional identity columns together before business columns.
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
    return normalizeTaskPins(next as unknown as TaskTableSettings);
  } catch {
    return defaults;
  }
}
export function useTaskTableSettings(canPersist = true) {
  const resetting = useRef(false);
  useEffect(() => {
    const stopSaving = () => {
      resetting.current = true;
    };
    window.addEventListener(demoResetEvent, stopSaving);
    return () => window.removeEventListener(demoResetEvent, stopSaving);
  }, []);
  const [settings, setSettings] = useState(() => {
    try {
      return parseTaskTableSettings(localStorageAccess.get(taskTableStorageKey).value);
    } catch {
      return defaultTableSettings();
    }
  });
  const [storageAvailable, setStorageAvailable] = useState(true);
  useEffect(() => {
    const save = () => {
      if (resetting.current || !canPersist) return;
      try {
        const persisted = localStorageAccess.set(
          taskTableStorageKey,
          JSON.stringify({
            version: 1,
            columnWidthsVersion: taskColumnWidthsVersion,
            headerControlsVersion: taskHeaderControlsVersion,
            settings,
          }),
        );
        setStorageAvailable(persisted);
      } catch {
        setStorageAvailable(false);
      }
    };
    const timer = window.setTimeout(save, 150);
    window.addEventListener('pagehide', save);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('pagehide', save);
    };
  }, [settings, canPersist]);
  return { settings, setSettings, storageAvailable };
}
