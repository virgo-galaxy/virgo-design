import { describe, expect, it } from 'vitest';

import { numeric } from '../data';
import { areaPath, linePath } from './geometry';
describe('native Sparkline geometry', () => {
  it('keeps zero and missing values distinct', () => {
    expect(numeric(0)).toBe(0);
    expect(numeric(null)).toBeNull();
    expect(numeric(NaN)).toBeNull();
  });
  it('never bridges a missing line or fill interval', () => {
    expect(linePath([[0, 1], null, [2, 3]])).toBe('M0,1M2,3');
    expect(areaPath([[0, 1], null, [2, 3]], 5)).toBe('M0,1L0,5L0,5ZM2,3L2,5L2,5Z');
  });
});
