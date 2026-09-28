import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const cursorMetadata = {
  name: 'Cursor',
  package: '@virgo-design/ui',
  category: 'Interaction',
  description:
    'Scoped mouse tracking, a translucent Virgo pointer, and reusable pointer-follow feedback.',
  import: "import { Cursor } from '@virgo-design/ui';",
  sizes: [
    { name: 'sm', description: '16px compact pointer.' },
    { name: 'md', description: '20px default pointer with a scaled hotspot.' },
    { name: 'lg', description: '24px larger pointer.' },
  ],
  states: ['inactive', 'visible', 'pressed', 'disabled'],
  anatomy: [
    {
      name: 'Cursor.Provider',
      description: 'Scope, visual selection, frame-coalesced pointer store and cleanup.',
    },
    {
      name: 'Cursor.Visual',
      description: 'Default translucent arrow using the canonical cursor-arrow geometry.',
    },
    {
      name: 'Cursor.Follower',
      description: 'Non-interactive portalled feedback with viewport collision handling.',
    },
    {
      name: 'Cursor.usePointer',
      description:
        'Nearest stable pointer store, or null outside a Provider; subscribe without rendering on every move.',
    },
  ],
  capabilities: {
    customVisual: true,
    pointerTracking: true,
    scoped: true,
    nestedScopes: true,
    portal: true,
    viewportCollision: true,
    tooltipFollow: true,
    themeInheritance: true,
    keyboardFallback: true,
    touchFallback: true,
  },
  accessibility: [
    'Default materials inherit Virgo semantic color tokens and the nearest Theme / Appearance, including across the portal. No separate theme prop or state.',
    'Custom cursor visuals and generic followers are decorative, inert and never receive pointer events or focus.',
    'Only mouse input replaces the native cursor. Keyboard, touch and pen retain their normal interactions.',
    'Tooltip follow is opt-in on Cursor.Provider; keyboard focus retains the element anchor and aria-describedby.',
    'Leaving the scope, scrolling, blur, visibility changes, cancellation and unmount reset feedback. Pass the router location key as resetKey for client-side route changes.',
    'Keep essential state in accessible content; decorative pointer feedback must not be its only presentation.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
