import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import BreadcrumbBasicExample from './BreadcrumbBasicExample';
import breadcrumbBasicSource from './BreadcrumbBasicExample.tsx?raw';
import BreadcrumbDynamicExample from './BreadcrumbDynamicExample';
import breadcrumbDynamicSource from './BreadcrumbDynamicExample.tsx?raw';
import BreadcrumbIconsExample from './BreadcrumbIconsExample';
import breadcrumbIconsSource from './BreadcrumbIconsExample.tsx?raw';
import BreadcrumbSeparatorExample from './BreadcrumbSeparatorExample';
import breadcrumbSeparatorSource from './BreadcrumbSeparatorExample.tsx?raw';

export const breadcrumbExamples = {
  breadcrumbBasic: {
    id: 'breadcrumb-basic',
    title: 'Basic hierarchy',
    description: 'The final item identifies the current page.',
    Component: BreadcrumbBasicExample,
    source: breadcrumbBasicSource,
  },
  breadcrumbIcons: {
    id: 'breadcrumb-icons',
    title: 'Item icons',
    description: 'Decorative icons accompany normal link labels.',
    Component: BreadcrumbIconsExample,
    source: breadcrumbIconsSource,
  },
  breadcrumbSeparator: {
    id: 'breadcrumb-separator',
    title: 'Custom separator',
    description: 'Change the decorative separator without changing navigation semantics.',
    Component: BreadcrumbSeparatorExample,
    source: breadcrumbSeparatorSource,
  },
  breadcrumbDynamic: {
    id: 'breadcrumb-dynamic',
    title: 'Dynamic values',
    description: 'Runtime values render through normal React children.',
    Component: BreadcrumbDynamicExample,
    source: breadcrumbDynamicSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
