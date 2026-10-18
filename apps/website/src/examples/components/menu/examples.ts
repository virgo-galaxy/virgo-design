import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import MenuActionsExample from './MenuActionsExample';
import menuActionsSource from './MenuActionsExample.tsx?raw';
import MenuCheckboxExample from './MenuCheckboxExample';
import menuCheckboxSource from './MenuCheckboxExample.tsx?raw';
import MenuRadioExample from './MenuRadioExample';
import menuRadioSource from './MenuRadioExample.tsx?raw';
import MenuSizesExample from './MenuSizesExample';
import menuSizesSource from './MenuSizesExample.tsx?raw';

import menuActionsStyles from './MenuActionsExample.module.scss?virgo-raw';
import menuCheckboxStyles from './MenuCheckboxExample.module.scss?virgo-raw';
import menuRadioStyles from './MenuRadioExample.module.scss?virgo-raw';
import menuSizesStyles from './MenuSizesExample.module.scss?virgo-raw';

export const menuExamples = {
  menuActions: {
    id: 'menu-actions',
    title: 'Actions and submenus',
    titleTranslationKey: 'examples.menu.copy.actionsAndSubmenus',
    description: 'Explore Export → Image; Escape returns one level at a time.',
    descriptionTranslationKey: 'examples.menu.copy.exploreExportImageEscapeReturnsOneLevelAtATime',
    Component: MenuActionsExample,
    source: createExampleSource(menuActionsSource),
    styleSource: menuActionsStyles,
  },
  menuCheckbox: {
    id: 'menu-checkbox',
    title: 'Checkbox preferences',
    titleTranslationKey: 'examples.menu.copy.checkboxPreferences',
    description: 'A persistent preference does not close the menu after selection.',
    descriptionTranslationKey:
      'examples.menu.copy.aPersistentPreferenceDoesNotCloseTheMenuAfterSelection',
    Component: MenuCheckboxExample,
    source: createExampleSource(menuCheckboxSource),
    styleSource: menuCheckboxStyles,
  },
  menuRadio: {
    id: 'menu-radio',
    title: 'Radio preferences',
    titleTranslationKey: 'examples.menu.copy.radioPreferences',
    description: 'Keep one selected value inside a persistent menu group.',
    descriptionTranslationKey: 'examples.menu.copy.keepOneSelectedValueInsideAPersistentMenuGroup',
    Component: MenuRadioExample,
    source: createExampleSource(menuRadioSource),
    styleSource: menuRadioStyles,
  },
  menuSizes: {
    id: 'menu-sizes',
    title: 'Menu density',
    titleTranslationKey: 'examples.menu.copy.menuDensity',
    description: 'Rows inherit the root size and active theme.',
    descriptionTranslationKey: 'examples.menu.copy.rowsInheritTheRootSizeAndActiveTheme',
    Component: MenuSizesExample,
    source: createExampleSource(menuSizesSource),
    styleSource: menuSizesStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
