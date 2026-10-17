import { useTranslation } from 'react-i18next';

import {
  getDeliveryTrend,
  getOwnerCapacity,
  getProjectDelivery,
  getTaskStatusSummary,
} from '@/api/analytics';
import { ResourceContent } from '@/components/resource-content/ResourceContent';
import { CatalogBoundary } from '@/features/catalog';
import { useTaskDependentQuery } from '@/features/tasks';
import { formatDueDate } from '@/lib/formatting/format-due-date';

import { DeliveryMetrics } from '../components/DeliveryMetrics';
import { DeliveryTrendPanel } from '../components/DeliveryTrendPanel';
import { OwnerCapacityPanel } from '../components/OwnerCapacityPanel';
import { ProjectDeliveryPanel } from '../components/ProjectDeliveryPanel';
import { TaskDistributionPanel } from '../components/TaskDistributionPanel';
import styles from '../styles/analytics.module.scss';

export function AnalyticsPage() {
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
    <div className={styles.page}>
      <header className={styles.heading}>
        <div>
          <h1>{t('analytics.overviewTitle')}</h1>
          <p>{t('analytics.overviewDescription')}</p>
        </div>
        <span>{dateRange}</span>
      </header>
      <ResourceContent resource={delivery}>
        {(trendPoints) => <DeliveryMetrics trendPoints={trendPoints} />}
      </ResourceContent>
      <div className={styles.mainRow}>
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
      <div className={styles.detailRow}>
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
