import type {
  BarSeriesOption,
  EChartsOption,
  LineSeriesOption,
  PieSeriesOption,
  TooltipComponentOption,
  XAXisComponentOption,
} from 'echarts';

import styles from '../Chart.module.scss';
import { numeric, read } from '../data';
import type {
  BarProps,
  ChartDatum,
  ChartFormatter,
  ChartMargins,
  PieProps,
  XAxisProps,
  YAxisProps,
} from '../types';
import type { ChartTheme } from './theme';

export interface SeriesDefinition extends BarProps {
  key: string;
  name: string;
  kind: 'line' | 'area' | 'bar' | 'pie';
  color: string;
}

export interface ChartDefinition {
  interactive?: boolean;
  data: readonly ChartDatum[];
  series: SeriesDefinition[];
  hidden: Set<string>;
  label: ChartFormatter;
  value: ChartFormatter;
  margins: ChartMargins;
  xAxis?: XAxisProps | undefined;
  yAxis?: YAxisProps | undefined;
  grid?: { vertical?: boolean } | undefined;
  tooltip?: { crosshair?: boolean; className?: string } | undefined;
  legend: boolean;
  polar?: PieProps | undefined;
}

function resolveColor(color: string, theme: ChartTheme) {
  if (theme.colors?.[color]) return theme.colors[color]!;

  const index = /^var\(--chart-series-(\d+)\)$/.exec(color)?.[1];

  return index ? (theme.palette[Number(index) - 1] ?? color) : color;
}

function tooltipCard(model: ChartDefinition, theme: ChartTheme, index: number) {
  const datum = model.data[index];

  if (!datum) return '';

  const card = document.createElement('div');
  card.className = [styles.tooltip, model.tooltip?.className].filter(Boolean).join(' ');
  card.setAttribute('role', 'tooltip');
  const heading = document.createElement('strong');
  heading.textContent = model.label(
    read(datum, model.polar?.nameKey ?? model.xAxis?.dataKey ?? Object.keys(datum)[0] ?? ''),
  );
  card.append(heading);

  const list = document.createElement('dl');
  const items = model.polar
    ? [model.series[index]!]
    : model.series.filter((s) => !model.hidden.has(s.key));

  for (const item of items) {
    if (!item) continue;

    const row = document.createElement('div');
    const name = document.createElement('dt');
    const dot = document.createElement('i');
    const value = document.createElement('dd');

    dot.style.background = resolveColor(item.color, theme);
    name.append(dot, document.createTextNode(item.name));
    value.textContent = model.value(read(datum, item.dataKey));
    row.append(name, value);
    list.append(row);
  }

  card.append(list);

  return card;
}

