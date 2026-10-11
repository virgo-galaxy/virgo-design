import { expect, it } from 'vitest';

import { mapDataPaletteColors } from './data-palette';

it('resolves formal palette colors without mutating option data or explicit styling', () => {
  const data = [[new Date('2026-01-01'), 2]];
  const option = {
    color: ['var(--vd-data-categorical-12)', '#123456'],
    visualMap: {
      inRange: {
        color: [
          'var(--vd-data-diverging-negative-default)',
          'var(--vd-data-diverging-neutral)',
          'var(--vd-data-diverging-positive-default)',
        ],
      },
    },
    series: [{ type: 'scatter', data }],
  };
  const next = mapDataPaletteColors(option, () => 'rgb(1, 2, 3)');
  expect(next.color).toEqual(['rgb(1, 2, 3)', '#123456']);
  expect(next.visualMap.inRange.color).toEqual(Array(3).fill('rgb(1, 2, 3)'));
  expect(next.series).toBe(option.series);
  expect(next.series[0]!.data).toBe(data);
  expect(option.color[0]).toBe('var(--vd-data-categorical-12)');
  expect(mapDataPaletteColors(option, (color) => color)).toBe(option);
});
