import { afterEach, expect, it, vi } from 'vitest';

import { readChartTheme } from './theme';

afterEach(() => vi.restoreAllMocks());

it.each([
  ['color(srgb 0.2 0.4 0.6)', 'rgb(51, 102, 153)'],
  ['color(srgb 0.2 0.4 0.6 / 0.5)', 'rgba(51, 102, 153, 0.5)'],
  ['color(srgb -0.1 0.5 1.1)', 'rgb(0, 128, 255)'],
  ['rgb(51, 102, 153)', 'rgb(51, 102, 153)'],
])('passes resolved CSS color %s to the engine as %s', (cssColor, expected) => {
  const host = document.createElement('div');
  vi.spyOn(window, 'getComputedStyle').mockImplementation(
    () =>
      ({
        color: cssColor,
        getPropertyValue: (name: string) =>
          name === '--chart-heatmap-radius'
            ? '0px'
            : name === '--chart-heatmap-border-width'
              ? '2px'
              : '',
      }) as CSSStyleDeclaration,
  );
  const theme = readChartTheme(host, ['var(--vd-data-sequential-6)']);
  expect(theme.grid).toBe(expected);
  expect(theme.heatmapPalette).toEqual(Array(5).fill(expected));
  expect(theme.palette).toEqual(Array(12).fill(expected));
  expect(theme.sequentialPalette).toEqual(Array(10).fill(expected));
  expect(theme.divergingPalette).toEqual(Array(7).fill(expected));
  expect(theme.colors?.['var(--vd-data-sequential-6)']).toBe(expected);
  expect(theme.heatmapRadius).toBe(0);
  expect(theme.heatmapBorderWidth).toBe(2);
  expect(host.childElementCount).toBe(0);
});

it('reads high categorical, sequential and diverging slots from their own semantic properties', () => {
  const host = document.createElement('div');
  const calls: string[] = [];
  vi.spyOn(window, 'getComputedStyle').mockImplementation((element) => {
    const property = (element as HTMLElement).style.color;
    calls.push(property);
    return { color: property, getPropertyValue: () => '' } as unknown as CSSStyleDeclaration;
  });
  const theme = readChartTheme(host);
  expect(theme.palette[11]).toBe('var(--chart-series-12)');
  expect(theme.sequentialPalette[9]).toBe('var(--vd-data-sequential-10)');
  expect(theme.divergingPalette).toEqual([
    'var(--vd-data-diverging-negative-strong)',
    'var(--vd-data-diverging-negative-default)',
    'var(--vd-data-diverging-negative-subtle)',
    'var(--vd-data-diverging-neutral)',
    'var(--vd-data-diverging-positive-subtle)',
    'var(--vd-data-diverging-positive-default)',
    'var(--vd-data-diverging-positive-strong)',
  ]);
  expect(calls).toContain('var(--chart-tooltip-foreground)');
  expect(host.childElementCount).toBe(0);
});
