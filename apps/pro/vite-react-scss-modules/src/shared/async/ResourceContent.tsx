import type { ReactNode } from 'react';

import { RemoteState } from './RemoteState';
import type { RemoteData } from './use-remote-data';

export function ResourceContent<T>({
  resource,
  children,
}: {
  resource: Pick<RemoteData<T>, 'data' | 'error' | 'loading' | 'retry'>;
  children: (data: T) => ReactNode;
}) {
  if (resource.data === null) return <RemoteState {...resource} />;

  return (
    <>
      {resource.error ? <RemoteState error={resource.error} retry={resource.retry} /> : null}
      {children(resource.data)}
    </>
  );
}
