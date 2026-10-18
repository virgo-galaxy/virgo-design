import { describe, expect, it } from 'vitest';

import { trendPoints as demoTrend } from '@/mock/fixtures/workplace';

const completed = [8, 9, 9, 9, 9, 9, 9, 7, 8, 8, 14, 14, 16, 17];
const planned = [10, 11, 12, 13, 14, 14, 14, 10, 11, 11, 14, 16, 18, 20];
const trendPoints = demoTrend.map((point, index) => ({
  date: point.date,
  completed: completed[index]!,
  planned: planned[index]!,
}));

import { deliveryAnalysis } from './delivery-analysis';

describe('team delivery analysis', () => {
  it('shares Workplace history and switches all aggregates with the time range', () => {
    const fortnight = deliveryAnalysis('14d', trendPoints);
    const week = deliveryAnalysis('7d', trendPoints);
    expect(fortnight.points).toEqual(trendPoints);
    expect(fortnight).toMatchObject({ delivered: 146, planned: 188, attainment: 78 });
    expect(week.points).toEqual(trendPoints.slice(-7));
    expect(week).toMatchObject({ delivered: 84, planned: 100, attainment: 84, average: 12 });
  });
  it('compares equal-length halves for momentum in odd-length ranges', () => {
    expect(deliveryAnalysis('7d', trendPoints).momentum).toBe(104);
    expect(deliveryAnalysis('14d', trendPoints).momentum).toBe(35);
  });
});
