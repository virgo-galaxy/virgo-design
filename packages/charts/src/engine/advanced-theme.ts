import type { EChartsOption } from 'echarts';

import type { ChartTheme } from './theme';

function merge(
  base: Record<string, unknown>,
  own: Record<string, unknown>,
): Record<string, unknown> {
  const output = { ...base };
  for (const [key, value] of Object.entries(own)) {
    const previous = output[key];
    output[key] =
      previous &&
      value &&
      typeof previous === 'object' &&
      typeof value === 'object' &&
      !Array.isArray(previous) &&
      !Array.isArray(value)
        ? merge(previous as Record<string, unknown>, value as Record<string, unknown>)
        : value;
  }
  return output;
}
/** Apply semantic defaults without mutating or narrowing the consumer's full ECharts option. */
export function advancedTheme(option: EChartsOption, theme: ChartTheme): EChartsOption {
  const series = Array.isArray(option.series)
    ? option.series
    : option.series
      ? [option.series]
      : [];
  const heatmap = series.some((item) => item.type === 'heatmap');
  const axis = {
    axisLine: { lineStyle: { color: theme.axis } },
    axisLabel: { color: theme.axisLabel },
    splitLine: { lineStyle: { color: theme.grid } },
    splitArea: { areaStyle: { color: [theme.background] } },
  };
  const defaults: Record<string, Record<string, unknown>> = {
    xAxis: axis,
    yAxis: axis,
    radar: { ...axis, axisName: { color: theme.axisLabel } },
    legend: { textStyle: { color: theme.legend } },
    visualMap: {
      textStyle: { color: theme.axisLabel },
      inRange: { color: heatmap ? theme.heatmapPalette : [theme.grid, theme.palette[0]] },
    },
    calendar: {
      dayLabel: { color: theme.axisLabel },
      monthLabel: { color: theme.axisLabel },
      yearLabel: { color: theme.axisLabel },
      itemStyle: { color: theme.background, borderColor: theme.grid },
      splitLine: { lineStyle: { color: theme.grid } },
    },
    geo: {
      label: { color: theme.axisLabel },
      itemStyle: { areaColor: theme.background, borderColor: theme.axis },
    },
    dataZoom: {
      textStyle: { color: theme.axisLabel },
      borderColor: theme.axis,
      fillerColor: theme.grid,
    },
    tooltip: {
      backgroundColor: theme.tooltipSurface,
      borderColor: theme.tooltipBorder,
      textStyle: { color: theme.axisLabel, fontFamily: theme.fontFamily, fontSize: theme.fontSize },
    },
  };
  const result: Record<string, unknown> = {
    color: theme.palette,
    backgroundColor: theme.background,
    textStyle: { fontFamily: theme.fontFamily, fontSize: theme.fontSize, color: theme.axisLabel },
    animationDuration: theme.enterDuration,
    animationDurationUpdate: theme.updateDuration,
    ...option,
  };
  for (const [key, fallback] of Object.entries(defaults)) {
    const own = (option as Record<string, unknown>)[key];
    if (own !== undefined)
      result[key] = Array.isArray(own)
        ? own.map((item) => merge(fallback, item as Record<string, unknown>))
        : merge(fallback, own as Record<string, unknown>);
  }
  return result as EChartsOption;
}
