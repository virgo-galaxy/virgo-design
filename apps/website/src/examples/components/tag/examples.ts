import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import TagClosableExample from './TagClosableExample';
import tagClosableSource from './TagClosableExample.tsx?raw';
import TagIconsExample from './TagIconsExample';
import tagIconsSource from './TagIconsExample.tsx?raw';
import TagIntentsExample from './TagIntentsExample';
import tagIntentsSource from './TagIntentsExample.tsx?raw';
import TagSizesExample from './TagSizesExample';
import tagSizesSource from './TagSizesExample.tsx?raw';
import TagVariantsExample from './TagVariantsExample';
import tagVariantsSource from './TagVariantsExample.tsx?raw';

import tagClosableStyles from './TagClosableExample.module.scss?virgo-raw';
import tagIconsStyles from './TagIconsExample.module.scss?virgo-raw';
import tagIntentsStyles from './TagIntentsExample.module.scss?virgo-raw';
import tagSizesStyles from './TagSizesExample.module.scss?virgo-raw';
import tagVariantsStyles from './TagVariantsExample.module.scss?virgo-raw';

export const tagExamples = {
  tagIntents: {
    id: 'tag-intents',
    title: 'Semantic intents',
    titleTranslationKey: 'examples.tag.copy.semanticIntents',
    description: 'Use the brand and status palette for meaningful labels.',
    descriptionTranslationKey: 'examples.tag.copy.useTheBrandAndStatusPaletteForMeaningfulLabels',
    Component: TagIntentsExample,
    source: createExampleSource(tagIntentsSource),
    styleSource: tagIntentsStyles,
  },
  tagVariants: {
    id: 'tag-variants',
    title: 'Variants',
    titleTranslationKey: 'examples.tag.copy.variants',
    description: 'Soft, solid, and outline express different visual emphasis.',
    descriptionTranslationKey:
      'examples.tag.copy.softSolidAndOutlineExpressDifferentVisualEmphasis',
    Component: TagVariantsExample,
    source: createExampleSource(tagVariantsSource),
    styleSource: tagVariantsStyles,
  },
  tagSizes: {
    id: 'tag-sizes',
    title: 'Sizes',
    titleTranslationKey: 'examples.tag.copy.sizes',
    description: 'Choose one compact density level for a collection.',
    descriptionTranslationKey: 'examples.tag.copy.chooseOneCompactDensityLevelForACollection',
    Component: TagSizesExample,
    source: createExampleSource(tagSizesSource),
    styleSource: tagSizesStyles,
  },
  tagIcons: {
    id: 'tag-icons',
    title: 'Decorative icons',
    titleTranslationKey: 'examples.tag.copy.decorativeIcons',
    description: 'Icons support the text without replacing its meaning.',
    descriptionTranslationKey: 'examples.tag.copy.iconsSupportTheTextWithoutReplacingItsMeaning',
    Component: TagIconsExample,
    source: createExampleSource(tagIconsSource),
    styleSource: tagIconsStyles,
  },
  tagClosable: {
    id: 'tag-closable',
    title: 'Closable collection',
    titleTranslationKey: 'examples.tag.copy.closableCollection',
    description: 'The application removes the selected item and can restore the collection.',
    descriptionTranslationKey:
      'examples.tag.copy.theApplicationRemovesTheSelectedItemAndCanRestoreThe',
    Component: TagClosableExample,
    source: createExampleSource(tagClosableSource),
    styleSource: tagClosableStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
