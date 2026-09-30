import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import SeparatorDecorativeExample from './SeparatorDecorativeExample';
import separatorDecorativeStyles from './SeparatorDecorativeExample.module.scss?virgo-raw';
import separatorDecorativeSource from './SeparatorDecorativeExample.tsx?raw';
import SeparatorHorizontalExample from './SeparatorHorizontalExample';
import separatorHorizontalStyles from './SeparatorHorizontalExample.module.scss?virgo-raw';
import separatorHorizontalSource from './SeparatorHorizontalExample.tsx?raw';
import SeparatorLabelExample from './SeparatorLabelExample';
import separatorLabelStyles from './SeparatorLabelExample.module.scss?virgo-raw';
import separatorLabelSource from './SeparatorLabelExample.tsx?raw';
import SeparatorVerticalExample from './SeparatorVerticalExample';
import separatorVerticalStyles from './SeparatorVerticalExample.module.scss?virgo-raw';
import separatorVerticalSource from './SeparatorVerticalExample.tsx?raw';

export const separatorExamples = {
  separatorLabel: {
    id: 'separator-label',
    title: 'A pause with a purpose',
    titleTranslationKey: 'examples.separator.copy.aPauseWithAPurpose',
    description: 'Place a short milestone within a horizontal rule using labelAlign.',
    descriptionTranslationKey:
      'examples.separator.copy.placeAShortMilestoneWithinAHorizontalRuleUsingLabelalign',
    Component: SeparatorLabelExample,
    source: createExampleSource(separatorLabelSource),
    styleSource: separatorLabelStyles,
  },
  separatorHorizontal: {
    id: 'separator-horizontal',
    title: 'Horizontal separator',
    titleTranslationKey: 'examples.separator.copy.horizontalSeparator',
    description: 'Separate stacked content with explicit semantics.',
    descriptionTranslationKey:
      'examples.separator.copy.separateStackedContentWithExplicitSemantics',
    Component: SeparatorHorizontalExample,
    source: createExampleSource(separatorHorizontalSource),
    styleSource: separatorHorizontalStyles,
  },
  separatorVertical: {
    id: 'separator-vertical',
    title: 'Vertical separator',
    titleTranslationKey: 'examples.separator.copy.verticalSeparator',
    description: 'Use a flex row to give vertical rules a natural block extent.',
    descriptionTranslationKey: 'examples.separator.copy.useAFlexRowToGiveVerticalRulesANatural',
    Component: SeparatorVerticalExample,
    source: createExampleSource(separatorVerticalSource),
    styleSource: separatorVerticalStyles,
  },
  separatorDecorative: {
    id: 'separator-decorative',
    title: 'Decorative rule',
    titleTranslationKey: 'examples.separator.copy.decorativeRule',
    description: 'A visual-only divider can complement existing document structure.',
    descriptionTranslationKey:
      'examples.separator.copy.aVisualOnlyDividerCanComplementExistingDocumentStructure',
    Component: SeparatorDecorativeExample,
    source: createExampleSource(separatorDecorativeSource),
    styleSource: separatorDecorativeStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
