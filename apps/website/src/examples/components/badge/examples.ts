import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import BadgeCountsExample from './BadgeCountsExample';
import badgeCountsStyles from './BadgeCountsExample.module.scss?virgo-raw';
import badgeCountsSource from './BadgeCountsExample.tsx?raw';
import BadgeInteractiveHostExample from './BadgeInteractiveHostExample';
import badgeInteractiveHostStyles from './BadgeInteractiveHostExample.module.scss?virgo-raw';
import badgeInteractiveHostSource from './BadgeInteractiveHostExample.tsx?raw';
import BadgeMotionExample from './BadgeMotionExample';
import badgeMotionStyles from './BadgeMotionExample.module.scss?virgo-raw';
import badgeMotionSource from './BadgeMotionExample.tsx?raw';
import BadgeStandaloneExample from './BadgeStandaloneExample';
import badgeStandaloneStyles from './BadgeStandaloneExample.module.scss?virgo-raw';
import badgeStandaloneSource from './BadgeStandaloneExample.tsx?raw';
import BadgeStatusExample from './BadgeStatusExample';
import badgeStatusStyles from './BadgeStatusExample.module.scss?virgo-raw';
import badgeStatusSource from './BadgeStatusExample.tsx?raw';
import BadgeZeroExample from './BadgeZeroExample';
import badgeZeroStyles from './BadgeZeroExample.module.scss?virgo-raw';
import badgeZeroSource from './BadgeZeroExample.tsx?raw';

export const badgeExamples = {
  badgeCounts: {
    id: 'badge-counts',
    title: 'Counts and overflow',
    titleTranslationKey: 'examples.badge.copy.countsAndOverflow',
    description: 'Attached counts cap at max while text labels remain unchanged.',
    descriptionTranslationKey:
      'examples.badge.copy.attachedCountsCapAtMaxWhileTextLabelsRemainUnchanged',
    Component: BadgeCountsExample,
    source: createExampleSource(badgeCountsSource),
    styleSource: badgeCountsStyles,
  },
  badgeZero: {
    id: 'badge-zero',
    title: 'Zero counts',
    titleTranslationKey: 'examples.badge.copy.zeroCounts',
    description: 'Choose explicitly whether a zero count is visible.',
    descriptionTranslationKey: 'examples.badge.copy.chooseExplicitlyWhetherAZeroCountIsVisible',
    Component: BadgeZeroExample,
    source: createExampleSource(badgeZeroSource),
    styleSource: badgeZeroStyles,
  },
  badgeStatus: {
    id: 'badge-status',
    title: 'Status dots',
    titleTranslationKey: 'examples.badge.copy.statusDots',
    description: 'Name a meaningful status dot for assistive technology.',
    descriptionTranslationKey: 'examples.badge.copy.nameAMeaningfulStatusDotForAssistiveTechnology',
    Component: BadgeStatusExample,
    source: createExampleSource(badgeStatusSource),
    styleSource: badgeStatusStyles,
  },
  badgeMotion: {
    id: 'badge-motion',
    title: 'Breathing dots',
    titleTranslationKey: 'components.badge.motion.title',
    description: 'Opt in to breathing dots; reduced motion keeps them static.',
    descriptionTranslationKey: 'components.badge.motion.description',
    Component: BadgeMotionExample,
    source: createExampleSource(badgeMotionSource),
    styleSource: badgeMotionStyles,
  },
  badgeInteractiveHost: {
    id: 'badge-interactive-host',
    title: 'Interactive host',
    titleTranslationKey: 'examples.badge.copy.interactiveHost',
    description: 'The attached indicator does not intercept the button’s click.',
    descriptionTranslationKey:
      'examples.badge.copy.theAttachedIndicatorDoesNotInterceptTheButtonSClick',
    Component: BadgeInteractiveHostExample,
    source: createExampleSource(badgeInteractiveHostSource),
    styleSource: badgeInteractiveHostStyles,
  },
  badgeStandalone: {
    id: 'badge-standalone',
    title: 'Standalone badges',
    titleTranslationKey: 'examples.badge.copy.standaloneBadges',
    description: 'Use an inline count or release label without an attached host.',
    descriptionTranslationKey:
      'examples.badge.copy.useAnInlineCountOrReleaseLabelWithoutAnAttached',
    Component: BadgeStandaloneExample,
    source: createExampleSource(badgeStandaloneSource),
    styleSource: badgeStandaloneStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
