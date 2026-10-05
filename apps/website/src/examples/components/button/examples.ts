import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import ButtonGroupsExample from './ButtonGroupsExample';
import groupsStyles from './ButtonGroupsExample.module.scss?virgo-raw';
import groupsSource from './ButtonGroupsExample.tsx?raw';
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
  groups: {
    id: 'button-groups',
    title: 'Button groups',
    titleTranslationKey: 'components.button.groups.title',
    description: 'Group related actions without a shared selected value.',
    descriptionTranslationKey: 'components.button.groups.description',
    Component: ButtonGroupsExample,
    source: createExampleSource(groupsSource),
    styleSource: groupsStyles,
  },
  variants: {
    id: 'button-variants',
    title: 'Basic variants',
    titleTranslationKey: 'examples.button.copy.basicVariants',
    description: 'Choose an emphasis level that matches the importance of the action.',
    descriptionTranslationKey:
      'examples.button.copy.chooseAnEmphasisLevelThatMatchesTheImportanceOfThe',
    Component: ButtonVariantsExample,
    source: createExampleSource(buttonVariantsSource),
    styleSource: buttonVariantsStyles,
  },
  sizes: {
    id: 'button-sizes',
    title: 'Button sizes',
    titleTranslationKey: 'examples.button.copy.buttonSizes',
    description: 'Use the size that matches the density and prominence of the interface.',
    descriptionTranslationKey:
      'examples.button.copy.useTheSizeThatMatchesTheDensityAndProminenceOf',
    Component: ButtonSizesExample,
    source: createExampleSource(buttonSizesSource),
    styleSource: buttonSizesStyles,
  },
  icons: {
    id: 'button-icons',
    title: 'Buttons with icons',
    titleTranslationKey: 'examples.button.copy.buttonsWithIcons',
    description: 'Icons can lead, trail, or frame a visible action label.',
    descriptionTranslationKey: 'examples.button.copy.iconsCanLeadTrailOrFrameAVisibleActionLabel',
    Component: ButtonIconsExample,
    source: createExampleSource(buttonIconsSource),
    styleSource: buttonIconsStyles,
  },
  iconOnly: {
    id: 'button-icon-only',
    title: 'Icon-only buttons',
    titleTranslationKey: 'examples.button.copy.iconOnlyButtons',
    description: 'Icon-only controls keep an accessible name through aria-label.',
    descriptionTranslationKey:
      'examples.button.copy.iconOnlyControlsKeepAnAccessibleNameThroughAriaLabel',
    Component: ButtonIconOnlyExample,
    source: createExampleSource(buttonIconOnlySource),
    styleSource: buttonIconOnlyStyles,
  },
  states: {
    id: 'button-states',
    title: 'Disabled state',
    titleTranslationKey: 'examples.button.copy.disabledState',
    description: 'Disabled buttons remain visible while preventing interaction.',
    descriptionTranslationKey:
      'examples.button.copy.disabledButtonsRemainVisibleWhilePreventingInteraction',
    Component: ButtonStatesExample,
    source: createExampleSource(buttonStatesSource),
    styleSource: buttonStatesStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
