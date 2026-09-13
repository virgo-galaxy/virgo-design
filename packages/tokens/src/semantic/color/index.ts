export * from './border.js';
export * from './brand.js';
export * from './data/index.js';
export * from './fill.js';
export * from './icon.js';
export * from './status.js';
export * from './surface.js';
export * from './text.js';

export const COLOR_SEMANTIC_GROUPS = [
  'text',
  'surface',
  'border',
  'icon',
  'brand',
  'status',
  'fill',
  'data',
] as const;

export const COLOR_SEMANTIC_ROLE_COUNT = 86;
