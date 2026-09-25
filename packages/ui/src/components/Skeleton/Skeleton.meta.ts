import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const skeletonMetadata = {
  name: 'Skeleton',
  package: '@virgo-design/ui',
  category: 'Feedback',
  description: 'Provides a visual content placeholder while a layout is loading.',
  import: "import { Skeleton } from '@virgo-design/ui';",
  variants: [
    { name: 'text', description: 'Line-shaped placeholder sized relative to text.' },
    { name: 'rectangle', description: 'Default block placeholder for media and surfaces.' },
    { name: 'circle', description: 'Circular placeholder for avatars and round media.' },
  ],
  states: ['animated', 'static'],
  anatomy: [
    { name: 'Skeleton', description: 'Single visual placeholder with selectable geometry.' },
  ],
  capabilities: {
    nativeDimensions: true,
    animated: true,
    reducedMotion: true,
    contentInference: false,
    runtimeMeasurement: false,
  },
  accessibility: [
    'Skeleton is a visual placeholder and defaults to aria-hidden="true".',
    'The loading region that owns Skeleton should communicate its busy state separately.',
    'Animation uses motion tokens and stops under prefers-reduced-motion.',
  ],
  examples: [
    { name: 'Text', code: '<Skeleton variant="text" style={{ width: 200 }} />' },
    { name: 'Circle', code: '<Skeleton variant="circle" />' },
    { name: 'Static rectangle', code: '<Skeleton animated={false} style={{ height: 120 }} />' },
  ],
} as const satisfies ComponentMetadata;
