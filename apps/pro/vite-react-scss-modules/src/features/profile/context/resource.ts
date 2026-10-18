import { createContext, useCallback, useContext } from 'react';

import {
  getProfileIdentity,
  getProfilePreferences,
  updateProfileIdentity,
  updateProfilePreferences,
} from '@/api/profile';
import type {
  ProfileIdentityDto,
  UpdateProfileIdentityRequest,
  UpdateProfilePreferencesRequest,
} from '@/api/profile/types';
import { type RemoteData, useRemoteData } from '@/hooks/async/use-remote-data';
import { useResourceRevision } from '@/store/resources';

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

export function useProfileIdentityData() {
  const revision = useResourceRevision('profile');
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
  const revision = useResourceRevision('profile');
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
