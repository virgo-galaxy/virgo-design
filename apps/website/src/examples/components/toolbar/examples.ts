import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import ToolbarActionsExample from './ToolbarActionsExample';
import source from './ToolbarActionsExample.tsx?raw';

import styleSource from './ToolbarActionsExample.module.scss?virgo-raw';

export const toolbarExamples = {
  actions: {
    id: 'toolbar-actions',
    title: 'Independent actions',
    titleTranslationKey: 'components.toolbar.actions',
    description: 'Independent buttons can change content or open menus.',
    descriptionTranslationKey: 'components.toolbar.exampleDescription',
    Component: ToolbarActionsExample,
    source: createExampleSource(source),
    styleSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
