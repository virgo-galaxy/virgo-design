import { Tabs } from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { getTaskSummary } from '@/api/tasks';
import calendarClockArtworkAsset from '@/assets/illustrations/calendar-clock.svg';
import documentStackArtworkAsset from '@/assets/illustrations/document-stack.svg';
import playCircleArtworkAsset from '@/assets/illustrations/play-circle.svg';
import shieldCheckArtworkAsset from '@/assets/illustrations/shield-check.svg';
import { WorkOverview } from '@/components/display/work-overview';
import { RemoteState } from '@/components/feedback/remote-state';
import { routePath, routeWithQuery } from '@/routes';
import { useAppNavigation, useQueryParams } from '@/routes/navigation';

import { useTaskDependentQuery } from '../hooks/use-task-dependent-query';

import styles from './TaskViews.module.scss';

const calendarClockArtwork = calendarClockArtworkAsset.src;
const documentStackArtwork = documentStackArtworkAsset.src;
const playCircleArtwork = playCircleArtworkAsset.src;
const shieldCheckArtwork = shieldCheckArtworkAsset.src;

export function TaskViews({ view, children }: { view: 'table' | 'cards'; children: ReactNode }) {
  const { t } = useTranslation();
  const summary = useTaskDependentQuery(getTaskSummary);
  const overview = summary.data;
  const navigate = useAppNavigation();
  const [params] = useQueryParams();

  return (
    <div className={styles.page}>
      <WorkOverview
        loading={summary.loading && !overview}
        items={[
          {
            label: t('tasks.totalTasks'),
            value: overview?.total ?? '—',
            note: t('tasks.workspaceTotals'),
            artwork: documentStackArtwork,
          },
          {
            label: t('tasks.inProgress'),
            value: overview?.inProgress ?? '—',
            note: t('tasks.activeWork'),
            artwork: playCircleArtwork,
          },
          {
            label: t('tasks.dueSoon'),
            value: overview?.dueSoon ?? '—',
            note: t('tasks.next7Days'),
            artwork: calendarClockArtwork,
          },
          {
            label: t('tasks.completed'),
            value: overview?.completed ?? '—',
            note: t('tasks.deliveredWork'),
            artwork: shieldCheckArtwork,
          },
        ]}
      />
      {summary.error ? <RemoteState error={summary.error} retry={summary.retry} /> : null}
      <Tabs
        value={view}
        variant="line"
        onValueChange={(nextView) => {
          if (nextView === view) return;

          const next = new URLSearchParams();
          for (const key of ['search', 'status', 'project'])
            for (const value of params.getAll(key)) next.append(key, value);

          navigate(
            routeWithQuery(
              routePath(nextView === 'cards' ? 'work.task-cards' : 'work.tasks'),
              next,
            ),
          );
        }}
      >
        <Tabs.List aria-label={t('tasks.workspace.view')}>
          <Tabs.Tab value="table">{t('tasks.workspace.tableTitle')}</Tabs.Tab>
          <Tabs.Tab value="cards">{t('tasks.workspace.cardsTitle')}</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="table" className={styles.panel!}>
          {view === 'table' ? children : null}
        </Tabs.Panel>
        <Tabs.Panel value="cards" className={styles.panel!}>
          {view === 'cards' ? children : null}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
