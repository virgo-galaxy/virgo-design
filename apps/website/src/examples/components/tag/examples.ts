import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import TagClosableExample from './TagClosableExample';
import tagClosableStyles from './TagClosableExample.module.scss?virgo-raw';
import tagClosableSource from './TagClosableExample.tsx?raw';
import TagIconsExample from './TagIconsExample';
import tagIconsStyles from './TagIconsExample.module.scss?virgo-raw';
import tagIconsSource from './TagIconsExample.tsx?raw';
import TagIntentsExample from './TagIntentsExample';
import tagIntentsStyles from './TagIntentsExample.module.scss?virgo-raw';
import tagIntentsSource from './TagIntentsExample.tsx?raw';
import TagSizesExample from './TagSizesExample';
import tagSizesStyles from './TagSizesExample.module.scss?virgo-raw';
import tagSizesSource from './TagSizesExample.tsx?raw';
import TagVariantsExample from './TagVariantsExample';
import tagVariantsStyles from './TagVariantsExample.module.scss?virgo-raw';
import tagVariantsSource from './TagVariantsExample.tsx?raw';

export const tagExamples = {
  tagIntents: {
    id: 'tag-intents',
    title: 'Semantic intents',
    description: 'Use the brand and status palette for meaningful labels.',
    Component: TagIntentsExample,
    source: tagIntentsSource,
    styleSource: tagIntentsStyles,
  },
  tagVariants: {
    id: 'tag-variants',
    title: 'Variants',
    description: 'Soft, solid, and outline express different visual emphasis.',
    Component: TagVariantsExample,
    source: tagVariantsSource,
    styleSource: tagVariantsStyles,
  },
  tagSizes: {
    id: 'tag-sizes',
    title: 'Sizes',
    description: 'Choose one compact density level for a collection.',
    Component: TagSizesExample,
    source: tagSizesSource,
    styleSource: tagSizesStyles,
  },
  tagIcons: {
    id: 'tag-icons',
    title: 'Decorative icons',
    description: 'Icons support the text without replacing its meaning.',
    Component: TagIconsExample,
    source: tagIconsSource,
    styleSource: tagIconsStyles,
  },
  tagClosable: {
    id: 'tag-closable',
    title: 'Closable collection',
    description: 'The application removes the selected item and can restore the collection.',
    Component: TagClosableExample,
    source: tagClosableSource,
    styleSource: tagClosableStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
