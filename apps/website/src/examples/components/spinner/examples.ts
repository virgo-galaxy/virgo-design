import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import SpinnerButtonExample from './SpinnerButtonExample';
import spinnerButtonSource from './SpinnerButtonExample.tsx?raw';
import SpinnerInlineExample from './SpinnerInlineExample';
import spinnerInlineSource from './SpinnerInlineExample.tsx?raw';
import SpinnerSizesExample from './SpinnerSizesExample';
import spinnerSizesSource from './SpinnerSizesExample.tsx?raw';
import SpinnerThemesExample from './SpinnerThemesExample';
import spinnerThemesSource from './SpinnerThemesExample.tsx?raw';

export const spinnerExamples = {
  spinnerSizes: {
    id: 'spinner-sizes',
    title: 'Sizes and intents',
    description: 'Use currentColor or a semantic intent for a loading indicator.',
    Component: SpinnerSizesExample,
    source: spinnerSizesSource,
  },
  spinnerInline: {
    id: 'spinner-inline',
    title: 'Inline feedback',
    description: 'Compose an indicator with a short task label.',
    Component: SpinnerInlineExample,
    source: spinnerInlineSource,
  },
  spinnerButton: {
    id: 'spinner-button',
    title: 'Button composition',
    description: 'Loading state belongs to the application, not to Spinner.',
    Component: SpinnerButtonExample,
    source: spinnerButtonSource,
  },
  spinnerThemes: {
    id: 'spinner-themes',
    title: 'Theme environments',
    description: 'Semantic colors follow the containing theme.',
    Component: SpinnerThemesExample,
    source: spinnerThemesSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
