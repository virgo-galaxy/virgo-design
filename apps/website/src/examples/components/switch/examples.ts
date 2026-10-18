import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

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

import switchAppearancesStyles from './SwitchAppearancesExample.module.scss?virgo-raw';
import switchBasicStyles from './SwitchBasicExample.module.scss?virgo-raw';
import switchDisabledStyles from './SwitchDisabledExample.module.scss?virgo-raw';
import switchIconsStyles from './SwitchIconsExample.module.scss?virgo-raw';
import switchSizesStyles from './SwitchSizesExample.module.scss?virgo-raw';
import switchTextStyles from './SwitchTextExample.module.scss?virgo-raw';

export const switchExamples = {
  switchBasic: {
    id: 'switch-basic',
    title: 'Off and on',
    titleTranslationKey: 'examples.switch.copy.offAndOn',
    description: 'An immediate binary state with a familiar pill control.',
    descriptionTranslationKey:
      'examples.switch.copy.anImmediateBinaryStateWithAFamiliarPillControl',
    Component: SwitchBasicExample,
    source: createExampleSource(switchBasicSource),
    styleSource: switchBasicStyles,
  },
  switchSizes: {
    id: 'switch-sizes',
    title: 'Switch sizes',
    titleTranslationKey: 'examples.switch.copy.switchSizes',
    description: 'Default for normal interfaces; small for dense controls.',
    descriptionTranslationKey:
      'examples.switch.copy.defaultForNormalInterfacesSmallForDenseControls',
    Component: SwitchSizesExample,
    source: createExampleSource(switchSizesSource),
    styleSource: switchSizesStyles,
  },
  switchText: {
    id: 'switch-text',
    title: 'Text cues',
    titleTranslationKey: 'examples.switch.copy.textCues',
    description: 'Short decorative state labels supplement the accessible switch name.',
    descriptionTranslationKey:
      'examples.switch.copy.shortDecorativeStateLabelsSupplementTheAccessibleSwitchName',
    Component: SwitchTextExample,
    source: createExampleSource(switchTextSource),
    styleSource: switchTextStyles,
  },
  switchIcons: {
    id: 'switch-icons',
    title: 'Icon cues',
    titleTranslationKey: 'examples.switch.copy.iconCues',
    description: 'Virgo icons can indicate the visual off and on states.',
    descriptionTranslationKey: 'examples.switch.copy.virgoIconsCanIndicateTheVisualOffAndOnStates',
    Component: SwitchIconsExample,
    source: createExampleSource(switchIconsSource),
    styleSource: switchIconsStyles,
  },
  switchAppearances: {
    id: 'switch-appearances',
    title: 'Toggle and fader',
    titleTranslationKey: 'examples.switch.copy.toggleAndFader',
    description: 'Both appearances retain the same native switch semantics.',
    descriptionTranslationKey:
      'examples.switch.copy.bothAppearancesRetainTheSameNativeSwitchSemantics',
    Component: SwitchAppearancesExample,
    source: createExampleSource(switchAppearancesSource),
    styleSource: switchAppearancesStyles,
  },
  switchDisabled: {
    id: 'switch-disabled',
    title: 'Disabled appearances',
    titleTranslationKey: 'examples.switch.copy.disabledAppearances',
    description: 'Disabled switches retain their off and on positions.',
    descriptionTranslationKey: 'examples.switch.copy.disabledSwitchesRetainTheirOffAndOnPositions',
    Component: SwitchDisabledExample,
    source: createExampleSource(switchDisabledSource),
    styleSource: switchDisabledStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
