import { describe, expect, it } from 'vitest';

import {
  buildTokenUsageCalendar,
  formatTokenCount,
  tokenUsageLevel,
  tokenUsageScale,
} from './token-usage-calendar';

describe('annual token usage calendar', () => {
  it('places every date in a Monday-first week and preserves input/output totals', () => {
    const result = buildTokenUsageCalendar('2026-10-01', [
      { date: '2026-01-01', inputTokens: 40000000, outputTokens: 12000000 },
      { date: '2026-10-01', inputTokens: 90000000, outputTokens: 20000000 },
      { date: '2026-10-02', inputTokens: 1000, outputTokens: 500 },
      { date: '2025-12-31', inputTokens: 1000, outputTokens: 500 },
    ]);
    expect(result.days).toHaveLength(365);
    expect(result.weeks).toBe(53);
    expect(result.days[0]).toMatchObject({
      date: '2026-01-01',
      week: 0,
      weekday: 3,
      tokens: 52000000,
    });
    expect(result.days.find((day) => day.date === '2026-10-01')).toMatchObject({
      tokens: 110000000,
      future: false,
    });
    expect(result.days.find((day) => day.date === '2026-10-02')).toMatchObject({
      tokens: 0,
      future: true,
    });
    expect(result.days.at(-1)?.date).toBe('2026-12-31');
    expect(new Set(result.days.map((day) => `${day.week}-${day.weekday}`)).size).toBe(365);
  });
  it('handles leap years and missing historical days', () => {
    const result = buildTokenUsageCalendar('2024-12-31', []);
    expect(result.days).toHaveLength(366);
    expect(result.days.some((day) => day.date === '2024-02-29')).toBe(true);
    expect(result.days.every((day) => day.tokens === 0 && !day.future)).toBe(true);
  });
  it.each([
    [0, '0', '0'],
    [52000000, '5200万', '52M'],
    [128000000, '1.3亿', '128M'],
    [2400000000, '24亿', '2.4B'],
  ])('formats %i raw tokens in Chinese and English', (tokens, chinese, english) => {
    expect(formatTokenCount(tokens, 'zh-CN')).toBe(chinese);
    expect(formatTokenCount(tokens, 'en-US')).toBe(english);
  });
  it('uses fixed comparable intensity thresholds across the year', () => {
    expect([0, 9999, 10000, 49999, 50000, 99999, 100000].map(tokenUsageLevel)).toEqual([
      0, 1, 2, 2, 3, 3, 4,
    ]);
  });
});

it('scales annual intensity within the current scope while preserving zero days and ties', () => {
  const level = tokenUsageScale([0, 10, 20, 30, 40, 50, 60, 70, 80]);
  expect([0, 10, 20, 30, 40, 50, 60, 70, 80].map(level)).toEqual([0, 1, 1, 2, 2, 3, 3, 4, 4]);
  expect(tokenUsageScale([0, 0])(0)).toBe(0);
  expect(tokenUsageScale([10, 10])(10)).toBe(1);
});
