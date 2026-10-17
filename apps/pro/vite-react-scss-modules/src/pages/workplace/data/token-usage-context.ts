import { createContext, useContext } from 'react';

import type { TokenUsageReportDto } from '@/contracts/analytics';
import type { RemoteData } from '@/shared/async/use-remote-data';

export const TokenUsageResourceContext = createContext<RemoteData<TokenUsageReportDto> | null>(
  null,
);

export function useTokenUsageResource() {
  const resource = useContext(TokenUsageResourceContext);

  if (!resource) throw new Error('TokenUsageDataProvider is required');

  return resource;
}
