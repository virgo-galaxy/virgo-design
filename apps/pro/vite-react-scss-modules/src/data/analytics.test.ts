import { describe, expect, it } from 'vitest';

import { deliveryAnalysis } from './analytics';
import { trendPoints } from './workplace';

describe('team delivery analysis', () => {
  it('shares Workplace history and switches all aggregates with the time range', () => {
    const fortnight = deliveryAnalysis('14d');
    const week = deliveryAnalysis('7d');
    expect(fortnight.points).toEqual(trendPoints);
    expect(fortnight).toMatchObject({ delivered: 146, planned: 188, attainment: 78 });
    expect(week.points).toEqual(trendPoints.slice(-7));
    expect(week).toMatchObject({ delivered: 84, planned: 100, attainment: 84, average: 12 });
  });
  it('compares equal-length halves for momentum in odd-length ranges', () => {
    // Last 3 days = 47 delivered, first 3 = 23; the middle day is excluded.
    expect(deliveryAnalysis('7d').momentum).toBe(104);
    expect(deliveryAnalysis('14d').momentum).toBe(35);
  });
});
