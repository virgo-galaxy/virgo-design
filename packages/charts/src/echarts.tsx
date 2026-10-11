import type { EChartsOption, EChartsType } from 'echarts';
import * as echarts from 'echarts';
import type { HTMLAttributes } from 'react';
import { useMemo, useRef } from 'react';

import styles from './Chart.module.scss';
import { advancedTheme } from './engine/advanced-theme';
import { useChartRuntime, useReducedMotion } from './engine/runtime';
import { useChartTheme } from './engine/theme';
import type { ChartRenderer } from './types';

export type { EChartsOption, EChartsType } from 'echarts';
export { connect, disconnect, getMap, registerMap, registerTheme } from 'echarts';
export interface EChartsChartProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  option: EChartsOption;
  renderer?: ChartRenderer;
  height?: number;
  theme?: 'light' | 'dark';
  animated?: boolean;
  onReady?: (chart: EChartsType) => (() => void) | void;
}
/** Full ECharts escape hatch. This entry is never imported by the ordinary Chart API. */
export function EChartsChart({
  option,
  renderer = 'svg',
  height = 280,
  theme: appearance,
  animated = true,
  onReady,
  className,
  style,
  ...props
}: EChartsChartProps) {
  const ref = useRef<HTMLDivElement>(null),
    theme = useChartTheme(ref),
    reduced = useReducedMotion();
  const compiled = useMemo(() => {
    if (!theme) return null;
    const themed = advancedTheme(option, theme);
    return {
      ...themed,
      animation: animated && !reduced && option.animation !== false,
      ...(!animated || reduced
        ? {
            stateAnimation: { duration: 0 },
            axisPointer: { ...option.axisPointer, animation: false },
            series: (Array.isArray(themed.series)
              ? themed.series
              : themed.series
                ? [themed.series]
                : []
            ).map((series) => ({ ...series, animation: false, animationDurationUpdate: 0 })),
          }
        : {}),
    };
  }, [option, theme, animated, reduced]);
  useChartRuntime({ ref, init: echarts.init, renderer, height, option: compiled, onReady });
  return (
    <div
      {...props}
      ref={ref}
      className={[styles.root, styles.engine, className].filter(Boolean).join(' ')}
      role={props.role ?? 'img'}
      aria-label={props['aria-label'] ?? 'Chart'}
      data-theme={appearance}
      data-chart-engine="echarts"
      data-renderer={renderer}
      style={{ height, ...style }}
    />
  );
}
