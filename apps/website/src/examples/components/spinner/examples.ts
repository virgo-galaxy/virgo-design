import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import SpinnerButtonExample from './SpinnerButtonExample';
import spinnerButtonStyles from './SpinnerButtonExample.module.scss?virgo-raw';
import spinnerButtonSource from './SpinnerButtonExample.tsx?raw';
import SpinnerInlineExample from './SpinnerInlineExample';
import spinnerInlineStyles from './SpinnerInlineExample.module.scss?virgo-raw';
import spinnerInlineSource from './SpinnerInlineExample.tsx?raw';
import SpinnerSizesExample from './SpinnerSizesExample';
import spinnerSizesStyles from './SpinnerSizesExample.module.scss?virgo-raw';
import spinnerSizesSource from './SpinnerSizesExample.tsx?raw';
import SpinnerThemesExample from './SpinnerThemesExample';
import spinnerThemesStyles from './SpinnerThemesExample.module.scss?virgo-raw';
import spinnerThemesSource from './SpinnerThemesExample.tsx?raw';

export const spinnerExamples = {
  spinnerSizes: {
    id: 'spinner-sizes',
    title: 'Sizes and intents',
    description: 'Use currentColor or a semantic intent for a loading indicator.',
    Component: SpinnerSizesExample,
    source: spinnerSizesSource,
    styleSource: spinnerSizesStyles,
  },
  spinnerInline: {
    id: 'spinner-inline',
    title: 'Inline feedback',
    description: 'Compose an indicator with a short task label.',
    Component: SpinnerInlineExample,
    source: spinnerInlineSource,
    styleSource: spinnerInlineStyles,
  },
  spinnerButton: {
    id: 'spinner-button',
    title: 'Button composition',
    description: 'Loading state belongs to the application, not to Spinner.',
    Component: SpinnerButtonExample,
    source: spinnerButtonSource,
    styleSource: spinnerButtonStyles,
  },
  spinnerThemes: {
    id: 'spinner-themes',
    title: 'Theme environments',
    description: 'Semantic colors follow the containing theme.',
    Component: SpinnerThemesExample,
    source: spinnerThemesSource,
    styleSource: spinnerThemesStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
