import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import NavigationGroupedExample from './NavigationGroupedExample';
import navigationGroupedStyles from './NavigationGroupedExample.module.scss?virgo-raw';
import navigationGroupedSource from './NavigationGroupedExample.tsx?raw';
import NavigationHorizontalExample from './NavigationHorizontalExample';
import navigationHorizontalStyles from './NavigationHorizontalExample.module.scss?virgo-raw';
import navigationHorizontalSource from './NavigationHorizontalExample.tsx?raw';
import NavigationNestedExample from './NavigationNestedExample';
import navigationNestedStyles from './NavigationNestedExample.module.scss?virgo-raw';
import navigationNestedSource from './NavigationNestedExample.tsx?raw';
import NavigationPopoverExample from './NavigationPopoverExample';
import navigationPopoverStyles from './NavigationPopoverExample.module.scss?virgo-raw';
import navigationPopoverSource from './NavigationPopoverExample.tsx?raw';
import NavigationSegmentedExample from './NavigationSegmentedExample';
import navigationSegmentedStyles from './NavigationSegmentedExample.module.scss?virgo-raw';
import navigationSegmentedSource from './NavigationSegmentedExample.tsx?raw';
import NavigationSegmentedIconsExample from './NavigationSegmentedIconsExample';
import navigationSegmentedIconsStyles from './NavigationSegmentedIconsExample.module.scss?virgo-raw';
import navigationSegmentedIconsSource from './NavigationSegmentedIconsExample.tsx?raw';
import NavigationVerticalExample from './NavigationVerticalExample';
import navigationVerticalStyles from './NavigationVerticalExample.module.scss?virgo-raw';
import navigationVerticalSource from './NavigationVerticalExample.tsx?raw';

export const navigationMenuExamples = {
  navigationGrouped: {
    id: 'navigation-grouped',
    title: 'Grouped navigation',
    description: 'Label related destinations with Group and GroupLabel.',
    Component: NavigationGroupedExample,
    source: navigationGroupedSource,
    styleSource: navigationGroupedStyles,
  },
  navigationHorizontal: {
    id: 'navigation-horizontal',
    title: 'Top navigation',
    description: 'Horizontal destination links.',
    Component: NavigationHorizontalExample,
    source: navigationHorizontalSource,
    styleSource: navigationHorizontalStyles,
  },
  navigationVertical: {
    id: 'navigation-vertical',
    title: 'Vertical navigation',
    description: 'Icons and a disabled destination in a vertical list.',
    Component: NavigationVerticalExample,
    source: navigationVerticalSource,
    styleSource: navigationVerticalStyles,
  },
  navigationSegmented: {
    id: 'navigation-segmented',
    title: 'Segmented navigation',
    description: 'Group peer destinations with decorative separators.',
    Component: NavigationSegmentedExample,
    source: navigationSegmentedSource,
    styleSource: navigationSegmentedStyles,
  },
  navigationSegmentedIcons: {
    id: 'navigation-segmented-icons',
    title: 'Segmented links with icons',
    description: 'Icons supplement destination labels.',
    Component: NavigationSegmentedIconsExample,
    source: navigationSegmentedIconsSource,
    styleSource: navigationSegmentedIconsStyles,
  },
  navigationPopover: {
    id: 'navigation-popover',
    title: 'Vertical hover submenu',
    description: 'A third level shares the normal pointer and keyboard navigation model.',
    Component: NavigationPopoverExample,
    source: navigationPopoverSource,
    styleSource: navigationPopoverStyles,
  },
  navigationNested: {
    id: 'navigation-nested',
    title: 'Inline nested navigation',
    description: 'Disclosure reveals destinations in normal document flow.',
    Component: NavigationNestedExample,
    source: navigationNestedSource,
    styleSource: navigationNestedStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
