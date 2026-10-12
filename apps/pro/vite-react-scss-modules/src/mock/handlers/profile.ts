import { http } from 'msw';

import type { SessionUser } from '@/api/auth';
import { API_ERROR_CODES } from '@/api/error-codes';
import type { ProfileDto } from '@/api/profile';
import { isAdmin } from '@/lib/auth/permissions';
import { isRecord } from '@/lib/http/protocol';

import { initialProfile } from '../fixtures/profile';
import { projects } from '../fixtures/projects';
import { endpoint, failure, success } from '../response';
import { requestUser } from '../session';
import { getDemoState, updateDemoState } from '../store';
export function getBackendProfile(): ProfileDto {
  return { ...getDemoState().profile };
}
export function resetProfile() {
  updateDemoState((previous) => ({ ...previous, profile: { ...initialProfile } }));
}
function profileFor(user: SessionUser): ProfileDto {
  if (isAdmin(user)) return getBackendProfile();
  return (
    getDemoState().profiles?.[user.id] ?? {
      ...initialProfile,
      name: user.name,
      displayName: user.name,
      headline: `${user.jobTitle} · Virgo Studio`,
      bio: '',
      avatarImage: user.avatarUrl ?? '',
      focusProject: projects.find((project) => project.id === user.projects[0])?.id ?? '',
    }
  );
}
export const profileHandlers = [
  http.get(endpoint('/profile'), ({ request }) => success(profileFor(requestUser(request)!))),
  http.patch(endpoint('/profile'), async ({ request }) => {
    const user = requestUser(request)!;
    const profile = profileFor(user);
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
    if (!projects.some((p) => p.id === next.focusProject && user.projects.includes(p.id)))
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
    const saved = {
      ...next,
      name: next.name.trim(),
      displayName:
        typeof body.displayName === 'string'
          ? body.displayName.trim()
          : next.name !== profile.name
            ? next.name.trim()
            : (profile.displayName ?? next.name.trim()),
      headline: next.headline.trim(),
      bio: next.bio.trim(),
    };
    updateDemoState((previous) =>
      isAdmin(user)
        ? { ...previous, profile: saved }
        : { ...previous, profiles: { ...previous.profiles, [user.id]: saved } },
    );
    return success(saved);
  }),
];
