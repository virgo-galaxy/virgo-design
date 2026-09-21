import type { ComponentMetadata } from '../metadata/ComponentMetadata';

export const surfaceMetadata = {
  name: 'Surface',
  package: '@virgo-design/ui',
  category: 'General',
  description:
    'Gives an existing space a visual skin, decorative background, and material without arranging its content or assigning structural semantics.',
  import: "import { Surface } from '@virgo-design/ui';",
  variants: [
    { name: 'solid', description: 'Semantic or custom background without added translucency.' },
    { name: 'translucent', description: 'Theme-aware translucent tint without backdrop blur.' },
    {
      name: 'glass',
      description: 'Theme-aware tint and backdrop blur, with a subtle border by default.',
    },
  ],
  states: ['default'],
  anatomy: [
    { name: 'root', description: 'Normal-flow div with an isolated stacking context.' },
    { name: 'background', description: 'Optional decorative color, gradient, or image layer.' },
    { name: 'material', description: 'Decorative tint layer created for translucent and glass.' },
    {
      name: 'content',
      description:
        'Unwrapped accessible children above the decorative layers; overflow stays visible.',
    },
  ],
  capabilities: {
    semanticTone: true,
    solid: true,
    translucent: true,
    glass: true,
    colorBackground: true,
    gradientBackground: true,
    decorativeImage: true,
    elevation: true,
    border: true,
    radius: true,
    nestedSurfaces: true,
    nativeProps: true,
    ref: true,
  },
  accessibility: [
    'Adds no role, accessible name, or tab stop. Native div props are forwarded unchanged.',
    'Decorative layers are aria-hidden and ignore pointer events; children remain normal accessible DOM.',
    'Background images are decorative. Use a real img element for images that convey information.',
    'Consumers must preserve readable contrast when choosing custom backgrounds.',
    'Glass falls back to a usable tinted surface when backdrop filtering is unavailable.',
  ],
  examples: [
    {
      name: 'Semantic panel',
      code: '<Surface tone="elevated" elevation={2} radius={12}>Panel content</Surface>',
    },
    {
      name: 'Glass header',
      code: '<Layout.Header><Surface material="glass">Header content</Surface></Layout.Header>',
    },
    {
      name: 'Custom background',
      code: '<Surface background={{ type: "image", src: "/wallpaper.svg", fit: "cover", position: "center" }} material="glass">Content</Surface>',
    },
  ],
} as const satisfies ComponentMetadata;
