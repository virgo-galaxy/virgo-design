import { internationalSans } from '@virgo-design/tokens';
import { describe, expect, it } from 'vitest';

import { getLocaleFontFamily, normalizeAppLocale } from './locale';

describe('app locale', () => {
  it('normalizes supported and fallback i18next languages', () => {
    expect(normalizeAppLocale('zh-CN')).toBe('zh-CN');
    expect(normalizeAppLocale('en-US')).toBe('en-US');
    expect(normalizeAppLocale('en')).toBe('en-US');
    expect(normalizeAppLocale(undefined)).toBe('en-US');
  });

  it('resolves each Website locale through the international font tokens', () => {
    expect(getLocaleFontFamily('en-US')).toBe(internationalSans.latin.family);
    expect(getLocaleFontFamily('zh-CN')).toBe(internationalSans.zhHans.family);
  });
});
