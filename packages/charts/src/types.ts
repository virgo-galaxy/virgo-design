import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
export type ChartDatum = object;
export type ChartRenderer = 'svg' | 'canvas';
export type ChartValue = string | number | Date | null | undefined;
export type ChartFormatter = (value: ChartValue) => string;
export interface ChartMargins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
export interface ChartRootProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  data: readonly ChartDatum[];
  title: string;
  description?: string;
  height?: number;
  margins?: Partial<ChartMargins>;
  locale?: string;
  theme?: 'light' | 'dark';
  /** Disable motion explicitly. Reduced-motion preferences always take precedence. */
  animated?: boolean;
  /** ECharts rendering backend for ordinary charts. Sparkline always uses native SVG. */
  renderer?: ChartRenderer;
  valueFormatter?: ChartFormatter;
  labelFormatter?: ChartFormatter;
  empty?: ReactNode;
  /** Expose a native data table in an expandable disclosure. */
  showData?: boolean;
  dataTableLabel?: string;
  missingLabel?: string;
}
export interface CartesianProps {
  children: ReactNode;
  height?: number;
  className?: string;
}
export interface XAxisProps {
  dataKey: string;
  type?: 'category' | 'time' | 'linear';
  tickFormatter?: ChartFormatter;
  tickCount?: number;
  hidden?: boolean;
}
export interface YAxisProps {
  domain?: readonly [number, number];
  tickFormatter?: ChartFormatter;
  tickCount?: number;
}
export interface SeriesProps {
  dataKey: string;
  name?: string;
  color?: string;
  /** Visible dots, muted dots, or active-only dots. */
  marker?: 'visible' | 'muted' | 'none';
  curve?: 'linear' | 'smooth';
  /** Bars sharing a stackId use diverging positive/negative stacks. */
  stackId?: string;
}
export interface TooltipProps {
  crosshair?: boolean;
  className?: string;
}
export interface LegendProps {
  className?: string;
  toggleLabel?: (name: string) => string;
}
export interface PieProps {
  dataKey: string;
  nameKey: string;
  innerRadius?: number;
  colors?: readonly string[];
  /** Label placed in the donut hole. */
  center?: ReactNode;
  showLabels?: boolean;
  /** Draw leader lines to the percentage labels. Only applies when showLabels is true. Defaults to true. */
  labelLine?: boolean;
  children?: ReactNode;
  height?: number;
}
export interface SparklineProps extends ChartRootProps {
  dataKey: string;
  xKey: string;
  color?: string;
  area?: boolean;
}
export type ChartStyle = CSSProperties & { [key: `--chart-${string}`]: string | number };
