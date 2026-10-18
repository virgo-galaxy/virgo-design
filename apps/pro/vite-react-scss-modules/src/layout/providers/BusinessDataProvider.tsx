import { type ReactNode, useEffect } from 'react';

import { CatalogResourceContext, useCatalogData } from '@/features/catalog';
import { ProfileIdentityResourceContext, useProfileIdentityData } from '@/features/profile';
import { type ResourceSubscriber, useInvalidateResources } from '@/store/resources';

export function BusinessDataProvider({
  children,
  subscribeToChanges,
}: {
  children: ReactNode;
  subscribeToChanges?: ResourceSubscriber | undefined;
}) {
  const catalog = useCatalogData();
  const profile = useProfileIdentityData();
  const invalidate = useInvalidateResources();

  useEffect(() => subscribeToChanges?.(invalidate), [invalidate, subscribeToChanges]);

  return (
    <CatalogResourceContext value={catalog}>
      <ProfileIdentityResourceContext value={profile}>{children}</ProfileIdentityResourceContext>
    </CatalogResourceContext>
  );
}