export function compileOption(
  model: ChartDefinition,
  theme: ChartTheme,
  animated: boolean,
): EChartsOption {
  const interactive = model.interactive !== false;
  const selected = Object.fromEntries(model.series.map((s) => [s.name, !model.hidden.has(s.key)]));
  const tooltip: TooltipComponentOption = {
    show: interactive && !!model.tooltip,
    trigger: model.polar ? 'item' : 'axis',
    renderMode: 'html',
    appendToBody: false,
    confine: true,
    enterable: false,
    transitionDuration: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    extraCssText: 'box-shadow:none;',
    textStyle: {
      color: theme.tooltipForeground,
      fontFamily: theme.fontFamily,
      fontSize: theme.fontSize,
    },
    axisPointer: {
      type: model.tooltip?.crosshair === false ? 'none' : 'line',
      axis: 'x',
      animation: false,
      lineStyle: {
        color: theme.axisLabel,
        width: theme.borderWidth,
        type: theme.gridLineType,
        opacity: theme.pointerOpacity,
      },
    },
    formatter: (params) => {
      const item = Array.isArray(params) ? params[0] : params;
      return tooltipCard(model, theme, item?.dataIndex ?? 0);
    },
  };
  const common: EChartsOption = {
    backgroundColor: theme.background,
    color: theme.palette,
    textStyle: { fontFamily: theme.fontFamily, fontSize: theme.fontSize, color: theme.axisLabel },
    animation: animated,
    animationDuration: theme.enterDuration,
    animationEasing: theme.enterEasing,
    animationDurationUpdate: theme.updateDuration,
    animationEasingUpdate: theme.updateEasing,
    stateAnimation: {
      duration: animated ? theme.interactionDuration : 0,
      easing: theme.interactionEasing,
    },
    tooltip,
    legend: {
      show: false,
      data: model.series.map((s) => s.name),
      selected,
      textStyle: { color: theme.legend, fontFamily: theme.fontFamily },
    },
  };

  if (model.polar) {
    const polar = model.polar;
    const outer = '64%';
    const inner = polar.innerRadius ?? 0;

    const pie: PieSeriesOption = {
      id: 'virgo-pie',
      type: 'pie',
      radius: [inner <= 1 ? `${inner * 64}%` : inner, outer],
      center: ['50%', '50%'],
      silent: !interactive,
      selectedMode: interactive ? 'single' : false,
      selectedOffset: theme.sectorOffset,
      avoidLabelOverlap: true,
      stillShowZeroSum: false,
      percentPrecision: 0,
      label: {
        show: polar.showLabels !== false,
        position: 'outside',
        formatter: '{d}%',
        color: theme.axisLabel,
        fontFamily: theme.fontFamily,
        fontSize: theme.fontSize,
      },
      labelLine: {
        show: polar.showLabels !== false && polar.labelLine !== false,
        length: 12,
        length2: 16,
        lineStyle: { width: theme.borderWidth, opacity: theme.pointerOpacity },
      },
      itemStyle: { borderWidth: theme.borderWidth, borderColor: theme.background },
      emphasis: {
        disabled: !interactive,
        scale: false,
        label: { fontWeight: 'normal' },
        itemStyle: {
          shadowBlur: 8 * theme.emphasisShadowScale,
          shadowColor: theme.sectorShadowColor,
          shadowOffsetY: 3 * theme.emphasisShadowScale,
        },
      },
      select: {
        label: { fontWeight: 'normal' },
        itemStyle: {
          shadowBlur: 8 * theme.emphasisShadowScale,
          shadowColor: theme.sectorShadowColor,
          shadowOffsetY: 3 * theme.emphasisShadowScale,
        },
      },
      data: model.data.map((datum, index) => ({
        id: `pie:${index}`,
        name: model.series[index]?.name ?? model.label(read(datum, polar.nameKey)),
        value: Math.max(0, numeric(read(datum, polar.dataKey)) ?? 0),
        itemStyle: { color: resolveColor(model.series[index]?.color ?? '', theme) },
      })),
    };

    return { ...common, series: [pie] };
  }

  const xKey = model.xAxis?.dataKey ?? Object.keys(model.data[0] ?? {})[0] ?? '';
  const kind = model.xAxis?.type ?? 'category';
  const bar = model.series.some((series) => series.kind === 'bar');

  const series = model.series.map((s): BarSeriesOption | LineSeriesOption => {
    const paint = resolveColor(s.color, theme);
    const data = model.data.map((datum, index) => {
      const rawX = read(datum, xKey);
      const y = numeric(read(datum, s.dataKey));
      const x =
        kind === 'time'
          ? rawX instanceof Date
            ? rawX.getTime()
            : Date.parse(String(rawX))
          : Number(rawX);

      return {
        name: String(rawX ?? index),
        value: kind === 'category' ? y : [Number.isFinite(x) ? x : null, y],
      };
    });
    const base = {
      silent: !interactive,
      id: s.key,
      name: s.name,
      data,
      itemStyle: { color: paint, ...(s.kind === 'bar' ? { borderRadius: theme.barRadius } : {}) },
      universalTransition: true,
    };

    if (s.kind === 'bar')
      return {
        ...base,
        type: 'bar',
        ...(s.stackId ? { stack: s.stackId } : {}),
        stackStrategy: 'samesign',
        barMaxWidth: s.maxWidth ?? 80,
        barGap: '0%',
        barCategoryGap: '28%',
        emphasis: {
          disabled: !interactive,
          itemStyle: {
            shadowBlur: 6 * theme.emphasisShadowScale,
            shadowColor: paint,
            shadowOffsetY: 2 * theme.emphasisShadowScale,
            borderColor: paint,
            borderWidth: theme.borderWidth,
          },
        },
      };

    return {
      ...base,
      type: 'line',
      smooth: s.curve === 'smooth',
      connectNulls: false,
      showSymbol: s.marker === 'visible' || s.marker === 'muted',
      symbol: theme.pointSymbol,
      symbolSize: theme.pointRadius * 2,
      itemStyle: {
        color: paint,
        borderColor: theme.activePoint,
        borderWidth: theme.pointBorderWidth,
        opacity: s.marker === 'muted' ? theme.mutedOpacity : 1,
      },
      lineStyle: { color: paint, width: theme.lineWidth, cap: 'round', join: 'round' },
      emphasis: {
        disabled: !interactive,
        scale: theme.activePointRadius / theme.pointRadius,
        lineStyle: { width: theme.lineWidth },
        itemStyle: {
          opacity: 1,
          borderWidth: theme.activePointBorderWidth,
          shadowBlur: 3 * theme.emphasisShadowScale,
          shadowColor: paint,
        },
      },
      ...(s.kind === 'area'
        ? {
            areaStyle: {
              color: {
                type: 'linear' as const,
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: paint },
                  { offset: 1, color: theme.background },
                ],
              },
              opacity: theme.areaOpacity,
            },
          }
        : {}),
    };
  });

  return {
    ...common,
    grid: { ...model.margins, containLabel: false },
    xAxis: {
      type: kind === 'linear' ? 'value' : kind,
      show: model.xAxis?.hidden !== true,
      boundaryGap: kind === 'category' ? bar : [0, 0],
      scale: true,
      ...(kind === 'category' ? { data: model.data.map((d) => String(read(d, xKey) ?? '')) } : {}),
      axisLine: { show: true, lineStyle: { color: theme.axis, width: theme.borderWidth } },
      axisTick: { show: false },
      axisLabel: {
        color: theme.axisLabel,
        hideOverlap: true,
        formatter: (value: string | number, index: number) =>
          (model.xAxis?.tickFormatter ?? model.label)(
            kind === 'category'
              ? read(model.data[index] ?? {}, xKey)
              : kind === 'time'
                ? read(model.data[0] ?? {}, xKey) instanceof Date
                  ? new Date(value)
                  : new Date(value).toISOString().slice(0, 10)
                : value,
          ),
      },
      ...(kind !== 'category' ? { splitNumber: model.xAxis?.tickCount ?? 5 } : {}),
      splitLine: {
        show: !!model.grid?.vertical,
        lineStyle: { color: theme.grid, width: theme.borderWidth, type: theme.gridLineType },
      },
      axisPointer: {
        show: interactive && !!model.tooltip && model.tooltip.crosshair !== false,
        snap: true,
        label: { show: false },
      },
    } as XAXisComponentOption,
    yAxis: {
      show: model.yAxis?.hidden !== true,
      type: 'value',
      ...(model.yAxis?.domain ? { min: model.yAxis.domain[0], max: model.yAxis.domain[1] } : {}),
      splitNumber: model.yAxis?.tickCount ?? 5,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: theme.axisLabel,
        formatter: (value: number) => (model.yAxis?.tickFormatter ?? model.value)(value),
      },
      splitLine: {
        show: !!model.grid,
        lineStyle: { color: theme.grid, width: theme.borderWidth, type: theme.gridLineType },
      },
    },
    series,
  };
}
