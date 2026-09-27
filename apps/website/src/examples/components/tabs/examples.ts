import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import TabsAlignmentExample from './TabsAlignmentExample';
import tabsAlignmentStyles from './TabsAlignmentExample.module.scss?virgo-raw';
import tabsAlignmentSource from './TabsAlignmentExample.tsx?raw';
import TabsBasicExample from './TabsBasicExample';
import tabsBasicStyles from './TabsBasicExample.module.scss?virgo-raw';
import tabsBasicSource from './TabsBasicExample.tsx?raw';
import TabsCardExample from './TabsCardExample';
import tabsCardStyles from './TabsCardExample.module.scss?virgo-raw';
import tabsCardSource from './TabsCardExample.tsx?raw';
import TabsDisabledExample from './TabsDisabledExample';
import tabsDisabledStyles from './TabsDisabledExample.module.scss?virgo-raw';
import tabsDisabledSource from './TabsDisabledExample.tsx?raw';
import TabsEditableExample from './TabsEditableExample';
import tabsEditableStyles from './TabsEditableExample.module.scss?virgo-raw';
import tabsEditableSource from './TabsEditableExample.tsx?raw';
import TabsIconsExample from './TabsIconsExample';
import tabsIconsStyles from './TabsIconsExample.module.scss?virgo-raw';
import tabsIconsSource from './TabsIconsExample.tsx?raw';
import TabsPlainExample from './TabsPlainExample';
import tabsPlainStyles from './TabsPlainExample.module.scss?virgo-raw';
import tabsPlainSource from './TabsPlainExample.tsx?raw';

export const tabsExamples = {
  tabsBasic: {
    id: 'tabs-basic',
    title: 'Linked panels',
    description: 'Labels of different widths exercise the selected indicator.',
    Component: TabsBasicExample,
    source: tabsBasicSource,
    styleSource: tabsBasicStyles,
  },
  tabsDisabled: {
    id: 'tabs-disabled',
    title: 'Disabled tab',
    description: 'Disabled tabs remain visible but are skipped by interaction.',
    Component: TabsDisabledExample,
    source: tabsDisabledSource,
    styleSource: tabsDisabledStyles,
  },
  tabsAlignment: {
    id: 'tabs-alignment',
    title: 'Horizontal alignment',
    description: 'Only start/center alignment changes.',
    Component: TabsAlignmentExample,
    source: tabsAlignmentSource,
    styleSource: tabsAlignmentStyles,
  },
  tabsIcons: {
    id: 'tabs-icons',
    title: 'Decorative icons',
    description: 'Text labels retain the accessible name.',
    Component: TabsIconsExample,
    source: tabsIconsSource,
    styleSource: tabsIconsStyles,
  },
  tabsPlain: {
    id: 'tabs-plain',
    title: 'Plain tabs',
    description: 'Compact tabs use separators, hover feedback, and a color-only active state.',
    Component: TabsPlainExample,
    source: tabsPlainSource,
    styleSource: tabsPlainStyles,
  },
  tabsCard: {
    id: 'tabs-card',
    title: 'Card tabs',
    description: 'Document-like tabs preserve normal tab and panel semantics.',
    Component: TabsCardExample,
    source: tabsCardSource,
    styleSource: tabsCardStyles,
  },
  tabsEditable: {
    id: 'tabs-editable',
    title: 'Editable card tabs',
    description: 'Add and remove documents while keeping the adjacent active tab.',
    Component: TabsEditableExample,
    source: tabsEditableSource,
    styleSource: tabsEditableStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
