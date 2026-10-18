import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import NavigationGroupedExample from './NavigationGroupedExample';
import navigationGroupedSource from './NavigationGroupedExample.tsx?raw';
import NavigationHorizontalExample from './NavigationHorizontalExample';
import navigationHorizontalSource from './NavigationHorizontalExample.tsx?raw';
import NavigationNestedExample from './NavigationNestedExample';
import navigationNestedSource from './NavigationNestedExample.tsx?raw';
import NavigationPopoverExample from './NavigationPopoverExample';
import navigationPopoverSource from './NavigationPopoverExample.tsx?raw';
import NavigationSegmentedExample from './NavigationSegmentedExample';
import navigationSegmentedSource from './NavigationSegmentedExample.tsx?raw';
import NavigationSegmentedIconsExample from './NavigationSegmentedIconsExample';
import navigationSegmentedIconsSource from './NavigationSegmentedIconsExample.tsx?raw';
import NavigationVerticalExample from './NavigationVerticalExample';
import navigationVerticalSource from './NavigationVerticalExample.tsx?raw';

import navigationGroupedStyles from './NavigationGroupedExample.module.scss?virgo-raw';
import navigationHorizontalStyles from './NavigationHorizontalExample.module.scss?virgo-raw';
import navigationNestedStyles from './NavigationNestedExample.module.scss?virgo-raw';
import navigationPopoverStyles from './NavigationPopoverExample.module.scss?virgo-raw';
import navigationSegmentedStyles from './NavigationSegmentedExample.module.scss?virgo-raw';
import navigationSegmentedIconsStyles from './NavigationSegmentedIconsExample.module.scss?virgo-raw';
import navigationVerticalStyles from './NavigationVerticalExample.module.scss?virgo-raw';

export const navigationMenuExamples = {
  navigationGrouped: {
    id: 'navigation-grouped',
    title: 'Grouped navigation',
    titleTranslationKey: 'examples.navigationMenu.copy.groupedNavigation',
    description: 'Label related destinations with Group and GroupLabel.',
    descriptionTranslationKey:
      'examples.navigationMenu.copy.labelRelatedDestinationsWithGroupAndGrouplabel',
    Component: NavigationGroupedExample,
    source: createExampleSource(navigationGroupedSource),
    styleSource: navigationGroupedStyles,
  },
  navigationHorizontal: {
    id: 'navigation-horizontal',
    title: 'Top navigation',
    titleTranslationKey: 'examples.navigationMenu.copy.topNavigation',
    description: 'Horizontal destination links.',
    descriptionTranslationKey: 'examples.navigationMenu.copy.horizontalDestinationLinks',
    Component: NavigationHorizontalExample,
    source: createExampleSource(navigationHorizontalSource),
    styleSource: navigationHorizontalStyles,
  },
  navigationVertical: {
    id: 'navigation-vertical',
    title: 'Vertical navigation',
    titleTranslationKey: 'examples.navigationMenu.copy.verticalNavigation',
    description: 'Icons and a disabled destination in a vertical list.',
    descriptionTranslationKey:
      'examples.navigationMenu.copy.iconsAndADisabledDestinationInAVerticalList',
    Component: NavigationVerticalExample,
    source: createExampleSource(navigationVerticalSource),
    styleSource: navigationVerticalStyles,
  },
  navigationSegmented: {
    id: 'navigation-segmented',
    title: 'Segmented navigation',
    titleTranslationKey: 'examples.navigationMenu.copy.segmentedNavigation',
    description: 'Group peer destinations with decorative separators.',
    descriptionTranslationKey:
      'examples.navigationMenu.copy.groupPeerDestinationsWithDecorativeSeparators',
    Component: NavigationSegmentedExample,
    source: createExampleSource(navigationSegmentedSource),
    styleSource: navigationSegmentedStyles,
  },
  navigationSegmentedIcons: {
    id: 'navigation-segmented-icons',
    title: 'Segmented links with icons',
    titleTranslationKey: 'examples.navigationMenu.copy.segmentedLinksWithIcons',
    description: 'Icons supplement destination labels.',
    descriptionTranslationKey: 'examples.navigationMenu.copy.iconsSupplementDestinationLabels',
    Component: NavigationSegmentedIconsExample,
    source: createExampleSource(navigationSegmentedIconsSource),
    styleSource: navigationSegmentedIconsStyles,
  },
  navigationPopover: {
    id: 'navigation-popover',
    title: 'Vertical hover submenu',
    titleTranslationKey: 'examples.navigationMenu.copy.verticalHoverSubmenu',
    description:
      'A third level shares the normal pointer and keyboard navigation model. Content arrow adds an optional pointer to its trigger.',
    descriptionTranslationKey:
      'examples.navigationMenu.copy.aThirdLevelSharesTheNormalPointerAndKeyboardNavigation',
    Component: NavigationPopoverExample,
    source: createExampleSource(navigationPopoverSource),
    styleSource: navigationPopoverStyles,
  },
  navigationNested: {
    id: 'navigation-nested',
    title: 'Inline nested navigation',
    titleTranslationKey: 'examples.navigationMenu.copy.inlineNestedNavigation',
    description: 'Disclosure reveals destinations in normal document flow.',
    descriptionTranslationKey:
      'examples.navigationMenu.copy.disclosureRevealsDestinationsInNormalDocumentFlow',
    Component: NavigationNestedExample,
    source: createExampleSource(navigationNestedSource),
    styleSource: navigationNestedStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
