import { login } from '@/api/auth';
import type { SessionDto } from '@/api/auth/types';
import { http } from '@/lib/http';

import type { DemoAccountsDto } from './types';

export function getDemoAccounts(signal?: AbortSignal) {
  return http.get<DemoAccountsDto>('/auth/demo-accounts', signal ? { signal } : {});
}

export function enterDemoSession(): Promise<SessionDto> {
  return login({ account: 'admin', password: 'virgo123' });
}

export function resetDemo(): Promise<SessionDto> {
  return http.post('/demo/reset');
}
