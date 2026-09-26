import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const popoverMetadata = {
  name: 'Popover',
  package: '@virgo-design/ui',
  category: 'Data Display',
  description: 'A non-modal floating panel for contextual information and interactive content.',
  import: "import { Popover } from '@virgo-design/ui';",
  variants: ['primary', 'secondary', 'outline', 'text'].map((name) => ({
    name,
    description: `${name} Button treatment for Popover.Trigger.`,
  })),
  sizes: ['mini', 'small', 'medium', 'large'].map((name) => ({
    name,
    description: `${name} trigger size; content keeps its standard density.`,
  })),
  states: ['closed', 'open', 'entering', 'exiting', 'hover', 'focus-visible', 'disabled'],
  anatomy: [
    {
      name: 'Popover',
      description: 'Controlled or uncontrolled open state, hover or click activation.',
    },
    {
      name: 'Popover.Trigger',
      description:
        'A Virgo Button by default, or a custom render trigger forwarding native props and ref.',
    },
    {
      name: 'Popover.Content',
      description: 'Named, portalled, non-modal dialog with arbitrary content and optional arrow.',
    },
    {
      name: 'Popover.Close',
      description: 'Optional close button that returns focus to the trigger.',
    },
  ],
  capabilities: {
    controlled: true,
    uncontrolled: true,
    hover: true,
    click: true,
    arbitraryContent: true,
    customTrigger: true,
    portal: true,
    placement: true,
    offset: true,
    flip: true,
    shift: true,
    arrow: true,
    rtl: true,
    themeInheritance: true,
    reducedMotion: true,
    modal: false,
  },
  accessibility: [
    'Trigger uses aria-haspopup="dialog", aria-expanded and aria-controls; content is labelled by its trigger unless explicitly named.',
    'Click, Enter and Space open and focus the first available control, or the panel itself for read-only content.',
    'Hover does not steal focus and keeps the panel open while its controls own focus; touch uses click.',
    'Tab follows controls inside the panel. At its boundaries, focus returns to the trigger or continues after it; focus is not trapped.',
    'Escape closes the topmost overlay. Outside pointer/focus dismisses without stealing focus from the destination.',
    'Exit content is inert, hidden from assistive technology and non-interactive until its animation finishes. Reduced motion exits immediately.',
    'Logical Start/End placements follow RTL. Physical Left/Right placements keep their literal meaning.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
