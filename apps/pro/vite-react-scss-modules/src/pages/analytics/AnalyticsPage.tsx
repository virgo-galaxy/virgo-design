import { Chart } from '@virgo-design/charts';
import { DownloadIcon } from '@virgo-design/icons';
import { Button, Progress, SegmentedControl, Surface, Table, Tag } from '@virgo-design/ui';
import { type CSSProperties, useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { useProData } from '@/application/pro-data-context';
import { RemoteState } from '@/application/RemoteState';
import { useOverviewRefresh } from '@/application/use-overview-refresh';
import { deliveryAnalysis } from '@/data/analytics';
import { projectSummary } from '@/data/projects';
import { isOverdue, type TaskState, taskStatuses } from '@/data/tasks';
import { formatDueDate, type TrendPeriod } from '@/data/workplace';
import { downloadCsv } from '@/pages/shared/download';
import { MetricStrip, Panel, Person } from '@/pages/shared/ProPage';
import shared from '@/pages/shared/ProPage.module.scss';

import { getTaskStatusLabel } from '../tasks/task-presentation';
import styles from './AnalyticsPage.module.scss';

export function AnalyticsPage({ state }: { state: TaskState }) {
  const { projects, taskAssignees, taskReferenceDate, trendPoints } = useProData();

  const { t, i18n } = useTranslation();
  const [period, setPeriod] = useState<TrendPeriod>('14d');
  const [showData, setShowData] = useState(false);
  const chartId = useId();
  const analysis = deliveryAnalysis(period, trendPoints);
  const { points } = analysis;
  const openTasks = state.tasks.filter((task) => task.status !== 'done');
  const overdue = openTasks.filter((task) => isOverdue(task, taskReferenceDate));
  const distributions = taskStatuses.map((status, index) => ({
    status,
    count: state.tasks.filter((task) => task.status === status).length,
    color: index + 1,
  }));
  const overview = useOverviewRefresh();
  if (overview.error || !overview.data)
    return <RemoteState loading={overview.loading} error={overview.error} retry={overview.retry} />;
  return (
    <div className={shared.page}>
      <h1 className={shared.srOnly}>{t('app.analytics')}</h1>
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
      >
        <div className={shared.body}>
          <Chart.Root
            data={points}
            title={t('analytics.deliveryTrend')}
            locale={i18n.language}
            height={280}
            labelFormatter={(value) => formatDueDate(String(value), i18n.language)}
          >
            <Chart.Cartesian>
              <Chart.Grid />
              <Chart.XAxis dataKey="date" type="time" />
              <Chart.YAxis />
              <Chart.Area dataKey="completed" name={t('analytics.delivered')} curve="smooth" />
              <Chart.Line
                dataKey="planned"
                name={t('analytics.planned')}
                curve="smooth"
                marker="muted"
              />
              <Chart.Tooltip />
              <Chart.Legend />
            </Chart.Cartesian>
          </Chart.Root>
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
              const summary = projectSummary(
                project,
                state.tasks,
                taskAssignees,
                taskReferenceDate,
              );
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
          <div className={shared.body}>
            <Chart.Root
              data={distributions.map((item) => ({
                name: getTaskStatusLabel(t, item.status),
                value: item.count,
              }))}
              title={t('analytics.taskDistribution')}
              locale={i18n.language}
              height={280}
              showData
              dataTableLabel={t('analytics.taskDistribution')}
            >
              <Chart.Donut
                dataKey="value"
                nameKey="name"
                center={
                  <>
                    <strong>{state.tasks.length}</strong>
                    <span>{t('analytics.tasks')}</span>
                  </>
                }
              >
                <Chart.Tooltip />
                <Chart.Legend />
              </Chart.Donut>
            </Chart.Root>
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
                {state.tasks.filter((task) => task.status === 'in_review').length}
              </Tag>
              <div>
                <strong>{t('analytics.awaitingReview')}</strong>
                <p>{t('analytics.clearAcceptanceNotesToKeepDeliveryMoving')}</p>
              </div>
            </li>
            <li>
              <Tag size="sm" variant="outline">
                {openTasks.filter((task) => task.priority === 'urgent').length}
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
