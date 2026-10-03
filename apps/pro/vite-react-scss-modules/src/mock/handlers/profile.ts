import { http } from 'msw';

import { API_ERROR_CODES } from '@/api/error-codes';
import type { ProfileDto } from '@/api/profile';
import { isRecord } from '@/lib/http/protocol';

import { initialProfile } from '../fixtures/profile';
import { projects } from '../fixtures/projects';
import { endpoint, failure, success } from '../response';
let profile: ProfileDto = { ...initialProfile };
export function getBackendProfile(): ProfileDto {
  return { ...profile };
}
export function resetProfile() {
  profile = { ...initialProfile };
}
export const profileHandlers = [
  http.get(endpoint('/profile'), () => success(profile)),
  http.patch(endpoint('/profile'), async ({ request }) => {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return failure({
        status: 400,
        code: API_ERROR_CODES.INVALID_REQUEST,
        detail: 'Invalid JSON',
      });
    }
    if (!isRecord(body))
      return failure({
        status: 400,
        code: API_ERROR_CODES.INVALID_REQUEST,
        detail: 'Expected a profile object',
      });
    const next = { ...profile };
    for (const key of Object.keys(profile) as (keyof ProfileDto)[]) {
      if (body[key] !== undefined) {
        if (typeof body[key] !== typeof profile[key])
          return failure({
            status: 422,
            code: API_ERROR_CODES.PROFILE_VALIDATION_FAILED,
            detail: 'Invalid profile',
            fields: { [key]: ['Invalid value'] },
          });
        Object.assign(next, { [key]: body[key] });
      }
    }
    const fields: Record<string, string[]> = {};
    if (!next.name.trim() || next.name.length > 60)
      fields.name = ['Use a name between 1 and 60 characters'];
    if (next.headline.length > 100) fields.headline = ['Headline is too long'];
    if (next.bio.length > 600) fields.bio = ['Bio is too long'];
    if (!/^#[\da-f]{6}$/i.test(next.avatarColor)) fields.avatarColor = ['Invalid color'];
    if (!projects.some((p) => p.id === next.focusProject))
      fields.focusProject = ['Project not found'];
    if (next.digest && !/^([01]\d|2[0-3]):[0-5]\d$/.test(next.digestTime))
      fields.digestTime = ['Invalid time'];
    if (Object.keys(fields).length)
      return failure({
        status: 422,
        code: API_ERROR_CODES.PROFILE_VALIDATION_FAILED,
        detail: 'Invalid profile',
        fields,
      });
    profile = {
      ...next,
      name: next.name.trim(),
      headline: next.headline.trim(),
      bio: next.bio.trim(),
    };
    return success(profile);
  }),
];
