import {
  clearAuthSession,
  expireAuthSession,
  getAccessToken,
  saveAuthSession,
} from '@/lib/auth/session';
import { http } from '@/lib/http';

import type { DemoAccountsDto, LoginDto, LoginRequest, SessionDto } from './types';

export async function login(draft: LoginRequest): Promise<LoginDto> {
  const session = await http.post<LoginDto>('/auth/login', draft);

  saveAuthSession(session);

  return session;
}

export function getDemoAccounts(signal?: AbortSignal) {
  return http.get<DemoAccountsDto>('/auth/demo-accounts', signal ? { signal } : {});
}

export async function getSession(signal?: AbortSignal): Promise<SessionDto> {
  const token = getAccessToken();

  const session = await http.get<SessionDto>('/auth/session', {
    withCredentials: true,
    ...(signal ? { signal } : {}),
  });

  if (!session.authenticated && token && token === getAccessToken()) expireAuthSession();

  return session;
}

export async function logout(): Promise<SessionDto> {
  const session = await http.post<SessionDto>('/auth/logout');

  clearAuthSession();

  return session;
}

export function enterDemoSession(): Promise<SessionDto> {
  return login({ account: 'admin', password: 'virgo123' });
}

export function resetDemo(): Promise<SessionDto> {
  return http.post('/demo/reset');
}
