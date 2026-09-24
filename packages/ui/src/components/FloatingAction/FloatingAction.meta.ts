import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const floatingActionMetadata = {
  name: 'FloatingAction',
  package: '@virgo-design/ui',
  category: 'General',
  description:
    'Circular elevated actions, standalone or grouped in an accessible Popover. Positioning belongs to the containing layout.',
  import: "import { FloatingAction } from '@virgo-design/ui';",
  states: ['default', 'hover', 'focus', 'disabled', 'open', 'closed'],
  anatomy: [
    {
      name: 'FloatingAction',
      description: 'Icon-only Virgo Button with a circular shape and token elevation.',
    },
    {
      name: 'FloatingAction.Group',
      description: 'Existing Popover open-state and layer coordination.',
    },
    {
      name: 'FloatingAction.Trigger',
      description: 'Accessible toggle; defaults to plus/close Virgo icons.',
    },
    {
      name: 'FloatingAction.Content',
      description: 'Vertical action stack, portalled and positioned by Popover.',
    },
  ],
  capabilities: {
    controlled: true,
    uncontrolled: true,
    portal: true,
    escape: true,
    focusReturn: true,
    reducedMotion: true,
    navigation: false,
    viewportPositioning: false,
  },
  accessibility: [
    'Every action and trigger requires an aria-label.',
    'Button semantics, native keyboard activation and disabled behavior come from Button.',
    'Popover supplies aria-expanded, aria-controls, focus entry, Escape/outside dismiss and focus return.',
    'Actions are ordinary buttons inside a nonmodal dialog, not navigation menu items.',
  ],
  examples: [
    {
      name: 'Standalone',
      code: '<FloatingAction aria-label="Help" onClick={showHelp}><InfoIcon /></FloatingAction>',
    },
    {
      name: 'Group',
      code: '<FloatingAction.Group><FloatingAction.Trigger aria-label="Quick actions" /><FloatingAction.Content aria-label="Quick actions"><FloatingAction aria-label="Help" onClick={showHelp}><InfoIcon /></FloatingAction></FloatingAction.Content></FloatingAction.Group>',
    },
  ],
} as const satisfies ComponentMetadata;
