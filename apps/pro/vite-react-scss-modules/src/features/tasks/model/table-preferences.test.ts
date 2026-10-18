import { expect, it } from 'vitest';

import { parseTaskTableSettings, serializeTaskTableSettings } from './table-preferences';
import {
  defaultTableSettings,
  moveTaskColumn,
  normalizeTaskPins,
  pinTaskColumns,
  taskPinnedCells,
  visibleColumns,
} from './table-settings';

it('restores defaults for corrupt or invalid saved preferences', () => {
  for (const raw of [null, '{', '[]', 'false'])
    expect(parseTaskTableSettings(raw)).toEqual(defaultTableSettings());
});

it('preserves composition, order and empty optional menu choices across reloads', () => {
  const settings = defaultTableSettings();
  settings.size = 'mini';
  settings.selectionActions = [];
  settings.columns.reverse();
  const title = settings.columns.find((column) => column.key === 'title')!;
  title.controls = {
    layout: 'joined',
    align: 'center',
    sort: { enabled: true, mode: 'ascending' },
    filter: true,
    search: true,
  };
  const restored = parseTaskTableSettings(JSON.stringify(settings));
  expect(restored).toEqual({
    ...settings,
    pinnedColumns: { start: 'title', end: null },
    columns: [
      defaultTableSettings().columns[0],
      defaultTableSettings().columns[1],
      ...settings.columns.filter(
        (column) => column.key !== 'selection' && column.key !== 'rowNumber',
      ),
    ],
  });
  expect(restored.columns[0]?.key).toBe('selection');
});

it('preserves selection visibility and configuration while restoring its first position', () => {
  const settings = defaultTableSettings();
  settings.selection = false;
  settings.columns.reverse();
  Object.assign(
    settings.columns.find((column) => column.key === 'selection')!,
    {
      visible: false,
      width: 100,
      controls: { ...settings.columns[0]!.controls, filter: true, search: true },
    },
  );
  const restored = parseTaskTableSettings(JSON.stringify(settings));
  expect(restored.columns[0]).toMatchObject({
    visible: false,
    width: 100,
    controls: { filter: true, search: true },
  });
  expect(restored.selection).toBe(false);
  expect(visibleColumns(restored).some((column) => column.key === 'selection')).toBe(false);
});

it('repairs duplicate or missing columns, invalid bounds and hidden data columns', () => {
  const defaults = defaultTableSettings();
  const settings = {
    size: 'unknown',
    selectionActions: ['odd', 'odd', 'invalid'],
    columns: defaults.columns.map((column) => ({ ...column, visible: false })),
  };
  Object.assign(
    settings.columns.find((column) => column.key === 'title')!,
    { width: 5000, minWidth: 40, maxWidth: 100 },
  );
  settings.columns.push(settings.columns[1]!);
  const result = parseTaskTableSettings(JSON.stringify(settings));
  expect(result.size).toBe('medium');
  expect(result.columns).toHaveLength(13);
  expect(result.selectionActions).toEqual(['odd']);
  expect(result.columns.find((column) => column.key === 'title')).toMatchObject({
    visible: true,
    width: 100,
    minWidth: 40,
    maxWidth: 100,
  });
});

it('keeps selection and ID adjacent while allowing both to be hidden independently', () => {
  const settings = defaultTableSettings();
  for (const key of ['selection', 'rowNumber', 'title'] as const)
    expect(moveTaskColumn(settings.columns, key, 1)).toEqual(settings.columns);
  settings.columns = moveTaskColumn(settings.columns, 'title', 5);
  expect(settings.columns.slice(0, 2).map((column) => column.key)).toEqual([
    'selection',
    'rowNumber',
  ]);
  settings.selection = false;
  expect(visibleColumns(settings)[0]?.key).toBe('rowNumber');
  settings.showId = false;
  expect(
    visibleColumns(settings).some((column) => ['selection', 'rowNumber'].includes(column.key)),
  ).toBe(false);
});

it('pins inclusive column ranges and computes offsets from visible current widths', () => {
  const settings = defaultTableSettings();
  expect([...taskPinnedCells(settings)]).toEqual([
    ['selection', { fixed: 'start', stickyOffset: 0 }],
    ['rowNumber', { fixed: 'start', stickyOffset: 75 }],
    ['title', { fixed: 'start', stickyOffset: 150 }],
    ['actions', { fixed: 'end', stickyOffset: 0 }],
  ]);
  settings.selection = false;
  settings.showId = false;
  expect(taskPinnedCells(settings).get('title')).toEqual({ fixed: 'start', stickyOffset: 0 });
  const right = pinTaskColumns(settings, 'dueDate', 'end');
  right.columns.find((column) => column.key === 'completedAt')!.width = 230;
  expect(taskPinnedCells(right).get('dueDate')).toEqual({ fixed: 'end', stickyOffset: 480 });
  expect(taskPinnedCells(right).get('completedAt')).toEqual({ fixed: 'end', stickyOffset: 250 });
  right.columns.find((column) => column.key === 'actions')!.visible = false;
  expect(taskPinnedCells(right).get('dueDate')).toEqual({ fixed: 'end', stickyOffset: 230 });
});

it('changes pin boundaries without changing column order and prevents overlapping ranges', () => {
  const settings = defaultTableSettings();
  const start = pinTaskColumns(settings, 'priority', 'start');
  expect(start.columns).toEqual(settings.columns);
  expect(taskPinnedCells(start).get('status')?.fixed).toBe('start');
  const end = pinTaskColumns(start, 'title', 'end');
  expect(end.pinnedColumns).toEqual({ start: null, end: 'title' });
  expect(pinTaskColumns(end, 'title', null).pinnedColumns).toEqual({ start: null, end: null });
  expect(
    normalizeTaskPins({ ...settings, columns: [...settings.columns].reverse() }).pinnedColumns.end,
  ).toBeNull();
});

it('restores pin boundaries including explicit unpinning, and ignores invalid saved keys', () => {
  const settings = defaultTableSettings();
  const save = (pinnedColumns: unknown) => JSON.stringify({ ...settings, pinnedColumns });
  expect(parseTaskTableSettings(save({ start: null, end: 'completedAt' })).pinnedColumns).toEqual({
    start: null,
    end: 'completedAt',
  });
  expect(parseTaskTableSettings(save({ start: 'bad', end: false })).pinnedColumns).toEqual(
    settings.pinnedColumns,
  );
});

it('round trips current column widths and header controls without applying width presets', () => {
  const settings = defaultTableSettings();
  const title = settings.columns.find((column) => column.key === 'title')!;
  Object.assign(title, { minWidth: 280, width: 420, maxWidth: 600 });
  title.controls = {
    layout: 'joined',
    align: 'center',
    sort: { enabled: true, mode: 'ascending' },
    filter: false,
    search: false,
  };
  settings.columns.find((column) => column.key === 'priority')!.width = 240;
  settings.striped = true;
  expect(parseTaskTableSettings(serializeTaskTableSettings(settings))).toEqual(settings);
});
