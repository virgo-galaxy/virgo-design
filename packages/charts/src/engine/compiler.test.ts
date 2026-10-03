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
  axis: '#aaa',
  axisLabel: '#555',
  grid: '#ddd',
  background: 'transparent',
  activePoint: '#fff',
  legend: '#555',
  tooltipSurface: '#fff',
  tooltipBorder: '#ccc',
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
      { ...model, series: model.series.map((s) => ({ ...s, kind: 'bar', stackId: 'total' })) },
      theme,
      true,
    ).series as BarSeriesOption[];
    expect(series.map((s) => [s.type, s.stack, s.stackStrategy])).toEqual([
      ['bar', 'total', 'samesign'],
      ['bar', 'total', 'samesign'],
    ]);
    const grouped = compileOption(
      { ...model, series: model.series.map((s) => ({ ...s, kind: 'bar' })) },
      theme,
      true,
    ).series as BarSeriesOption[];
    expect(grouped.every((s) => s.stack === undefined)).toBe(true);
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
});
