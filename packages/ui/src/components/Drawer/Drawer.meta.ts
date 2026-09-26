import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const drawerMetadata = {
  name: 'Drawer',
  package: '@virgo-design/ui',
  category: 'Feedback',
  description:
    'Presents a temporary Dialog-powered workspace panel from a screen edge without introducing a separate interaction protocol.',
  import: "import { Drawer } from '@virgo-design/ui';",
  variants: [
    { name: 'modal', description: 'Isolates the background and traps focus; enabled by default.' },
    {
      name: 'non-modal',
      description: 'Keeps the surrounding workspace interactive while the panel is open.',
    },
  ],
  placements: [
    { name: 'left', description: 'Full-height panel entering from the left edge.' },
    { name: 'right', description: 'Full-height panel entering from the right edge; the default.' },
    { name: 'top', description: 'Full-width panel entering from the top edge.' },
    { name: 'bottom', description: 'Full-width panel entering from the bottom edge.' },
  ],
  sizes: [
    { name: 'sm', description: 'Compact inspector, filter, or navigation panel.' },
    { name: 'md', description: 'Default panel for settings and ordinary detail content.' },
    { name: 'lg', description: 'Spacious panel for forms and information-dense workflows.' },
  ],
  states: ['closed', 'open', 'focus-visible'],
  anatomy: [
    { name: 'Drawer.Root', description: 'Dialog Root owning controlled or uncontrolled state.' },
    { name: 'Drawer.Trigger', description: 'Virgo Button or custom control that opens the panel.' },
    { name: 'Drawer.Portal', description: 'Moves the overlay and panel to the document body.' },
    { name: 'Drawer.Overlay', description: 'Theme-aware modal scrim behind the panel.' },
    { name: 'Drawer.Content', description: 'Edge-aligned surface controlling placement and size.' },
    { name: 'Drawer.Header', description: 'Header region for title and supporting description.' },
    { name: 'Drawer.Title', description: 'Visible heading used as the accessible name.' },
    {
      name: 'Drawer.Description',
      description: 'Optional supporting text used as the accessible description.',
    },
    { name: 'Drawer.Body', description: 'Flexible, independently scrollable content region.' },
    { name: 'Drawer.Footer', description: 'Trailing layout region for application actions.' },
    { name: 'Drawer.Close', description: 'Accessible icon or text control that closes the panel.' },
  ],
  capabilities: {
    modal: true,
    nonModal: true,
    controlled: true,
    uncontrolled: true,
    dismissible: true,
    focusManaged: true,
    scrollableBody: true,
    portal: true,
    reducedMotion: true,
    customSize: true,
  },
  accessibility: [
    'Content inherits role="dialog", aria-modal, labelling, and description relationships from Dialog.',
    'Opening moves focus into the panel; modal focus remains trapped inside the active layer.',
    'Escape and outside interaction dismiss through Dialog unless their events are cancelled.',
    'Closing restores focus to the trigger, including after the visual exit transition.',
    'The default icon-only Close has the accessible name “Close drawer”.',
    'Reduced-motion preferences remove both panel and overlay animations.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
