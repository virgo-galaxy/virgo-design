import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import SwitchAppearancesExample from './SwitchAppearancesExample';
import switchAppearancesSource from './SwitchAppearancesExample.tsx?raw';
import SwitchBasicExample from './SwitchBasicExample';
import switchBasicSource from './SwitchBasicExample.tsx?raw';
import SwitchDisabledExample from './SwitchDisabledExample';
import switchDisabledSource from './SwitchDisabledExample.tsx?raw';
import SwitchIconsExample from './SwitchIconsExample';
import switchIconsSource from './SwitchIconsExample.tsx?raw';
import SwitchSizesExample from './SwitchSizesExample';
import switchSizesSource from './SwitchSizesExample.tsx?raw';
import SwitchTextExample from './SwitchTextExample';
import switchTextSource from './SwitchTextExample.tsx?raw';

export const switchExamples = {
  switchBasic: {
    id: 'switch-basic',
    title: 'Off and on',
    description: 'An immediate binary state with a familiar pill control.',
    Component: SwitchBasicExample,
    source: switchBasicSource,
  },
  switchSizes: {
    id: 'switch-sizes',
    title: 'Switch sizes',
    description: 'Default for normal interfaces; small for dense controls.',
    Component: SwitchSizesExample,
    source: switchSizesSource,
  },
  switchText: {
    id: 'switch-text',
    title: 'Text cues',
    description: 'Short decorative state labels supplement the accessible switch name.',
    Component: SwitchTextExample,
    source: switchTextSource,
  },
  switchIcons: {
    id: 'switch-icons',
    title: 'Icon cues',
    description: 'Virgo icons can indicate the visual off and on states.',
    Component: SwitchIconsExample,
    source: switchIconsSource,
  },
  switchAppearances: {
    id: 'switch-appearances',
    title: 'Toggle and fader',
    description: 'Both appearances retain the same native switch semantics.',
    Component: SwitchAppearancesExample,
    source: switchAppearancesSource,
  },
  switchDisabled: {
    id: 'switch-disabled',
    title: 'Disabled appearances',
    description: 'Disabled switches retain their off and on positions.',
    Component: SwitchDisabledExample,
    source: switchDisabledSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
