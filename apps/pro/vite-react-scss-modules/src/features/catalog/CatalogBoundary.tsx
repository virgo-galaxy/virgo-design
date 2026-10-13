import type { ReactNode } from 'react';

import { RemoteState } from '@/shared/async/RemoteState';

import { useCatalogResource } from './resource';
export function CatalogBoundary({ children }: { children: ReactNode }) {
  const resource = useCatalogResource();
  if (!resource.data)
    return <RemoteState loading={resource.loading} error={resource.error} retry={resource.retry} />;
  return (
    <>
      {resource.error ? <RemoteState error={resource.error} retry={resource.retry} /> : null}
      {children}
    </>
  );
}
