// @vitest-environment jsdom
import { afterEach, expect, it } from 'vitest';

import { publishSessionReset } from '@/lib/auth/session-reset';

import { demoAccounts } from '../fixtures/accounts';
import { createSession, requestUser, revokeSession } from './session';

afterEach(() => {
  revokeSession();
  localStorage.clear();
  sessionStorage.clear();
});

it('rejects a token from before another tab reset the demo, while accepting a new login', () => {
  const old = createSession(demoAccounts[0]!);
  const request = (token: string) =>
    new Request('http://localhost/api/v1/tasks', { headers: { Authorization: `Bearer ${token}` } });
  expect(requestUser(request(old.accessToken))?.id).toBe('admin');
  publishSessionReset();
  expect(requestUser(request(old.accessToken))).toBeUndefined();
  const next = createSession(demoAccounts[0]!);
  expect(requestUser(request(next.accessToken))?.id).toBe('admin');
  expect(requestUser(request(old.accessToken))).toBeUndefined();
});
