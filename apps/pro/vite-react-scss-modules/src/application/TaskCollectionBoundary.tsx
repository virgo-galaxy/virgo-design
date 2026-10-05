import type { ReactNode } from 'react';

import { useProData } from './pro-data-context';
import { RemoteState } from './RemoteState';
import { useRemoteData } from './use-remote-data';

export function TaskCollectionBoundary({ children }: { children: ReactNode }) {
  const { loadTaskCollection } = useProData();
  const resource = useRemoteData(loadTaskCollection);
  if (resource.error || !resource.data)
    return <RemoteState loading={resource.loading} error={resource.error} retry={resource.retry} />;
  return children;
}
