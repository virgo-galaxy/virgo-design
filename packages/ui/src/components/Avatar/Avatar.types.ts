import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react';

export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image source for the represented identity. */
  src?: string;
  /** Accessible image alternative. Use an empty string for decorative images. @default '' */
  alt?: string;
  /** Content shown when no image is supplied or the image fails to load. */
  fallback?: ReactNode;
  /** Avatar size. @default 'md' */
  size?: AvatarSize;
  /** Avatar silhouette. @default 'circle' */
  shape?: AvatarShape;
  /** Native image loading behavior. */
  loading?: ImgHTMLAttributes<HTMLImageElement>['loading'];
}

export type AvatarGroupProps = HTMLAttributes<HTMLDivElement>;
