import { describe, expect, it } from 'vitest';

import { addDays, addMonths, formatDate, parseDate } from './date-only';
describe('civil date arithmetic', () => {
  it('validates leap dates and handles years below 100 without Date.UTC coercion', () => {
    expect(parseDate('2026-02-29')).toBeUndefined();
    expect(formatDate(parseDate('0099-01-01')!)).toBe('0099-01-01');
    expect(addMonths('2024-01-31', 1)).toBe('2024-02-29');
    expect(addMonths('2026-01-31', 1)).toBe('2026-02-28');
  });
  it('avoids DST shifts across week and month changes', () => {
    expect(addDays('2026-03-08', 1)).toBe('2026-03-09');
    expect(addDays('2026-11-01', -1)).toBe('2026-10-31');
    expect(addMonths('2026-12-31', 1)).toBe('2027-01-31');
  });
});
