import { type ReactNode } from 'react';

import { getAnalyticsOverview, getWorkplaceOverview } from '@/api/analytics/analytics-api';
import { CatalogBoundary } from '@/application/CatalogBoundary';
import { RemoteState } from '@/application/RemoteState';
import { useResourceQuery } from '@/application/use-resource-query';

import type { WorkplaceData } from './workplace-context';
import { WorkplaceContext } from './workplace-context';

async function loadWorkplace(signal: AbortSignal): Promise<WorkplaceData> {
  const [workplace, analytics] = await Promise.all([
    getWorkplaceOverview(signal),
    getAnalyticsOverview(signal),
  ]);
  return { ...workplace, activity: analytics.activity, trendPoints: analytics.trendPoints };
}
function WorkplaceResource({ children }: { children: ReactNode }) {
  const resource = useResourceQuery(loadWorkplace);
  if (!resource.data) return <RemoteState {...resource} />;
  return (
    <WorkplaceContext value={resource.data}>
      {resource.error ? <RemoteState error={resource.error} retry={resource.retry} /> : null}
      {children}
    </WorkplaceContext>
  );
}
export function WorkplaceDataBoundary({ children }: { children: ReactNode }) {
  return (
    <CatalogBoundary>
      <WorkplaceResource>{children}</WorkplaceResource>
    </CatalogBoundary>
  );
}
