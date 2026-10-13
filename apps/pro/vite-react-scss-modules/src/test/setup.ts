import '@/app/composition/i18n/initialize';
import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach } from 'vitest';

import { i18nInstance } from '@/i18n/runtime';
import { resetSession } from '@/mock/session';

beforeEach(async () => {
  if (typeof window !== 'undefined') await i18nInstance.changeLanguage('en-US');
});

afterEach(() => cleanup());

beforeEach(() => {
  resetSession();
});
