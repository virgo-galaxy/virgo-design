import type { HTMLAttributes } from 'react';

export type EmptySize = 'sm' | 'md' | 'lg';

export interface EmptyProps extends HTMLAttributes<HTMLElement> {
  /** Empty-state spacing and typography scale. @default 'md' */
  size?: EmptySize;
}

export type EmptyRootProps = EmptyProps;
export type EmptyIconProps = HTMLAttributes<HTMLDivElement>;
export type EmptyTitleProps = HTMLAttributes<HTMLHeadingElement>;
export type EmptyDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export type EmptyActionProps = HTMLAttributes<HTMLDivElement>;
