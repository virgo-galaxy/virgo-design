import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import EmptyActionExample from './EmptyActionExample';
import emptyActionStyles from './EmptyActionExample.module.scss?virgo-raw';
import emptyActionSource from './EmptyActionExample.tsx?raw';
import EmptyBasicExample from './EmptyBasicExample';
import emptyBasicStyles from './EmptyBasicExample.module.scss?virgo-raw';
import emptyBasicSource from './EmptyBasicExample.tsx?raw';
import EmptySearchExample from './EmptySearchExample';
import emptySearchStyles from './EmptySearchExample.module.scss?virgo-raw';
import emptySearchSource from './EmptySearchExample.tsx?raw';

export const emptyExamples = {
  emptyBasic: {
    id: 'empty-basic',
    title: 'Basic messages',
    description: 'Consumers own all titles and descriptions.',
    Component: EmptyBasicExample,
    source: emptyBasicSource,
    styleSource: emptyBasicStyles,
  },
  emptyAction: {
    id: 'empty-action',
    title: 'Icon and action',
    description: 'The application handles the action and replaces its own empty state.',
    Component: EmptyActionExample,
    source: emptyActionSource,
    styleSource: emptyActionStyles,
  },
  emptySearch: {
    id: 'empty-search',
    title: 'Compact search state',
    description: 'The small size fits a constrained surface.',
    Component: EmptySearchExample,
    source: emptySearchSource,
    styleSource: emptySearchStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
