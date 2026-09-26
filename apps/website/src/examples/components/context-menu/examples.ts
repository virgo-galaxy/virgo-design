import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import ContextMenuCheckboxExample from './ContextMenuCheckboxExample';
import contextMenuCheckboxSource from './ContextMenuCheckboxExample.tsx?raw';
import ContextMenuRadioExample from './ContextMenuRadioExample';
import contextMenuRadioSource from './ContextMenuRadioExample.tsx?raw';
import ContextMenuTargetExample from './ContextMenuTargetExample';
import contextMenuTargetSource from './ContextMenuTargetExample.tsx?raw';

export const contextMenuExamples = {
  contextMenuTarget: {
    id: 'context-menu-target',
    title: 'Object context',
    description: 'Right-click the target or focus it and press Shift+F10.',
    Component: ContextMenuTargetExample,
    source: contextMenuTargetSource,
  },
  contextMenuCheckbox: {
    id: 'context-menu-checkbox',
    title: 'Context preferences',
    description: 'Context menus share the persistent checkbox item model.',
    Component: ContextMenuCheckboxExample,
    source: contextMenuCheckboxSource,
  },
  contextMenuRadio: {
    id: 'context-menu-radio',
    title: 'Context units',
    description: 'A named radio group supplies mutually exclusive preferences.',
    Component: ContextMenuRadioExample,
    source: contextMenuRadioSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
