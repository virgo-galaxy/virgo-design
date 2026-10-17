import { expect, it } from 'vitest';

import {
  defaultTableSettings,
  moveTaskColumn,
  normalizeTaskPins,
  pinTaskColumns,
  taskPinnedCells,
  visibleColumns,
} from '../config/table-settings';
import {
  parseTaskTableSettings,
  taskColumnWidthsVersion,
  taskHeaderControlsVersion,
} from './table-preferences';

it('restores defaults for corrupt or unsupported saved preferences', () => {
  for (const raw of [null, '{', '[]', '{"version":2,"settings":{}}'])
    expect(parseTaskTableSettings(raw)).toEqual(defaultTableSettings());
});

it('updates old column widths once while preserving the rest of the saved configuration', () => {
  const settings = defaultTableSettings();
  settings.columns.reverse();
  settings.striped = true;
  const title = settings.columns.find((column) => column.key === 'title')!;
  title.visible = false;
  title.controls.search = true;
  const saved = {
    ...settings,
    columns: settings.columns.map((column) =>
      column.key === 'selection'
        ? { ...column, width: 100 }
        : { ...column, minWidth: 80, width: 130, maxWidth: 600 },
    ),
  };
  const restored = parseTaskTableSettings(JSON.stringify({ version: 1, settings: saved }));
  expect(restored.striped).toBe(true);
  expect(restored.columns.map((column) => column.key)).toEqual([
    'selection',
    'rowNumber',
    ...settings.columns
      .filter((column) => column.key !== 'selection' && column.key !== 'rowNumber')
      .map((column) => column.key),
  ]);
  expect(restored.columns.find((column) => column.key === 'selection')).toMatchObject({
    minWidth: 70,
    width: 75,
    maxWidth: 120,
  });
  expect(restored.columns.find((column) => column.key === 'title')).toMatchObject({
    visible: false,
    controls: { search: true },
    minWidth: 300,
    width: 360,
    maxWidth: 500,
  });
  expect(restored.columns.find((column) => column.key === 'actions')).toMatchObject({
    minWidth: 200,
    width: 250,
    maxWidth: 350,
  });
  for (const column of restored.columns.filter(
    (column) => !['selection', 'rowNumber', 'title', 'actions'].includes(column.key),
  )) {
    expect(column).toMatchObject({
      minWidth: 180,
      width: ['assignee', 'createdAt', 'dueDate', 'completedAt'].includes(column.key) ? 220 : 200,
      maxWidth: 300,
    });
  }
  restored.columns.find((column) => column.key === 'priority')!.width = 240;
  expect(
    parseTaskTableSettings(
      JSON.stringify({
        version: 1,
        columnWidthsVersion: taskColumnWidthsVersion,
        headerControlsVersion: taskHeaderControlsVersion,
        settings: restored,
      }),
    ),
  ).toEqual(restored);
});

it('migrates the former internal-divider choice to row dividers', () => {
  const settings = defaultTableSettings();
  settings.striped = true;
  const restored = parseTaskTableSettings(
    JSON.stringify({
      version: 1,
      columnWidthsVersion: taskColumnWidthsVersion,
      headerControlsVersion: taskHeaderControlsVersion,
      settings: { ...settings, border: 'separators' },
    }),
  );
  expect(restored).toEqual(settings);
});

it('drops the removed row-reordering preference while preserving other settings', () => {
  const settings = defaultTableSettings();
  settings.reorderColumns = true;
  settings.paginationAlign = 'center';
  const restored = parseTaskTableSettings(
    JSON.stringify({
      version: 1,
      columnWidthsVersion: taskColumnWidthsVersion,
      headerControlsVersion: taskHeaderControlsVersion,
      settings: { ...settings, reorderRows: true },
    }),
  );
  expect(restored).toEqual(settings);
  expect(restored).not.toHaveProperty('reorderRows');
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
  const restored = parseTaskTableSettings(
    JSON.stringify({
      version: 1,
      columnWidthsVersion: taskColumnWidthsVersion,
      headerControlsVersion: taskHeaderControlsVersion,
      settings,
    }),
  );
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
      resizable: true,
      controls: undefined,
      fixed: 'end',
      filter: true,
      search: true,
    },
  );
  const restored = parseTaskTableSettings(
    JSON.stringify({
      version: 1,
      columnWidthsVersion: taskColumnWidthsVersion,
      headerControlsVersion: taskHeaderControlsVersion,
      settings,
    }),
  );
  expect(restored.columns[0]).toMatchObject({
    visible: false,
    width: 100,
    controls: { filter: true, search: true },
  });
  expect(restored.columns[0]).not.toHaveProperty('fixed');
  expect(restored.columns[0]).not.toHaveProperty('resizable');
  expect(restored.selection).toBe(false);
  expect(visibleColumns(restored).some((column) => column.key === 'selection')).toBe(false);
});

