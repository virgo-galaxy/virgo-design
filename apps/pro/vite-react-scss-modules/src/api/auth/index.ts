import { clearAuthSession, saveAuthSession } from '@/lib/auth/session';
import { http } from '@/lib/http';

import type { DemoAccountsDto, LoginDto, LoginRequest, SessionDto } from './contract';
export * from './contract';

export async function login(draft: LoginRequest): Promise<LoginDto> {
  const session = await http.post<LoginDto>('/auth/login', draft);
  saveAuthSession(session);
  return session;
}
export function getDemoAccounts(signal?: AbortSignal) {
  return http.get<DemoAccountsDto>('/auth/demo-accounts', signal ? { signal } : {});
}

export function getSession(signal?: AbortSignal): Promise<SessionDto> {
  return http.get('/auth/session', { withCredentials: true, ...(signal ? { signal } : {}) });
}

export async function logout(): Promise<SessionDto> {
  const session = await http.post<SessionDto>('/auth/logout');
  clearAuthSession();
  return session;
}

// Available only on the mock gateway; real authentication belongs to the deployment's identity provider.
export function enterDemoSession(): Promise<SessionDto> {
  return login({ account: 'admin', password: 'virgo123' });
}

/** Reset all local demo data and end the session; available only on the Mock gateway. */
export function resetDemo(): Promise<SessionDto> {
  return http.post('/demo/reset');
}
