import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

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

export const segmentedControlExamples = {
  segmentedVariants: {
    id: 'segmented-variants',
    title: 'Visual variants',
    description: 'Only the visual treatment changes.',
    Component: SegmentedVariantsExample,
    source: segmentedVariantsSource,
  },
  segmentedMotion: {
    id: 'segmented-motion',
    title: 'Indicator motion',
    description: 'Compare static and sliding indicators across visual variants.',
    Component: SegmentedMotionExample,
    source: segmentedMotionSource,
  },
  segmentedSizes: {
    id: 'segmented-sizes',
    title: 'Control sizes',
    description: 'Only size changes; selection and visual treatment stay fixed.',
    Component: SegmentedSizesExample,
    source: segmentedSizesSource,
  },
  segmentedContent: {
    id: 'segmented-content',
    title: 'Option content',
    description: 'Short mode and period choices share the same single-selection behavior.',
    Component: SegmentedContentExample,
    source: segmentedContentSource,
  },
  segmentedDisabled: {
    id: 'segmented-disabled',
    title: 'Disabled option',
    description: 'Unavailable choices remain visible in context.',
    Component: SegmentedDisabledExample,
    source: segmentedDisabledSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
