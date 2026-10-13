import { http } from '@/lib/http';

import type { UserDetailsDto } from '../../contracts/users';

export function getUser(id: string, signal?: AbortSignal): Promise<UserDetailsDto> {
  return http.get(`/users/${encodeURIComponent(id)}`, signal ? { signal } : undefined);
}
