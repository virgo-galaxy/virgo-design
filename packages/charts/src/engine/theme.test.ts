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
  expect(theme.colors?.['var(--vd-data-sequential-6)']).toBe(expected);
  expect(theme.heatmapRadius).toBe(0);
  expect(theme.heatmapBorderWidth).toBe(2);
  expect(host.childElementCount).toBe(0);
});