it('ignores legacy fixed positions and keeps table order identical to the column list', () => {
  const settings = defaultTableSettings();
  settings.columns.reverse();
  Object.assign(
    settings.columns.find((column) => column.key === 'title')!,
    { fixed: 'start' },
  );
  const restored = parseTaskTableSettings(
    JSON.stringify({
      version: 1,
      columnWidthsVersion: taskColumnWidthsVersion,
      headerControlsVersion: taskHeaderControlsVersion,
      settings,
    }),
  );
  expect(visibleColumns(restored).map((column) => column.key)).toEqual(
    restored.columns.map((column) => column.key),
  );
  expect(restored.columns.some((column) => 'fixed' in column)).toBe(false);
});

it('ignores legacy per-column resizing flags and preserves the global preference', () => {
  const settings = defaultTableSettings();
  const saved = {
    ...settings,
    columns: settings.columns.map((column) => ({ ...column, resizable: false })),
  };
  for (const resizable of [true, false]) {
    const restored = parseTaskTableSettings(
      JSON.stringify({
        version: 1,
        columnWidthsVersion: taskColumnWidthsVersion,
        headerControlsVersion: taskHeaderControlsVersion,
        settings: { ...saved, resizable },
      }),
    );
    expect(restored.resizable).toBe(resizable);
    expect(restored.columns).toEqual(settings.columns);
    expect(restored.columns.some((column) => 'resizable' in column)).toBe(false);
  }
});

it('migrates legacy header choices into the fixed-order control configuration', () => {
  const settings = defaultTableSettings();
  const columns = settings.columns.map(({ controls, ...column }) => ({
    ...column,
    sortMode: controls.sort.enabled ? controls.sort.mode : 'none',
    filter: controls.filter,
    search: controls.search,
    actionsPlacement: 'start',
  }));
  Object.assign(columns[1]!, { sortMode: 'descending', filter: true, search: true });
  const restored = parseTaskTableSettings(
    JSON.stringify({
      version: 1,
      columnWidthsVersion: taskColumnWidthsVersion,
      headerControlsVersion: taskHeaderControlsVersion,
      settings: { ...settings, columns },
    }),
  );
  expect(restored.columns[1]?.controls).toEqual({
    layout: 'separate',
    align: 'start',
    sort: { enabled: true, mode: 'descending' },
    filter: true,
    search: true,
  });
  expect(restored.columns[1]).not.toHaveProperty('sortMode');
  expect(restored.columns[1]).not.toHaveProperty('actionsPlacement');
});

