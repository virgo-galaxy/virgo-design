import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import AvatarGroupExample from './AvatarGroupExample';
import avatarGroupSource from './AvatarGroupExample.tsx?raw';
import AvatarImageFallbackExample from './AvatarImageFallbackExample';
import avatarImageFallbackSource from './AvatarImageFallbackExample.tsx?raw';
import AvatarPresenceExample from './AvatarPresenceExample';
import avatarPresenceSource from './AvatarPresenceExample.tsx?raw';
import AvatarShapesExample from './AvatarShapesExample';
import avatarShapesSource from './AvatarShapesExample.tsx?raw';
import AvatarSizesExample from './AvatarSizesExample';
import avatarSizesSource from './AvatarSizesExample.tsx?raw';

export const avatarExamples = {
  avatarImageFallback: {
    id: 'avatar-image-fallback',
    title: 'Image and fallback',
    description: 'Supply an image URL or a short identity fallback.',
    Component: AvatarImageFallbackExample,
    source: avatarImageFallbackSource,
  },
  avatarSizes: {
    id: 'avatar-sizes',
    title: 'Sizes',
    description: 'Use the three token sizes without changing identity content.',
    Component: AvatarSizesExample,
    source: avatarSizesSource,
  },
  avatarShapes: {
    id: 'avatar-shapes',
    title: 'Shapes',
    description: 'Circle for a person; square for a team or entity.',
    Component: AvatarShapesExample,
    source: avatarShapesSource,
  },
  avatarPresence: {
    id: 'avatar-presence',
    title: 'Presence badge',
    description: 'A Badge supplies presence without expanding the Avatar API.',
    Component: AvatarPresenceExample,
    source: avatarPresenceSource,
  },
  avatarGroup: {
    id: 'avatar-group',
    title: 'Avatar group',
    description: 'Group a small collection with an accessible description.',
    Component: AvatarGroupExample,
    source: avatarGroupSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
