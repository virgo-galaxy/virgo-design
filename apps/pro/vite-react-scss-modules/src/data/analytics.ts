import { type TrendPeriod, trendPoints } from './workplace';

// Historical team delivery is the same frozen series as Workplace. It is independent
// of the editable task register, which is a smaller current-work sample.
export function deliveryAnalysis(period: TrendPeriod) {
  const points = period === '7d' ? trendPoints.slice(-7) : trendPoints;
  const delivered = points.reduce((sum, point) => sum + point.completed, 0);
  const planned = points.reduce((sum, point) => sum + point.planned, 0);
  const firstHalf = points.slice(0, Math.floor(points.length / 2));
  const secondHalf = points.slice(-firstHalf.length);
  const firstAverage =
    firstHalf.reduce((sum, point) => sum + point.completed, 0) / firstHalf.length;
  const lastAverage =
    secondHalf.reduce((sum, point) => sum + point.completed, 0) / secondHalf.length;
  return {
    points,
    delivered,
    planned,
    attainment: Math.round((delivered / planned) * 100),
    average: delivered / points.length,
    momentum: Math.round((lastAverage / firstAverage - 1) * 100),
  };
}
