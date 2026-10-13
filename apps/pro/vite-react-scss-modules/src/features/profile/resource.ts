import { createContext, useCallback, useContext } from 'react';

import { getProfile, type ProfileDto, updateProfile } from '@/api/profile';
import { type RemoteData, useRemoteData } from '@/shared/async/use-remote-data';
export const ProfileResourceContext = createContext<
  | (RemoteData<ProfileDto> & {
      saveProfile: (next: ProfileDto | ((previous: ProfileDto) => ProfileDto)) => Promise<void>;
    })
  | null
>(null);
export function useProfileResource() {
  const value = useContext(ProfileResourceContext);
  if (!value) throw new Error('Profile resource provider is required');
  return value;
}

export function useProfileData(revision: number) {
  const load = useCallback(
    (signal: AbortSignal) => {
      void revision;
      return getProfile(signal);
    },
    [revision],
  );
  const profile = useRemoteData(load);
  const { setData: setProfileData } = profile;
  const saveProfile = useCallback(
    async (next: ProfileDto | ((previous: ProfileDto) => ProfileDto)) => {
      if (typeof next === 'function' && !profile.data)
        throw new Error('Profile must be loaded before saving');
      const saved = await updateProfile(typeof next === 'function' ? next(profile.data!) : next);
      setProfileData(saved);
    },
    [profile.data, setProfileData],
  );
  return { ...profile, saveProfile };
}
