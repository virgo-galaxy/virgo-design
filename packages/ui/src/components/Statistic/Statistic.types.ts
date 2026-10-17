import type { HTMLAttributes, ReactNode } from 'react';

export interface StatisticAnimationOptions {
  /** Starting value for the first numeric animation. @default 0 */
  from?: number;
  /** Initial animation duration in milliseconds. Defaults to the 560 ms motion token. */
  duration?: number;
  /** Duration of subsequent value changes in milliseconds. Defaults to the 360 ms motion token. */
  updateDuration?: number;
}

export interface StatisticProps extends Omit<HTMLAttributes<HTMLDivElement>, 'prefix'> {
  /** The accessible metric label. */
  label?: ReactNode;
  /** The displayed metric value; zero remains visible. */
  value?: ReactNode;
  /** Animates finite numeric values using the decelerate motion token. Respects reduced motion. @default false */
  animation?: boolean | StatisticAnimationOptions;
  /** Formats numeric values, including animation frames. Pass numbers to value and units to suffix. */
  formatter?: (value: number) => string;
  /** Content before the value, such as a currency symbol. */
  prefix?: ReactNode;
  /** Content after the value, such as a unit. */
  suffix?: ReactNode;
  /** Change content, commonly composed with Statistic.Trend. */
  trend?: ReactNode;
  /** Supporting context for the metric. */
  description?: ReactNode;
  /** Replaces the value with a Skeleton and exposes aria-busy. */
  loading?: boolean;
}

export interface StatisticValueProps extends HTMLAttributes<HTMLDivElement> {
  /** Numeric value for the compound slot. Explicit children take precedence. */
  value?: number;
  /** Optional numeric animation with the same behavior as Statistic.Root. @default false */
  animation?: boolean | StatisticAnimationOptions;
  /** Formats the numeric value and its animation frames. */
  formatter?: (value: number) => string;
}

export interface StatisticTrendProps extends HTMLAttributes<HTMLSpanElement> {
  /** Direction of change, independent of semantic intent. */
  direction?: 'up' | 'down' | 'neutral';
  /** Semantic meaning of change: positive, negative or neutral. */
  intent?: 'positive' | 'negative' | 'neutral';
}
