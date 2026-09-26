import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const switchMetadata = {
  name: 'Switch',
  package: '@virgo-design/ui',
  category: 'Forms',
  description:
    'Toggles an immediate binary state with either a familiar pill control or a console-style fader appearance.',
  import: "import { Switch } from '@virgo-design/ui';",
  variants: [
    {
      name: 'toggle',
      description: 'Standard pill-shaped switch with a sliding circular thumb.',
    },
    {
      name: 'fader',
      description: 'Console-style switch with a thin rail and a sliding rounded-square thumb.',
    },
  ],
  sizes: [
    { name: 'default', description: 'Default switch size for normal interfaces.' },
    { name: 'small', description: 'Compact switch size for dense interfaces.' },
  ],
  states: ['off', 'on', 'disabled'],
  anatomy: [
    {
      name: 'control',
      description:
        'Native checkbox input with switch semantics, form participation, and checked state.',
    },
    {
      name: 'visualControl',
      description: 'Virgo switch surface containing the rail, content, and movable thumb.',
    },
    {
      name: 'rail',
      description: 'State rail used by toggle and fader appearances.',
    },
    {
      name: 'thumb',
      description: 'Movable visual indicator that reflects the current binary state.',
    },
    {
      name: 'label',
      description: 'Optional visible label included in the switch hit target.',
    },
  ],
  capabilities: {
    controlled: true,
    uncontrolled: true,
    disabled: true,
    smallSize: true,
    visibleLabel: true,
    checkedContent: true,
    uncheckedContent: true,
    faderAppearance: true,
  },
  accessibility: [
    'Uses a native checkbox input with role="switch" and forwards native form, focus, and aria attributes.',
    'Visible labels wrap the native input so clicking the label toggles the control.',
    'Use aria-label or aria-labelledby when no visible label is provided.',
    'Checked and unchecked decorative content is hidden from assistive technology; checked state remains semantic.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
