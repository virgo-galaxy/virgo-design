import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const toastMetadata = {
  name: 'Toast',
  package: '@virgo-design/ui',
  category: 'Feedback',
  description: 'Announces brief, non-blocking results with optional actions and timed dismissal.',
  import: "import { Toast } from '@virgo-design/ui';",
  variants: ['default', 'success', 'warning', 'error', 'info'].map((name) => ({
    name,
    description: 'Semantic toast intent using Virgo status tokens.',
  })),
  states: ['open', 'paused', 'closed'],
  anatomy: ['Provider', 'Root', 'Title', 'Description', 'Action', 'Close', 'Viewport'].map(
    (part) => ({ name: `Toast.${part}`, description: 'Toast composition part.' }),
  ),
  capabilities: {
    controlled: true,
    uncontrolled: true,
    autoDismiss: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    stacking: true,
    placement: true,
    liveRegion: true,
  },
  accessibility: [
    'Polite toasts use role="status"; assertive notifications use role="alert".',
    'Toasts never move focus when they appear. F8 moves focus into the viewport when interaction is needed.',
    'Hovering or focusing a toast pauses its remaining auto-dismiss duration.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
