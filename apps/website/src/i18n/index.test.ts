import { internationalSans } from '@virgo-design/tokens';
import { afterEach, describe, expect, it } from 'vitest';

import { getLocaleFontFamily, setAppLocale } from './index';

describe('locale-aware website typography', () => {
  afterEach(async () => {
    await setAppLocale('en');
  });

  it('resolves each website locale through the international font tokens', () => {
    expect(getLocaleFontFamily('en')).toBe(internationalSans.latin.family);
    expect(getLocaleFontFamily('zh-CN')).toBe(internationalSans.zhHans.family);
  });

  it('updates the global font family when the language changes', async () => {
    await setAppLocale('zh-CN');

    expect(document.documentElement.lang).toBe('zh-CN');
    expect(document.documentElement.style.getPropertyValue('--app-font-family')).toBe(
      internationalSans.zhHans.family,
    );

    await setAppLocale('en');

    expect(document.documentElement.lang).toBe('en');
    expect(document.documentElement.style.getPropertyValue('--app-font-family')).toBe(
      internationalSans.latin.family,
    );
  });
});
