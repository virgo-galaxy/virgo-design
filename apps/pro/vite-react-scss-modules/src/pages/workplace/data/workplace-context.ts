import { createContext, useContext } from 'react';

import type { AnalyticsOverviewDto, WorkplaceOverviewDto } from '@/contracts/analytics';
export type WorkplaceData = WorkplaceOverviewDto &
  Pick<AnalyticsOverviewDto, 'activity' | 'trendPoints'>;
export const WorkplaceContext = createContext<WorkplaceData | null>(null);
export function useWorkplaceData() {
  const value = useContext(WorkplaceContext);
  if (!value) throw new Error('WorkplaceDataBoundary is required');
  return value;
}
