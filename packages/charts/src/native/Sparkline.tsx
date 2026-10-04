import { useEffect, useId, useMemo, useRef, useState } from 'react';

import styles from '../Chart.module.scss';
import { numeric, read } from '../data';
import type { ChartFormatter, SparklineProps } from '../types';
import { areaPath, linear, linePath } from './geometry';

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
  const ref = useRef<HTMLElement>(null),
    [width, setWidth] = useState(640),
    [active, setActive] = useState<number | null>(null),
    id = useId().replace(/:/g, '');
  const number = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }),
    [locale],
  );
  const format: ChartFormatter = (value) =>
    value == null || (typeof value === 'number' && !Number.isFinite(value))
      ? missingLabel
      : typeof value === 'number'
        ? number.format(value)
        : value instanceof Date
          ? new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(value)
          : String(value);
  const label = labelFormatter ?? format,
    value = valueFormatter ?? format;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(Math.max(1, el.clientWidth || 640));
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(el);
    if (!observer) window.addEventListener('resize', measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);
  const values = data.map((d) => numeric(read(d, dataKey))),
    finite = values.filter((v): v is number => v !== null),
    low = Math.min(0, ...finite),
    high = Math.max(0, ...finite),
    x = linear([0, data.length - 1], [6, Math.max(6, width - 6)]),
    y = linear([low, high || 1], [height - 6, 6]),
    points = values.map((v, i) => (v === null ? null : ([x(i), y(v)] as const))),
    current = !interactive || active === null ? null : points[active],
    datum = !interactive || active === null ? null : data[active];
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
                    <stop stopColor={color} stopOpacity=".25" />
                    <stop offset="1" stopColor={color} stopOpacity=".025" />
                  </linearGradient>
                </defs>
                <path d={areaPath(points, y(0))} fill={`url(#${id})`} />
              </>
            ) : null}
            <path className={styles.line} d={linePath(points)} pathLength={1} />
            {current ? (
              <circle
                cx={current[0]}
                cy={current[1]}
                r="4.5"
                className={styles.point}
                data-active="true"
              />
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
                  tabIndex={index === (active ?? 0) ? 0 : -1}
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
            left: Math.max(4, Math.min(x(active!) + 16, width - 196)),
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
