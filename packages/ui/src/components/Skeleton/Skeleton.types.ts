import type { HTMLAttributes } from 'react';

export type SkeletonVariant = 'text' | 'rectangle' | 'circle';

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  /** Placeholder geometry. @default 'rectangle' */
  variant?: SkeletonVariant;
  /** Enables the tokenized loading pulse. @default true */
  animated?: boolean;
}
