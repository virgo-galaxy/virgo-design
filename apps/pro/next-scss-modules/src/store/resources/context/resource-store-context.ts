import { createContext } from 'react';

import type { ResourceStore } from '../model/resource-store';

export const ResourceStoreContext = createContext<ResourceStore | null>(null);
