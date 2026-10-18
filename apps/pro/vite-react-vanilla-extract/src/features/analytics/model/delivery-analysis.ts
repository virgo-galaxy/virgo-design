import type { TrendPointDto as TrendPoint } from '@/api/analytics/types';

type TrendPeriod = '7d' | '14d';

export function deliveryAnalysis(period: TrendPeriod, trendPoints: readonly TrendPoint[]) {
  const points = period === '7d' ? trendPoints.slice(-7) : trendPoints;
  const delivered = points.reduce((sum, point) => sum + point.completed, 0);
  const planned = points.reduce((sum, point) => sum + point.planned, 0);

  const firstHalf = points.slice(0, Math.floor(points.length / 2));
  const secondHalf = points.slice(-firstHalf.length);
  const firstAverage =
    firstHalf.reduce((sum, point) => sum + point.completed, 0) / Math.max(1, firstHalf.length);
  const lastAverage =
    secondHalf.reduce((sum, point) => sum + point.completed, 0) / secondHalf.length;

  return {
    points,
    delivered,
    planned,
    attainment: planned ? Math.round((delivered / planned) * 100) : 0,
    average: points.length ? delivered / points.length : 0,
    momentum: firstAverage ? Math.round((lastAverage / firstAverage - 1) * 100) : 0,
  };
}
