import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import EmptyActionExample from './EmptyActionExample';
import emptyActionSource from './EmptyActionExample.tsx?raw';
import EmptyBasicExample from './EmptyBasicExample';
import emptyBasicSource from './EmptyBasicExample.tsx?raw';
import EmptySearchExample from './EmptySearchExample';
import emptySearchSource from './EmptySearchExample.tsx?raw';

export const emptyExamples = {
  emptyBasic: {
    id: 'empty-basic',
    title: 'Basic messages',
    description: 'Consumers own all titles and descriptions.',
    Component: EmptyBasicExample,
    source: emptyBasicSource,
  },
  emptyAction: {
    id: 'empty-action',
    title: 'Icon and action',
    description: 'The application handles the action and replaces its own empty state.',
    Component: EmptyActionExample,
    source: emptyActionSource,
  },
  emptySearch: {
    id: 'empty-search',
    title: 'Compact search state',
    description: 'The small size fits a constrained surface.',
    Component: EmptySearchExample,
    source: emptySearchSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
