import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const progressMetadata = {
  name: 'Progress',
  package: '@virgo-design/ui',
  category: 'Feedback',
  description: 'Communicates the known completion amount of a determinate task.',
  import: "import { Progress } from '@virgo-design/ui';",
  sizes: ['sm', 'md', 'lg'].map((name) => ({
    name,
    description: 'Token-based track thickness.',
  })),
  intents: ['default', 'success', 'warning', 'error'].map((name) => ({
    name,
    description: 'Semantic completion indicator color.',
  })),
  states: ['empty', 'partial', 'complete', 'clamped'],
  anatomy: [
    { name: 'Progress', description: 'Layout root for optional label and determinate track.' },
    { name: 'header', description: 'Optional label and percentage row.' },
    { name: 'track', description: 'Semantic progressbar exposing normalized values.' },
    { name: 'indicator', description: 'Filled portion calculated from value and max.' },
  ],
  capabilities: {
    determinate: true,
    customMax: true,
    clamping: true,
    label: true,
    valueDisplay: true,
    indeterminate: false,
  },
  accessibility: [
    'The track uses role="progressbar" with aria-valuemin, aria-valuemax, and aria-valuenow.',
    'Provide aria-label or aria-labelledby when surrounding content does not name the task.',
    'Out-of-range and non-finite values are normalized before visual and ARIA output.',
  ],
  examples: [
    { name: 'Basic', code: '<Progress value={80} aria-label="Upload progress" />' },
    { name: 'Custom max', code: '<Progress value={3} max={4} showValue />' },
    { name: 'Labeled', code: '<Progress value={80} label="Uploading" showValue />' },
  ],
} as const satisfies ComponentMetadata;
