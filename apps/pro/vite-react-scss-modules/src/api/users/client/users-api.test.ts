// @vitest-environment jsdom
import { setupServer } from 'msw/node';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { getTaskMetadata } from '@/api/tasks';
import { API_ERROR_CODES } from '@/contracts/gateway/error-codes';
import {
  systemPresetAvatarManifest,
  type SystemPresetUserId,
} from '@/mock/avatars/preset-manifest';
import { demoAccounts } from '@/mock/fixtures/accounts';
import { handlers } from '@/mock/handlers';

import { getUser } from './users-api';

const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());

describe('user details API', () => {
  it('resolves assignee IDs to consistent profiles, account identities and preset avatars', async () => {
    const metadata = await getTaskMetadata();
    const profiles = await Promise.all(metadata.members.map((member) => getUser(member.id)));
    expect(profiles.length).toBeGreaterThan(0);
    expect(new Set(profiles.map((user) => user.id)).size).toBe(metadata.members.length);
    expect(new Set(profiles.map((user) => user.employeeNumber)).size).toBe(metadata.members.length);
    profiles.forEach((user, index) => {
      expect(user).toMatchObject(metadata.members[index]!);
      expect(user.jobTitle).toBeTruthy();
      expect(user.department).toBeTruthy();
      expect(user.workLocation?.region).toBeTruthy();
      expect(user.workLocation?.city).toBeTruthy();
      expect(demoAccounts.find((account) => account.id === user.id)).toMatchObject({
        gender: user.gender,
        workLocation: user.workLocation,
        avatarUrl: user.avatarUrl,
      });
      expect(user.projects.length).toBeGreaterThan(0);
      expect(user.avatarUrl).toBe(
        `/api/v1/avatars/${systemPresetAvatarManifest[user.id as SystemPresetUserId].apiId}.webp`,
      );
    });
  });

  it('returns a stable not-found error for an unknown user', async () => {
    await expect(getUser('unknown')).rejects.toMatchObject({
      status: 404,
      code: API_ERROR_CODES.USER_NOT_FOUND,
    });
  });
});
