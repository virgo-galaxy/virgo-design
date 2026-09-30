export const surfaceEnUS = {
  overview: {
    description:
      'Layout defines the space. Surface gives that space a visual skin. Semantic color, material, and depth form one shared language for headers, panels, and floating content.',
    note: 'A glass header, built on an ordinary structural region.',
  },
  facts: {
    tones: 'Tones',
    materials: 'Materials',
    elevation: 'Elevation',
  },
  specimen: {
    referenceSpecimen: 'Reference specimen',
    themeAwareTint: 'Theme-aware tint',
    nativeContent: 'Native content',
    cssMaterial: 'CSS material',
  },
  semantic: {
    title: 'Semantic Surface',
    description:
      'Four container tones use the existing semantic surface tokens. The default surface adds no padding, size, border, or radius; specimen spacing belongs to this page.',
  },
  material: {
    title: 'Material',
    description:
      'The same landscape sits behind each surface: solid retains its semantic fill, translucent lets the scene through, and glass diffuses it. Switch Light / Dark above to compare the tint.',
  },
  background: {
    title: 'Background',
    description:
      'Decorative color, gradient, and offline image examples are independently copyable. Use an img with alt text for meaningful images, and choose readable foregrounds for custom backgrounds.',
  },
  depth: {
    title: 'Depth & Shape',
    description:
      'Existing Elevation 0–5, semantic borders, and radius tokens work independently of the material. No new Foundation scale is introduced.',
  },
  composition: {
    title: 'Composition',
    description:
      'Layout owns the header, side, and content regions. Surface supplies their appearance. Nested surfaces retain their own material, and visible overflow leaves room for badges, shadows, and floating content.',
  },
} as const;
