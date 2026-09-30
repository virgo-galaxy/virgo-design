export const avatarEnUS = {
  overview: {
    description:
      'Identity images with token-based sizing, resilient fallback, and simple grouping.',
  },
  facts: {
    sources: 'Sources',
    image: 'Image',
    fallback: 'Fallback',
    text: 'Text',
    composition: 'Composition',
    group: 'Group',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    image: 'Image',
    fallback: 'Fallback',
    presenceAndGroup: 'Presence and group',
  },
  content: {
    title: 'Image and fallback',
    description: 'Fallback content appears when the source is absent or cannot load.',
  },
  sizes: {
    title: 'Sizes and shapes',
    description: 'Three stable sizes support circular profile and square entity silhouettes.',
  },
  composition: {
    title: 'Badge and group composition',
    description: 'Presence stays a Badge concern; groups remain a lightweight visual collection.',
  },
} as const;
