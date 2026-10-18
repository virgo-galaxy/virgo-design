import { type ReactNode, useState } from 'react';

import { createResourceStore, type ResourceStore } from '../model/resource-store';
import { ResourceStoreContext } from './resource-store-context';

export function ResourceStoreProvider({
  initialStore,
  children,
}: {
  initialStore?: ResourceStore;
  children: ReactNode;
}) {
  const [store] = useState(() => initialStore ?? createResourceStore());

  return <ResourceStoreContext value={store}>{children}</ResourceStoreContext>;
}
