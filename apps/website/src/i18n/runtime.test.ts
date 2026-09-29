import { internationalSans } from '@virgo-design/tokens';
import { afterEach, describe, expect, it } from 'vitest';

import { i18nInstance, setAppLocale } from './runtime';

function assertTypedTranslationKeys() {
  // @ts-expect-error legacy and unknown keys must not compile
  i18nInstance.t('foundationPages.colors.title');
}

void assertTypedTranslationKeys;

describe('i18n runtime', () => {
  afterEach(async () => {
    await setAppLocale('en-US');
  });

  it('uses en-US as the default application and document locale', async () => {
    await setAppLocale('en-US');

    expect(i18nInstance.resolvedLanguage).toBe('en-US');
    expect(document.documentElement.lang).toBe('en-US');
    expect(window.localStorage.getItem('virgo-design-locale')).toBe('en-US');
  });

  it('updates the document locale, font family, and persisted preference', async () => {
    await setAppLocale('zh-CN');

    expect(document.documentElement.lang).toBe('zh-CN');
    expect(document.documentElement.style.getPropertyValue('--app-font-family')).toBe(
      internationalSans.zhHans.family,
    );
    expect(window.localStorage.getItem('virgo-design-locale')).toBe('zh-CN');
  });

  it('exposes the English registry as the typed default translation schema', () => {
    expect(i18nInstance.t('app.navigation.components')).toBe('Components');
    expect(i18nInstance.t('foundations.colors.title')).toBe('Colors');
    expect(i18nInstance.t('tokens.typography.title')).toBe('Semantic Typography');
  });
});
