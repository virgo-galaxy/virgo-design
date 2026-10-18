import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import BreadcrumbBasicExample from './BreadcrumbBasicExample';
import breadcrumbBasicSource from './BreadcrumbBasicExample.tsx?raw';
import BreadcrumbDynamicExample from './BreadcrumbDynamicExample';
import breadcrumbDynamicSource from './BreadcrumbDynamicExample.tsx?raw';
import BreadcrumbIconsExample from './BreadcrumbIconsExample';
import breadcrumbIconsSource from './BreadcrumbIconsExample.tsx?raw';
import BreadcrumbSeparatorExample from './BreadcrumbSeparatorExample';
import breadcrumbSeparatorSource from './BreadcrumbSeparatorExample.tsx?raw';

import breadcrumbBasicStyles from './BreadcrumbBasicExample.module.scss?virgo-raw';
import breadcrumbDynamicStyles from './BreadcrumbDynamicExample.module.scss?virgo-raw';
import breadcrumbIconsStyles from './BreadcrumbIconsExample.module.scss?virgo-raw';
import breadcrumbSeparatorStyles from './BreadcrumbSeparatorExample.module.scss?virgo-raw';

export const breadcrumbExamples = {
  breadcrumbBasic: {
    id: 'breadcrumb-basic',
    title: 'Basic hierarchy',
    titleTranslationKey: 'examples.breadcrumb.copy.basicHierarchy',
    description: 'The final item identifies the current page.',
    descriptionTranslationKey: 'examples.breadcrumb.copy.theFinalItemIdentifiesTheCurrentPage',
    Component: BreadcrumbBasicExample,
    source: createExampleSource(breadcrumbBasicSource),
    styleSource: breadcrumbBasicStyles,
  },
  breadcrumbIcons: {
    id: 'breadcrumb-icons',
    title: 'Item icons',
    titleTranslationKey: 'examples.breadcrumb.copy.itemIcons',
    description: 'Decorative icons accompany normal link labels.',
    descriptionTranslationKey: 'examples.breadcrumb.copy.decorativeIconsAccompanyNormalLinkLabels',
    Component: BreadcrumbIconsExample,
    source: createExampleSource(breadcrumbIconsSource),
    styleSource: breadcrumbIconsStyles,
  },
  breadcrumbSeparator: {
    id: 'breadcrumb-separator',
    title: 'Custom separator',
    titleTranslationKey: 'examples.breadcrumb.copy.customSeparator',
    description: 'Change the decorative separator without changing navigation semantics.',
    descriptionTranslationKey:
      'examples.breadcrumb.copy.changeTheDecorativeSeparatorWithoutChangingNavigationSemantics',
    Component: BreadcrumbSeparatorExample,
    source: createExampleSource(breadcrumbSeparatorSource),
    styleSource: breadcrumbSeparatorStyles,
  },
  breadcrumbDynamic: {
    id: 'breadcrumb-dynamic',
    title: 'Dynamic values',
    titleTranslationKey: 'examples.breadcrumb.copy.dynamicValues',
    description: 'Runtime values render through normal React children.',
    descriptionTranslationKey:
      'examples.breadcrumb.copy.runtimeValuesRenderThroughNormalReactChildren',
    Component: BreadcrumbDynamicExample,
    source: createExampleSource(breadcrumbDynamicSource),
    styleSource: breadcrumbDynamicStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
