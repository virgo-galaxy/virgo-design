import { http } from '@/lib/http';

import type { UserDetailsDto } from './contract';

export function getUser(id: string, signal?: AbortSignal): Promise<UserDetailsDto> {
  return http.get(`/users/${encodeURIComponent(id)}`, signal ? { signal } : undefined);
}
