import { http } from '@/lib/http';

import type { ProfileDto, UpdateProfileRequest } from './contract';
export function getProfile(signal?: AbortSignal): Promise<ProfileDto> {
  return http.get('/profile', signal ? { signal } : undefined);
}
export function updateProfile(request: UpdateProfileRequest): Promise<ProfileDto> {
  return http.patch('/profile', request);
}
