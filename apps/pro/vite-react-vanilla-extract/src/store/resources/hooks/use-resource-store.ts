import { useContext } from 'react';
import { useStore } from 'zustand';

import { ResourceStoreContext } from '../context/resource-store-context';
import type { ResourceName, ResourceState } from '../model/resource-store';

function useResourceStore<T>(selector: (state: ResourceState) => T) {
  const store = useContext(ResourceStoreContext);

  if (!store) throw new Error('ResourceStoreProvider is required');

  return useStore(store, selector);
}

export function useResourceRevision(resource: ResourceName) {
  return useResourceStore((state) => state.revisions[resource]);
}

export function useInvalidateResources() {
  return useResourceStore((state) => state.invalidate);
}
