import { afterEach, expect, it, vi } from 'vitest';

afterEach(() => {
  vi.restoreAllMocks();
  window.localStorage.clear();
  document.documentElement.lang = 'en-US';
});

it('starts from HTML and switches language when browser storage is denied', async () => {
  document.documentElement.lang = 'zh-CN';
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new Error('Storage denied');
  });
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('Storage denied');
  });
  vi.resetModules();

  const { i18nInstance, setAppLocale } = await import('./runtime');

  expect(i18nInstance.language).toBe('zh-CN');

  await setAppLocale('en-US');

  expect(i18nInstance.language).toBe('en-US');
  expect(document.documentElement.lang).toBe('en-US');
});

it.each([null, 'en-US'] as const)(
  'uses the HTML default unless the user has saved preference %s',
  async (saved) => {
    window.localStorage.clear();
    document.documentElement.lang = 'zh-CN';
    if (saved) window.localStorage.setItem('virgo-design-locale', saved);
    vi.resetModules();
    const { i18nInstance } = await import('./runtime');
    expect(i18nInstance.language).toBe(saved ?? 'zh-CN');
    expect(document.documentElement.lang).toBe(saved ?? 'zh-CN');
  },
);
