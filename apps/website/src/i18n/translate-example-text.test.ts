import { afterEach, describe, expect, it } from 'vitest';

import { i18nInstance, setAppLocale } from './runtime';
import { translateExampleText } from './translate-example-text';

afterEach(async () => {
  await setAppLocale('en-US');
});

describe('dynamic example text', () => {
  it('updates existing values on locale changes and preserves technical identifiers', async () => {
    await setAppLocale('en-US');
    expect(translateExampleText(i18nInstance.t, 'tabs', 'Tab 4')).toBe('Tab 4');
    await setAppLocale('zh-CN');
    expect(translateExampleText(i18nInstance.t, 'tabs', 'Tab 4')).toBe(
      i18nInstance.t('examples.tabs.details.tabValue', { v0: 4 }),
    );
    expect(translateExampleText(i18nInstance.t, 'tabs', 'Close Tab 4')).toBe(
      i18nInstance.t('examples.tabs.details.closeValue', {
        v0: i18nInstance.t('examples.tabs.details.tabValue', { v0: 4 }),
      }),
    );
    expect(translateExampleText(i18nInstance.t, 'tabs', 'ButtonProps')).toBe('ButtonProps');
    await setAppLocale('en-US');
    expect(translateExampleText(i18nInstance.t, 'tabs', 'Close Tab 4')).toBe('Close Tab 4');
  });
});
