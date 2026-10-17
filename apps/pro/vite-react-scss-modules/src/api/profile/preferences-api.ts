import type { ProfilePreferencesDto, UpdateProfilePreferencesRequest } from '@/contracts/profile';
import { http } from '@/lib/http';

export function getProfilePreferences(signal?: AbortSignal): Promise<ProfilePreferencesDto> {
  return http.get('/profile/preferences', signal ? { signal } : undefined);
}
export function updateProfilePreferences(
  patch: UpdateProfilePreferencesRequest,
): Promise<ProfilePreferencesDto> {
  return http.patch('/profile/preferences', patch);
}
