import { Tabs } from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router';

import calendarClockArtwork from '@/assets/illustrations/calendar-clock.svg';
import documentStackArtwork from '@/assets/illustrations/document-stack.svg';
import playCircleArtwork from '@/assets/illustrations/play-circle.svg';
import shieldCheckArtwork from '@/assets/illustrations/shield-check.svg';
import { WorkOverview } from '@/components/work-overview/WorkOverview';
import { routePath, routeWithQuery } from '@/routes';

import styles from './TaskViews.module.scss';

export function TaskViews({
  view,
  children,
  overview,
  loading,
}: {
  view: 'table' | 'cards';
  children: ReactNode;
  overview: { total: number; inProgress: number; dueSoon: number; completed: number } | undefined;
  loading: boolean;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  return (
    <div className={styles.page}>
      <WorkOverview
        loading={loading}
        items={[
          {
            label: t('tasks.totalTasks'),
            value: overview?.total ?? 0,
            note: t('tasks.workspaceTotals'),
            artwork: documentStackArtwork,
          },
          {
            label: t('tasks.inProgress'),
            value: overview?.inProgress ?? 0,
            note: t('tasks.activeWork'),
            artwork: playCircleArtwork,
          },
          {
            label: t('tasks.dueSoon'),
            value: overview?.dueSoon ?? 0,
            note: t('tasks.next7Days'),
            artwork: calendarClockArtwork,
          },
          {
            label: t('tasks.completed'),
            value: overview?.completed ?? 0,
            note: t('tasks.deliveredWork'),
            artwork: shieldCheckArtwork,
          },
        ]}
      />
      <Tabs
        value={view}
        variant="line"
        onValueChange={(nextView) => {
          if (nextView === view) return;
          const next = new URLSearchParams();
          // Carry only filters represented in both views, never hidden table constraints.
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
