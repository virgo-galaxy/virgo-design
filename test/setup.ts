import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach } from 'vitest';

import { setAppLocale } from '../apps/website/src/i18n/runtime';

beforeEach(async () => {
  if (typeof window !== 'undefined') await setAppLocale('en-US');
});

afterEach(() => {
  cleanup();
});
