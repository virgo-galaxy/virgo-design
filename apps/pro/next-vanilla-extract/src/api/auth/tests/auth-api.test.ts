// @vitest-environment jsdom
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { API_ERROR_CODES } from '@/api/gateway/constants';
import { getProfileIdentity, getProfilePreferences } from '@/api/profile';
import { enterDemoSession } from '@/demo/client';
import { resetProfile } from '@/server/demo/handlers/profile';
import { handlers } from '@/test/demo-handlers';
import { resetSession } from '@/test/demo-session';

import { getSession, logout } from '..';

const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => {
  resetSession();
  resetProfile();
});
afterEach(() => {
  vi.restoreAllMocks();
  resetSession();
  server.resetHandlers();
});
afterAll(() => server.close());

describe('demo account session', () => {
  it('keeps sign-in and sign-out consistent when session storage writes and removals fail', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage unavailable');
    });
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error('Storage unavailable');
    });

    await enterDemoSession();
    expect(await getSession()).toMatchObject({ authenticated: true, user: { id: 'admin' } });

    await logout();
    expect(await getSession()).toEqual({ authenticated: false });
  });

  it('ends the session through HTTP, rejects protected requests and restores the demo session', async () => {
    expect(await getSession()).toMatchObject({ authenticated: true, user: { id: 'admin' } });
    expect((await getProfileIdentity()).name).toBe('Administrator');
    expect(await logout()).toEqual({ authenticated: false });
    expect(await getSession()).toEqual({ authenticated: false });
    await expect(getProfileIdentity()).rejects.toMatchObject({
      status: 401,
      code: API_ERROR_CODES.AUTHENTICATION_REQUIRED,
    });
    await expect(getProfilePreferences()).rejects.toMatchObject({
      status: 401,
      code: API_ERROR_CODES.AUTHENTICATION_REQUIRED,
    });
    expect(await logout()).toEqual({ authenticated: false });
    expect(await enterDemoSession()).toMatchObject({ authenticated: true, user: { id: 'admin' } });
    expect((await getProfileIdentity()).name).toBe('Administrator');
  });
});
