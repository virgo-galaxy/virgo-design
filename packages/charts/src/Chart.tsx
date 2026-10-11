import type { ReactElement, ReactNode } from 'react';
import {
  Children,
  createContext,
  Fragment,
  isValidElement,
  lazy,
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import styles from './Chart.module.scss';
import { numeric, read } from './data';
import type { ChartDefinition, SeriesDefinition } from './engine/compiler';
import { Sparkline } from './native/Sparkline';
import type {
  BarProps,
  CartesianProps,
  ChartDatum,
  ChartFormatter,
  ChartRenderer,
  ChartRootProps,
  LegendProps,
  PieProps,
  SeriesProps,
  TooltipProps,
  XAxisProps,
  YAxisProps,
} from './types';

const EngineView = lazy(() => import('./engine/EngineView'));
interface RootState extends Omit<ChartDefinition, 'legend'> {
  title: string;
  height: number;
  renderer: ChartRenderer;
  animated: boolean;
  visible: boolean;
  empty: ReactNode;
  toggle: (key: string) => void;
}
const RootContext = createContext<RootState | null>(null);
const ResponsiveContext = createContext<{
  height?: number | undefined;
  renderer?: ChartRenderer | undefined;
}>({});
function useRoot() {
  const root = useContext(RootContext);
  if (!root) throw new Error('Chart parts must be inside Chart.Root');
  return root;
}
const color = (index: number) => `var(--chart-series-${(index % 12) + 1})`;
function nodes(children: ReactNode): ReactElement[] {
  return Children.toArray(children).flatMap((node) =>
    isValidElement<{ children?: ReactNode }>(node)
      ? node.type === Fragment
        ? nodes(node.props.children)
        : [node]
      : [],
  );
}
function gather(children: ReactNode, data: readonly ChartDatum[], output: SeriesDefinition[] = []) {
  for (const child of nodes(children)) {
    if (child.type === Line || child.type === Area || child.type === Bar) {
      const props = child.props as BarProps;
      if (!output.some((s) => s.key === props.dataKey))
        output.push({
          ...props,
          key: props.dataKey,
          name: props.name ?? props.dataKey,
          color: props.color ?? color(output.length),
          kind: child.type === Bar ? 'bar' : child.type === Area ? 'area' : 'line',
        });
    } else if (child.type === Pie || child.type === Donut) {
      const props = child.props as PieProps;
      data.forEach((datum, index) =>
        output.push({
          key: `pie:${index}`,
          dataKey: props.dataKey,
          name: String(read(datum, props.nameKey) ?? index),
          color: props.colors?.[index] ?? color(index),
          kind: 'pie',
        }),
      );
    } else gather((child.props as { children?: ReactNode }).children, data, output);
  }
  return output;
}
export function Root({
  data,
  title,
  description,
  height = 280,
  margins,
  locale = 'en-US',
  renderer = 'svg',
  animated = true,
  interactive = true,
  valueFormatter,
  labelFormatter,
  empty = 'No chart data',
  showData = false,
  dataTableLabel = 'View chart data',
  missingLabel = '—',
  theme,
  children,
  className,
  ...props
}: ChartRootProps) {
  const [hidden, setHidden] = useState(new Set<string>()),
    ref = useRef<HTMLElement>(null),
    [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined');
  const number = useMemo(
      () => new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }),
      [locale],
    ),
    date = useMemo(
      () => new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }),
      [locale],
    );
  const format: ChartFormatter = (value) =>
    value == null
      ? missingLabel
      : typeof value === 'number'
        ? Number.isFinite(value)
          ? number.format(value)
          : missingLabel
        : value instanceof Date
          ? date.format(value)
          : String(value);
  const series = gather(children, data);
  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const context: RootState = {
    data,
    series,
    hidden,
    label: labelFormatter ?? format,
    value: valueFormatter ?? format,
    margins: { top: 16, right: 24, bottom: 36, left: 48, ...margins },
    title,
    height,
    renderer,
    animated,
    interactive,
    visible,
    empty,
    toggle: (key) =>
      setHidden((previous) => {
        const next = new Set(previous);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        return next;
      }),
  };
  const columns = [...new Set(data.flatMap((datum) => Object.keys(datum)))];
  return (
    <RootContext.Provider value={context}>
      <figure
        {...props}
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(' ')}
        data-theme={theme}
        data-animated={animated}
        data-interactive={interactive}
        data-chart-visible={visible}
      >
        <figcaption className={styles.srOnly}>{title}</figcaption>
        {description ? <p className={styles.srOnly}>{description}</p> : null}
        {children}
        {showData ? (
          <details className={styles.data}>
            <summary>{dataTableLabel}</summary>
            <table aria-label={title}>
              <thead>
                <tr>
                  {columns.map((key) => (
                    <th key={key} scope="col">
                      {series.find((s) => s.dataKey === key)?.name ?? key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((datum, index) => (
                  <tr key={index}>
                    {columns.map((key) => (
                      <td key={key}>
                        {(series.some((s) => s.dataKey === key) ? context.value : context.label)(
                          read(datum, key),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        ) : null}
      </figure>
    </RootContext.Provider>
  );
}
export function Responsive({
  height,
  renderer,
  children,
}: {
  height?: number;
  renderer?: ChartRenderer;
  children: ReactNode;
}) {
  const inherited = useContext(ResponsiveContext);
  return (
    <ResponsiveContext.Provider
      value={{ height: height ?? inherited.height, renderer: renderer ?? inherited.renderer }}
    >
      <div className={styles.responsive}>{children}</div>
    </ResponsiveContext.Provider>
  );
}
function Plot({ children, height, className, polar }: CartesianProps & { polar?: PieProps }) {
  const root = useRoot(),
    responsive = useContext(ResponsiveContext),
    parts = nodes(children);
  const definition: ChartDefinition = {
    ...root,
    polar,
    legend: parts.some((n) => n.type === Legend),
    xAxis: parts.find((n) => n.type === XAxis)?.props as XAxisProps | undefined,
    yAxis: parts.find((n) => n.type === YAxis)?.props as YAxisProps | undefined,
    grid: parts.find((n) => n.type === Grid)?.props as { vertical?: boolean } | undefined,
    tooltip: parts.find((n) => n.type === Tooltip)?.props as TooltipProps | undefined,
  };
  const visibleSeries = root.series.filter((s) => !root.hidden.has(s.key));
  const hasData = polar
    ? visibleSeries.some(
        (s) => (numeric(read(root.data[Number(s.key.slice(4))] ?? {}, s.dataKey)) ?? 0) > 0,
      )
    : root.data.some((datum) =>
        visibleSeries.some((s) => numeric(read(datum, s.dataKey)) !== null),
      );
  const plotHeight = height ?? responsive.height ?? root.height;
  const placeholder = <div className={styles.empty} style={{ height: plotHeight }} />;
  return (
    <div className={className} style={{ position: 'relative' }}>
      {hasData ? (
        root.visible ? (
          <Suspense fallback={placeholder}>
            <EngineView
              definition={definition}
              height={plotHeight}
              renderer={responsive.renderer ?? root.renderer}
              animated={root.animated}
              title={root.title}
            />
          </Suspense>
        ) : (
          placeholder
        )
      ) : (
        <div className={styles.empty} style={{ minHeight: plotHeight }} role="status">
          {root.empty}
        </div>
      )}
      {hasData && polar?.center && (polar.innerRadius ?? 0) > 0 ? (
        <div className={styles.center} style={{ left: '50%', top: plotHeight / 2 }}>
          {polar.center}
        </div>
      ) : null}
      {parts.filter((n) => n.type === Legend)}
    </div>
  );
}
export function Cartesian(props: CartesianProps) {
  return <Plot {...props} />;
}
export function Grid(_props: { vertical?: boolean }) {
  void _props;
  return null;
}
export function XAxis(_props: XAxisProps) {
  void _props;
  return null;
}
export function YAxis(_props: YAxisProps) {
  void _props;
  return null;
}
export function Line(_props: SeriesProps) {
  void _props;
  return null;
}
export function Area(_props: SeriesProps) {
  void _props;
  return null;
}
export function Bar(_props: BarProps) {
  void _props;
  return null;
}
export function Tooltip(_props: TooltipProps) {
  void _props;
  return null;
}
export function Pie(props: PieProps) {
  return (
    <Plot polar={props} {...(props.height === undefined ? {} : { height: props.height })}>
      {props.children}
    </Plot>
  );
}
export function Donut({ innerRadius = 0.64, ...props }: PieProps) {
  return <Pie {...props} innerRadius={innerRadius} />;
}
export function Legend({ className, toggleLabel }: LegendProps) {
  const root = useRoot();
  return (
    <div className={[styles.legend, className].filter(Boolean).join(' ')}>
      {root.series.map((series) =>
        root.interactive === false ? (
          <span key={series.key}>
            <i style={{ background: series.color }} />
            {series.name}
          </span>
        ) : (
          <button
            key={series.key}
            type="button"
            aria-pressed={!root.hidden.has(series.key)}
            aria-label={toggleLabel?.(series.name)}
            onClick={() => root.toggle(series.key)}
          >
            <i style={{ background: series.color }} />
            {series.name}
          </button>
        ),
      )}
    </div>
  );
}
export const Chart = {
  Root,
  Responsive,
  Cartesian,
  Grid,
  XAxis,
  YAxis,
  Line,
  Area,
  Bar,
  Pie,
  Donut,
  Tooltip,
  Legend,
  Sparkline,
};
