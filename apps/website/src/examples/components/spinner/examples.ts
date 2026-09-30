import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

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
    titleTranslationKey: 'examples.spinner.copy.sizesAndIntents',
    description: 'Use currentColor or a semantic intent for a loading indicator.',
    descriptionTranslationKey:
      'examples.spinner.copy.useCurrentcolorOrASemanticIntentForALoadingIndicator',
    Component: SpinnerSizesExample,
    source: createExampleSource(spinnerSizesSource),
    styleSource: spinnerSizesStyles,
  },
  spinnerInline: {
    id: 'spinner-inline',
    title: 'Inline feedback',
    titleTranslationKey: 'examples.spinner.copy.inlineFeedback',
    description: 'Compose an indicator with a short task label.',
    descriptionTranslationKey: 'examples.spinner.copy.composeAnIndicatorWithAShortTaskLabel',
    Component: SpinnerInlineExample,
    source: createExampleSource(spinnerInlineSource),
    styleSource: spinnerInlineStyles,
  },
  spinnerButton: {
    id: 'spinner-button',
    title: 'Button composition',
    titleTranslationKey: 'examples.spinner.copy.buttonComposition',
    description: 'Loading state belongs to the application, not to Spinner.',
    descriptionTranslationKey:
      'examples.spinner.copy.loadingStateBelongsToTheApplicationNotToSpinner',
    Component: SpinnerButtonExample,
    source: createExampleSource(spinnerButtonSource),
    styleSource: spinnerButtonStyles,
  },
  spinnerThemes: {
    id: 'spinner-themes',
    title: 'Theme environments',
    titleTranslationKey: 'examples.spinner.copy.themeEnvironments',
    description: 'Semantic colors follow the containing theme.',
    descriptionTranslationKey: 'examples.spinner.copy.semanticColorsFollowTheContainingTheme',
    Component: SpinnerThemesExample,
    source: createExampleSource(spinnerThemesSource),
    styleSource: spinnerThemesStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
