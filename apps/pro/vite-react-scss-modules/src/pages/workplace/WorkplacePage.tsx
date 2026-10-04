import { ArrowRightIcon, CircleCheckIcon, GaugeIcon, LayersIcon } from '@virgo-design/icons';
import { Button, Progress, Statistic, Surface, Tag, Timeline } from '@virgo-design/ui';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { useProData } from '@/application/pro-data-context';
import { RemoteState } from '@/application/RemoteState';
import { useOverviewRefresh } from '@/application/use-overview-refresh';
import checkBadgeArtwork from '@/assets/illustrations/check-badge.svg';
import clipboardCheckArtwork from '@/assets/illustrations/clipboard-check.svg';
import folderDocumentArtwork from '@/assets/illustrations/folder-document.svg';
import usersArtwork from '@/assets/illustrations/users.svg';
import { shortcuts } from '@/data/workplace';
import { PageHeading } from '@/pages/shared/ProPage';
import { getActivityActionLabel } from '@/pages/workplace/activity-presentation';

import { DeliveryTrend } from './DeliveryTrend';
import { RecentTasks } from './RecentTasks';
import { TokenUsageCalendar } from './TokenUsageCalendar';
import { TokenUsageHeatmap } from './TokenUsageHeatmap';
import styles from './WorkplacePage.module.scss';
import { WorkplaceWidget, type WorkplaceWidgetState } from './WorkplaceWidget';
import { WorkspaceCarousel } from './WorkspaceCarousel';

const widgetIds = ['distribution', 'shortcuts', 'inspiration', 'activity'] as const;
type WidgetId = (typeof widgetIds)[number];

const metricArtwork = {
  projects: folderDocumentArtwork,
  tasks: clipboardCheckArtwork,
  members: usersArtwork,
  completion: checkBadgeArtwork,
};
const shortcutIcons = { tasks: CircleCheckIcon, projects: LayersIcon, analytics: GaugeIcon };
const completionValue = (value: number) => `${Math.round(value)}%`;

