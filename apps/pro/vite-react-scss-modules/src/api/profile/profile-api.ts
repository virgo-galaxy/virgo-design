import { http } from '@/lib/http';

import type { ProfileDto, UpdateProfileRequest } from '../../contracts/profile';
export function getProfile(signal?: AbortSignal): Promise<ProfileDto> {
  return http.get('/profile', signal ? { signal } : undefined);
}
export function updateProfile(request: UpdateProfileRequest): Promise<ProfileDto> {
  return http.patch('/profile', request);
}
