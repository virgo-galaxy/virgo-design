import { type ReactNode, useEffect, useState } from 'react';

import {
  createResourceStore,
  type ResourceStore,
  type ResourceSubscriber,
} from '../model/resource-store';
import { ResourceStoreContext } from './resource-store-context';

export function ResourceStoreProvider({
  initialStore,
  subscribeToChanges,
  children,
}: {
  initialStore?: ResourceStore;
  subscribeToChanges?: ResourceSubscriber | undefined;
  children: ReactNode;
}) {
  const [store] = useState(() => initialStore ?? createResourceStore());

  useEffect(() => subscribeToChanges?.(store.getState().invalidate), [store, subscribeToChanges]);

  return <ResourceStoreContext value={store}>{children}</ResourceStoreContext>;
}
