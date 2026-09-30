import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import ContextMenuCheckboxExample from './ContextMenuCheckboxExample';
import contextMenuCheckboxStyles from './ContextMenuCheckboxExample.module.scss?virgo-raw';
import contextMenuCheckboxSource from './ContextMenuCheckboxExample.tsx?raw';
import ContextMenuRadioExample from './ContextMenuRadioExample';
import contextMenuRadioStyles from './ContextMenuRadioExample.module.scss?virgo-raw';
import contextMenuRadioSource from './ContextMenuRadioExample.tsx?raw';
import ContextMenuTargetExample from './ContextMenuTargetExample';
import contextMenuTargetStyles from './ContextMenuTargetExample.module.scss?virgo-raw';
import contextMenuTargetSource from './ContextMenuTargetExample.tsx?raw';

export const contextMenuExamples = {
  contextMenuTarget: {
    id: 'context-menu-target',
    title: 'Object context',
    titleTranslationKey: 'examples.contextMenu.copy.objectContext',
    description: 'Right-click the target or focus it and press Shift+F10.',
    descriptionTranslationKey:
      'examples.contextMenu.copy.rightClickTheTargetOrFocusItAndPressShift',
    Component: ContextMenuTargetExample,
    source: createExampleSource(contextMenuTargetSource),
    styleSource: contextMenuTargetStyles,
  },
  contextMenuCheckbox: {
    id: 'context-menu-checkbox',
    title: 'Context preferences',
    titleTranslationKey: 'examples.contextMenu.copy.contextPreferences',
    description: 'Context menus share the persistent checkbox item model.',
    descriptionTranslationKey:
      'examples.contextMenu.copy.contextMenusShareThePersistentCheckboxItemModel',
    Component: ContextMenuCheckboxExample,
    source: createExampleSource(contextMenuCheckboxSource),
    styleSource: contextMenuCheckboxStyles,
  },
  contextMenuRadio: {
    id: 'context-menu-radio',
    title: 'Context units',
    titleTranslationKey: 'examples.contextMenu.copy.contextUnits',
    description: 'A named radio group supplies mutually exclusive preferences.',
    descriptionTranslationKey:
      'examples.contextMenu.copy.aNamedRadioGroupSuppliesMutuallyExclusivePreferences',
    Component: ContextMenuRadioExample,
    source: createExampleSource(contextMenuRadioSource),
    styleSource: contextMenuRadioStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
