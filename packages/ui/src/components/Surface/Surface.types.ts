import type { CSSProperties, HTMLAttributes } from 'react';

export type SurfaceTone = 'default' | 'secondary' | 'strong' | 'elevated';
export type SurfaceMaterial = 'solid' | 'translucent' | 'glass';
export type SurfaceBorder = 'none' | 'subtle' | 'default' | 'strong';
/** Existing Radius Foundation keys; kept lightweight for UI consumers. */
export type SurfaceRadius = 0 | 4 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 'full';
export type SurfaceElevation = 0 | 1 | 2 | 3 | 4 | 5;

/** Decorative backgrounds only. Use an img element for meaningful image content. */
export type SurfaceBackground =
  | { type: 'color'; value: string }
  | { type: 'gradient'; value: string }
  | {
      type: 'image';
      /** Local or remote URL. */
      src: string;
      /** @default 'cover' */
      fit?: 'cover' | 'contain';
      /** @default 'center' */
      position?: CSSProperties['backgroundPosition'];
    };

export interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  /** Semantic surface color. @default 'default' */
  tone?: SurfaceTone;
  /** Surface treatment, independent of tone and background. @default 'solid' */
  material?: SurfaceMaterial;
  /** Optional decorative background below the material. Images do not repeat. */
  background?: SurfaceBackground;
  /** Existing theme-aware elevation level. @default 0 */
  elevation?: SurfaceElevation;
  /** Existing radius token. @default 0 */
  radius?: SurfaceRadius;
  /** Semantic border. Defaults to subtle for glass, otherwise none. */
  border?: SurfaceBorder;
}
