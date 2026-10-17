import type { ProfileIdentityDto, UpdateProfileIdentityRequest } from '@/contracts/profile';
import { http } from '@/lib/http';

export function getProfileIdentity(signal?: AbortSignal): Promise<ProfileIdentityDto> {
  return http.get('/profile/identity', signal ? { signal } : undefined);
}

export function updateProfileIdentity(
  patch: UpdateProfileIdentityRequest,
): Promise<ProfileIdentityDto> {
  return http.patch('/profile/identity', patch);
}
