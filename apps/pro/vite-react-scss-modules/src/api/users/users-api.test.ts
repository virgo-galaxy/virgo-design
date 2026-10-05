// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { setupServer } from 'msw/node';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { API_ERROR_CODES } from '@/api/error-codes';
import { getTaskMetadata } from '@/api/tasks';
import { handlers } from '@/mock/handlers';

import { getUser } from './users-api';

const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());

describe('user details API', () => {
  it('returns full profiles by the existing assignee ID and assigns 24 distinct preset avatars', async () => {
    const metadata = await getTaskMetadata();
    expect(metadata.members).toHaveLength(24);
    const profiles = await Promise.all(metadata.members.map((member) => getUser(member.id)));
    expect(new Set(profiles.map((user) => user.avatarUrl)).size).toBe(24);
    expect(new Set(profiles.map((user) => user.employeeNumber)).size).toBe(24);
    profiles.forEach((user, index) => {
      expect(user).toMatchObject(metadata.members[index]!);
      expect(user.employeeNumber).toBe(`VD-${String(index + 1).padStart(4, '0')}`);
      expect(user.jobTitle).toBeTruthy();
      expect(user.department).toBeTruthy();
      expect(user.phone).toMatch(/^\+1 202 555 01\d\d$/);
      expect(user.email).toMatch(/@virgo\.example$/);
      expect(user.projects.length).toBeGreaterThan(0);
      expect(user.avatarUrl).toBe(`/api/v1/avatars/user_${index + 1}.png`);
      expect(user).not.toHaveProperty('avatarPreset');
    });
    const avatar = readFileSync(
      resolve(
        dirname(fileURLToPath(import.meta.url)),
        '../../assets/avatars/system_preset_avatars.png',
      ),
    );
    expect(avatar.subarray(1, 4).toString()).toBe('PNG');
    expect(avatar.readUInt32BE(16)).toBe(1264);
    expect(avatar.readUInt32BE(20)).toBe(844);
  });

  it('returns a stable not-found error for an unknown user', async () => {
    await expect(getUser('unknown')).rejects.toMatchObject({
      status: 404,
      code: API_ERROR_CODES.USER_NOT_FOUND,
    });
  });
});
