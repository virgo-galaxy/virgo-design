import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import BreadcrumbBasicExample from './BreadcrumbBasicExample';
import breadcrumbBasicStyles from './BreadcrumbBasicExample.module.scss?virgo-raw';
import breadcrumbBasicSource from './BreadcrumbBasicExample.tsx?raw';
import BreadcrumbDynamicExample from './BreadcrumbDynamicExample';
import breadcrumbDynamicStyles from './BreadcrumbDynamicExample.module.scss?virgo-raw';
import breadcrumbDynamicSource from './BreadcrumbDynamicExample.tsx?raw';
import BreadcrumbIconsExample from './BreadcrumbIconsExample';
import breadcrumbIconsStyles from './BreadcrumbIconsExample.module.scss?virgo-raw';
import breadcrumbIconsSource from './BreadcrumbIconsExample.tsx?raw';
import BreadcrumbSeparatorExample from './BreadcrumbSeparatorExample';
import breadcrumbSeparatorStyles from './BreadcrumbSeparatorExample.module.scss?virgo-raw';
import breadcrumbSeparatorSource from './BreadcrumbSeparatorExample.tsx?raw';

export const breadcrumbExamples = {
  breadcrumbBasic: {
    id: 'breadcrumb-basic',
    title: 'Basic hierarchy',
    description: 'The final item identifies the current page.',
    Component: BreadcrumbBasicExample,
    source: breadcrumbBasicSource,
    styleSource: breadcrumbBasicStyles,
  },
  breadcrumbIcons: {
    id: 'breadcrumb-icons',
    title: 'Item icons',
    description: 'Decorative icons accompany normal link labels.',
    Component: BreadcrumbIconsExample,
    source: breadcrumbIconsSource,
    styleSource: breadcrumbIconsStyles,
  },
  breadcrumbSeparator: {
    id: 'breadcrumb-separator',
    title: 'Custom separator',
    description: 'Change the decorative separator without changing navigation semantics.',
    Component: BreadcrumbSeparatorExample,
    source: breadcrumbSeparatorSource,
    styleSource: breadcrumbSeparatorStyles,
  },
  breadcrumbDynamic: {
    id: 'breadcrumb-dynamic',
    title: 'Dynamic values',
    description: 'Runtime values render through normal React children.',
    Component: BreadcrumbDynamicExample,
    source: breadcrumbDynamicSource,
    styleSource: breadcrumbDynamicStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
