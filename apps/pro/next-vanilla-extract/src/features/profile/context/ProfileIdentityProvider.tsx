import type { ReactNode } from 'react';

import { ProfileIdentityResourceContext, useProfileIdentityData } from './resource';

export function ProfileIdentityProvider({ children }: { children: ReactNode }) {
  const profile = useProfileIdentityData();

  return (
    <ProfileIdentityResourceContext value={profile}>{children}</ProfileIdentityResourceContext>
  );
}
