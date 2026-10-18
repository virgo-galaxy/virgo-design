import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import SegmentedContentExample from './SegmentedContentExample';
import segmentedContentSource from './SegmentedContentExample.tsx?raw';
import SegmentedDisabledExample from './SegmentedDisabledExample';
import segmentedDisabledSource from './SegmentedDisabledExample.tsx?raw';
import SegmentedMotionExample from './SegmentedMotionExample';
import segmentedMotionSource from './SegmentedMotionExample.tsx?raw';
import SegmentedSizesExample from './SegmentedSizesExample';
import segmentedSizesSource from './SegmentedSizesExample.tsx?raw';
import SegmentedVariantsExample from './SegmentedVariantsExample';
import segmentedVariantsSource from './SegmentedVariantsExample.tsx?raw';

import segmentedContentStyles from './SegmentedContentExample.module.scss?virgo-raw';
import segmentedDisabledStyles from './SegmentedDisabledExample.module.scss?virgo-raw';
import segmentedMotionStyles from './SegmentedMotionExample.module.scss?virgo-raw';
import segmentedSizesStyles from './SegmentedSizesExample.module.scss?virgo-raw';
import segmentedVariantsStyles from './SegmentedVariantsExample.module.scss?virgo-raw';

export const segmentedControlExamples = {
  segmentedVariants: {
    id: 'segmented-variants',
    title: 'Visual variants',
    titleTranslationKey: 'examples.segmentedControl.copy.visualVariants',
    description: 'Only the visual treatment changes.',
    descriptionTranslationKey: 'examples.segmentedControl.copy.onlyTheVisualTreatmentChanges',
    Component: SegmentedVariantsExample,
    source: createExampleSource(segmentedVariantsSource),
    styleSource: segmentedVariantsStyles,
  },
  segmentedMotion: {
    id: 'segmented-motion',
    title: 'Indicator motion',
    titleTranslationKey: 'examples.segmentedControl.copy.indicatorMotion',
    description: 'Compare static and sliding indicators across visual variants.',
    descriptionTranslationKey:
      'examples.segmentedControl.copy.compareStaticAndSlidingIndicatorsAcrossVisualVariants',
    Component: SegmentedMotionExample,
    source: createExampleSource(segmentedMotionSource),
    styleSource: segmentedMotionStyles,
  },
  segmentedSizes: {
    id: 'segmented-sizes',
    title: 'Control sizes',
    titleTranslationKey: 'examples.segmentedControl.copy.controlSizes',
    description: 'Only size changes; selection and visual treatment stay fixed.',
    descriptionTranslationKey:
      'examples.segmentedControl.copy.onlySizeChangesSelectionAndVisualTreatmentStayFixed',
    Component: SegmentedSizesExample,
    source: createExampleSource(segmentedSizesSource),
    styleSource: segmentedSizesStyles,
  },
  segmentedContent: {
    id: 'segmented-content',
    title: 'Option content',
    titleTranslationKey: 'examples.segmentedControl.copy.optionContent',
    description: 'Short mode and period choices share the same single-selection behavior.',
    descriptionTranslationKey:
      'examples.segmentedControl.copy.shortModeAndPeriodChoicesShareTheSameSingleSelection',
    Component: SegmentedContentExample,
    source: createExampleSource(segmentedContentSource),
    styleSource: segmentedContentStyles,
  },
  segmentedDisabled: {
    id: 'segmented-disabled',
    title: 'Disabled option',
    titleTranslationKey: 'examples.segmentedControl.copy.disabledOption',
    description: 'Unavailable choices remain visible in context.',
    descriptionTranslationKey:
      'examples.segmentedControl.copy.unavailableChoicesRemainVisibleInContext',
    Component: SegmentedDisabledExample,
    source: createExampleSource(segmentedDisabledSource),
    styleSource: segmentedDisabledStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
