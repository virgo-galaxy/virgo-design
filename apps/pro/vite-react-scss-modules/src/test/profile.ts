import { getProfileIdentity, getProfilePreferences } from '@/api/profile';

/** Integration assertions compare the persisted record across the two public capabilities. */
export async function readProfile() {
  const [identity, preferences] = await Promise.all([
    getProfileIdentity(),
    getProfilePreferences(),
  ]);
  return { ...identity, ...preferences };
}
