import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const tableMetadata = {
  name: 'Table',
  package: '@virgo-design/ui',
  category: 'Data Display',
  description:
    'Presents tabular data with native semantics, header dividers, optional column resizing and confirmed column filters.',
  import: "import { Table } from '@virgo-design/ui';",
  sizes: [
    { name: 'mini', description: 'Extra compact presentation.' },
    { name: 'small', description: 'Compact presentation.' },
    { name: 'medium', description: 'Default presentation.' },
    { name: 'large', description: 'Spacious presentation.' },
  ],
  states: ['default', 'hover', 'selected', 'ascending', 'descending', 'filtered', 'resizing'],
  anatomy: [
    {
      name: 'header-controls',
      description:
        'Sorting, filter and search in fixed order with shared start, center or end alignment.',
    },
    {
      name: 'Table.Selection',
      description:
        'Select-page checkbox with an optional hover menu of built-in and custom selection actions.',
    },
    { name: 'Table.Search', description: 'Confirmed column text search with controlled values.' },
    {
      name: 'Table.Filter',
      description: 'Checkbox filter popover with draft values, Confirm and Reset.',
    },
    {
      name: 'column-resize-handle',
      description: 'Optional focusable separator supporting pointer drag and arrow keys.',
    },
    {
      name: 'Table.SortButton',
      description:
        'Cycles none, ascending and descending; headings expose aria-sort while consumers order the data.',
    },
    {
      name: 'Table',
      description: 'Table composition part.',
    },
    {
      name: 'Table.Caption',
      description: 'Table.Caption composition part.',
    },
    {
      name: 'Table.Header',
      description: 'Table.Header composition part.',
    },
    {
      name: 'Table.Body',
      description: 'Table.Body composition part.',
    },
    {
      name: 'Table.Footer',
      description: 'Table.Footer composition part.',
    },
    {
      name: 'Table.Row',
      description: 'Table.Row composition part.',
    },
    {
      name: 'Table.Head',
      description: 'Table.Head composition part.',
    },
    {
      name: 'Table.Cell',
      description: 'Table.Cell composition part.',
    },
    {
      name: 'Table.Viewport',
      description: 'Table.Viewport composition part.',
    },
  ],
  capabilities: {
    nativeTable: true,
    density: true,
    stickyHeader: true,
    sorting: true,
    filtering: true,
    columnResizing: true,
    controlledColumnWidths: true,
    fixedColumns: true,
    singleDirectionSorting: true,
    columnSearching: true,
    headerDividers: true,
    virtualization: false,
  },
  accessibility: [
    'Preserves table, caption, heading scopes and row/cell semantics.',
    'Name Table.Viewport when using its keyboard-accessible overflow region.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
