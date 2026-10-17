// @vitest-environment jsdom
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, beforeEach, expect, it } from 'vitest';

import { http } from '@/lib/http';
import { handlers } from '@/mock/handlers';
import { resetProfile } from '@/mock/handlers/profile';

import {
  getProfileIdentity,
  getProfilePreferences,
  updateProfileIdentity,
  updateProfilePreferences,
} from '..';

const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => resetProfile());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('returns independent identity and preference contracts and rejects cross-capability writes', async () => {
  const identity = await getProfileIdentity();
  const preferences = await getProfilePreferences();
  expect(identity).not.toHaveProperty('digest');
  expect(preferences).not.toHaveProperty('name');
  await expect(http.patch('/profile/identity', { digest: false })).rejects.toMatchObject({
    status: 422,
    data: { fields: { digest: expect.any(Array) } },
  });
  await expect(http.patch('/profile/preferences', { name: 'Overwritten' })).rejects.toMatchObject({
    status: 422,
    data: { fields: { name: expect.any(Array) } },
  });
  expect(await getProfileIdentity()).toEqual(identity);
  expect(await getProfilePreferences()).toEqual(preferences);
});

it('persists and validates each capability without returning or changing unrelated fields', async () => {
  const preferences = await getProfilePreferences();
  expect(await updateProfileIdentity({ name: 'Updated identity' })).toMatchObject({
    name: 'Updated identity',
  });
  expect(await getProfilePreferences()).toEqual(preferences);
  expect(await updateProfilePreferences({ digest: false })).not.toHaveProperty('name');
  expect((await getProfileIdentity()).name).toBe('Updated identity');
  await expect(updateProfileIdentity({ name: ' ' })).rejects.toMatchObject({ status: 422 });
  await expect(updateProfilePreferences({ focusProject: 'missing' })).rejects.toMatchObject({
    status: 422,
  });
});
