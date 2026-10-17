import type { ReactNode } from 'react';

import { RemoteState } from '@/components/remote-state/RemoteState';
import type { RemoteData } from '@/hooks/use-remote-data';

interface ResourceContentProps<T> {
  resource: Pick<RemoteData<T>, 'data' | 'error' | 'loading' | 'retry'>;
  children: (data: T) => ReactNode;
}

export function ResourceContent<T>({ resource, children }: ResourceContentProps<T>) {
  if (resource.data === null) return <RemoteState {...resource} />;

  return (
    <>
      {resource.error ? <RemoteState error={resource.error} retry={resource.retry} /> : null}
      {children(resource.data)}
    </>
  );
}
