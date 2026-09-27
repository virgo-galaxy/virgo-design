import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import SwitchAppearancesExample from './SwitchAppearancesExample';
import switchAppearancesStyles from './SwitchAppearancesExample.module.scss?virgo-raw';
import switchAppearancesSource from './SwitchAppearancesExample.tsx?raw';
import SwitchBasicExample from './SwitchBasicExample';
import switchBasicStyles from './SwitchBasicExample.module.scss?virgo-raw';
import switchBasicSource from './SwitchBasicExample.tsx?raw';
import SwitchDisabledExample from './SwitchDisabledExample';
import switchDisabledStyles from './SwitchDisabledExample.module.scss?virgo-raw';
import switchDisabledSource from './SwitchDisabledExample.tsx?raw';
import SwitchIconsExample from './SwitchIconsExample';
import switchIconsStyles from './SwitchIconsExample.module.scss?virgo-raw';
import switchIconsSource from './SwitchIconsExample.tsx?raw';
import SwitchSizesExample from './SwitchSizesExample';
import switchSizesStyles from './SwitchSizesExample.module.scss?virgo-raw';
import switchSizesSource from './SwitchSizesExample.tsx?raw';
import SwitchTextExample from './SwitchTextExample';
import switchTextStyles from './SwitchTextExample.module.scss?virgo-raw';
import switchTextSource from './SwitchTextExample.tsx?raw';

export const switchExamples = {
  switchBasic: {
    id: 'switch-basic',
    title: 'Off and on',
    description: 'An immediate binary state with a familiar pill control.',
    Component: SwitchBasicExample,
    source: switchBasicSource,
    styleSource: switchBasicStyles,
  },
  switchSizes: {
    id: 'switch-sizes',
    title: 'Switch sizes',
    description: 'Default for normal interfaces; small for dense controls.',
    Component: SwitchSizesExample,
    source: switchSizesSource,
    styleSource: switchSizesStyles,
  },
  switchText: {
    id: 'switch-text',
    title: 'Text cues',
    description: 'Short decorative state labels supplement the accessible switch name.',
    Component: SwitchTextExample,
    source: switchTextSource,
    styleSource: switchTextStyles,
  },
  switchIcons: {
    id: 'switch-icons',
    title: 'Icon cues',
    description: 'Virgo icons can indicate the visual off and on states.',
    Component: SwitchIconsExample,
    source: switchIconsSource,
    styleSource: switchIconsStyles,
  },
  switchAppearances: {
    id: 'switch-appearances',
    title: 'Toggle and fader',
    description: 'Both appearances retain the same native switch semantics.',
    Component: SwitchAppearancesExample,
    source: switchAppearancesSource,
    styleSource: switchAppearancesStyles,
  },
  switchDisabled: {
    id: 'switch-disabled',
    title: 'Disabled appearances',
    description: 'Disabled switches retain their off and on positions.',
    Component: SwitchDisabledExample,
    source: switchDisabledSource,
    styleSource: switchDisabledStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
