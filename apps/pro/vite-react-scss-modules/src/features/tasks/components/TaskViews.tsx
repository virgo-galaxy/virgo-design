import { Tabs } from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router';

import { getTaskSummary } from '@/api/tasks';
import calendarClockArtwork from '@/assets/illustrations/calendar-clock.svg';
import documentStackArtwork from '@/assets/illustrations/document-stack.svg';
import playCircleArtwork from '@/assets/illustrations/play-circle.svg';
import shieldCheckArtwork from '@/assets/illustrations/shield-check.svg';
import { RemoteState } from '@/components/remote-state/RemoteState';
import { WorkOverview } from '@/components/work-overview/WorkOverview';
import { routePath, routeWithQuery } from '@/routes';

import { useTaskDependentQuery } from '../hooks/use-task-dependent-query';
import styles from './TaskViews.module.scss';

export function TaskViews({ view, children }: { view: 'table' | 'cards'; children: ReactNode }) {
  const { t } = useTranslation();
  const summary = useTaskDependentQuery(getTaskSummary);
  const overview = summary.data;
  const navigate = useNavigate();
  const [params] = useSearchParams();

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

          navigate(routeWithQuery(routePath(nextView === 'cards' ? 'task-cards' : 'tasks'), next));
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
