// @vitest-environment jsdom
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { updateProfilePreferences } from '@/api/profile';
import { API_ERROR_CODES } from '@/contracts/gateway/error-codes';
import { handlers } from '@/mock/handlers';
import { resetSession } from '@/mock/handlers/auth';
import { resetProfile } from '@/mock/handlers/profile';
import { readProfile } from '@/test/profile';

import { enterDemoSession, getSession, logout } from '..';

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
    const profile = await readProfile();
    await updateProfilePreferences({ digest: !profile.digest });
    const updated = await readProfile();
    expect(updated.digest).toBe(!profile.digest);
    expect(updated.name).toBe('Administrator');
    expect(updated.displayName).toBe('Admin');
    expect(updated.avatarImage).toBe(profile.avatarImage);
    expect((await readProfile()).digest).toBe(!profile.digest);
  });

  it('ends the session through HTTP, rejects protected requests and restores the demo session', async () => {
    expect(await getSession()).toMatchObject({ authenticated: true, user: { id: 'admin' } });
    expect((await readProfile()).name).toBe('Administrator');
    expect(await logout()).toEqual({ authenticated: false });
    // A fresh session request (including after reloading the page) stays signed out.
    expect(await getSession()).toEqual({ authenticated: false });
    await expect(readProfile()).rejects.toMatchObject({
      status: 401,
      code: API_ERROR_CODES.AUTHENTICATION_REQUIRED,
    });
    expect(await logout()).toEqual({ authenticated: false });
    expect(await enterDemoSession()).toMatchObject({ authenticated: true, user: { id: 'admin' } });
    expect((await readProfile()).name).toBe('Administrator');
  });
});
