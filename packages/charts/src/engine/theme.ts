import type { EChartsOption } from 'echarts';
import type { RefObject } from 'react';
import { useLayoutEffect, useState } from 'react';

/** Engine-neutral contract. All values resolve from the consumer's current semantic theme. */
export interface ChartTheme {
  palette: string[];
  sequentialPalette: string[];
  divergingPalette: string[];
  heatmapPalette: string[];
  heatmapRadius: number;
  heatmapBorderWidth: number;
  heatmapActiveBorderWidth: number;
  colors?: Record<string, string>;
  axis: string;
  axisLabel: string;
  grid: string;
  background: string;
  activePoint: string;
  legend: string;
  tooltipSurface: string;
  tooltipBorder: string;
  tooltipForeground: string;
  tooltipBackdropFilter: string;
  fontFamily: string;
  fontSize: number;
  lineWidth: number;
  pointRadius: number;
  activePointRadius: number;
  mutedOpacity: number;
  sectorOffset: number;
  enterDuration: number;
  updateDuration: number;
  interactionDuration: number;
  borderWidth: number;
  pointBorderWidth: number;
  activePointBorderWidth: number;
  emphasisShadowScale: number;
  sectorShadowColor: string;
  areaOpacity: number;
  gridLineType: 'solid' | 'dashed' | 'dotted';
  pointerOpacity: number;
  pointSymbol: string;
  barRadius: number;
  enterEasing: NonNullable<EChartsOption['animationEasing']>;
  updateEasing: NonNullable<EChartsOption['animationEasingUpdate']>;
  interactionEasing: NonNullable<EChartsOption['animationEasing']>;
  tooltipRadius: number;
  tooltipShadow: string;
}

// Browsers serialize color-mix(in srgb, ...) as color(srgb ...), which
// ECharts' color parser cannot read. Keep resolved theme colors in RGB syntax.
function engineColor(color: string): string {
  const match = /^color\(srgb\s+([^)]*)\)$/.exec(color);
  if (!match) return color;
  const [channels, alpha] = match[1]!.split('/');
  const rgb = channels!.trim().split(/\s+/).map(Number);
  if (rgb.length !== 3 || rgb.some((channel) => !Number.isFinite(channel))) return color;
  const values = rgb.map((channel) => Math.round(Math.max(0, Math.min(1, channel)) * 255));
  return alpha === undefined
    ? `rgb(${values.join(', ')})`
    : `rgba(${values.join(', ')}, ${alpha.trim()})`;
}

