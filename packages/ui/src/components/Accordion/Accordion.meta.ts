import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const accordionMetadata = {
  name: 'Accordion',
  package: '@virgo-design/ui',
  category: 'Data Display',
  description:
    'Organizes related sections into independently or exclusively expandable Classic Virgo panels.',
  import: "import { Accordion } from '@virgo-design/ui';",
  variants: [
    { name: 'default', description: 'Separated items without an enclosing border.' },
    { name: 'bordered', description: 'Groups items inside a bordered Virgo surface.' },
    { name: 'ghost', description: 'Removes separators for the lightest presentation.' },
  ],
  sizes: [
    { name: 'sm', description: 'Compact headers and content spacing.' },
    { name: 'md', description: 'Default density for general interfaces.' },
    { name: 'lg', description: 'Larger type and spacing for prominent disclosure groups.' },
  ],
  states: ['closed', 'open', 'hover', 'focus-visible', 'disabled'],
  anatomy: [
    { name: 'Accordion.Root', description: 'Owns single or multiple open item state.' },
    { name: 'Accordion.Item', description: 'Coordinates one trigger with one content region.' },
    {
      name: 'Accordion.Trigger',
      description: 'Accessible heading button with an optional Virgo chevron.',
    },
    {
      name: 'Accordion.Content',
      description: 'Region labelled by its trigger and shown while the item is open.',
    },
  ],
  capabilities: {
    single: true,
    multiple: true,
    controlled: true,
    uncontrolled: true,
    disabledItems: true,
    keyboardNavigation: true,
    optionalIcon: true,
    reducedMotion: true,
  },
  accessibility: [
    'Each trigger is a native button inside an ARIA heading.',
    'aria-expanded and aria-controls communicate the current state and controlled region.',
    'Arrow Up and Arrow Down move between enabled triggers; Home and End move to the bounds.',
    'All enabled triggers remain in the normal Tab sequence.',
    'Content regions use aria-labelledby to reference their trigger.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
