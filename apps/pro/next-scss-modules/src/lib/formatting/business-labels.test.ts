import { describe, expect, it } from 'vitest';

import { formatWorkLocation } from './business-labels';

describe('work location labels', () => {
  it.each([
    ['China', 'Shanghai', 'zh-CN', '中国 · 上海'],
    ['China', 'Shanghai', 'en-US', 'Shanghai, China'],
    ['United Kingdom', 'London', 'zh-CN', '英国 · 伦敦'],
    ['United Kingdom', 'London', 'en-US', 'London, United Kingdom'],
    ['Singapore', 'Singapore', 'zh-CN', '新加坡'],
    ['Singapore', 'Singapore', 'en-US', 'Singapore'],
  ])('formats %s / %s in %s as %s', (region, city, language, expected) => {
    expect(formatWorkLocation({ region, city }, language)).toBe(expected);
  });
});
