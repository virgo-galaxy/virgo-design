import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import TableBasicExample from './TableBasicExample';
import style0 from './TableBasicExample.module.scss?virgo-raw';
import source0 from './TableBasicExample.tsx?raw';
import TableCompositionExample from './TableCompositionExample';
import compositionStyles from './TableCompositionExample.module.scss?virgo-raw';
import compositionSource from './TableCompositionExample.tsx?raw';
import TableDensityExample from './TableDensityExample';
import style1 from './TableDensityExample.module.scss?virgo-raw';
import source1 from './TableDensityExample.tsx?raw';
import TableEmptyExample from './TableEmptyExample';
import style2 from './TableEmptyExample.module.scss?virgo-raw';
import source2 from './TableEmptyExample.tsx?raw';
import TableFilteringExample from './TableFilteringExample';
import filteringStyles from './TableFilteringExample.module.scss?virgo-raw';
import filteringSource from './TableFilteringExample.tsx?raw';
import TableSelectionExample from './TableSelectionExample';
import selectionStyles from './TableSelectionExample.module.scss?virgo-raw';
import selectionSource from './TableSelectionExample.tsx?raw';
import TableSortingExample from './TableSortingExample';
import sortingStyles from './TableSortingExample.module.scss?virgo-raw';
import sortingSource from './TableSortingExample.tsx?raw';
export const tableExamples = {
  composition: {
    id: 'table-composition',
    title: 'Composable column controls',
    titleTranslationKey: 'examples.table.copy.compositionTitle',
    description:
      'Combine sorting, filtering and search, with single-direction sort buttons, bounded widths and fixed edge columns.',
    descriptionTranslationKey: 'examples.table.copy.compositionDescription',
    Component: TableCompositionExample,
    source: createExampleSource(compositionSource),
    styleSource: compositionStyles,
  },
  selection: {
    id: 'table-selection',
    title: 'Selection menu',
    titleTranslationKey: 'examples.table.copy.selectionTitle',
    description:
      'An optional hover menu beside the select-page checkbox, with built-in and custom selection actions.',
    descriptionTranslationKey: 'examples.table.copy.selectionDescription',
    Component: TableSelectionExample,
    source: createExampleSource(selectionSource),
    styleSource: selectionStyles,
  },
  filtering: {
    id: 'table-filtering',
    title: 'Column filters and resizing',
    titleTranslationKey: 'examples.table.copy.filteringTitle',
    description:
      'Confirm checkbox filters from a column heading. Header dividers are visible by default; enable resizing to drag them or use arrow keys.',
    descriptionTranslationKey: 'examples.table.copy.filteringDescription',
    Component: TableFilteringExample,
    source: createExampleSource(filteringSource),
    styleSource: filteringStyles,
  },
  sorting: {
    id: 'table-sorting',
    title: 'Three-state sorting',
    titleTranslationKey: 'examples.table.copy.title3',
    description:
      'Click a heading to cycle ascending, descending and original order. Table.SortButton can also be composed independently.',
    descriptionTranslationKey: 'examples.table.copy.description3',
    Component: TableSortingExample,
    source: createExampleSource(sortingSource),
    styleSource: sortingStyles,
  },
  example0: {
    id: 'table-basic',
    title: 'Records and summary',
    titleTranslationKey: 'examples.table.copy.title0',
    description: 'Native headings, a caption and a summary footer.',
    descriptionTranslationKey: 'examples.table.copy.description0',
    Component: TableBasicExample,
    source: createExampleSource(source0),
    styleSource: style0,
  },
  example1: {
    id: 'table-density',
    title: 'Density and borders',
    titleTranslationKey: 'examples.table.copy.title1',
    description:
      'Compare compact, default and comfortable: density controls cell padding and minimum header/row heights. Surface frames internal row separators.',
    descriptionTranslationKey: 'examples.table.copy.description1',
    Component: TableDensityExample,
    source: createExampleSource(source1),
    styleSource: style1,
  },
  example2: {
    id: 'table-empty',
    title: 'Empty and sticky header',
    titleTranslationKey: 'examples.table.copy.title2',
    description: 'Empty composes inside a spanning cell; scroll belongs to the viewport.',
    descriptionTranslationKey: 'examples.table.copy.description2',
    Component: TableEmptyExample,
    source: createExampleSource(source2),
    styleSource: style2,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
