import type { ReactNode } from 'react';

import { getTokenUsageReport } from '@/api/analytics';
import { useTaskDependentQuery } from '@/features/tasks';

import { TokenUsageResourceContext } from './token-usage-context';

export function TokenUsageDataProvider({ children }: { children: ReactNode }) {
  const resource = useTaskDependentQuery(getTokenUsageReport);
  return <TokenUsageResourceContext value={resource}>{children}</TokenUsageResourceContext>;
}
