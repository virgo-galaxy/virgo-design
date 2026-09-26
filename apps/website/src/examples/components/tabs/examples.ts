import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import TabsAlignmentExample from './TabsAlignmentExample';
import tabsAlignmentSource from './TabsAlignmentExample.tsx?raw';
import TabsBasicExample from './TabsBasicExample';
import tabsBasicSource from './TabsBasicExample.tsx?raw';
import TabsCardExample from './TabsCardExample';
import tabsCardSource from './TabsCardExample.tsx?raw';
import TabsDisabledExample from './TabsDisabledExample';
import tabsDisabledSource from './TabsDisabledExample.tsx?raw';
import TabsEditableExample from './TabsEditableExample';
import tabsEditableSource from './TabsEditableExample.tsx?raw';
import TabsIconsExample from './TabsIconsExample';
import tabsIconsSource from './TabsIconsExample.tsx?raw';

export const tabsExamples = {
  tabsBasic: {
    id: 'tabs-basic',
    title: 'Linked panels',
    description: 'Labels of different widths exercise the selected indicator.',
    Component: TabsBasicExample,
    source: tabsBasicSource,
  },
  tabsDisabled: {
    id: 'tabs-disabled',
    title: 'Disabled tab',
    description: 'Disabled tabs remain visible but are skipped by interaction.',
    Component: TabsDisabledExample,
    source: tabsDisabledSource,
  },
  tabsAlignment: {
    id: 'tabs-alignment',
    title: 'Horizontal alignment',
    description: 'Only start/center alignment changes.',
    Component: TabsAlignmentExample,
    source: tabsAlignmentSource,
  },
  tabsIcons: {
    id: 'tabs-icons',
    title: 'Decorative icons',
    description: 'Text labels retain the accessible name.',
    Component: TabsIconsExample,
    source: tabsIconsSource,
  },
  tabsCard: {
    id: 'tabs-card',
    title: 'Card tabs',
    description: 'Document-like tabs preserve normal tab and panel semantics.',
    Component: TabsCardExample,
    source: tabsCardSource,
  },
  tabsEditable: {
    id: 'tabs-editable',
    title: 'Editable card tabs',
    description: 'Add and remove documents while keeping the adjacent active tab.',
    Component: TabsEditableExample,
    source: tabsEditableSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
