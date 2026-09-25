import type { HTMLAttributes, ReactNode } from 'react';

export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressIntent = 'default' | 'success' | 'warning' | 'error';

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Current completed amount. */
  value: number;
  /** Total amount represented by a complete track. @default 100 */
  max?: number;
  /** Track thickness. @default 'md' */
  size?: ProgressSize;
  /** Semantic indicator color. @default 'default' */
  intent?: ProgressIntent;
  /** Optional visible label placed above the track. */
  label?: ReactNode;
  /** Shows the normalized percentage above the track. @default false */
  showValue?: boolean;
}
