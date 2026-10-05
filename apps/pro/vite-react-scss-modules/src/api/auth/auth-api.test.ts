// @vitest-environment jsdom
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { API_ERROR_CODES } from '@/api/error-codes';
import { getProfile, updateProfile } from '@/api/profile';
import { handlers } from '@/mock/handlers';
import { resetSession } from '@/mock/handlers/auth';
import { resetProfile } from '@/mock/handlers/profile';

import { enterDemoSession, getSession, logout } from './index';

const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => {
  resetSession();
  resetProfile();
});
afterEach(() => {
  resetSession();
  server.resetHandlers();
});
afterAll(() => server.close());

describe('mock account session', () => {
  it('updates profile preferences while retaining the administrator identity and human photo', async () => {
    const profile = await getProfile();
    const updated = await updateProfile({ digest: !profile.digest });
    expect(updated.digest).toBe(!profile.digest);
    expect(updated.name).toBe('Administrator');
    expect(updated.displayName).toBe('Admin');
    expect(updated.avatarImage).toBe(profile.avatarImage);
    expect((await getProfile()).digest).toBe(!profile.digest);
  });

  it('ends the session through HTTP, rejects protected requests and restores the demo session', async () => {
    expect(await getSession()).toEqual({ authenticated: true });
    expect((await getProfile()).name).toBe('Administrator');
    expect(await logout()).toEqual({ authenticated: false });
    // A fresh session request (including after reloading the page) stays signed out.
    expect(await getSession()).toEqual({ authenticated: false });
    await expect(getProfile()).rejects.toMatchObject({
      status: 401,
      code: API_ERROR_CODES.AUTHENTICATION_REQUIRED,
    });
    expect(await logout()).toEqual({ authenticated: false });
    expect(await enterDemoSession()).toEqual({ authenticated: true });
    expect((await getProfile()).name).toBe('Administrator');
  });
});
