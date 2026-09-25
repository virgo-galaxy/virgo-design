import type { HTMLAttributes } from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerIntent = 'current' | 'neutral' | 'brand';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Spinner dimensions. @default 'md' */
  size?: SpinnerSize;
  /** Color source. `current` inherits the surrounding text color. @default 'current' */
  intent?: SpinnerIntent;
}
