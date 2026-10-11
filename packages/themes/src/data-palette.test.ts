import { resolve } from 'node:path';

import { themes } from '@virgo-design/tokens';
import { compile } from 'sass';
import { describe, expect, it } from 'vitest';

const slots = [
  ...Array.from({ length: 12 }, (_, index) => `categorical-${index + 1}`),
  ...Array.from({ length: 10 }, (_, index) => `sequential-${index + 1}`),
  'diverging-negative-strong',
  'diverging-negative-default',
  'diverging-negative-subtle',
  'diverging-neutral',
  'diverging-positive-subtle',
  'diverging-positive-default',
  'diverging-positive-strong',
];

describe('complete official data palettes', () => {
  it.each(['minimal', 'soft', 'glass', 'retro', 'contrast'])(
    '%s defines every data role in both appearances',
    (preset) => {
      const css = compile(resolve('packages/themes/src/themes', `${preset}.scss`)).css;
      for (const appearance of ['light', 'dark']) {
        for (const slot of slots) {
          const declarations = css.match(
            new RegExp(`--vd-theme-${appearance}-data-${slot}:\\s*([^;]+);`, 'g'),
          );
          expect(declarations, `${preset}/${appearance}/${slot}`).toHaveLength(1);
          expect(declarations![0]).not.toMatch(/initial|inherit|--vd-data-/);
        }
      }
    },
  );
  it.each(['light', 'dark'] as const)(
    'Virgo %s supplies the complete baseline palette',
    (appearance) => {
      const data = themes[appearance].color.data;
      expect(Object.keys(data.categorical)).toHaveLength(12);
      expect(Object.keys(data.sequential)).toHaveLength(10);
      expect(Object.keys(data.diverging.negative)).toEqual(['strong', 'default', 'subtle']);
      expect(Object.keys(data.diverging.positive)).toEqual(['subtle', 'default', 'strong']);
      expect(data.diverging.neutral).toBeTruthy();
    },
  );
});
