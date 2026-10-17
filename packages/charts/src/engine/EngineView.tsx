import type { EChartsType } from 'echarts';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from '../Chart.module.scss';
import { numeric, read } from '../data';
import type { ChartRenderer } from '../types';
import { type ChartDefinition, compileOption } from './compiler';
import { init } from './core';
import { useChartRuntime, useReducedMotion } from './runtime';
import { useChartTheme } from './theme';

export interface EngineViewProps {
  definition: ChartDefinition;
  height: number;
  renderer: ChartRenderer;
  animated: boolean;
  title: string;
}
export default function EngineView({
  definition,
  height,
  renderer,
  animated,
  title,
}: EngineViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useChartTheme(
    ref,
    definition.series.map((series) => series.color),
  );
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  const interactive = definition.interactive !== false;

  const onReady = useCallback((instance: EChartsType) => {
    const enter = (event: { seriesType?: string; seriesIndex?: number; dataIndex?: number }) => {
      if (event.seriesType === 'pie')
        instance.dispatchAction({
          type: 'select',
          seriesIndex: event.seriesIndex,
          dataIndex: event.dataIndex,
        });
    };
    const leave = (event: { seriesType?: string; seriesIndex?: number; dataIndex?: number }) => {
      if (event.seriesType === 'pie')
        instance.dispatchAction({
          type: 'unselect',
          seriesIndex: event.seriesIndex,
          dataIndex: event.dataIndex,
        });
    };
    instance.on('mouseover', enter);
    instance.on('mouseout', leave);

    return () => {
      if (instance.isDisposed?.()) return;
      instance.off('mouseover', enter);
      instance.off('mouseout', leave);
    };
  }, []);

  const option = useMemo(
    () => (theme ? compileOption(definition, theme, animated && !reduced) : null),
    [definition, theme, animated, reduced],
  );
  const chart = useChartRuntime({ ref, init, renderer, height, option });

  useEffect(() => {
    const instance = chart.current;
    if (interactive && instance) return onReady(instance);
  }, [chart, interactive, onReady, renderer]);

  const inspect = (index: number | null) => {
    const instance = chart.current;
    instance?.dispatchAction({ type: 'downplay' });
    if (definition.polar) instance?.dispatchAction({ type: 'unselect', seriesIndex: 0 });
    setActive(index);

    if (index === null) {
      instance?.dispatchAction({ type: 'hideTip' });

      return;
    }

    const seriesIndex = definition.polar
      ? 0
      : Math.max(
          0,
          definition.series.findIndex(
            (s) =>
              !definition.hidden.has(s.key) &&
              numeric(read(definition.data[index] ?? {}, s.dataKey)) !== null,
          ),
        );
    instance?.dispatchAction({
      type: 'highlight',
      ...(definition.polar ? { seriesIndex: 0 } : {}),
      dataIndex: index,
    });
    if (definition.polar)
      instance?.dispatchAction({ type: 'select', seriesIndex: 0, dataIndex: index });
    if (definition.tooltip)
      instance?.dispatchAction({ type: 'showTip', seriesIndex, dataIndex: index });
  };

  const xKey =
    definition.polar?.nameKey ??
    definition.xAxis?.dataKey ??
    Object.keys(definition.data[0] ?? {})[0] ??
    '';
  const visible = definition.data
    .map((datum, index) => {
      if (!definition.polar) return index;
      return !definition.hidden.has(`pie:${index}`) &&
        (numeric(read(datum, definition.polar.dataKey)) ?? 0) > 0
        ? index
        : -1;
    })
    .filter((index) => index >= 0);
  const pointLabel = (index: number) => {
    const datum = definition.data[index];

    if (!datum) return '';

    const series = definition.polar
      ? [definition.series[index]!]
      : definition.series.filter((s) => !definition.hidden.has(s.key));
    const values = series
      .map((s) => `${s.name} ${definition.value(read(datum, s.dataKey))}`)
      .join(', ');

    if (!definition.polar) return `${definition.label(read(datum, xKey))}: ${values}`;

    const total = visible.reduce(
      (sum, i) => sum + (numeric(read(definition.data[i]!, definition.polar!.dataKey)) ?? 0),
      0,
    );

    return `${definition.label(read(datum, xKey))}: ${definition.value(read(datum, definition.polar.dataKey))} (${Math.round(((numeric(read(datum, definition.polar.dataKey)) ?? 0) / total) * 100)}%)`;
  };

  return (
    <div
      className={styles.plot}
      role="group"
      aria-label={title}
      data-chart-engine="echarts"
      data-renderer={renderer}
      onBlur={
        interactive
          ? (event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) inspect(null);
            }
          : undefined
      }
    >
      <div ref={ref} className={styles.engine} style={{ height }} />
      {interactive ? (
        <div className={styles.srOnly}>
          {visible.map((index) => (
            <button
              key={index}
              type="button"
              data-chart-hit={index}
              tabIndex={
                index === (active !== null && visible.includes(active) ? active : visible[0])
                  ? 0
                  : -1
              }
              aria-label={pointLabel(index)}
              onFocus={() => inspect(index)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  inspect(null);
                  event.currentTarget.blur();

                  return;
                }

                const position = visible.indexOf(index);
                const direction =
                  event.key === 'ArrowRight' || event.key === 'ArrowDown'
                    ? 1
                    : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
                      ? -1
                      : 0;
                const next =
                  event.key === 'Home'
                    ? visible[0]
                    : event.key === 'End'
                      ? visible.at(-1)
                      : direction
                        ? visible[Math.max(0, Math.min(visible.length - 1, position + direction))]
                        : undefined;

                if (next !== undefined) {
                  event.preventDefault();
                  event.currentTarget.parentElement
                    ?.querySelector<HTMLButtonElement>(`[data-chart-hit="${next}"]`)
                    ?.focus();
                }
              }}
            />
          ))}
          <span aria-live="polite">{active === null ? '' : pointLabel(active)}</span>
        </div>
      ) : null}
    </div>
  );
}
