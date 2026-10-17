import { getProfileIdentity, getProfilePreferences } from '@/api/profile';

export async function readProfile() {
  const [identity, preferences] = await Promise.all([
    getProfileIdentity(),
    getProfilePreferences(),
  ]);

  return { ...identity, ...preferences };
}
