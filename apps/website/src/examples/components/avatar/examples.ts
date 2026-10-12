import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import AvatarGroupExample from './AvatarGroupExample';
import avatarGroupStyles from './AvatarGroupExample.module.scss?virgo-raw';
import avatarGroupSource from './AvatarGroupExample.tsx?raw';
import AvatarImageFallbackExample from './AvatarImageFallbackExample';
import avatarImageFallbackStyles from './AvatarImageFallbackExample.module.scss?virgo-raw';
import avatarImageFallbackSource from './AvatarImageFallbackExample.tsx?raw';
import AvatarPresenceExample from './AvatarPresenceExample';
import avatarPresenceStyles from './AvatarPresenceExample.module.scss?virgo-raw';
import avatarPresenceSource from './AvatarPresenceExample.tsx?raw';
import AvatarShapesExample from './AvatarShapesExample';
import avatarShapesStyles from './AvatarShapesExample.module.scss?virgo-raw';
import avatarShapesSource from './AvatarShapesExample.tsx?raw';
import AvatarSizesExample from './AvatarSizesExample';
import avatarSizesStyles from './AvatarSizesExample.module.scss?virgo-raw';
import avatarSizesSource from './AvatarSizesExample.tsx?raw';

export const avatarExamples = {
  avatarImageFallback: {
    id: 'avatar-image-fallback',
    title: 'Image and fallback',
    titleTranslationKey: 'examples.avatar.copy.imageAndFallback',
    description: 'Supply an image URL or a short identity fallback.',
    descriptionTranslationKey: 'examples.avatar.copy.supplyAnImageUrlOrAShortIdentityFallback',
    Component: AvatarImageFallbackExample,
    source: createExampleSource(avatarImageFallbackSource),
    styleSource: avatarImageFallbackStyles,
  },
  avatarSizes: {
    id: 'avatar-sizes',
    title: 'Sizes',
    titleTranslationKey: 'examples.avatar.copy.sizes',
    description: 'Use the three token sizes without changing identity content.',
    descriptionTranslationKey:
      'examples.avatar.copy.useTheThreeTokenSizesWithoutChangingIdentityContent',
    Component: AvatarSizesExample,
    source: createExampleSource(avatarSizesSource),
    styleSource: avatarSizesStyles,
  },
  avatarShapes: {
    id: 'avatar-shapes',
    title: 'Shapes',
    titleTranslationKey: 'examples.avatar.copy.shapes',
    description: 'Circle for a person; square for a group or entity.',
    descriptionTranslationKey: 'examples.avatar.copy.circleForAPersonSquareForATeamOrEntity',
    Component: AvatarShapesExample,
    source: createExampleSource(avatarShapesSource),
    styleSource: avatarShapesStyles,
  },
  avatarPresence: {
    id: 'avatar-presence',
    title: 'Presence badge',
    titleTranslationKey: 'examples.avatar.copy.presenceBadge',
    description: 'A Badge supplies presence without expanding the Avatar API.',
    descriptionTranslationKey:
      'examples.avatar.copy.aBadgeSuppliesPresenceWithoutExpandingTheAvatarApi',
    Component: AvatarPresenceExample,
    source: createExampleSource(avatarPresenceSource),
    styleSource: avatarPresenceStyles,
  },
  avatarGroup: {
    id: 'avatar-group',
    title: 'Avatar group',
    titleTranslationKey: 'examples.avatar.copy.avatarGroup',
    description: 'Group a small collection with an accessible description.',
    descriptionTranslationKey:
      'examples.avatar.copy.groupASmallCollectionWithAnAccessibleDescription',
    Component: AvatarGroupExample,
    source: createExampleSource(avatarGroupSource),
    styleSource: avatarGroupStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
