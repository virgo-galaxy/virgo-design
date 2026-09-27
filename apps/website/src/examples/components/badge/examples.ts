import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import BadgeCountsExample from './BadgeCountsExample';
import badgeCountsStyles from './BadgeCountsExample.module.scss?virgo-raw';
import badgeCountsSource from './BadgeCountsExample.tsx?raw';
import BadgeInteractiveHostExample from './BadgeInteractiveHostExample';
import badgeInteractiveHostStyles from './BadgeInteractiveHostExample.module.scss?virgo-raw';
import badgeInteractiveHostSource from './BadgeInteractiveHostExample.tsx?raw';
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
    description: 'Attached counts cap at max while text labels remain unchanged.',
    Component: BadgeCountsExample,
    source: badgeCountsSource,
    styleSource: badgeCountsStyles,
  },
  badgeZero: {
    id: 'badge-zero',
    title: 'Zero counts',
    description: 'Choose explicitly whether a zero count is visible.',
    Component: BadgeZeroExample,
    source: badgeZeroSource,
    styleSource: badgeZeroStyles,
  },
  badgeStatus: {
    id: 'badge-status',
    title: 'Status dots',
    description: 'Name a meaningful status dot for assistive technology.',
    Component: BadgeStatusExample,
    source: badgeStatusSource,
    styleSource: badgeStatusStyles,
  },
  badgeInteractiveHost: {
    id: 'badge-interactive-host',
    title: 'Interactive host',
    description: 'The attached indicator does not intercept the button’s click.',
    Component: BadgeInteractiveHostExample,
    source: badgeInteractiveHostSource,
    styleSource: badgeInteractiveHostStyles,
  },
  badgeStandalone: {
    id: 'badge-standalone',
    title: 'Standalone badges',
    description: 'Use an inline count or release label without an attached host.',
    Component: BadgeStandaloneExample,
    source: badgeStandaloneSource,
    styleSource: badgeStandaloneStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
