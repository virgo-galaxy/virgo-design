import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach } from 'vitest';

import { i18nInstance } from '@/i18n';
import { initializeAppLocale } from '@/i18n/bootstrap';
import { disposePreferences } from '@/preferences';

await initializeAppLocale();

beforeEach(async () => {
  if (typeof window !== 'undefined') await i18nInstance.changeLanguage('en-US');
});

afterEach(() => {
  cleanup();
  disposePreferences();
});
