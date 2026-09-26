import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

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

export const tagExamples = {
  tagIntents: {
    id: 'tag-intents',
    title: 'Semantic intents',
    description: 'Use the brand and status palette for meaningful labels.',
    Component: TagIntentsExample,
    source: tagIntentsSource,
  },
  tagVariants: {
    id: 'tag-variants',
    title: 'Variants',
    description: 'Soft, solid, and outline express different visual emphasis.',
    Component: TagVariantsExample,
    source: tagVariantsSource,
  },
  tagSizes: {
    id: 'tag-sizes',
    title: 'Sizes',
    description: 'Choose one compact density level for a collection.',
    Component: TagSizesExample,
    source: tagSizesSource,
  },
  tagIcons: {
    id: 'tag-icons',
    title: 'Decorative icons',
    description: 'Icons support the text without replacing its meaning.',
    Component: TagIconsExample,
    source: tagIconsSource,
  },
  tagClosable: {
    id: 'tag-closable',
    title: 'Closable collection',
    description: 'The application removes the selected item and can restore the collection.',
    Component: TagClosableExample,
    source: tagClosableSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
