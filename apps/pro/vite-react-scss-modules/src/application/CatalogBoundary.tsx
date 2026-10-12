import type { ReactNode } from 'react';

import { useCatalogResource } from './pro-data-context';
import { RemoteState } from './RemoteState';
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
