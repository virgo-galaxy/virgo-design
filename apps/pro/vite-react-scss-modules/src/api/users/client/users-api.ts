import type { UserDetailsDto } from '@/contracts/users';
import { http } from '@/lib/http';

export function getUser(id: string, signal?: AbortSignal): Promise<UserDetailsDto> {
  return http.get(`/users/${encodeURIComponent(id)}`, signal ? { signal } : undefined);
}
