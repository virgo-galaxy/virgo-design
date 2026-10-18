// @vitest-environment jsdom
import { afterEach, expect, it, vi } from 'vitest';

afterEach(() => {
  window.localStorage.clear();
  document.documentElement.lang = 'en-US';
});

it.each([null, 'en-US'] as const)(
  'uses the HTML default with saved preference %s and restores it on reset',
  async (saved) => {
    window.localStorage.clear();
    document.documentElement.lang = 'zh-CN';
    if (saved) window.localStorage.setItem('virgo-pro:locale', saved);
    vi.resetModules();
    const runtime = await import('../runtime/locale');
    await runtime.initializeI18n({
      'en-US': { translation: {} },
      'zh-CN': { translation: {} },
    });
    expect(runtime.getLocalePreference()).toBe(saved ?? 'zh-CN');
    expect(runtime.i18nInstance.language).toBe(saved ?? 'zh-CN');
    expect(document.documentElement.lang).toBe(saved ?? 'zh-CN');
    await runtime.setAppLocale('en-US');
    await runtime.resetAppLocale();
    expect(runtime.getLocalePreference()).toBe('zh-CN');
    expect(runtime.i18nInstance.language).toBe('zh-CN');
    expect(document.documentElement.lang).toBe('zh-CN');
  },
);
