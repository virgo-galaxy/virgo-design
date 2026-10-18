import { http } from '@/lib/http';

import type { ProfileIdentityDto, UpdateProfileIdentityRequest } from './types';

export function getProfileIdentity(signal?: AbortSignal): Promise<ProfileIdentityDto> {
  return http.get('/profile/identity', signal ? { signal } : undefined);
}

export function updateProfileIdentity(
  patch: UpdateProfileIdentityRequest,
): Promise<ProfileIdentityDto> {
  return http.patch('/profile/identity', patch);
}
