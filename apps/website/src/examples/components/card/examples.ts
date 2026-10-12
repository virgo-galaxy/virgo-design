import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import CardActionsExample from './CardActionsExample';
import cardActionsStyles from './CardActionsExample.module.scss?virgo-raw';
import cardActionsSource from './CardActionsExample.tsx?raw';
import CardBasicExample from './CardBasicExample';
import cardBasicStyles from './CardBasicExample.module.scss?virgo-raw';
import cardBasicSource from './CardBasicExample.tsx?raw';
import CardChildrenExample from './CardChildrenExample';
import cardChildrenStyles from './CardChildrenExample.module.scss?virgo-raw';
import cardChildrenSource from './CardChildrenExample.tsx?raw';
import CardHeaderExample from './CardHeaderExample';
import cardHeaderStyles from './CardHeaderExample.module.scss?virgo-raw';
import cardHeaderSource from './CardHeaderExample.tsx?raw';
import CardProfileExample from './CardProfileExample';
import cardProfileStyles from './CardProfileExample.module.scss?virgo-raw';
import cardProfileSource from './CardProfileExample.tsx?raw';
import CardVariantsExample from './CardVariantsExample';
import cardVariantsStyles from './CardVariantsExample.module.scss?virgo-raw';
import cardVariantsSource from './CardVariantsExample.tsx?raw';

export const cardExamples = {
  cardBasic: {
    id: 'card-basic',
    title: 'Basic content',
    titleTranslationKey: 'examples.card.copy.basicContent',
    description: 'Use Body for a compact group of related information.',
    descriptionTranslationKey: 'examples.card.copy.useBodyForACompactGroupOfRelatedInformation',
    Component: CardBasicExample,
    source: createExampleSource(cardBasicSource),
    styleSource: cardBasicStyles,
  },
  cardHeader: {
    id: 'card-header',
    title: 'Header and description',
    titleTranslationKey: 'examples.card.copy.headerAndDescription',
    description: 'Choose a document heading level explicitly.',
    descriptionTranslationKey: 'examples.card.copy.chooseADocumentHeadingLevelExplicitly',
    Component: CardHeaderExample,
    source: createExampleSource(cardHeaderSource),
    styleSource: cardHeaderStyles,
  },
  cardActions: {
    id: 'card-actions',
    title: 'Footer actions',
    titleTranslationKey: 'examples.card.copy.footerActions',
    description: 'Buttons remain explicit children rather than implicit card interactions.',
    descriptionTranslationKey:
      'examples.card.copy.buttonsRemainExplicitChildrenRatherThanImplicitCardInteractions',
    Component: CardActionsExample,
    source: createExampleSource(cardActionsSource),
    styleSource: cardActionsStyles,
  },
  cardVariants: {
    id: 'card-variants',
    title: 'Outlined and elevated',
    titleTranslationKey: 'examples.card.copy.outlinedAndElevated',
    description: 'Surface-backed treatments with different structural spacing.',
    descriptionTranslationKey:
      'examples.card.copy.surfaceBackedTreatmentsWithDifferentStructuralSpacing',
    Component: CardVariantsExample,
    source: createExampleSource(cardVariantsSource),
    styleSource: cardVariantsStyles,
  },
  cardProfile: {
    id: 'card-profile',
    title: 'Details composition',
    titleTranslationKey: 'examples.card.copy.profileComposition',
    description: 'Combine an identity, description, and status inside a Card.',
    descriptionTranslationKey:
      'examples.card.copy.combineAnIdentityDescriptionAndStatusInsideACard',
    Component: CardProfileExample,
    source: createExampleSource(cardProfileSource),
    styleSource: cardProfileStyles,
  },
  cardChildren: {
    id: 'card-children',
    title: 'Arbitrary children',
    titleTranslationKey: 'examples.card.copy.arbitraryChildren',
    description: 'Normal children can participate without every compound slot.',
    descriptionTranslationKey:
      'examples.card.copy.normalChildrenCanParticipateWithoutEveryCompoundSlot',
    Component: CardChildrenExample,
    source: createExampleSource(cardChildrenSource),
    styleSource: cardChildrenStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
