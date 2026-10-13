import { Chart } from '@virgo-design/charts';
import { Pagination, Statistic, Surface } from '@virgo-design/ui';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getAnalyticsOverview } from '@/api/analytics/analytics-api';
import type { AnalyticsOverviewDto } from '@/api/analytics/contract';
import { Panel } from '@/components/page/Panel';
import { Person } from '@/components/person/Person';
import { deliveryAnalysis } from '@/features/analytics';
import { CatalogBoundary, useTaskCatalog } from '@/features/catalog';
import { getTaskStatusLabel, taskStatuses, useTaskDependentQuery } from '@/features/tasks';
import { usePaginationLabels } from '@/i18n/use-pagination-labels';
import { businessLabel } from '@/lib/demo/labels';
import { formatDueDate } from '@/lib/format-due-date';
import { RemoteState } from '@/shared/async/RemoteState';

import styles from './AnalyticsPage.module.scss';

const chartColors = [1, 8, 6, 7, 3].map((index) => `var(--vd-data-categorical-${index})`);
const deliveryColors = [6, 5, 4, 3].map((index) => `var(--vd-data-sequential-${index})`);
const ownerPageSize = 5;
const percent = (value: number) => `${Math.round(value)}%`;
const signedPercent = (value: number) => {
  const rounded = Math.round(value);
  return `${rounded > 0 ? '+' : ''}${rounded}%`;
};

