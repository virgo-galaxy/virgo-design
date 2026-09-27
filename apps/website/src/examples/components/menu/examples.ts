import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import MenuActionsExample from './MenuActionsExample';
import menuActionsStyles from './MenuActionsExample.module.scss?virgo-raw';
import menuActionsSource from './MenuActionsExample.tsx?raw';
import MenuCheckboxExample from './MenuCheckboxExample';
import menuCheckboxStyles from './MenuCheckboxExample.module.scss?virgo-raw';
import menuCheckboxSource from './MenuCheckboxExample.tsx?raw';
import MenuRadioExample from './MenuRadioExample';
import menuRadioStyles from './MenuRadioExample.module.scss?virgo-raw';
import menuRadioSource from './MenuRadioExample.tsx?raw';
import MenuSizesExample from './MenuSizesExample';
import menuSizesStyles from './MenuSizesExample.module.scss?virgo-raw';
import menuSizesSource from './MenuSizesExample.tsx?raw';

export const menuExamples = {
  menuActions: {
    id: 'menu-actions',
    title: 'Actions and submenus',
    description: 'Explore Export → Image; Escape returns one level at a time.',
    Component: MenuActionsExample,
    source: menuActionsSource,
    styleSource: menuActionsStyles,
  },
  menuCheckbox: {
    id: 'menu-checkbox',
    title: 'Checkbox preferences',
    description: 'A persistent preference does not close the menu after selection.',
    Component: MenuCheckboxExample,
    source: menuCheckboxSource,
    styleSource: menuCheckboxStyles,
  },
  menuRadio: {
    id: 'menu-radio',
    title: 'Radio preferences',
    description: 'Keep one selected value inside a persistent menu group.',
    Component: MenuRadioExample,
    source: menuRadioSource,
    styleSource: menuRadioStyles,
  },
  menuSizes: {
    id: 'menu-sizes',
    title: 'Menu density',
    description: 'Rows inherit the root size and active theme.',
    Component: MenuSizesExample,
    source: menuSizesSource,
    styleSource: menuSizesStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