it('keeps existing header alignment when saved preferences have no layout mode', () => {
  const settings = defaultTableSettings();
  const columns = settings.columns.map((column) => ({
    ...column,
    controls: { ...column.controls, layout: undefined, align: 'center' },
  }));
  const restored = parseTaskTableSettings(
    JSON.stringify({
      version: 1,
      columnWidthsVersion: taskColumnWidthsVersion,
      headerControlsVersion: taskHeaderControlsVersion,
      settings: { ...settings, columns },
    }),
  );
  expect(restored.columns[1]?.controls).toMatchObject({ layout: 'separate', align: 'center' });
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
  const result = parseTaskTableSettings(
    JSON.stringify({
      version: 1,
      columnWidthsVersion: taskColumnWidthsVersion,
      headerControlsVersion: taskHeaderControlsVersion,
      settings,
    }),
  );
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

it('adds identity and completion to legacy settings, applies header examples once, and preserves later edits', () => {
  const settings = defaultTableSettings();
  settings.striped = true;
  const columns = settings.columns
    .filter((column) => !['rowNumber', 'completedAt'].includes(column.key))
    .map((column) => ({
      ...column,
      width: column.key === 'title' ? 420 : column.width,
      controls: {
        ...column.controls,
        layout: 'joined',
        align: 'center',
        filter: false,
        search: false,
        sort: { enabled: true, mode: 'both' },
      },
    }));
  const restored = parseTaskTableSettings(
    JSON.stringify({
      version: 1,
      columnWidthsVersion: taskColumnWidthsVersion,
      settings: { ...settings, columns },
    }),
  );
  expect(restored.striped).toBe(true);
  expect(restored.columns.slice(0, 2).map((column) => column.key)).toEqual([
    'selection',
    'rowNumber',
  ]);
  expect(restored.columns.slice(-2).map((column) => column.key)).toEqual([
    'completedAt',
    'actions',
  ]);
  expect(restored.columns.find((column) => column.key === 'title')).toMatchObject({
    width: 420,
    controls: { layout: 'joined', align: 'center', search: true, sort: { enabled: false } },
  });
  expect(restored.columns.find((column) => column.key === 'createdAt')?.controls.sort).toEqual({
    enabled: true,
    mode: 'descending',
  });
  restored.columns.find((column) => column.key === 'title')!.controls.search = false;
  restored.showId = false;
  expect(
    parseTaskTableSettings(
      JSON.stringify({
        version: 1,
        columnWidthsVersion: taskColumnWidthsVersion,
        headerControlsVersion: taskHeaderControlsVersion,
        settings: restored,
      }),
    ),
  ).toEqual(restored);
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

it('preserves the earlier Task minimum migration while applying the new current width', () => {
  const settings = defaultTableSettings();
  const title = settings.columns.find((column) => column.key === 'title')!;
  Object.assign(title, { minWidth: 280, width: 420, maxWidth: 600 });
  settings.columns.find((column) => column.key === 'priority')!.width = 240;
  settings.striped = true;
  const restored = parseTaskTableSettings(
    JSON.stringify({
      version: 1,
      columnWidthsVersion: 2,
      headerControlsVersion: taskHeaderControlsVersion,
      settings,
    }),
  );
  expect(restored).toEqual({
    ...settings,
    columns: settings.columns.map((column) =>
      column.key === 'title' ? { ...column, minWidth: 300, width: 360 } : column,
    ),
  });
  restored.columns.find((column) => column.key === 'title')!.width = 360;
  expect(
    parseTaskTableSettings(
      JSON.stringify({
        version: 1,
        columnWidthsVersion: taskColumnWidthsVersion,
        headerControlsVersion: taskHeaderControlsVersion,
        settings: restored,
      }),
    ),
  ).toEqual(restored);
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
  const save = (pinnedColumns: unknown) =>
    JSON.stringify({
      version: 1,
      columnWidthsVersion: taskColumnWidthsVersion,
      headerControlsVersion: taskHeaderControlsVersion,
      settings: { ...settings, pinnedColumns },
    });
  expect(parseTaskTableSettings(save({ start: null, end: 'completedAt' })).pinnedColumns).toEqual({
    start: null,
    end: 'completedAt',
  });
  expect(parseTaskTableSettings(save({ start: 'bad', end: false })).pinnedColumns).toEqual(
    settings.pinnedColumns,
  );
});

it('updates only the four requested current widths in saved settings and preserves later edits', () => {
  const settings = defaultTableSettings();
  settings.striped = true;
  const title = settings.columns.find((column) => column.key === 'title')!;
  Object.assign(title, { minWidth: 280, width: 300, maxWidth: 600 });
  for (const column of settings.columns)
    if (['createdAt', 'dueDate', 'completedAt'].includes(column.key)) column.width = 200;
  settings.columns.find((column) => column.key === 'priority')!.width = 240;
  const restored = parseTaskTableSettings(
    JSON.stringify({
      version: 1,
      columnWidthsVersion: 3,
      headerControlsVersion: taskHeaderControlsVersion,
      settings,
    }),
  );
  expect(restored).toEqual({
    ...settings,
    columns: settings.columns.map((column) => ({
      ...column,
      width:
        column.key === 'title'
          ? 360
          : ['createdAt', 'dueDate', 'completedAt'].includes(column.key)
            ? 220
            : column.width,
    })),
  });
  restored.columns.find((column) => column.key === 'title')!.width = 400;
  expect(
    parseTaskTableSettings(
      JSON.stringify({
        version: 1,
        columnWidthsVersion: taskColumnWidthsVersion,
        headerControlsVersion: taskHeaderControlsVersion,
        settings: restored,
      }),
    ),
  ).toEqual(restored);
});
