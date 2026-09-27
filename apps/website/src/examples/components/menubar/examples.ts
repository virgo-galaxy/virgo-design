import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import MenubarApplicationExample from './MenubarApplicationExample';
import menubarApplicationStyles from './MenubarApplicationExample.module.scss?virgo-raw';
import menubarApplicationSource from './MenubarApplicationExample.tsx?raw';

export const menubarExamples = {
  menubarApplication: {
    id: 'menubar-application',
    title: 'Application menus',
    description:
      'Arrow keys switch groups; item actions and persistent preferences share the menu protocol.',
    Component: MenubarApplicationExample,
    source: menubarApplicationSource,
    styleSource: menubarApplicationStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
