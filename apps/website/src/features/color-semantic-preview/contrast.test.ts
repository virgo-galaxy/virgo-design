import { describe, expect, it } from 'vitest';

import { contrastRatio } from './contrast';

describe('status contrast inspection', () => {
  it('calculates WCAG contrast symmetrically without rounding the pass/fail decision', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBe(21);
    expect(contrastRatio('#ffffff', '#000000')).toBe(21);
    expect(contrastRatio('#777777', '#777777')).toBe(1);
    expect(contrastRatio('#767676', '#ffffff')).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio('#777777', '#ffffff')).toBeLessThan(4.5);
  });
  it('does not pretend translucent or unsupported values are opaque contrast pairs', () => {
    expect(contrastRatio('rgb(0 0 0 / 0.5)', '#ffffff')).toBeNull();
    expect(contrastRatio('#000000', 'var(--foreground)')).toBeNull();
  });
});
