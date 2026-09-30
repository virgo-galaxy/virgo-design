import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import MenubarApplicationExample from './MenubarApplicationExample';
import menubarApplicationStyles from './MenubarApplicationExample.module.scss?virgo-raw';
import menubarApplicationSource from './MenubarApplicationExample.tsx?raw';

export const menubarExamples = {
  menubarApplication: {
    id: 'menubar-application',
    title: 'Application menus',
    titleTranslationKey: 'examples.menubar.copy.applicationMenus',
    description:
      'Arrow keys switch groups; item actions and persistent preferences share the menu protocol.',
    descriptionTranslationKey:
      'examples.menubar.copy.arrowKeysSwitchGroupsItemActionsAndPersistentPreferencesShare',
    Component: MenubarApplicationExample,
    source: createExampleSource(menubarApplicationSource),
    styleSource: menubarApplicationStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
