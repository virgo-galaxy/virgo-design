import { useTranslation } from 'react-i18next';

import {
  getDeliveryTrend,
  getOwnerCapacity,
  getProjectDelivery,
  getTaskStatusSummary,
} from '@/api/analytics';
import { ResourceContent } from '@/components/feedback/resource-content';
import { CatalogBoundary } from '@/features/catalog';
import { useTaskDependentQuery } from '@/features/tasks';
import { formatDueDate } from '@/lib/formatting/format-due-date';

import { DeliveryMetrics } from '../components/DeliveryMetrics';
import { DeliveryTrendPanel } from '../components/DeliveryTrendPanel';
import { OwnerCapacityPanel } from '../components/OwnerCapacityPanel';
import { ProjectDeliveryPanel } from '../components/ProjectDeliveryPanel';
import { TaskDistributionPanel } from '../components/TaskDistributionPanel';

export function AnalyticsView() {
  const { t, i18n } = useTranslation();
  const delivery = useTaskDependentQuery(getDeliveryTrend);
  const projects = useTaskDependentQuery(getProjectDelivery);
  const status = useTaskDependentQuery(getTaskStatusSummary);
  const capacity = useTaskDependentQuery(getOwnerCapacity);

  const points = delivery.data ?? [];
  const dateRange = points.length
    ? `${formatDueDate(points[0]!.date, i18n.language)} – ${formatDueDate(points.at(-1)!.date, i18n.language)}`
    : '';

  return (
    <div className="viewport-max-640:gap-16 grid gap-20 min-w-0">
      <header
        className={[
          '[&_h1]:m-0 [&_h1]:text-(length:--vd-font-size-20) [&_h1]:font-[600] [&_p]:[margin:var(--vd-spacing-4)_0_0] [&_p]:text-text-tertiary',
          '[&_p]:text-(length:--vd-font-size-12) [&_>_span]:text-text-tertiary [&_>_span]:text-(length:--vd-font-size-12)',
          '[&_>_span]:whitespace-nowrap',
          'viewport-max-640:items-start viewport-max-640:flex-col viewport-max-640:gap-8',
          'flex items-center justify-between gap-16',
        ].join(' ')}
      >
        <div>
          <h1>{t('analytics.overviewTitle')}</h1>
          <p>{t('analytics.overviewDescription')}</p>
        </div>
        <span>{dateRange}</span>
      </header>
      <ResourceContent resource={delivery}>
        {(trendPoints) => <DeliveryMetrics trendPoints={trendPoints} />}
      </ResourceContent>
      <div className="viewport-max-1000:[grid-template-columns:1fr] grid [grid-template-columns:minmax(0,_1.65fr)_minmax(0,_1fr)] gap-20">
        <ResourceContent resource={projects}>
          {(projectDelivery) => (
            <CatalogBoundary>
              <ProjectDeliveryPanel projectDelivery={projectDelivery} />
            </CatalogBoundary>
          )}
        </ResourceContent>
        <ResourceContent resource={status}>
          {(summary) => <TaskDistributionPanel summary={summary} />}
        </ResourceContent>
      </div>
      <div className="viewport-max-1000:[grid-template-columns:1fr] grid [grid-template-columns:minmax(0,_1.65fr)_minmax(0,_1fr)] gap-20">
        <ResourceContent resource={delivery}>
          {(trendPoints) => <DeliveryTrendPanel trendPoints={trendPoints} />}
        </ResourceContent>
        <ResourceContent resource={capacity}>
          {(data) => (
            <CatalogBoundary>
              <OwnerCapacityPanel capacity={data} />
            </CatalogBoundary>
          )}
        </ResourceContent>
      </div>
    </div>
  );
}
