import { login } from '@/api/auth';
import type { SessionDto } from '@/api/auth/types';
import { http } from '@/lib/http';

import { clearDemoStorage } from './reset';
import type { DemoAccountsDto } from './types';

export function getDemoAccounts(signal?: AbortSignal) {
  return http.get<DemoAccountsDto>('/auth/demo-accounts', signal ? { signal } : {});
}

export function enterDemoSession(): Promise<SessionDto> {
  return login({ account: 'admin', password: 'virgo123' });
}

export async function resetDemo(): Promise<SessionDto> {
  const result = await http.post<SessionDto>('/demo/reset');
  clearDemoStorage();
  return result;
}
