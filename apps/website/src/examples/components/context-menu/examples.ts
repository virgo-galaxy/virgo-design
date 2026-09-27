import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

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
    description: 'Right-click the target or focus it and press Shift+F10.',
    Component: ContextMenuTargetExample,
    source: contextMenuTargetSource,
    styleSource: contextMenuTargetStyles,
  },
  contextMenuCheckbox: {
    id: 'context-menu-checkbox',
    title: 'Context preferences',
    description: 'Context menus share the persistent checkbox item model.',
    Component: ContextMenuCheckboxExample,
    source: contextMenuCheckboxSource,
    styleSource: contextMenuCheckboxStyles,
  },
  contextMenuRadio: {
    id: 'context-menu-radio',
    title: 'Context units',
    description: 'A named radio group supplies mutually exclusive preferences.',
    Component: ContextMenuRadioExample,
    source: contextMenuRadioSource,
    styleSource: contextMenuRadioStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
