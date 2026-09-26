import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const avatarMetadata = {
  name: 'Avatar',
  package: '@virgo-design/ui',
  category: 'Data Display',
  description: 'Represents a person, team, or entity with an image and resilient fallback.',
  import: "import { Avatar } from '@virgo-design/ui';",
  sizes: ['sm', 'md', 'lg'].map((name) => ({
    name,
    description: 'Token-based identity size.',
  })),
  shapes: [
    { name: 'circle', description: 'Default profile silhouette.' },
    { name: 'square', description: 'Rounded square entity silhouette.' },
  ],
  states: ['image', 'fallback', 'image-error'],
  anatomy: [
    { name: 'Avatar', description: 'Clipped identity container.' },
    { name: 'image', description: 'Identity image with native alt semantics.' },
    { name: 'fallback', description: 'Text or custom fallback shown when image is unavailable.' },
    { name: 'Avatar.Group', description: 'Lightweight overlapping avatar collection.' },
  ],
  capabilities: {
    image: true,
    fallback: true,
    imageErrorFallback: true,
    group: true,
    groupOverflowCount: false,
    status: false,
  },
  accessibility: [
    'Provide meaningful alt text when the image conveys identity, or an empty string when decorative.',
    'Fallback content is only mounted when the image is unavailable, preventing duplicate announcements.',
    'Status belongs to Badge composition and is not built into Avatar.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;
