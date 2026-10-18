import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import EmptyActionExample from './EmptyActionExample';
import emptyActionSource from './EmptyActionExample.tsx?raw';
import EmptyBasicExample from './EmptyBasicExample';
import emptyBasicSource from './EmptyBasicExample.tsx?raw';
import EmptySearchExample from './EmptySearchExample';
import emptySearchSource from './EmptySearchExample.tsx?raw';

import emptyActionStyles from './EmptyActionExample.module.scss?virgo-raw';
import emptyBasicStyles from './EmptyBasicExample.module.scss?virgo-raw';
import emptySearchStyles from './EmptySearchExample.module.scss?virgo-raw';

export const emptyExamples = {
  emptyBasic: {
    id: 'empty-basic',
    title: 'Basic messages',
    titleTranslationKey: 'examples.empty.copy.basicMessages',
    description: 'Consumers own all titles and descriptions.',
    descriptionTranslationKey: 'examples.empty.copy.consumersOwnAllTitlesAndDescriptions',
    Component: EmptyBasicExample,
    source: createExampleSource(emptyBasicSource),
    styleSource: emptyBasicStyles,
  },
  emptyAction: {
    id: 'empty-action',
    title: 'Icon and action',
    titleTranslationKey: 'examples.empty.copy.iconAndAction',
    description: 'The application handles the action and replaces its own empty state.',
    descriptionTranslationKey:
      'examples.empty.copy.theApplicationHandlesTheActionAndReplacesItsOwnEmpty',
    Component: EmptyActionExample,
    source: createExampleSource(emptyActionSource),
    styleSource: emptyActionStyles,
  },
  emptySearch: {
    id: 'empty-search',
    title: 'Compact search state',
    titleTranslationKey: 'examples.empty.copy.compactSearchState',
    description: 'The small size fits a constrained surface.',
    descriptionTranslationKey: 'examples.empty.copy.theSmallSizeFitsAConstrainedSurface',
    Component: EmptySearchExample,
    source: createExampleSource(emptySearchSource),
    styleSource: emptySearchStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
