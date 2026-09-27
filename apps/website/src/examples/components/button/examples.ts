import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import ButtonIconOnlyExample from './ButtonIconOnlyExample';
import buttonIconOnlyStyles from './ButtonIconOnlyExample.module.scss?virgo-raw';
import buttonIconOnlySource from './ButtonIconOnlyExample.tsx?raw';
import ButtonIconsExample from './ButtonIconsExample';
import buttonIconsStyles from './ButtonIconsExample.module.scss?virgo-raw';
import buttonIconsSource from './ButtonIconsExample.tsx?raw';
import ButtonSizesExample from './ButtonSizesExample';
import buttonSizesStyles from './ButtonSizesExample.module.scss?virgo-raw';
import buttonSizesSource from './ButtonSizesExample.tsx?raw';
import ButtonStatesExample from './ButtonStatesExample';
import buttonStatesStyles from './ButtonStatesExample.module.scss?virgo-raw';
import buttonStatesSource from './ButtonStatesExample.tsx?raw';
import ButtonVariantsExample from './ButtonVariantsExample';
import buttonVariantsStyles from './ButtonVariantsExample.module.scss?virgo-raw';
import buttonVariantsSource from './ButtonVariantsExample.tsx?raw';

export const buttonExamples = {
  variants: {
    id: 'button-variants',
    title: 'Basic variants',
    description: 'Choose an emphasis level that matches the importance of the action.',
    Component: ButtonVariantsExample,
    source: buttonVariantsSource,
    styleSource: buttonVariantsStyles,
  },
  sizes: {
    id: 'button-sizes',
    title: 'Button sizes',
    description: 'Use the size that matches the density and prominence of the interface.',
    Component: ButtonSizesExample,
    source: buttonSizesSource,
    styleSource: buttonSizesStyles,
  },
  icons: {
    id: 'button-icons',
    title: 'Buttons with icons',
    description: 'Icons can lead, trail, or frame a visible action label.',
    Component: ButtonIconsExample,
    source: buttonIconsSource,
    styleSource: buttonIconsStyles,
  },
  iconOnly: {
    id: 'button-icon-only',
    title: 'Icon-only buttons',
    description: 'Icon-only controls keep an accessible name through aria-label.',
    Component: ButtonIconOnlyExample,
    source: buttonIconOnlySource,
    styleSource: buttonIconOnlyStyles,
  },
  states: {
    id: 'button-states',
    title: 'Disabled state',
    description: 'Disabled buttons remain visible while preventing interaction.',
    Component: ButtonStatesExample,
    source: buttonStatesSource,
    styleSource: buttonStatesStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
