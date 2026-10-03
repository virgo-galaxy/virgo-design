import type { RefObject } from 'react';
import { useLayoutEffect, useState } from 'react';

/** Engine-neutral contract. All values resolve from the consumer's current semantic theme. */
export interface ChartTheme {
  palette: string[];
  heatmapPalette: string[];
  colors?: Record<string, string>;
  axis: string;
  axisLabel: string;
  grid: string;
  background: string;
  activePoint: string;
  legend: string;
  tooltipSurface: string;
  tooltipBorder: string;
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
  // rather than duplicating Classic/Desktop/Retro token lookup tables in JavaScript.
  const keys = [
    'axis',
    'axis-label',
    'grid',
    'background',
    'active-point',
    'legend',
    ...Array.from({ length: 6 }, (_, i) => `series-${i + 1}`),
    'tooltip-surface',
    'tooltip-border',
    'heatmap-empty',
    ...Array.from({ length: 4 }, (_, i) => `heatmap-${i + 1}`),
  ];
  const probes = keys.map((key) => {
    const probe = document.createElement('span');
    probe.style.color = `var(--chart-${key})`;
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    probe.style.pointerEvents = 'none';
    return probe;
  });
  element.append(...probes);
  const colors = probes.map((probe) => getComputedStyle(probe).color);
  probes.forEach((probe) => probe.remove());
  const custom = customColors.map((color) => {
    const probe = document.createElement('span');
    probe.style.color = color;
    probe.style.visibility = 'hidden';
    probe.style.position = 'absolute';
    element.append(probe);
    const resolved = getComputedStyle(probe).color;
    probe.remove();
    return [color, resolved];
  });
  return {
    colors: Object.fromEntries(custom),
    axis: colors[0]!,
    axisLabel: colors[1]!,
    grid: colors[2]!,
    background: colors[3]!,
    activePoint: colors[4]!,
    legend: colors[5]!,
    palette: colors.slice(6, 12),
    tooltipSurface: colors[12]!,
    tooltipBorder: colors[13]!,
    heatmapPalette: colors.slice(14, 19),
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
        attributeFilter: ['class', 'style', 'data-theme'],
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
