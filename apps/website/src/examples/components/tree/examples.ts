import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import TreeControlledExample from './TreeControlledExample';
import source1 from './TreeControlledExample.tsx?raw';
import TreeHierarchyExample from './TreeHierarchyExample';
import source0 from './TreeHierarchyExample.tsx?raw';
import TreeMultipleExample from './TreeMultipleExample';
import source2 from './TreeMultipleExample.tsx?raw';

import style1 from './TreeControlledExample.module.scss?virgo-raw';
import style0 from './TreeHierarchyExample.module.scss?virgo-raw';
import style2 from './TreeMultipleExample.module.scss?virgo-raw';
export const treeExamples = {
  example0: {
    id: 'tree-hierarchy',
    title: 'Nested hierarchy',
    titleTranslationKey: 'examples.tree.copy.title0',
    description: 'Disclosure and focus use the visible hierarchy.',
    descriptionTranslationKey: 'examples.tree.copy.description0',
    Component: TreeHierarchyExample,
    source: createExampleSource(source0),
    styleSource: style0,
  },
  example1: {
    id: 'tree-controlled',
    title: 'Controlled expansion and selection',
    titleTranslationKey: 'examples.tree.copy.title1',
    description: 'The application owns both arrays and can collapse a focused branch.',
    descriptionTranslationKey: 'examples.tree.copy.description1',
    Component: TreeControlledExample,
    source: createExampleSource(source1),
    styleSource: style1,
  },
  example2: {
    id: 'tree-multiple',
    title: 'Multiple selection',
    titleTranslationKey: 'examples.tree.copy.title2',
    description: 'Space toggles the focused item without modifier keys.',
    descriptionTranslationKey: 'examples.tree.copy.description2',
    Component: TreeMultipleExample,
    source: createExampleSource(source2),
    styleSource: style2,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
