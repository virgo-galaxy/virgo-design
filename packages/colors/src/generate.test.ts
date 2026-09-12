import { describe, expect, it } from 'vitest';

import { generateColorScale } from './generate.js';

describe('generateColorScale', () => {
  it('generates ten color steps', () => {
    const scale = generateColorScale('#1677ff');

    expect(Object.keys(scale)).toHaveLength(10);
  });

  it('keeps the source color at step 6', () => {
    const scale = generateColorScale('#1677ff');

    expect(scale[6]).toBe('#1677ff');
  });

  it('normalizes the source HEX color', () => {
    const scale = generateColorScale('#1677FF');

    expect(scale[6]).toBe('#1677ff');
  });

  it('generates valid six-digit HEX colors', () => {
    const scale = generateColorScale('#1677ff');

    for (const color of Object.values(scale)) {
      expect(color).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it('generates unique scale values', () => {
    const scale = generateColorScale('#1677ff');
    const values = Object.values(scale);

    expect(new Set(values).size).toBe(values.length);
  });

  it('rejects invalid HEX colors', () => {
    expect(() => generateColorScale('blue')).toThrow('Expected a six-digit HEX color');
  });

  it('rejects invalid chroma multipliers', () => {
    expect(() =>
      generateColorScale('#1677ff', {
        chroma: 0,
      }),
    ).toThrow('chroma must be a finite number greater than 0.');
  });
});
