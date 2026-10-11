import type {
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
  TooltipComponentOption,
} from 'echarts';
import { describe, expect, it } from 'vitest';

import { advancedTheme } from './advanced-theme';
import { type ChartDefinition, compileOption } from './compiler';
import type { ChartTheme } from './theme';
const theme: ChartTheme = {
  palette: ['#1664f9', '#ed6b32', '#61ad79', '#8454da', '#13c2c2', '#f7ba1e'],
  heatmapPalette: ['#f4f4f4', '#cfdffb', '#7aa6f8', '#1664f9', '#0041b8'],
  heatmapRadius: 4,
  heatmapBorderWidth: 1,
  axis: '#aaa',
  axisLabel: '#555',
  grid: '#ddd',
  background: 'transparent',
  activePoint: '#fff',
  legend: '#555',
  tooltipSurface: '#fff',
  tooltipBorder: '#ccc',
  tooltipBackdropFilter: 'none',
  fontFamily: 'sans-serif',
  fontSize: 12,
  lineWidth: 2,
  pointRadius: 3,
  activePointRadius: 4.5,
  mutedOpacity: 0.3,
  sectorOffset: 8,
  enterDuration: 700,
  updateDuration: 400,
  interactionDuration: 120,
};
const model: ChartDefinition = {
  data: [
    { date: 'A', a: 0, b: 4 },
    { date: 'B', a: null, b: -2 },
    { date: 'C', a: 5, b: NaN },
  ],
  series: [
    { key: 'a', dataKey: 'a', name: 'Created', kind: 'line', color: 'var(--chart-series-1)' },
    {
      key: 'b',
      dataKey: 'b',
      name: 'Completed',
      kind: 'area',
      color: 'var(--chart-series-2)',
      curve: 'smooth',
    },
  ],
  hidden: new Set(),
  label: (v) => String(v),
  value: (v) => (v == null || (typeof v === 'number' && !Number.isFinite(v)) ? '—' : String(v)),
  margins: { left: 48, right: 24, top: 16, bottom: 36 },
  xAxis: { dataKey: 'date' },
  grid: {},
  tooltip: {},
  legend: true,
};
describe('Virgo → ECharts compiler', () => {
  it('disables all pointer emphasis, tooltips and polar selection in static mode', () => {
    for (const kind of ['line', 'area', 'bar'] as const) {
      const option = compileOption(
        { ...model, interactive: false, series: model.series.map((s) => ({ ...s, kind })) },
        theme,
        false,
      );
      expect(option.tooltip).toMatchObject({ show: false });
      expect(option.xAxis).toMatchObject({ axisPointer: { show: false } });
      expect(
        (option.series as LineSeriesOption[]).every((s) => s.silent && s.emphasis?.disabled),
      ).toBe(true);
    }
    const option = compileOption(
      { ...model, interactive: false, polar: { dataKey: 'a', nameKey: 'date' } },
      theme,
      false,
    );
    expect((option.series as PieSeriesOption[])[0]).toMatchObject({
      silent: true,
      selectedMode: false,
      emphasis: { disabled: true },
    });
  });
  it('preserves zero, missing gaps, straight lines and smooth areas', () => {
    const option = compileOption(model, theme, true),
      series = option.series as LineSeriesOption[];
    expect(series[0]).toMatchObject({
      id: 'a',
      type: 'line',
      smooth: false,
      connectNulls: false,
      showSymbol: false,
    });
    expect(series[0]!.data).toEqual([
      { name: 'A', value: 0 },
      { name: 'B', value: null },
      { name: 'C', value: 5 },
    ]);
    expect(series[1]).toMatchObject({ type: 'line', smooth: true, areaStyle: { opacity: 0.2 } });
    expect(series[1]!.data?.at(-1)).toMatchObject({ value: null });
    expect(option).toMatchObject({
      animation: true,
      animationDuration: 700,
      animationDurationUpdate: 400,
    });
    expect(compileOption(model, theme, false).animation).toBe(false);
  });
  it('delegates grouped and diverging stacks without calculating bar geometry', () => {
    const series = compileOption(
      {
        ...model,
        series: model.series.map((s) => ({ ...s, kind: 'bar', stackId: 'total', maxWidth: 16 })),
      },
      theme,
      true,
    ).series as BarSeriesOption[];
    expect(series.map((s) => [s.type, s.stack, s.stackStrategy, s.barMaxWidth])).toEqual([
      ['bar', 'total', 'samesign', 16],
      ['bar', 'total', 'samesign', 16],
    ]);
    const grouped = compileOption(
      { ...model, series: model.series.map((s) => ({ ...s, kind: 'bar' })) },
      theme,
      true,
    ).series as BarSeriesOption[];
    expect(grouped.every((s) => s.stack === undefined)).toBe(true);
    expect(grouped.every((s) => s.barMaxWidth === 80)).toBe(true);
  });
  it('maps time axes and explicit domains, visibility and crosshair settings', () => {
    const option = compileOption(
      {
        ...model,
        data: [{ date: '2026-09-25', a: 2 }],
        xAxis: { dataKey: 'date', type: 'time' },
        yAxis: { domain: [-5, 10] },
        hidden: new Set(['a']),
        tooltip: { crosshair: false },
      },
      theme,
      true,
    );
    expect(option.xAxis).toMatchObject({ type: 'time', axisPointer: { show: false } });
    expect(option.yAxis).toMatchObject({ min: -5, max: 10 });
    expect(option.legend).toMatchObject({ selected: { Created: false } });
    expect((option.series as LineSeriesOption[])[0]!.data?.[0]).toMatchObject({
      value: [Date.parse('2026-09-25'), 2],
    });
  });
  it('maps donut radius and independently controls percentage labels and leader lines', () => {
    const polar = {
      ...model,
      data: [{ name: 'Design', value: 3 }],
      series: [
        {
          key: 'pie:0',
          dataKey: 'value',
          kind: 'pie' as const,
          name: 'Design',
          color: 'var(--chart-series-1)',
        },
      ],
      polar: { dataKey: 'value', nameKey: 'name', innerRadius: 0.64, labelLine: false },
    };
    const pie = (compileOption(polar, theme, true).series as PieSeriesOption[])[0]!;
    expect(pie).toMatchObject({
      type: 'pie',
      radius: ['40.96%', '64%'],
      selectedOffset: 8,
      label: { show: true },
      labelLine: { show: false },
    });
    expect(
      (
        compileOption(
          { ...polar, polar: { ...polar.polar, labelLine: true, showLabels: false } },
          theme,
          false,
        ).series as PieSeriesOption[]
      )[0],
    ).toMatchObject({ label: { show: false }, labelLine: { show: false } });
  });
  it('creates a multi-series tooltip with safe text and missing values', () => {
    const option = compileOption(
      {
        ...model,
        series: model.series.map((s) => ({ ...s, name: '<img src=x onerror=alert(1)>' })),
      },
      theme,
      false,
    );
    const tooltip = option.tooltip as TooltipComponentOption;
    const formatter = tooltip.formatter as (params: unknown) => HTMLElement;
    const card = formatter([{ dataIndex: 1 }]);
    expect(card.textContent).toContain('B');
    expect(card.textContent).toContain('—');
    expect(card.textContent).toContain('-2');
    expect(card.textContent).toContain('<img');
    expect(card.querySelector('img')).toBeNull();
    expect(tooltip.transitionDuration).toBe(0);
  });
  it('applies advanced theme defaults without mutating or overwriting explicit option styles', () => {
    const option = {
      xAxis: [{ type: 'value' as const, axisLabel: { color: 'red' } }],
      yAxis: { type: 'value' as const },
      series: [{ type: 'scatter' as const, data: [[1, 2]] }],
    };
    const themed = advancedTheme(option, theme);
    expect(themed.xAxis).toMatchObject([
      { axisLabel: { color: 'red' }, axisLine: { lineStyle: { color: '#aaa' } } },
    ]);
    expect(themed.yAxis).toMatchObject({ axisLabel: { color: '#555' } });
    expect(option.yAxis).toEqual({ type: 'value' });
    expect(themed.series).toBe(option.series);
  });
  it('shares the tooltip material with advanced charts while preserving explicit CSS', () => {
    const material = { ...theme, tooltipBackdropFilter: 'blur(8px) saturate(1.04)' };
    expect(advancedTheme({ tooltip: {} }, material).tooltip).toMatchObject({
      backgroundColor: theme.tooltipSurface,
      extraCssText:
        'backdrop-filter:blur(8px) saturate(1.04);-webkit-backdrop-filter:blur(8px) saturate(1.04);',
    });
    expect(
      advancedTheme({ tooltip: { extraCssText: 'backdrop-filter:none;' } }, material).tooltip,
    ).toMatchObject({ extraCssText: 'backdrop-filter:none;' });
  });
  it('themes calendar cells and hover boundaries while preserving data and explicit overrides', () => {
    const data = [['2026-10-01', 3]];
    const option = {
      calendar: {},
      visualMap: { dimension: 1 },
      series: [
        { type: 'heatmap' as const, coordinateSystem: 'calendar' as const, data },
        { type: 'heatmap' as const, itemStyle: { borderRadius: 9, borderColor: 'red' }, data },
      ],
    };
    for (const [radius, width] of [
      [0, 1],
      [2, 2],
    ]) {
      const themed = advancedTheme(option, {
        ...theme,
        heatmapRadius: radius!,
        heatmapBorderWidth: width!,
      });
      expect(themed.visualMap).toMatchObject({ inRange: { color: theme.heatmapPalette } });
      expect(themed.series).toMatchObject([
        {
          itemStyle: { borderRadius: radius, borderWidth: width, borderColor: theme.grid },
          emphasis: { itemStyle: { borderWidth: width! + 1, borderColor: theme.axis } },
          data,
        },
        { itemStyle: { borderRadius: 9, borderColor: 'red' }, data },
      ]);
    }
    expect(option.series[0]).not.toHaveProperty('itemStyle');
    expect(option.series[0]!.data).toBe(data);
  });
});
