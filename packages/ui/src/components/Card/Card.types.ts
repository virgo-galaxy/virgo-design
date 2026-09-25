import type { HTMLAttributes } from 'react';

import type { SurfaceProps } from '../Surface';

export type CardVariant = 'default' | 'outlined' | 'elevated';
export type CardSize = 'sm' | 'md' | 'lg';
export type CardTitleElement = 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type CardSurfaceProps = Omit<
  SurfaceProps,
  'tone' | 'material' | 'background' | 'elevation' | 'radius' | 'border'
>;

export interface CardProps extends CardSurfaceProps {
  /** Structural presentation mapped to existing Surface tokens. @default 'default' */
  variant?: CardVariant;
  /** Internal spacing scale. @default 'md' */
  size?: CardSize;
}

export type CardRootProps = CardProps;
export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;
export type CardBodyProps = HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = HTMLAttributes<HTMLDivElement>;

export interface CardTitleProps extends HTMLAttributes<HTMLElement> {
  /** Consumer-selected heading level. Defaults to a neutral div. @default 'div' */
  as?: CardTitleElement;
}

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
