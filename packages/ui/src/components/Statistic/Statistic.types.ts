import type { HTMLAttributes, ReactNode } from 'react';
export interface StatisticProps extends Omit<HTMLAttributes<HTMLDivElement>, 'prefix'> {
  /** The accessible metric label. */
  label?: ReactNode;
  /** The displayed metric value; zero remains visible. */
  value?: ReactNode;
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
export interface StatisticTrendProps extends HTMLAttributes<HTMLSpanElement> {
  /** Direction of change, independent of semantic intent. */
  direction?: 'up' | 'down' | 'neutral';
  /** Semantic meaning of change: positive, negative or neutral. */
  intent?: 'positive' | 'negative' | 'neutral';
}
