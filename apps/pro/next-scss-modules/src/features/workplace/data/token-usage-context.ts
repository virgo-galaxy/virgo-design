import { createContext, useContext } from 'react';

import type { TokenUsageReportDto } from '@/api/analytics/types';
import type { RemoteData } from '@/hooks/async/use-remote-data';

export const TokenUsageResourceContext = createContext<RemoteData<TokenUsageReportDto> | null>(
  null,
);

export function useTokenUsageResource() {
  const resource = useContext(TokenUsageResourceContext);

  if (!resource) throw new Error('TokenUsageDataProvider is required');

  return resource;
}
