import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const tooltipMetadata = {
  name: 'Tooltip',
  package: '@virgo-design/ui',
  category: 'Data Display',
  description: 'A brief, non-interactive description shown on hover or keyboard focus.',
  import: "import { Tooltip } from '@virgo-design/ui';",
  variants: ['default', 'brand', 'success', 'warning', 'danger', 'info'].map((name) => ({
    name,
    description: `${name} semantic content tone.`,
  })),
  sizes: [
    { name: 'small', description: 'Compact content: 12px text and 4px by 8px padding.' },
    {
      name: 'medium',
      description: 'Default content density; preserves the existing tooltip size.',
    },
  ],
  states: ['closed', 'open', 'hover', 'focus-visible', 'disabled', 'entering', 'exiting'],
  anatomy: [
    { name: 'Tooltip', description: 'Open state and hover delay.' },
    {
      name: 'Tooltip.Trigger',
      description:
        'Default Virgo Button or custom render; preserves native action and accessible name.',
    },
    {
      name: 'Tooltip.Content',
      description: 'Portalled tooltip description with optional arrow; no interactive controls.',
    },
  ],
  capabilities: {
    controlled: true,
    uncontrolled: true,
    hover: true,
    keyboard: true,
    customTrigger: true,
    portal: true,
    placements: true,
    arrow: true,
    semanticTones: true,
    rtl: true,
    themeInheritance: true,
    reducedMotion: true,
    smoothTransition: true,
    closeOnClick: true,
    contentSizes: true,
    interactiveContent: false,
  },
  accessibility: [
    'Content uses role="tooltip" and adds its ID to the trigger’s existing aria-describedby; it does not replace the accessible name.',
    'Focus opens immediately without moving focus; hover uses a configurable delay. Escape dismisses without refocusing.',
    'The pointer can cross into the tooltip; it stays visible while hovered or while its trigger is focused.',
    'Trigger activation dismisses by default; closeOnClick=false keeps hover/focus feedback open without preventing the action.',
    'Escape, outside interaction and leaving hover/focus still dismiss. Touch entry does not open hover-only help.',
    'Use Popover for links, inputs, buttons or other interactive content. Keep essential information visible outside the tooltip.',
    'Portals preserve theme and direction; placement flips/shifts at viewport edges and updates on scroll or resize.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
