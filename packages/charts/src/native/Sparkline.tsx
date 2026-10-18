import { useEffect, useId, useMemo, useRef, useState } from 'react';

import { numeric, read } from '../data';
import type { ChartFormatter, SparklineProps } from '../types';
import { areaPath, linear, linePath } from './geometry';

import styles from '../Chart.module.scss';

/** Deliberately independent of the ECharts adapter and its runtime chunks. */
export function Sparkline({
  data,
  dataKey,
  xKey,
  color = 'var(--chart-series-1)',
  area = false,
  height = 48,
  title,
  description,
  locale = 'en-US',
  labelFormatter,
  valueFormatter,
  missingLabel = '—',
  empty = 'No chart data',
  showData = false,
  dataTableLabel = 'View chart data',
  animated = true,
  interactive = true,
  className,
  theme,
  renderer: _renderer,
  margins: _margins,
  children: _children,
  ...props
}: SparklineProps) {
  void _renderer;
  void _margins;
  void _children;

  const ref = useRef<HTMLElement>(null);
  const [width, setWidth] = useState(640);
  const [active, setActive] = useState<number | null>(null);
  const id = useId().replace(/:/g, '');

  const number = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }),
    [locale],
  );
  const date = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }),
    [locale],
  );
  const format: ChartFormatter = (value) =>
    value == null || (typeof value === 'number' && !Number.isFinite(value))
      ? missingLabel
      : typeof value === 'number'
        ? number.format(value)
        : value instanceof Date
          ? date.format(value)
          : String(value);
  const label = labelFormatter ?? format;
  const value = valueFormatter ?? format;

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const measure = () => setWidth(Math.max(1, element.clientWidth || 640));

    measure();

    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);

    observer?.observe(element);

    if (!observer) window.addEventListener('resize', measure);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const values = data.map((datum) => numeric(read(datum, dataKey)));
  const finite = values.filter((value): value is number => value !== null);
  const low = Math.min(0, ...finite);
  const high = Math.max(0, ...finite);
  const x = linear([0, data.length - 1], [6, Math.max(6, width - 6)]);
  const y = linear([low, high || 1], [height - 6, 6]);
  const points = values.map((value, index) =>
    value === null ? null : ([x(index), y(value)] as const),
  );
  const activeIndex = interactive && active !== null && active < data.length ? active : null;
  const current = activeIndex === null ? null : points[activeIndex];
  const datum = activeIndex === null ? null : data[activeIndex];

  return (
    <figure
      {...props}
      ref={ref}
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-chart-engine="native"
      data-theme={theme}
      data-animated={animated}
      data-interactive={interactive}
      data-chart-visible="true"
      onPointerLeave={() => {
        if (!ref.current?.contains(document.activeElement)) setActive(null);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setActive(null);
      }}
    >
      <figcaption className={styles.srOnly}>{title}</figcaption>
      {description ? <p className={styles.srOnly}>{description}</p> : null}
      {finite.length ? (
        <svg
          role="group"
          aria-label={title}
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
        >
          <g className={styles.series} style={{ '--chart-color': color } as React.CSSProperties}>
            {area ? (
              <>
                <defs>
                  <linearGradient id={id} x2="0" y2="1">
                    <stop stopColor={color} className={styles.areaStart} />
                    <stop offset="1" stopColor={color} className={styles.areaEnd} />
                  </linearGradient>
                </defs>
                <path d={areaPath(points, y(0))} fill={`url(#${id})`} />
              </>
            ) : null}
            <path className={styles.line} d={linePath(points)} pathLength={1} />
            {current ? (
              <circle cx={current[0]} cy={current[1]} className={styles.point} data-active="true" />
            ) : null}
          </g>
          {interactive
            ? data.map((d, index) => (
                <rect
                  key={String(read(d, xKey) ?? index)}
                  data-chart-hit={index}
                  role="button"
                  className={styles.hit}
                  x={index ? (x(index - 1) + x(index)) / 2 : 0}
                  y={0}
                  width={Math.max(
                    1,
                    (index === data.length - 1 ? width : (x(index) + x(index + 1)) / 2) -
                      (index ? (x(index - 1) + x(index)) / 2 : 0),
                  )}
                  height={height}
                  tabIndex={index === (activeIndex ?? 0) ? 0 : -1}
                  aria-label={`${label(read(d, xKey))}: ${dataKey} ${value(read(d, dataKey))}`}
                  onPointerEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      setActive(null);
                      event.currentTarget.blur();

                      return;
                    }

                    const next =
                      event.key === 'ArrowRight'
                        ? Math.min(data.length - 1, index + 1)
                        : event.key === 'ArrowLeft'
                          ? Math.max(0, index - 1)
                          : event.key === 'Home'
                            ? 0
                            : event.key === 'End'
                              ? data.length - 1
                              : null;

                    if (next !== null) {
                      event.preventDefault();
                      event.currentTarget.ownerSVGElement
                        ?.querySelector<SVGRectElement>(`[data-chart-hit="${next}"]`)
                        ?.focus();
                    }
                  }}
                />
              ))
            : null}
        </svg>
      ) : (
        <div className={styles.empty} style={{ height }} role="status">
          {empty}
        </div>
      )}
      {datum ? (
        <div
          role="tooltip"
          className={styles.tooltip}
          style={{
            position: 'absolute',
            left: Math.max(4, Math.min(x(activeIndex!) + 16, width - 196)),
            top: 0,
          }}
        >
          <strong>{label(read(datum, xKey))}</strong>
          <dl>
            <div>
              <dt>
                <i style={{ background: color }} />
                {dataKey}
              </dt>
              <dd>{value(read(datum, dataKey))}</dd>
            </div>
          </dl>
        </div>
      ) : null}
      {showData ? (
        <details className={styles.data}>
          <summary>{dataTableLabel}</summary>
          <table aria-label={title}>
            <thead>
              <tr>
                <th scope="col">{xKey}</th>
                <th scope="col">{dataKey}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i}>
                  <td>{label(read(d, xKey))}</td>
                  <td>{value(read(d, dataKey))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      ) : null}
    </figure>
  );
}
