import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import PaginationAlignmentExample from './PaginationAlignmentExample';
import paginationAlignmentSource from './PaginationAlignmentExample.tsx?raw';
import PaginationBasicExample from './PaginationBasicExample';
import paginationBasicSource from './PaginationBasicExample.tsx?raw';
import PaginationControlledExample from './PaginationControlledExample';
import paginationControlledSource from './PaginationControlledExample.tsx?raw';
import PaginationDisabledExample from './PaginationDisabledExample';
import paginationDisabledSource from './PaginationDisabledExample.tsx?raw';
import PaginationEmptyExample from './PaginationEmptyExample';
import paginationEmptySource from './PaginationEmptyExample.tsx?raw';
import PaginationLocalizationExample from './PaginationLocalizationExample';
import paginationLocalizationSource from './PaginationLocalizationExample.tsx?raw';
import PaginationMoreExample from './PaginationMoreExample';
import paginationMoreSource from './PaginationMoreExample.tsx?raw';
import PaginationPageSizeExample from './PaginationPageSizeExample';
import paginationPageSizeSource from './PaginationPageSizeExample.tsx?raw';
import PaginationQuickJumpExample from './PaginationQuickJumpExample';
import paginationQuickJumpSource from './PaginationQuickJumpExample.tsx?raw';
import PaginationRangeExample from './PaginationRangeExample';
import paginationRangeSource from './PaginationRangeExample.tsx?raw';
import PaginationTextLabelsExample from './PaginationTextLabelsExample';
import paginationTextLabelsSource from './PaginationTextLabelsExample.tsx?raw';
import PaginationTotalExample from './PaginationTotalExample';
import paginationTotalSource from './PaginationTotalExample.tsx?raw';

export const paginationExamples = {
  paginationBasic: {
    id: 'pagination-basic',
    title: 'Basic pagination',
    description: 'Native page buttons respect collection boundaries.',
    Component: PaginationBasicExample,
    source: paginationBasicSource,
  },
  paginationMore: {
    id: 'pagination-more',
    title: 'More pages',
    description: 'The first and last pages remain visible with bounded jump actions.',
    Component: PaginationMoreExample,
    source: paginationMoreSource,
  },
  paginationPageSize: {
    id: 'pagination-page-size',
    title: 'Page size',
    description: 'Changing the page size returns to page one.',
    Component: PaginationPageSizeExample,
    source: paginationPageSizeSource,
  },
  paginationQuickJump: {
    id: 'pagination-quick-jump',
    title: 'Quick jump',
    description: 'Enter a valid page number; Escape clears the draft.',
    Component: PaginationQuickJumpExample,
    source: paginationQuickJumpSource,
  },
  paginationTotal: {
    id: 'pagination-total',
    title: 'Total count',
    description: 'Show the collection count independently.',
    Component: PaginationTotalExample,
    source: paginationTotalSource,
  },
  paginationRange: {
    id: 'pagination-range',
    title: 'Item range',
    description: 'Render the visible range and total with a callback.',
    Component: PaginationRangeExample,
    source: paginationRangeSource,
  },
  paginationTextLabels: {
    id: 'pagination-text-labels',
    title: 'Text navigation',
    description: 'Replace directional icons with text labels.',
    Component: PaginationTextLabelsExample,
    source: paginationTextLabelsSource,
  },
  paginationDisabled: {
    id: 'pagination-disabled',
    title: 'Disabled collection',
    description: 'All controls honor the disabled state.',
    Component: PaginationDisabledExample,
    source: paginationDisabledSource,
  },
  paginationEmpty: {
    id: 'pagination-empty',
    title: 'Empty collection',
    description: 'Keep a stable page-one layout with a zero item range.',
    Component: PaginationEmptyExample,
    source: paginationEmptySource,
  },
  paginationControlled: {
    id: 'pagination-controlled',
    title: 'All options',
    description: 'Own both page and page size while toggling the optional controls.',
    Component: PaginationControlledExample,
    source: paginationControlledSource,
  },
  paginationAlignment: {
    id: 'pagination-alignment',
    title: 'Group alignment',
    description: 'Align the whole pagination group within its container.',
    Component: PaginationAlignmentExample,
    source: paginationAlignmentSource,
  },
  paginationLocalization: {
    id: 'pagination-localization',
    title: 'Localized labels',
    description: 'Control visible and accessible labels together.',
    Component: PaginationLocalizationExample,
    source: paginationLocalizationSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
