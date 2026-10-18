import type { ReactNode } from 'react';

import { CatalogResourceContext, useCatalogData } from './resource';

export function CatalogProvider({ children }: { children: ReactNode }) {
  const catalog = useCatalogData();

  return <CatalogResourceContext value={catalog}>{children}</CatalogResourceContext>;
}
