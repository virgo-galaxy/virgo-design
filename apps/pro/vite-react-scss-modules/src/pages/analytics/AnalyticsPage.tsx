import { DownloadIcon } from '@virgo-design/icons';
import { Button, Progress, SegmentedControl, Surface, Table, Tag } from '@virgo-design/ui';
import { type CSSProperties, useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { deliveryAnalysis } from '@/data/analytics';
import { projects, projectSummary } from '@/data/projects';
import { isOverdue, type TaskState, taskStatuses } from '@/data/tasks';
import { taskAssignees, taskReferenceDate } from '@/data/tasks.seed';
import { formatDueDate, type TrendPeriod } from '@/data/workplace';
import { downloadCsv } from '@/pages/shared/download';
import { MetricStrip, Panel, Person } from '@/pages/shared/ProPage';
import shared from '@/pages/shared/ProPage.module.scss';

import styles from './AnalyticsPage.module.scss';

export function AnalyticsPage({ state }: { state: TaskState }) {
  const { t, i18n } = useTranslation();
  const [period, setPeriod] = useState<TrendPeriod>('14d');
  const [showData, setShowData] = useState(false);
  const [inspected, setInspected] = useState<string | null>(null);
  const chartId = useId();
  const analysis = deliveryAnalysis(period);
  const { points } = analysis;
  const currentPoint = points.find((point) => point.date === inspected) ?? points.at(-1)!;
  const openTasks = state.tasks.filter((task) => task.status !== 'Done');
  const overdue = openTasks.filter((task) => isOverdue(task, taskReferenceDate));
  const distributions = taskStatuses.map((status, index) => ({
    status,
    count: state.tasks.filter((task) => task.status === status).length,
    color: index + 1,
  }));
  let offset = 0;
  const x = (index: number) => 44 + (index / (points.length - 1)) * 632;
  const y = (value: number) => 186 - (value / 25) * 160;
  const line = (key: 'completed' | 'planned') =>
    points.map((point, index) => `${x(index)},${y(point[key])}`).join(' ');
  return (
    <div className={shared.page}>
      <Surface border="default" radius={8}>
        <div className={styles.periodBar}>
          <div>
            <Tag size="sm" variant="outline">
              {t('analytics.teamDelivery')}
            </Tag>
            <span>
              {formatDueDate(points[0]!.date, i18n.language)} –{' '}
              {formatDueDate(points.at(-1)!.date, i18n.language)}
            </span>
          </div>
          <div className={styles.periodActions}>
            <SegmentedControl
              size="small"
              variant="soft"
              value={period}
              aria-label={t('analytics.analyticsTimeRange')}
              onValueChange={(value) => {
                if (value === '7d' || value === '14d') {
                  setPeriod(value);
                  setInspected(null);
                }
              }}
            >
              <SegmentedControl.Item value="7d">{t('analytics.text7Days')}</SegmentedControl.Item>
              <SegmentedControl.Item value="14d">{t('analytics.text14Days')}</SegmentedControl.Item>
            </SegmentedControl>
            <Button
              size="small"
              variant="outline"
              leadingIcon={<DownloadIcon />}
              onClick={() =>
                downloadCsv(
                  `Date,Delivered,Planned\r\n${points.map((point) => `${point.date},${point.completed},${point.planned}`).join('\r\n')}`,
                  `virgo-delivery-${period}.csv`,
                )
              }
            >
              {t('analytics.exportReport')}
            </Button>
          </div>
        </div>
      </Surface>
      <MetricStrip
        items={[
          {
            label: t('analytics.tasksDelivered'),
            value: analysis.delivered,
            note: t('analytics.plannedInPeriod', { count: analysis.planned }),
          },
          {
            label: t('analytics.planAttainment'),
            value: `${analysis.attainment}%`,
            note: t('analytics.belowPlan', { count: analysis.planned - analysis.delivered }),
          },
          {
            label: t('analytics.dailyThroughput'),
            value: analysis.average.toFixed(1),
            note: t('analytics.deliveredTasksDay'),
          },
          {
            label: t('analytics.deliveryMomentum'),
            value: `${analysis.momentum > 0 ? '+' : ''}${analysis.momentum}%`,
            note: t('analytics.lastHalfVsFirstHalfEqualDays'),
          },
        ]}
      />
      <Panel
        title={t('analytics.deliveryTrend')}
        description={t('analytics.dailyDeliveredTasksAgainstPlanTeamHistoryThroughOctober')}
        actions={
          <div className={styles.legend}>
            <span>
              <i />
              {t('analytics.delivered')}
            </span>
            <span>
              <i data-planned />
              {t('analytics.planned')}
            </span>
          </div>
        }
      >
        <div className={shared.body}>
          <div className={styles.inspection}>
            <span className={shared.mono}>{formatDueDate(currentPoint.date, i18n.language)}</span>
            <strong>{t('analytics.valueDelivered', { v0: currentPoint.completed })}</strong>
            <span>{t('analytics.valuePlanned', { v0: currentPoint.planned })}</span>
            <span className={shared.caption}>{t('analytics.focusAPointToInspectADay')}</span>
          </div>
          <div
            className={styles.chartViewport}
            tabIndex={0}
            role="region"
            aria-label={t('analytics.deliveryPlotScrollHorizontallyOnSmallScreens')}
          >
            {' '}
            <svg
              className={styles.chart}
              viewBox="0 0 700 228"
              role="img"
              aria-labelledby={`${chartId}-title ${chartId}-desc`}
            >
              <title id={`${chartId}-title`}>
                {t('analytics.deliveredVersusPlannedTasksOverValueDays', {
                  v0: period === '7d' ? 7 : 14,
                })}
              </title>
              <desc id={`${chartId}-desc`}>
                {t('analytics.valueDeliveredValuePlannedExactDailyValuesAreAvailable', {
                  v0: analysis.delivered,
                  v1: analysis.planned,
                })}
              </desc>
              {[0, 5, 10, 15, 20, 25].map((value) => (
                <g key={value}>
                  <line x1="44" x2="676" y1={y(value)} y2={y(value)} className={styles.gridLine} />
                  <text x="30" y={y(value) + 4} textAnchor="end" className={styles.axis}>
                    {value}
                  </text>
                </g>
              ))}
              <path
                d={`M44,186 L${points.map((point, index) => `${x(index)},${y(point.completed)}`).join(' L')} L676,186 Z`}
                className={styles.area}
              />
              <polyline points={line('planned')} className={styles.planned} />
              <polyline points={line('completed')} className={styles.delivered} />
              {points.map((point, index) => (
                <g key={point.date}>
                  <circle
                    cx={x(index)}
                    cy={y(point.completed)}
                    r={point.date === currentPoint.date ? 5 : 3.5}
                    className={styles.point}
                    tabIndex={0}
                    aria-label={t('analytics.valueValueDeliveredValuePlanned', {
                      v0: formatDueDate(point.date, i18n.language),
                      v1: point.completed,
                      v2: point.planned,
                    })}
                    onFocus={() => setInspected(point.date)}
                    onMouseEnter={() => setInspected(point.date)}
                  />
                  <text x={x(index)} y="216" textAnchor="middle" className={styles.axis}>
                    {period === '7d' || index % 2 === 0 || index === points.length - 1
                      ? formatDueDate(point.date, i18n.language)
                      : ''}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <div className={styles.chartFooter}>
            <span className={shared.caption}>
              {t('analytics.sourceVirgoStudioDeliveryHistorySameSeriesAsWorkplace')}
            </span>
            <Button
              size="small"
              variant="text"
              aria-expanded={showData}
              aria-controls={`${chartId}-data`}
              onClick={() => setShowData(!showData)}
            >
              {showData ? t('analytics.hideDailyData') : t('analytics.showDailyData')}
            </Button>
          </div>
          <div id={`${chartId}-data`} hidden={!showData}>
            <Table.Viewport aria-label={t('analytics.dailyDeliveryValues')}>
              <Table density="compact" border="separators">
                <Table.Caption className={shared.srOnly}>
                  {t('analytics.dailyDeliveryHistory')}
                </Table.Caption>
                <Table.Header>
                  <Table.Row>
                    <Table.Head>{t('analytics.date')}</Table.Head>
                    <Table.Head align="end">{t('analytics.delivered')}</Table.Head>
                    <Table.Head align="end">{t('analytics.planned')}</Table.Head>
                    <Table.Head align="end">{t('analytics.gap')}</Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {points.map((point) => (
                    <Table.Row key={point.date}>
                      <Table.Head scope="row">{point.date}</Table.Head>
                      <Table.Cell align="end">{point.completed}</Table.Cell>
                      <Table.Cell align="end">{point.planned}</Table.Cell>
                      <Table.Cell align="end">{point.completed - point.planned}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Table.Viewport>
          </div>
        </div>
      </Panel>
      <div className={shared.twoColumns}>
        <Panel
          title={t('analytics.projectWorkload')}
          description={t('analytics.currentRegisterValueOpenTasksAcrossFourFocusAreas', {
            v0: openTasks.length,
          })}
        >
          <div className={styles.workload}>
            {projects.map((project) => {
              const summary = projectSummary(project, state.tasks);
              return (
                <div key={project.id}>
                  <div className={styles.workloadLabel}>
                    <Link
                      className={shared.link}
                      to={`/data/search-table?project=${encodeURIComponent(project.name)}`}
                    >
                      {project.name}
                    </Link>
                    <span>
                      {t('analytics.valueOpen', { v0: summary.open })}
                      <span className={shared.caption}>
                        {t('analytics.valueTasks', { v0: summary.total })}
                      </span>
                    </span>
                  </div>
                  <Progress
                    size="sm"
                    value={summary.open}
                    max={Math.max(1, openTasks.length)}
                    aria-label={t('analytics.valueValueOfValueOpenTasks', {
                      v0: project.name,
                      v1: summary.open,
                      v2: openTasks.length,
                    })}
                    className={styles.seriesProgress}
                    style={
                      {
                        '--series-color': `var(--vd-data-categorical-${project.color})`,
                      } as CSSProperties
                    }
                  />
                  <span className={shared.caption}>
                    {t('analytics.valueHEstimatedValueInReviewValueOverdue', {
                      v0: summary.hours,
                      v1: summary.review,
                      v2: summary.overdue,
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        </Panel>
        <Panel
          title={t('analytics.taskDistribution')}
          description={t('analytics.currentRegisterValueTasks', { v0: state.tasks.length })}
        >
          <div className={styles.distribution}>
            <svg
              viewBox="0 0 160 160"
              role="img"
              aria-label={t('analytics.taskStatusDistributionValue', {
                v0: distributions.map((item) => `${item.status}: ${item.count}`).join(', '),
              })}
            >
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="none"
                stroke="var(--vd-surface-secondary)"
                strokeWidth="12"
              />
              {distributions.map((item) => {
                const share = state.tasks.length ? (item.count / state.tasks.length) * 100 : 0;
                const start = offset;
                offset += share;
                return (
                  <circle
                    key={item.status}
                    cx="80"
                    cy="80"
                    r="60"
                    fill="none"
                    pathLength="100"
                    stroke={`var(--vd-data-categorical-${item.color})`}
                    strokeWidth="12"
                    strokeDasharray={`${share} ${100 - share}`}
                    strokeDashoffset={-start}
                    transform="rotate(-90 80 80)"
                  />
                );
              })}
              <text x="80" y="79" textAnchor="middle" className={styles.donutValue}>
                {state.tasks.length}
              </text>
              <text x="80" y="97" textAnchor="middle" className={styles.axis}>
                {t('analytics.tasks')}
              </text>
            </svg>
            <ul>
              {distributions.map((item) => (
                <li key={item.status}>
                  <span>
                    <i style={{ background: `var(--vd-data-categorical-${item.color})` }} />
                    {item.status}
                  </span>
                  <strong>{item.count}</strong>
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </div>
      <div className={shared.twoColumns}>
        <Panel
          title={t('analytics.ownershipCapacity')}
          description={t('analytics.openTaskEstimatesByAssigneeHoursAreEstimatesNot')}
        >
          <div className={styles.ownerGrid}>
            {taskAssignees.map((member) => {
              const owned = openTasks.filter((task) => task.assignee === member.id);
              return (
                <div key={member.id}>
                  <Person id={member.id} />
                  <strong>
                    {owned.reduce((sum, task) => sum + task.estimateHours, 0)}
                    <small>{t('analytics.h')}</small>
                  </strong>
                  <span className={shared.caption}>
                    {t('analytics.valueOpenTasks', { v0: owned.length })}
                  </span>
                </div>
              );
            })}
          </div>
        </Panel>
        <Panel
          title={t('analytics.attentionSignals')}
          description={t('analytics.currentTaskSnapshotValue', { v0: taskReferenceDate })}
        >
          <ul className={styles.signals}>
            <li>
              <Tag size="sm" intent="danger">
                {overdue.length}
              </Tag>
              <div>
                <strong>{t('analytics.overdueTasks')}</strong>
                <p>{t('analytics.resolveOwnershipBeforeTheReleaseCheckpoint')}</p>
              </div>
            </li>
            <li>
              <Tag size="sm" intent="warning">
                {state.tasks.filter((task) => task.status === 'In Review').length}
              </Tag>
              <div>
                <strong>{t('analytics.awaitingReview')}</strong>
                <p>{t('analytics.clearAcceptanceNotesToKeepDeliveryMoving')}</p>
              </div>
            </li>
            <li>
              <Tag size="sm" variant="outline">
                {openTasks.filter((task) => task.priority === 'Urgent').length}
              </Tag>
              <div>
                <strong>{t('analytics.urgentWork')}</strong>
                <p>{t('analytics.keepSupportReadinessVisibleToTheTeam')}</p>
              </div>
            </li>
          </ul>
          <div className={shared.footer}>
            <Link className={shared.link} to="/data/search-table">
              {t('analytics.investigateTaskRegister')}
            </Link>
          </div>
        </Panel>
      </div>
    </div>
  );
}
