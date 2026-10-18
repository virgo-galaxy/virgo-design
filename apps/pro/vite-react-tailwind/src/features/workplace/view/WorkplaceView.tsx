import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PageHeading } from '@/components/display/page-heading';
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
    <div className="viewport-max-640:gap-20 grid gap-24">
      <div
        className={[
          'pro-workplace-workspace-grid',
          '[transition:grid-template-columns_var(--vd-motion-state-duration,_var(--vd-duration-180))_var(--vd-motion-easing-standard,_var(--vd-easing-standard)),_column-gap_var(--vd-motion-state-duration,_var(--vd-duration-180))_var(--vd-motion-easing-standard,_var(--vd-easing-standard))]',
          'viewport-min-1201:data-[aside-hidden=true]:[grid-template-columns:minmax(0,_1fr)_0px] viewport-min-1201:data-[aside-hidden=true]:gap-x-0',
          'motion-reduce:[transition:none]',
          'viewport-min-1680:[grid-template-columns:minmax(0,_1fr)_320px] viewport-max-1200:grid-cols-1',
          'grid [grid-template-columns:minmax(0,_1fr)_288px] gap-20 [align-items:start]',
        ].join(' ')}
        data-aside-hidden={widgetIds.every((id) => widgets[id] === 'removed')}
      >
        <div className="[container-type:inline-size] grid gap-20 min-w-0">
          <div
            className={[
              "viewport-max-640:[&_[data-slot='page-heading']]:flex-row viewport-max-640:[&_[data-slot='page-heading']]:items-center",
              "viewport-max-640:[&_[data-slot='page-heading']_>_div:last-child]:[width:auto]",
            ].join(' ')}
          >
            <PageHeading
              title={
                <>
                  {t('workplace.welcomeBack', { name: user.name })}
                  <span className="text-brand-primary">.</span>
                </>
              }
              description={t('workplace.goodWorkStartsWithAClearViewHereS')}
              actions={<TokenUsageCalendar year={reportYear} onYearChange={setReportYear} />}
            />
          </div>

          <WorkspaceMetrics />

          <TokenUsageHeatmap year={reportYear} onYearChange={setReportYear} />
          <div className="[&_>_*]:min-w-0 container-max-720:grid-cols-1 grid [grid-template-columns:minmax(0,_1fr)_min(48%,_560px)] gap-20">
            <DeliveryTrend />
            <RecentTasks allTasksRef={allTasksRef} />
          </div>
          <WorkplaceAnnouncements />
        </div>
        <div
          className={[
            "[.pro-workplace-workspace-grid[data-aside-hidden='true']_&]:hidden",
            'viewport-max-1200:grid-cols-2 viewport-max-1200:[align-items:start] viewport-max-850:grid-cols-2 viewport-max-640:grid-cols-1',
            'grid gap-0 min-w-0',
          ].join(' ')}
        >
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
              <div className="grid gap-4">
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
