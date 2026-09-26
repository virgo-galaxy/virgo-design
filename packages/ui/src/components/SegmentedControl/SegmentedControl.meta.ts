import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const segmentedControlMetadata = {
  name: 'SegmentedControl',
  package: '@virgo-design/ui',
  category: 'Forms',
  description:
    'Presents a compact set of mutually exclusive choices as connected segments backed by radio-group semantics.',
  import: "import { SegmentedControl } from '@virgo-design/ui';",
  variants: [
    {
      name: 'outline',
      description: 'Selected segment is defined by a complete brand boundary.',
    },
    {
      name: 'solid',
      description: 'Selected segment uses the Virgo brand fill for strong emphasis.',
    },
    {
      name: 'soft',
      description: 'Shared subtle track with an elevated selected surface.',
    },
  ],
  sizes: [
    { name: 'mini', description: '24px height for very compact selectors and toolbars.' },
    { name: 'small', description: '28px height for compact mode selectors.' },
    { name: 'medium', description: '36px height and the default size.' },
    { name: 'large', description: '44px height for more prominent segmented choices.' },
  ],
  states: ['unselected', 'selected', 'focus-visible', 'disabled'],
  anatomy: [
    {
      name: 'group',
      description: 'Radio-group-backed container that coordinates exactly one selected value.',
    },
    {
      name: 'indicator',
      description:
        'Decorative selected surface that can remain static or slide between segment geometry.',
    },
    {
      name: 'item',
      description: 'Segment option backed by a native radio input and visible label.',
    },
    {
      name: 'label',
      description: 'Visible content for an individual segment.',
    },
  ],
  capabilities: {
    singleSelection: true,
    disabled: true,
    disabledItem: true,
    controlled: true,
    uncontrolled: true,
    outline: true,
    solid: true,
    soft: true,
    size: true,
    slidingIndicator: true,
    reducedMotion: true,
  },
  accessibility: [
    'Reuses Virgo Radio.Group primitives and native radio inputs for single-selection semantics.',
    'Supports controlled and uncontrolled values through the segmented-control API.',
    'The selected indicator is aria-hidden and never replaces native radio semantics.',
    'Keyboard focus remains on the native radio controls while Virgo renders the segmented visual surface.',
    'Sliding motion respects prefers-reduced-motion.',
    'Disabled items remain visible and unavailable for interaction.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