export function AnalyticsPageView({ overview }: { overview: AnalyticsOverviewDto }) {
  const { projects, metadata } = useTaskCatalog();
  const taskAssignees = metadata.members;
  const { trendPoints, projectDelivery, taskCount } = overview;
  const { t, i18n } = useTranslation();
  const paginationLabels = usePaginationLabels();
  const [ownerPage, setOwnerPage] = useState(1);
  const analysis = deliveryAnalysis('14d', trendPoints);
  const { points } = analysis;
  const distributions = taskStatuses.map((status, index) => ({
    name: getTaskStatusLabel(t, status),
    value: overview.statusDistribution.find((item) => item.status === status)?.count ?? 0,
    color: chartColors[index]!,
  }));
  const projectData = projectDelivery.map((day) => {
    return {
      date: day.date,
      ...Object.fromEntries(day.deliveries.map((entry) => [entry.projectId, entry.completed])),
    };
  });
  const owners = taskAssignees
    .map((member) => {
      const capacity = overview.ownerCapacity.find((item) => item.memberId === member.id);
      return {
        member,
        count: capacity?.count ?? 0,
        hours: capacity?.hours ?? 0,
      };
    })
    .sort((a, b) => b.hours - a.hours);
  const maxHours = Math.max(1, ...owners.map((owner) => owner.hours));
  const currentOwnerPage = Math.min(
    ownerPage,
    Math.max(1, Math.ceil(owners.length / ownerPageSize)),
  );
  const ownerStart = (currentOwnerPage - 1) * ownerPageSize;
  const visibleOwners = owners.slice(ownerStart, ownerStart + ownerPageSize);
  const attainmentData = [
    { name: t('analytics.delivered'), value: analysis.delivered },
    {
      name: t('analytics.remainingPlan'),
      value: Math.max(0, analysis.planned - analysis.delivered),
    },
  ];
  const number = useMemo(
    () => new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 1 }),
    [i18n.language],
  );
  const integer = useMemo(
    () => new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 0 }),
    [i18n.language],
  );
  const dateRange = points.length
    ? `${formatDueDate(points[0]!.date, i18n.language)} – ${formatDueDate(points.at(-1)!.date, i18n.language)}`
    : '';
  const metrics = [
    {
      key: 'delivery',
      label: t('analytics.tasksDelivered'),
      value: analysis.delivered,
      formatter: integer.format,
      note: t('analytics.plannedInPeriod', { count: analysis.planned }),
    },
    {
      key: 'throughput',
      label: t('analytics.dailyThroughput'),
      value: analysis.average,
      formatter: number.format,
      note: t('analytics.deliveredTasksDay'),
    },
    {
      key: 'attainment',
      label: t('analytics.planAttainment'),
      value: analysis.attainment,
      formatter: percent,
      note: t('analytics.belowPlan', { count: analysis.planned - analysis.delivered }),
    },
    {
      key: 'momentum',
      label: t('analytics.deliveryMomentum'),
      value: analysis.momentum,
      formatter: signedPercent,
      note: t('analytics.momentumNote'),
    },
  ];
  return (
    <div className={styles.page}>
      <header className={styles.heading}>
        <div>
          <h1>{t('analytics.overviewTitle')}</h1>
          <p>{t('analytics.overviewDescription')}</p>
        </div>
        <span>{dateRange}</span>
      </header>
      <div className={styles.metrics}>
        {metrics.map((metric) => (
          <Surface key={metric.key} radius={8} className={styles.metric} data-metric={metric.key}>
            <Statistic.Root className={styles.metricCopy}>
              <h2>{metric.label}</h2>
              <Statistic.Value value={metric.value} animation formatter={metric.formatter} />
              <span>{metric.note}</span>
            </Statistic.Root>
            <div className={styles.microChart}>
              {metric.key === 'attainment' ? (
                <Chart.Root
                  data={attainmentData}
                  title={metric.label}
                  locale={i18n.language}
                  height={86}
                  interactive={false}
                  animated={false}
                >
                  <Chart.Donut
                    dataKey="value"
                    nameKey="name"
                    showLabels={false}
                    innerRadius={0.72}
                    colors={[
                      chartColors[2]!,
                      'color-mix(in srgb, var(--vd-data-categorical-6) 16%, transparent)',
                    ]}
                  />
                </Chart.Root>
              ) : metric.key === 'throughput' ? (
                <Chart.Root
                  data={points}
                  title={metric.label}
                  locale={i18n.language}
                  height={72}
                  interactive={false}
                  animated={false}
                  margins={{ top: 8, right: 2, bottom: 4, left: 2 }}
                >
                  <Chart.Cartesian>
                    <Chart.XAxis dataKey="date" hidden />
                    <Chart.YAxis hidden />
                    <Chart.Bar dataKey="completed" color={chartColors[4]!} />
                  </Chart.Cartesian>
                </Chart.Root>
              ) : (
                <Chart.Root
                  data={points}
                  title={metric.label}
                  locale={i18n.language}
                  height={72}
                  interactive={false}
                  animated={false}
                  margins={{ top: 8, right: 2, bottom: 4, left: 2 }}
                >
                  <Chart.Cartesian>
                    <Chart.XAxis dataKey="date" hidden />
                    <Chart.YAxis hidden />
                    {metric.key === 'delivery' ? (
                      <Chart.Line
                        dataKey="planned"
                        color="color-mix(in srgb, var(--vd-data-categorical-1) 30%, transparent)"
                        curve="smooth"
                      />
                    ) : null}
                    <Chart.Area
                      dataKey="completed"
                      color={metric.key === 'delivery' ? chartColors[0]! : chartColors[1]!}
                      curve="smooth"
                    />
                  </Chart.Cartesian>
                </Chart.Root>
              )}
            </div>
          </Surface>
        ))}
      </div>
      <div className={styles.mainRow}>
        <Panel
          className={styles.panel!}
          title={t('analytics.projectWorkload')}
          description={t('analytics.projectDescription')}
        >
          <div className={styles.chartBody}>
            <Chart.Root
              data={projectData}
              title={t('analytics.projectWorkload')}
              locale={i18n.language}
              height={270}
              labelFormatter={(value) => formatDueDate(String(value), i18n.language)}
              margins={{ left: 36, right: 16, top: 16, bottom: 32 }}
            >
              <Chart.Cartesian>
                <Chart.Grid />
                <Chart.XAxis dataKey="date" />
                <Chart.YAxis tickCount={4} />
                {projects.map((project, index) => (
                  <Chart.Bar
                    key={project.id}
                    dataKey={project.id}
                    name={businessLabel(project.name, i18n.language)}
                    stackId="delivery"
                    maxWidth={16}
                    color={deliveryColors[index % deliveryColors.length]!}
                  />
                ))}
                <Chart.Tooltip />
                <Chart.Legend />
              </Chart.Cartesian>
            </Chart.Root>
          </div>
        </Panel>
        <Panel
          className={styles.panel!}
          title={t('analytics.taskDistribution')}
          description={t('analytics.currentRegisterValueTasks', { v0: taskCount })}
        >
          <div className={styles.distribution}>
            <Chart.Root
              data={distributions}
              title={t('analytics.taskDistribution')}
              locale={i18n.language}
              height={220}
            >
              <Chart.Donut
                dataKey="value"
                nameKey="name"
                colors={chartColors}
                showLabels={false}
                innerRadius={0.76}
                center={
                  <>
                    <strong>{taskCount}</strong>
                    <span>{t('analytics.tasks')}</span>
                  </>
                }
              >
                <Chart.Tooltip />
              </Chart.Donut>
            </Chart.Root>
            <ul className={styles.distributionList}>
              {distributions.map((item) => (
                <li key={item.name}>
                  <span>
                    <i style={{ background: item.color }} />
                    {item.name}
                  </span>
                  <strong>{item.value}</strong>
                  <small>{taskCount ? Math.round((item.value / taskCount) * 100) : 0}%</small>
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </div>
      <div className={styles.detailRow}>
        <Panel
          className={styles.panel!}
          title={t('analytics.deliveryTrend')}
          description={t('analytics.trendDescription')}
        >
          <div className={styles.trendSummary}>
            <strong>{analysis.delivered}</strong>
            <span>{t('analytics.delivered')}</span>
            <em>{t('analytics.attainmentValue', { value: analysis.attainment })}</em>
          </div>
          <div className={styles.chartBody}>
            <Chart.Root
              data={points}
              title={t('analytics.deliveryTrend')}
              locale={i18n.language}
              height={230}
              labelFormatter={(value) => formatDueDate(String(value), i18n.language)}
              margins={{ top: 8, right: 16, bottom: 32, left: 36 }}
            >
              <Chart.Cartesian>
                <Chart.Grid />
                <Chart.XAxis dataKey="date" type="time" tickCount={6} />
                <Chart.YAxis tickCount={4} />
                <Chart.Line
                  dataKey="completed"
                  name={t('analytics.delivered')}
                  color={chartColors[0]!}
                  curve="smooth"
                />
                <Chart.Line
                  dataKey="planned"
                  name={t('analytics.planned')}
                  color={chartColors[2]!}
                  curve="smooth"
                />
                <Chart.Tooltip />
                <Chart.Legend />
              </Chart.Cartesian>
            </Chart.Root>
          </div>
        </Panel>
        <Panel
          className={styles.panel!}
          title={t('analytics.ownershipCapacity')}
          description={t('analytics.ownerDescription')}
        >
          <ol
            className={styles.owners}
            start={ownerStart + 1}
            aria-label={t('analytics.ownershipCapacity')}
          >
            {visibleOwners.map((owner, index) => (
              <li key={owner.member.id}>
                <span className={styles.rank}>
                  {String(ownerStart + index + 1).padStart(2, '0')}
                </span>
                <div className={styles.ownerDetail}>
                  <div className={styles.ownerIdentity}>
                    <Person id={owner.member.id} size="sm" />
                    <small>{t('analytics.valueOpenTasks', { v0: owner.count })}</small>
                  </div>
                  <span className={styles.ownerTrack}>
                    <span
                      style={{
                        width: `${(owner.hours / maxHours) * 100}%`,
                        background: chartColors[(ownerStart + index) % chartColors.length],
                      }}
                    />
                  </span>
                </div>
                <strong>
                  {number.format(owner.hours)}
                  <small>{t('analytics.h')}</small>
                </strong>
              </li>
            ))}
          </ol>
          {owners.length > ownerPageSize ? (
            <Pagination
              className={styles.ownerPagination}
              aria-label={t('analytics.ownerPages')}
              labels={paginationLabels}
              size="small"
              align="right"
              total={owners.length}
              pageSize={ownerPageSize}
              page={currentOwnerPage}
              onChange={setOwnerPage}
              showTotal={(total, range) =>
                t('analytics.ownerRange', { start: range[0], end: range[1], total })
              }
            />
          ) : null}
          <p className={styles.ownerNote}>{t('analytics.estimateNote')}</p>
        </Panel>
      </div>
    </div>
  );
}

function AnalyticsResource() {
  const resource = useTaskDependentQuery(getAnalyticsOverview);
  if (!resource.data) return <RemoteState {...resource} />;
  return (
    <>
      {resource.error ? <RemoteState error={resource.error} retry={resource.retry} /> : null}
      <AnalyticsPageView overview={resource.data} />
    </>
  );
}
export function AnalyticsPage() {
  return (
    <CatalogBoundary>
      <AnalyticsResource />
    </CatalogBoundary>
  );
}
