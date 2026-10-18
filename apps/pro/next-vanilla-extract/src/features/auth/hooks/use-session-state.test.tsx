// @vitest-environment jsdom
import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';

import { getSession } from '@/api/auth';
import { clearAuthSession, getAccessToken, saveAuthSession } from '@/lib/auth/session';
import { sessionResetKey } from '@/lib/auth/session-reset';

import { useSessionState } from './use-session-state';

vi.mock('@/api/auth', () => ({ getSession: vi.fn(), logout: vi.fn() }));
afterEach(() => {
  clearAuthSession();
  localStorage.clear();
  sessionStorage.clear();
});

it('ends the active session and clears its token when another tab resets the demo', async () => {
  const user = {
    id: 'admin',
    account: 'admin',
    name: 'Admin',
    role: 'admin' as const,
    jobTitle: 'Administrator',
    department: 'Platform',
    projects: [],
    managedProjects: [],
  };
  saveAuthSession({
    authenticated: true,
    user,
    accessToken: 'active-token',
    expiresAt: new Date(Date.now() + 3600000).toISOString(),
  });
  vi.mocked(getSession).mockResolvedValue({ authenticated: true, user });
  const onSessionEnd = vi.fn();
  const scope = renderHook(() => useSessionState({ onSessionStart: vi.fn(), onSessionEnd }));
  await waitFor(() => expect(scope.result.current.current?.authenticated).toBe(true));
  act(() =>
    window.dispatchEvent(
      new StorageEvent('storage', { key: sessionResetKey, newValue: 'reset-from-another-tab' }),
    ),
  );
  expect(scope.result.current.current?.authenticated).toBe(false);
  expect(getAccessToken()).toBeUndefined();
  expect(onSessionEnd).toHaveBeenCalledOnce();
  scope.unmount();
});
