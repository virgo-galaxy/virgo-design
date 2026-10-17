import { http } from 'msw';

import type { SessionUser } from '@/api/auth';
import { API_ERROR_CODES } from '@/contracts/gateway/error-codes';
import { isAdmin } from '@/lib/auth/permissions';
import { isRecord } from '@/lib/validation/is-record';

import { requestUser } from '../../auth/session';
import { getDemoState, updateDemoState } from '../../data/store';
import { initialProfile } from '../../fixtures/profile';
import { projects } from '../../fixtures/projects';
import { endpoint, failure, success } from '../../http/response';
import type { ProfileRecord } from '../../model/state';

export function getBackendProfile(): ProfileRecord {
  return { ...getDemoState().profile };
}

export function resetProfile() {
  updateDemoState((previous) => ({ ...previous, profile: { ...initialProfile } }));
}

function profileFor(user: SessionUser): ProfileRecord {
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

const identityFields = [
  'name',
  'displayName',
  'headline',
  'bio',
  'avatarColor',
  'avatarImage',
  'botAvatarImage',
] as const;

const preferenceFields = [
  'focusProject',
  'digest',
  'digestTime',
  'reviewReminders',
  'compactActivity',
] as const;

const capabilities = { identity: identityFields, preferences: preferenceFields };
type Capability = keyof typeof capabilities;

function selectProfile(profile: ProfileRecord, capability: Capability) {
  return Object.fromEntries(
    capabilities[capability].flatMap((key) =>
      profile[key] === undefined ? [] : [[key, profile[key]]],
    ),
  );
}

export const profileHandlers = (Object.keys(capabilities) as Capability[]).flatMap((capability) => [
  http.get(endpoint(`/profile/${capability}`), ({ request }) =>
    success(selectProfile(profileFor(requestUser(request)!), capability)),
  ),
  http.patch(endpoint(`/profile/${capability}`), async ({ request }) => {
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

    const allowed: readonly string[] = capabilities[capability];
    const fields: Record<string, string[]> = {};
    const next = { ...profile };

    for (const [key, value] of Object.entries(body)) {
      if (!allowed.includes(key)) {
        fields[key] = [`Field does not belong to profile ${capability}`];

        continue;
      }

      const field = key as keyof ProfileRecord;
      const expected = typeof profile[field] === 'boolean' ? 'boolean' : 'string';
      if (typeof value !== expected) fields[key] = ['Invalid value'];
      else Object.assign(next, { [key]: value });
    }

    if (capability === 'identity') {
      if (!next.name.trim() || next.name.length > 60)
        fields.name = ['Use a name between 1 and 60 characters'];
      if (next.headline.length > 100) fields.headline = ['Headline is too long'];
      if (next.bio.length > 600) fields.bio = ['Bio is too long'];
      if (!/^#[\da-f]{6}$/i.test(next.avatarColor)) fields.avatarColor = ['Invalid color'];
    } else {
      if (!projects.some((p) => p.id === next.focusProject && user.projects.includes(p.id)))
        fields.focusProject = ['Project not found'];
      if (next.digest && !/^([01]\d|2[0-3]):[0-5]\d$/.test(next.digestTime))
        fields.digestTime = ['Invalid time'];
    }

    if (Object.keys(fields).length)
      return failure({
        status: 422,
        code: API_ERROR_CODES.PROFILE_VALIDATION_FAILED,
        detail: 'Invalid profile',
        fields,
      });

    const saved =
      capability === 'identity'
        ? {
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
          }
        : next;

    updateDemoState((previous) =>
      isAdmin(user)
        ? { ...previous, profile: saved }
        : { ...previous, profiles: { ...previous.profiles, [user.id]: saved } },
    );

    return success(selectProfile(saved, capability));
  }),
]);
