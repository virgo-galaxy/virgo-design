export const surfaceColorTokens = {
  background: 'surface.background',
  default: 'surface.default',
  secondary: 'surface.secondary',
  strong: 'surface.strong',
  elevated: 'surface.elevated',
  overlay: 'surface.overlay',
} as const;

export type SurfaceColorRole = keyof typeof surfaceColorTokens;
