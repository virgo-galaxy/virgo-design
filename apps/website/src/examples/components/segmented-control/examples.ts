import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import SegmentedContentExample from './SegmentedContentExample';
import segmentedContentStyles from './SegmentedContentExample.module.scss?virgo-raw';
import segmentedContentSource from './SegmentedContentExample.tsx?raw';
import SegmentedDisabledExample from './SegmentedDisabledExample';
import segmentedDisabledStyles from './SegmentedDisabledExample.module.scss?virgo-raw';
import segmentedDisabledSource from './SegmentedDisabledExample.tsx?raw';
import SegmentedMotionExample from './SegmentedMotionExample';
import segmentedMotionStyles from './SegmentedMotionExample.module.scss?virgo-raw';
import segmentedMotionSource from './SegmentedMotionExample.tsx?raw';
import SegmentedSizesExample from './SegmentedSizesExample';
import segmentedSizesStyles from './SegmentedSizesExample.module.scss?virgo-raw';
import segmentedSizesSource from './SegmentedSizesExample.tsx?raw';
import SegmentedVariantsExample from './SegmentedVariantsExample';
import segmentedVariantsStyles from './SegmentedVariantsExample.module.scss?virgo-raw';
import segmentedVariantsSource from './SegmentedVariantsExample.tsx?raw';

export const segmentedControlExamples = {
  segmentedVariants: {
    id: 'segmented-variants',
    title: 'Visual variants',
    description: 'Only the visual treatment changes.',
    Component: SegmentedVariantsExample,
    source: segmentedVariantsSource,
    styleSource: segmentedVariantsStyles,
  },
  segmentedMotion: {
    id: 'segmented-motion',
    title: 'Indicator motion',
    description: 'Compare static and sliding indicators across visual variants.',
    Component: SegmentedMotionExample,
    source: segmentedMotionSource,
    styleSource: segmentedMotionStyles,
  },
  segmentedSizes: {
    id: 'segmented-sizes',
    title: 'Control sizes',
    description: 'Only size changes; selection and visual treatment stay fixed.',
    Component: SegmentedSizesExample,
    source: segmentedSizesSource,
    styleSource: segmentedSizesStyles,
  },
  segmentedContent: {
    id: 'segmented-content',
    title: 'Option content',
    description: 'Short mode and period choices share the same single-selection behavior.',
    Component: SegmentedContentExample,
    source: segmentedContentSource,
    styleSource: segmentedContentStyles,
  },
  segmentedDisabled: {
    id: 'segmented-disabled',
    title: 'Disabled option',
    description: 'Unavailable choices remain visible in context.',
    Component: SegmentedDisabledExample,
    source: segmentedDisabledSource,
    styleSource: segmentedDisabledStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