export function WorkplacePage() {
  const { profile, activity, announcements, metrics, projectDistribution, snapshot } = useProData();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [hoveredShortcut, setHoveredShortcut] = useState<string | null>(null);
  const [focusedShortcut, setFocusedShortcut] = useState<string | null>(null);
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
  const overview = useOverviewRefresh();
  if (overview.error || !overview.data)
    return <RemoteState loading={overview.loading} error={overview.error} retry={overview.retry} />;
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
                  {t('workplace.welcomeBackMystic', { name: profile.name })}
                  <span className={styles.welcomeDot}>.</span>
                </>
              }
              description={t('workplace.goodWorkStartsWithAClearViewHereS')}
              actions={<TokenUsageCalendar />}
            />
          </div>

          <Surface border="default" radius={12} className={styles.metrics}>
            {metrics.map((metric) => (
              <div key={metric.icon} className={styles.metric}>
                <img
                  className={styles.metricArtwork}
                  src={metricArtwork[metric.icon]}
                  alt=""
                  width={56}
                  height={56}
                  aria-hidden="true"
                />
                <Statistic
                  className={styles.metricContent}
                  value={metric.icon === 'completion' ? snapshot.completionRate : metric.value}
                  {...(metric.icon === 'completion' ? { formatter: completionValue } : {})}
                  animation
                  label={t(`workplace.metrics.${metric.icon}.label`)}
                  trend={t(`workplace.metrics.${metric.icon}.change`)}
                  description={t(`workplace.metrics.${metric.icon}.detail`)}
                />
              </div>
            ))}
          </Surface>

          <TokenUsageHeatmap />
          <div className={styles.overviewPanels}>
            <DeliveryTrend />
            <RecentTasks allTasksRef={allTasksRef} />
          </div>
          {announcements.map((announcement) => (
            <Surface
              key={announcement.id}
              border="subtle"
              radius={8}
              className={styles.announcement}
            >
              <span className={styles.announcementMarker} aria-hidden="true" />
              <div>
                <strong>{t('workplace.announcement.title')}</strong>
                <p>{t('workplace.announcement.body')}</p>
              </div>
              <Tag size="sm" intent="info" variant="soft">
                {t('workplace.teamNote')}
              </Tag>
            </Surface>
          ))}
        </div>
        <div className={styles.secondaryColumn}>
          {widgets.distribution !== 'removed' ? (
            <WorkplaceWidget
              {...widgetProps('distribution')}
              title={t('workplace.projectDistribution')}
              description={t('workplace.whereOpenTasksAreConcentrated')}
            >
              <div className={styles.distributionSummary}>
                <strong>{snapshot.openTasks}</strong>
                <span>
                  {t('workplace.openTasks')}
                  <br />
                  {t('workplace.across4FocusAreas', { count: projectDistribution.length })}
                </span>
              </div>
              <div className={styles.distributionBar} aria-hidden="true">
                {projectDistribution.map((project) => (
                  <span
                    key={project.name}
                    style={{
                      flexGrow: project.count,
                      background: `var(--vd-data-categorical-${project.color})`,
                    }}
                  />
                ))}
              </div>
              <div className={styles.distributionList}>
                {projectDistribution.map((project) => (
                  <div key={project.name}>
                    <div className={styles.distributionLabel}>
                      <span>
                        <i style={{ background: `var(--vd-data-categorical-${project.color})` }} />
                        {project.name}
                      </span>
                      <strong>{project.count}</strong>
                    </div>
                    <Progress
                      size="md"
                      value={project.count}
                      max={snapshot.openTasks}
                      aria-label={t('workplace.valueValueOfValueOpenTasks', {
                        v0: project.name,
                        v1: project.count,
                        v2: snapshot.openTasks,
                      })}
                      className={styles.distributionProgress}
                      data-series={project.color}
                    />
                    <span className={styles.distributionShare}>
                      {t('workplace.valueOfOpenTasks', { v0: project.share })}
                    </span>
                  </div>
                ))}
              </div>
            </WorkplaceWidget>
          ) : null}
          {widgets.shortcuts !== 'removed' ? (
            <WorkplaceWidget {...widgetProps('shortcuts')} title={t('workplace.quickAccess')}>
              <div className={styles.shortcuts}>
                {shortcuts.map((shortcut) => {
                  const Icon = shortcutIcons[shortcut.icon];
                  return (
                    <Button
                      key={shortcut.path}
                      variant="text"
                      className={styles.shortcut}
                      leadingIcon={<Icon />}
                      trailingIcon={
                        <ArrowRightIcon
                          animated={
                            hoveredShortcut === shortcut.path || focusedShortcut === shortcut.path
                              ? 'always'
                              : false
                          }
                        />
                      }
                      onMouseEnter={() => setHoveredShortcut(shortcut.path)}
                      onMouseLeave={() => setHoveredShortcut(null)}
                      onFocus={() => setFocusedShortcut(shortcut.path)}
                      onBlur={() => setFocusedShortcut(null)}
                      onClick={() => navigate(shortcut.path)}
                    >
                      <span className={styles.shortcutCopy}>
                        <strong>{t(`workplace.shortcuts.${shortcut.icon}.label`)}</strong>
                        <span>{t(`workplace.shortcuts.${shortcut.icon}.detail`)}</span>
                      </span>
                    </Button>
                  );
                })}
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
              <Tag size="md" variant="outline" className={styles.activityDate}>
                {t('workplace.today')}
              </Tag>
              <Timeline size="medium" aria-label={t('workplace.recentTeamActivity')}>
                {activity.map((event) => (
                  <Timeline.Item key={event.id} status={event.status}>
                    <Timeline.Title className={styles.activityTitle}>{event.name}</Timeline.Title>
                    <Timeline.Description className={styles.activityDescription}>
                      {getActivityActionLabel(t, event.id)}
                    </Timeline.Description>
                    <Timeline.Time dateTime={event.dateTime} className={styles.activityTime}>
                      {event.time} · {event.project}
                    </Timeline.Time>
                  </Timeline.Item>
                ))}
              </Timeline>
            </WorkplaceWidget>
          ) : null}
        </div>
      </div>
    </div>
  );
}
