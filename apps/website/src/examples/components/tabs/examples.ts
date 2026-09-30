import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

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
    titleTranslationKey: 'examples.tabs.copy.linkedPanels',
    description: 'Labels of different widths exercise the selected indicator.',
    descriptionTranslationKey:
      'examples.tabs.copy.labelsOfDifferentWidthsExerciseTheSelectedIndicator',
    Component: TabsBasicExample,
    source: createExampleSource(tabsBasicSource),
    styleSource: tabsBasicStyles,
  },
  tabsDisabled: {
    id: 'tabs-disabled',
    title: 'Disabled tab',
    titleTranslationKey: 'examples.tabs.copy.disabledTab',
    description: 'Disabled tabs remain visible but are skipped by interaction.',
    descriptionTranslationKey:
      'examples.tabs.copy.disabledTabsRemainVisibleButAreSkippedByInteraction',
    Component: TabsDisabledExample,
    source: createExampleSource(tabsDisabledSource),
    styleSource: tabsDisabledStyles,
  },
  tabsAlignment: {
    id: 'tabs-alignment',
    title: 'Horizontal alignment',
    titleTranslationKey: 'examples.tabs.copy.horizontalAlignment',
    description: 'Only start/center alignment changes.',
    descriptionTranslationKey: 'examples.tabs.copy.onlyStartCenterAlignmentChanges',
    Component: TabsAlignmentExample,
    source: createExampleSource(tabsAlignmentSource),
    styleSource: tabsAlignmentStyles,
  },
  tabsIcons: {
    id: 'tabs-icons',
    title: 'Decorative icons',
    titleTranslationKey: 'examples.tabs.copy.decorativeIcons',
    description: 'Text labels retain the accessible name.',
    descriptionTranslationKey: 'examples.tabs.copy.textLabelsRetainTheAccessibleName',
    Component: TabsIconsExample,
    source: createExampleSource(tabsIconsSource),
    styleSource: tabsIconsStyles,
  },
  tabsPlain: {
    id: 'tabs-plain',
    title: 'Plain tabs',
    titleTranslationKey: 'examples.tabs.copy.plainTabs',
    description: 'Compact tabs use separators, hover feedback, and a color-only active state.',
    descriptionTranslationKey:
      'examples.tabs.copy.compactTabsUseSeparatorsHoverFeedbackAndAColorOnly',
    Component: TabsPlainExample,
    source: createExampleSource(tabsPlainSource),
    styleSource: tabsPlainStyles,
  },
  tabsCard: {
    id: 'tabs-card',
    title: 'Card tabs',
    titleTranslationKey: 'examples.tabs.copy.cardTabs',
    description: 'Document-like tabs preserve normal tab and panel semantics.',
    descriptionTranslationKey:
      'examples.tabs.copy.documentLikeTabsPreserveNormalTabAndPanelSemantics',
    Component: TabsCardExample,
    source: createExampleSource(tabsCardSource),
    styleSource: tabsCardStyles,
  },
  tabsEditable: {
    id: 'tabs-editable',
    title: 'Editable card tabs',
    titleTranslationKey: 'examples.tabs.copy.editableCardTabs',
    description: 'Add and remove documents while keeping the adjacent active tab.',
    descriptionTranslationKey:
      'examples.tabs.copy.addAndRemoveDocumentsWhileKeepingTheAdjacentActiveTab',
    Component: TabsEditableExample,
    source: createExampleSource(tabsEditableSource),
    styleSource: tabsEditableStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
