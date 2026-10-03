import type { ChartDatum, ChartValue } from './types';

export function read(datum: ChartDatum, key: string): ChartValue {
  return (datum as Record<string, ChartValue>)[key];
}
export function numeric(value: ChartValue): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}
