// @vitest-environment jsdom
import { afterEach, expect, it, vi } from 'vitest';

import type { LoginDto } from '@/contracts/auth';

import {
  clearAuthSession,
  expireAuthSession,
  getAccessToken,
  getStoredUser,
  saveAuthSession,
  sessionExpiredEvent,
} from './session';

const session: LoginDto = {
  authenticated: true,
  accessToken: 'test-session',
  expiresAt: '2099-01-01T00:00:00Z',
  user: {
    id: 'test-user',
    account: 'test',
    name: 'Test User',
    role: 'member',
    jobTitle: 'Engineer',
    department: 'Engineering',
    projects: [],
    managedProjects: [],
  },
};

afterEach(() => {
  vi.restoreAllMocks();
  clearAuthSession();
  window.sessionStorage.clear();
});

it('restores a persisted session after the module loses its in-memory state', async () => {
  saveAuthSession(session);
  vi.resetModules();
  const reloaded = await import('./session');
  expect(reloaded.getAccessToken()).toBe(session.accessToken);
  expect(reloaded.getSessionExpiresAt()).toBe(session.expiresAt);
  expect(reloaded.getStoredUser()).toEqual(session.user);
  reloaded.clearAuthSession();
  expect(getAccessToken()).toBeUndefined();
});

it('keeps login and logout working in memory when the browser denies session storage', () => {
  vi.spyOn(window, 'sessionStorage', 'get').mockImplementation(() => {
    throw new DOMException('Storage denied', 'SecurityError');
  });
  saveAuthSession(session);
  expect(getAccessToken()).toBe(session.accessToken);
  expect(getStoredUser()).toEqual(session.user);
  clearAuthSession();
  expect(getAccessToken()).toBeUndefined();
});

it('clears the persisted token before publishing session expiration', () => {
  saveAuthSession(session);
  const listener = vi.fn(() => expect(getAccessToken()).toBeUndefined());
  window.addEventListener(sessionExpiredEvent, listener);
  try {
    expireAuthSession();
    expect(listener).toHaveBeenCalledOnce();
    expect(window.sessionStorage.getItem('virgo-pro.auth-session.v1')).toBeNull();
  } finally {
    window.removeEventListener(sessionExpiredEvent, listener);
  }
});
