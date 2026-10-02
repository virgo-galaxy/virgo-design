import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const carouselMetadata = {
  name: 'Carousel',
  package: '@virgo-design/ui',
  category: 'Data Display',
  description:
    'Paged navigation for arbitrary content, from photos to complete interactive workspaces.',
  import: "import { Carousel } from '@virgo-design/ui';",
  states: ['paged', 'stacked', 'playing', 'paused', 'dragging'],
  anatomy: [
    {
      name: 'Carousel.Root',
      description: 'Controlled or uncontrolled navigation and playback state.',
    },
    {
      name: 'Carousel.Viewport',
      description: 'Keyboard, pointer and optional wheel interaction with circular controls.',
    },
    { name: 'Carousel.Track', description: 'Animated slide track.' },
    { name: 'Carousel.Item', description: 'Mounted slide with inactive content made inert.' },
    { name: 'Carousel.Indicators', description: 'Direct navigation as dots or a segmented bar.' },
    { name: 'Carousel.Playback', description: 'Explicit pause and resume control.' },
  ],
  capabilities: {
    compoundApi: true,
    arbitraryChildren: true,
    controlledState: true,
    autoPlay: true,
    pointerDragging: true,
    horizontalWheel: true,
    responsiveStacking: true,
  },
  accessibility: [
    'Label the carousel and its slides. Inactive slides remain mounted but inert.',
    'Autoplay pauses on hover, focus, dragging, hidden documents and reduced motion. Include Playback for an explicit pause control.',
    'Keyboard navigation belongs to the viewport and preserves embedded form controls. Stacked mode exposes every page.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
