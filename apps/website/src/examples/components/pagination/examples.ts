import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

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

import paginationAlignmentStyles from './PaginationAlignmentExample.module.scss?virgo-raw';
import paginationBasicStyles from './PaginationBasicExample.module.scss?virgo-raw';
import paginationControlledStyles from './PaginationControlledExample.module.scss?virgo-raw';
import paginationDisabledStyles from './PaginationDisabledExample.module.scss?virgo-raw';
import paginationEmptyStyles from './PaginationEmptyExample.module.scss?virgo-raw';
import paginationLocalizationStyles from './PaginationLocalizationExample.module.scss?virgo-raw';
import paginationMoreStyles from './PaginationMoreExample.module.scss?virgo-raw';
import paginationPageSizeStyles from './PaginationPageSizeExample.module.scss?virgo-raw';
import paginationQuickJumpStyles from './PaginationQuickJumpExample.module.scss?virgo-raw';
import paginationRangeStyles from './PaginationRangeExample.module.scss?virgo-raw';
import paginationTextLabelsStyles from './PaginationTextLabelsExample.module.scss?virgo-raw';
import paginationTotalStyles from './PaginationTotalExample.module.scss?virgo-raw';

export const paginationExamples = {
  paginationBasic: {
    id: 'pagination-basic',
    title: 'Basic pagination',
    titleTranslationKey: 'examples.pagination.copy.basicPagination',
    description: 'Native page buttons respect collection boundaries.',
    descriptionTranslationKey:
      'examples.pagination.copy.nativePageButtonsRespectCollectionBoundaries',
    Component: PaginationBasicExample,
    source: createExampleSource(paginationBasicSource),
    styleSource: paginationBasicStyles,
  },
  paginationMore: {
    id: 'pagination-more',
    title: 'More pages',
    titleTranslationKey: 'examples.pagination.copy.morePages',
    description: 'The first and last pages remain visible with bounded jump actions.',
    descriptionTranslationKey:
      'examples.pagination.copy.theFirstAndLastPagesRemainVisibleWithBoundedJump',
    Component: PaginationMoreExample,
    source: createExampleSource(paginationMoreSource),
    styleSource: paginationMoreStyles,
  },
  paginationPageSize: {
    id: 'pagination-page-size',
    title: 'Page size',
    titleTranslationKey: 'examples.pagination.copy.pageSize',
    description: 'Changing the page size returns to page one.',
    descriptionTranslationKey: 'examples.pagination.copy.changingThePageSizeReturnsToPageOne',
    Component: PaginationPageSizeExample,
    source: createExampleSource(paginationPageSizeSource),
    styleSource: paginationPageSizeStyles,
  },
  paginationQuickJump: {
    id: 'pagination-quick-jump',
    title: 'Quick jump',
    titleTranslationKey: 'examples.pagination.copy.quickJump',
    description: 'Enter a valid page number; Escape clears the draft.',
    descriptionTranslationKey: 'examples.pagination.copy.enterAValidPageNumberEscapeClearsTheDraft',
    Component: PaginationQuickJumpExample,
    source: createExampleSource(paginationQuickJumpSource),
    styleSource: paginationQuickJumpStyles,
  },
  paginationTotal: {
    id: 'pagination-total',
    title: 'Total count',
    titleTranslationKey: 'examples.pagination.copy.totalCount',
    description: 'Show the collection count independently.',
    descriptionTranslationKey: 'examples.pagination.copy.showTheCollectionCountIndependently',
    Component: PaginationTotalExample,
    source: createExampleSource(paginationTotalSource),
    styleSource: paginationTotalStyles,
  },
  paginationRange: {
    id: 'pagination-range',
    title: 'Item range',
    titleTranslationKey: 'examples.pagination.copy.itemRange',
    description: 'Render the visible range and total with a callback.',
    descriptionTranslationKey:
      'examples.pagination.copy.renderTheVisibleRangeAndTotalWithACallback',
    Component: PaginationRangeExample,
    source: createExampleSource(paginationRangeSource),
    styleSource: paginationRangeStyles,
  },
  paginationTextLabels: {
    id: 'pagination-text-labels',
    title: 'Text navigation',
    titleTranslationKey: 'examples.pagination.copy.textNavigation',
    description: 'Replace directional icons with text labels.',
    descriptionTranslationKey: 'examples.pagination.copy.replaceDirectionalIconsWithTextLabels',
    Component: PaginationTextLabelsExample,
    source: createExampleSource(paginationTextLabelsSource),
    styleSource: paginationTextLabelsStyles,
  },
  paginationDisabled: {
    id: 'pagination-disabled',
    title: 'Disabled collection',
    titleTranslationKey: 'examples.pagination.copy.disabledCollection',
    description: 'All controls honor the disabled state.',
    descriptionTranslationKey: 'examples.pagination.copy.allControlsHonorTheDisabledState',
    Component: PaginationDisabledExample,
    source: createExampleSource(paginationDisabledSource),
    styleSource: paginationDisabledStyles,
  },
  paginationEmpty: {
    id: 'pagination-empty',
    title: 'Empty collection',
    titleTranslationKey: 'examples.pagination.copy.emptyCollection',
    description: 'Keep a stable page-one layout with a zero item range.',
    descriptionTranslationKey: 'examples.pagination.copy.keepAStablePageOneLayoutWithAZeroItem',
    Component: PaginationEmptyExample,
    source: createExampleSource(paginationEmptySource),
    styleSource: paginationEmptyStyles,
  },
  paginationControlled: {
    id: 'pagination-controlled',
    title: 'All options',
    titleTranslationKey: 'examples.pagination.copy.allOptions',
    description: 'Own both page and page size while toggling the optional controls.',
    descriptionTranslationKey:
      'examples.pagination.copy.ownBothPageAndPageSizeWhileTogglingTheOptional',
    Component: PaginationControlledExample,
    source: createExampleSource(paginationControlledSource),
    styleSource: paginationControlledStyles,
  },
  paginationAlignment: {
    id: 'pagination-alignment',
    title: 'Group alignment',
    titleTranslationKey: 'examples.pagination.copy.groupAlignment',
    description: 'Align the whole pagination group within its container.',
    descriptionTranslationKey:
      'examples.pagination.copy.alignTheWholePaginationGroupWithinItsContainer',
    Component: PaginationAlignmentExample,
    source: createExampleSource(paginationAlignmentSource),
    styleSource: paginationAlignmentStyles,
  },
  paginationLocalization: {
    id: 'pagination-localization',
    title: 'Localized labels',
    titleTranslationKey: 'examples.pagination.copy.localizedLabels',
    description: 'Control visible and accessible labels together.',
    descriptionTranslationKey: 'examples.pagination.copy.controlVisibleAndAccessibleLabelsTogether',
    Component: PaginationLocalizationExample,
    source: createExampleSource(paginationLocalizationSource),
    styleSource: paginationLocalizationStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
