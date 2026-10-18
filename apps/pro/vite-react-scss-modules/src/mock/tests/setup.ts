import { beforeEach, vi } from 'vitest';

import { resetSession } from '../auth/session';

const testDate = new Date('2026-10-05T12:00:00Z');

vi.setSystemTime(testDate);

beforeEach(() => {
  vi.setSystemTime(testDate);
  resetSession();
});
