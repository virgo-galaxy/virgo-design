import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PageHeading } from '@/components/page-heading/PageHeading';
import { useCurrentUser } from '@/features/auth';

import { DeliveryTrend } from '../components/DeliveryTrend';
import { ProjectDistribution } from '../components/ProjectDistribution';
import { RecentTasks } from '../components/RecentTasks';
import { TeamActivity } from '../components/TeamActivity';
import { TokenUsageCalendar } from '../components/TokenUsageCalendar/TokenUsageCalendar';
import { TokenUsageHeatmap } from '../components/TokenUsageHeatmap/TokenUsageHeatmap';
import { WorkplaceAnnouncements } from '../components/WorkplaceAnnouncements';
import { WorkplaceShortcut } from '../components/WorkplaceShortcut';
import {
  WorkplaceWidget,
  type WorkplaceWidgetState,
} from '../components/WorkplaceWidget/WorkplaceWidget';
import { WorkspaceCarousel } from '../components/WorkspaceCarousel';
import { WorkspaceMetrics } from '../components/WorkspaceMetrics';
import { shortcuts } from '../config/shortcuts';
import { TokenUsageDataProvider } from '../data/token-usage-data';
import styles from '../styles/workplace.module.scss';

const widgetIds = ['distribution', 'shortcuts', 'inspiration', 'activity'] as const;
type WidgetId = (typeof widgetIds)[number];

function WorkplaceContent() {
  const user = useCurrentUser();
  const { t } = useTranslation();

  const [reportYear, setReportYear] = useState<number | null>(null);
  const [widgets, setWidgets] = useState<Record<WidgetId, WorkplaceWidgetState>>({
    distribution: 'expanded',
    shortcuts: 'expanded',
    inspiration: 'expanded',
    activity: 'expanded',
  });

  const widgetTriggers = useRef<Partial<Record<WidgetId, HTMLButtonElement | null>>>({});
  const allTasksRef = useRef<HTMLButtonElement>(null);

  const changeWidget = (id: WidgetId, state: WorkplaceWidgetState) =>
    setWidgets((previous) => ({ ...previous, [id]: state }));

  const removeWidget = (id: WidgetId) => {
    const index = widgetIds.indexOf(id);
    const candidates = [...widgetIds.slice(index + 1), ...widgetIds.slice(0, index).reverse()];
    const next = candidates.find(
      (candidate) => widgets[candidate] !== 'removing' && widgets[candidate] !== 'removed',
    );

    (next ? widgetTriggers.current[next] : allTasksRef.current)?.focus();
    changeWidget(id, 'removing');
  };

  const widgetProps = (id: WidgetId) => ({
    state: widgets[id],
    toggleRef: (node: HTMLButtonElement | null) => {
      widgetTriggers.current[id] = node;
    },
    onToggle: (open: boolean) => changeWidget(id, open ? 'expanded' : 'minimized'),
    onRemove: () => removeWidget(id),
    onRemoved: () => changeWidget(id, 'removed'),
  });

  return (
    <div className={styles.workplace}>
      <div
        className={styles.workspaceGrid}
        data-aside-hidden={widgetIds.every((id) => widgets[id] === 'removed')}
      >
        <div className={styles.primaryColumn}>
          <div className={styles.welcome}>
            <PageHeading
              title={
                <>
                  {t('workplace.welcomeBack', { name: user.name })}
                  <span className={styles.welcomeDot}>.</span>
                </>
              }
              description={t('workplace.goodWorkStartsWithAClearViewHereS')}
              actions={<TokenUsageCalendar year={reportYear} onYearChange={setReportYear} />}
            />
          </div>

          <WorkspaceMetrics />

          <TokenUsageHeatmap year={reportYear} onYearChange={setReportYear} />
          <div className={styles.overviewPanels}>
            <DeliveryTrend />
            <RecentTasks allTasksRef={allTasksRef} />
          </div>
          <WorkplaceAnnouncements />
        </div>
        <div className={styles.secondaryColumn}>
          {widgets.distribution !== 'removed' ? (
            <WorkplaceWidget
              {...widgetProps('distribution')}
              title={t('workplace.projectDistribution')}
              description={t('workplace.whereOpenTasksAreConcentrated')}
            >
              <ProjectDistribution />
            </WorkplaceWidget>
          ) : null}
          {widgets.shortcuts !== 'removed' ? (
            <WorkplaceWidget {...widgetProps('shortcuts')} title={t('workplace.quickAccess')}>
              <div className={styles.shortcuts}>
                {shortcuts.map((shortcut) => (
                  <WorkplaceShortcut key={shortcut.path} shortcut={shortcut} />
                ))}
              </div>
            </WorkplaceWidget>
          ) : null}
          {widgets.inspiration !== 'removed' ? (
            <WorkplaceWidget
              {...widgetProps('inspiration')}
              title={t('workplace.workspaceInspiration')}
            >
              <WorkspaceCarousel />
            </WorkplaceWidget>
          ) : null}
          {widgets.activity !== 'removed' ? (
            <WorkplaceWidget {...widgetProps('activity')} title={t('workplace.aroundTheTeam')}>
              <TeamActivity />
            </WorkplaceWidget>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function WorkplaceView() {
  return (
    <TokenUsageDataProvider>
      <WorkplaceContent />
    </TokenUsageDataProvider>
  );
}
