import { createContext, useCallback, useContext } from 'react';

import {
  getProfileIdentity,
  getProfilePreferences,
  type ProfileIdentityDto,
  updateProfileIdentity,
  type UpdateProfileIdentityRequest,
  updateProfilePreferences,
  type UpdateProfilePreferencesRequest,
} from '@/api/profile';
import { type RemoteData, useRemoteData } from '@/shared/async/use-remote-data';

export const ProfileRevisionContext = createContext(0);
export const ProfileIdentityResourceContext = createContext<
  | (RemoteData<ProfileIdentityDto> & {
      saveIdentity: (patch: UpdateProfileIdentityRequest) => Promise<void>;
    })
  | null
>(null);
export function useProfileIdentityResource() {
  const value = useContext(ProfileIdentityResourceContext);
  if (!value) throw new Error('Profile identity resource provider is required');
  return value;
}
export function useProfileIdentityData(revision: number) {
  const resource = useRemoteData(getProfileIdentity, { revision });
  const { setData } = resource;
  const saveIdentity = useCallback(
    async (patch: UpdateProfileIdentityRequest) => {
      setData(await updateProfileIdentity(patch));
    },
    [setData],
  );
  return { ...resource, saveIdentity };
}
export function useProfilePreferencesData() {
  const revision = useContext(ProfileRevisionContext);
  const resource = useRemoteData(getProfilePreferences, { revision });
  const { setData } = resource;
  const savePreferences = useCallback(
    async (patch: UpdateProfilePreferencesRequest) => {
      setData(await updateProfilePreferences(patch));
    },
    [setData],
  );
  return { ...resource, savePreferences };
}