export function readChartTheme(element: HTMLElement, customColors: string[] = []): ChartTheme {
  const css = getComputedStyle(element);
  const value = (key: string) => css.getPropertyValue(`--chart-${key}`).trim();
  const number = (key: string, fallback: number) => {
    const parsed = parseFloat(value(key));
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  const duration = (key: string, fallback: number) => {
    const text = value(key),
      parsed = parseFloat(text);
    return Number.isFinite(parsed) ? parsed * (text.endsWith('ms') ? 1 : 1000) : fallback;
  };
  // CSS custom properties may still contain nested var() references. Resolve through CSS,
  // rather than duplicating per-preset token lookup tables in JavaScript.
  const keys = [
    'axis',
    'axis-label',
    'grid',
    'background',
    'active-point',
    'legend',
    ...Array.from({ length: 12 }, (_, i) => `series-${i + 1}`),
    'tooltip-surface',
    'tooltip-border',
    'heatmap-empty',
    ...Array.from({ length: 4 }, (_, i) => `heatmap-${i + 1}`),
    'sector-shadow-color',
    'tooltip-foreground',
  ];
  const paletteKeys = [
    ...Array.from({ length: 10 }, (_, i) => `sequential-${i + 1}`),
    'diverging-negative-strong',
    'diverging-negative-default',
    'diverging-negative-subtle',
    'diverging-neutral',
    'diverging-positive-subtle',
    'diverging-positive-default',
    'diverging-positive-strong',
  ];
  const probes = [
    ...keys.map((key) => `--chart-${key}`),
    ...paletteKeys.map((key) => `--vd-data-${key}`),
  ].map((property) => {
    const probe = document.createElement('span');
    probe.style.color = `var(${property})`;
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    probe.style.pointerEvents = 'none';
    return probe;
  });
  element.append(...probes);
  const colors = probes.map((probe) => engineColor(getComputedStyle(probe).color));
  probes.forEach((probe) => probe.remove());
  const custom = customColors.map((color) => {
    const probe = document.createElement('span');
    probe.style.color = color;
    probe.style.visibility = 'hidden';
    probe.style.position = 'absolute';
    element.append(probe);
    const resolved = engineColor(getComputedStyle(probe).color);
    probe.remove();
    return [color, resolved];
  });
  const shadowProbe = document.createElement('span');
  shadowProbe.style.boxShadow = 'var(--chart-tooltip-shadow)';
  shadowProbe.style.position = 'absolute';
  shadowProbe.style.visibility = 'hidden';
  element.append(shadowProbe);
  const tooltipShadow = getComputedStyle(shadowProbe).boxShadow || 'none';
  shadowProbe.remove();
  return {
    colors: Object.fromEntries(custom),
    axis: colors[0]!,
    axisLabel: colors[1]!,
    grid: colors[2]!,
    background: colors[3]!,
    activePoint: colors[4]!,
    legend: colors[5]!,
    palette: colors.slice(6, 18),
    sequentialPalette: colors.slice(27, 37),
    divergingPalette: colors.slice(37, 44),
    tooltipSurface: colors[18]!,
    tooltipBorder: colors[19]!,
    tooltipBackdropFilter: value('tooltip-backdrop-filter') || 'none',
    heatmapPalette: colors.slice(20, 25),
    sectorShadowColor: colors[25]!,
    tooltipForeground: colors[26]!,
    heatmapRadius: number('heatmap-radius', 4),
    heatmapBorderWidth: number('heatmap-border-width', 1),
    heatmapActiveBorderWidth: number('heatmap-active-border-width', 2),
    fontFamily: css.fontFamily,
    fontSize: parseFloat(css.fontSize) || 12,
    lineWidth: number('line-width', 2),
    pointRadius: number('point-radius', 3),
    activePointRadius: number('active-point-radius', 4.5),
    mutedOpacity: number('muted-opacity', 0.3),
    sectorOffset: number('sector-offset', 8),
    enterDuration: duration('enter-duration', 700),
    updateDuration: duration('update-duration', 400),
    interactionDuration: duration('interaction-duration', 120),
    borderWidth: number('border-width', 1),
    pointBorderWidth: number('point-border-width', 2),
    activePointBorderWidth: number('active-point-border-width', 2.5),
    emphasisShadowScale: number('emphasis-shadow-scale', 1),
    areaOpacity: number('area-opacity', 0.2),
    gridLineType:
      value('grid-line-type') === 'solid'
        ? 'solid'
        : value('grid-line-type') === 'dotted'
          ? 'dotted'
          : 'dashed',
    pointerOpacity: number('pointer-opacity', 0.6),
    pointSymbol: value('point-symbol') || 'circle',
    barRadius: number('bar-radius', 0),
    enterEasing: (value('enter-easing') || 'linear') as ChartTheme['enterEasing'],
    updateEasing: (value('update-easing') || 'cubicOut') as ChartTheme['updateEasing'],
    interactionEasing: (value('interaction-easing') ||
      'cubicOut') as ChartTheme['interactionEasing'],
    tooltipRadius: number('tooltip-radius', 6),
    tooltipShadow,
  };
}
export function useChartTheme(ref: RefObject<HTMLElement | null>, customColors: string[] = []) {
  const signature = JSON.stringify(customColors);
  const [theme, setTheme] = useState<ChartTheme | null>(null);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const refresh = () => {
      const next = readChartTheme(element, JSON.parse(signature) as string[]);
      setTheme((previous) => (JSON.stringify(previous) === JSON.stringify(next) ? previous : next));
    };
    refresh();
    const observer = new MutationObserver(refresh);
    for (let ancestor: HTMLElement | null = element; ancestor; ancestor = ancestor.parentElement)
      observer.observe(ancestor, {
        attributes: true,
        attributeFilter: ['class', 'style', 'data-theme', 'data-virgo-theme'],
      });
    const scheme = window.matchMedia?.('(prefers-color-scheme: dark)');
    scheme?.addEventListener('change', refresh);
    document.fonts?.addEventListener('loadingdone', refresh);
    return () => {
      observer.disconnect();
      scheme?.removeEventListener('change', refresh);
      document.fonts?.removeEventListener('loadingdone', refresh);
    };
  }, [ref, signature]);
  return theme;
}
