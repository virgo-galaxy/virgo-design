import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import ButtonIconOnlyExample from './ButtonIconOnlyExample';
import buttonIconOnlySource from './ButtonIconOnlyExample.tsx?raw';
import ButtonIconsExample from './ButtonIconsExample';
import buttonIconsSource from './ButtonIconsExample.tsx?raw';
import ButtonSizesExample from './ButtonSizesExample';
import buttonSizesSource from './ButtonSizesExample.tsx?raw';
import ButtonStatesExample from './ButtonStatesExample';
import buttonStatesSource from './ButtonStatesExample.tsx?raw';
import ButtonVariantsExample from './ButtonVariantsExample';
import buttonVariantsSource from './ButtonVariantsExample.tsx?raw';

export const buttonExamples = {
  variants: {
    id: 'button-variants',
    title: 'Basic variants',
    description: 'Choose an emphasis level that matches the importance of the action.',
    Component: ButtonVariantsExample,
    source: buttonVariantsSource,
  },
  sizes: {
    id: 'button-sizes',
    title: 'Button sizes',
    description: 'Use the size that matches the density and prominence of the interface.',
    Component: ButtonSizesExample,
    source: buttonSizesSource,
  },
  icons: {
    id: 'button-icons',
    title: 'Buttons with icons',
    description: 'Icons can lead, trail, or frame a visible action label.',
    Component: ButtonIconsExample,
    source: buttonIconsSource,
  },
  iconOnly: {
    id: 'button-icon-only',
    title: 'Icon-only buttons',
    description: 'Icon-only controls keep an accessible name through aria-label.',
    Component: ButtonIconOnlyExample,
    source: buttonIconOnlySource,
  },
  states: {
    id: 'button-states',
    title: 'Disabled state',
    description: 'Disabled buttons remain visible while preventing interaction.',
    Component: ButtonStatesExample,
    source: buttonStatesSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
