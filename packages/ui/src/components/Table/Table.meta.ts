import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const tableMetadata = {
  name: 'Table',
  package: '@virgo-design/ui',
  category: 'Data Display',
  description:
    'Presents tabular data with native table semantics and composable density and borders.',
  import: "import { Table } from '@virgo-design/ui';",
  sizes: [
    { name: 'small', description: 'Compact presentation.' },
    { name: 'medium', description: 'Default presentation.' },
    { name: 'large', description: 'Spacious presentation.' },
  ],
  states: ['default', 'hover', 'selected'],
  anatomy: [
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
    stickyHeader: true,
    sorting: false,
    virtualization: false,
  },
  accessibility: [
    'Preserves table, caption, heading scopes and row/cell semantics.',
    'Name Table.Viewport when using its keyboard-accessible overflow region.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
