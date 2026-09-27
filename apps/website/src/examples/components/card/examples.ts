import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

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
    description: 'Use Body for a compact group of related information.',
    Component: CardBasicExample,
    source: cardBasicSource,
    styleSource: cardBasicStyles,
  },
  cardHeader: {
    id: 'card-header',
    title: 'Header and description',
    description: 'Choose a document heading level explicitly.',
    Component: CardHeaderExample,
    source: cardHeaderSource,
    styleSource: cardHeaderStyles,
  },
  cardActions: {
    id: 'card-actions',
    title: 'Footer actions',
    description: 'Buttons remain explicit children rather than implicit card interactions.',
    Component: CardActionsExample,
    source: cardActionsSource,
    styleSource: cardActionsStyles,
  },
  cardVariants: {
    id: 'card-variants',
    title: 'Outlined and elevated',
    description: 'Surface-backed treatments with different structural spacing.',
    Component: CardVariantsExample,
    source: cardVariantsSource,
    styleSource: cardVariantsStyles,
  },
  cardProfile: {
    id: 'card-profile',
    title: 'Profile composition',
    description: 'Combine an identity, description, and status inside a Card.',
    Component: CardProfileExample,
    source: cardProfileSource,
    styleSource: cardProfileStyles,
  },
  cardChildren: {
    id: 'card-children',
    title: 'Arbitrary children',
    description: 'Normal children can participate without every compound slot.',
    Component: CardChildrenExample,
    source: cardChildrenSource,
    styleSource: cardChildrenStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
