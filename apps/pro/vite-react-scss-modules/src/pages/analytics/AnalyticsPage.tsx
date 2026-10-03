import { DownloadIcon } from '@virgo-design/icons';
import { Button, Progress, SegmentedControl, Surface, Table, Tag } from '@virgo-design/ui';
import { type CSSProperties, useId, useState } from 'react';
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
              TEAM DELIVERY
            </Tag>
            <span>
              {formatDueDate(points[0]!.date)} – {formatDueDate(points.at(-1)!.date)}, 2026
            </span>
          </div>
          <div className={styles.periodActions}>
            <SegmentedControl
              size="small"
              variant="soft"
              value={period}
              aria-label="Analytics time range"
              onValueChange={(value) => {
                if (value === '7d' || value === '14d') {
                  setPeriod(value);
                  setInspected(null);
                }
              }}
            >
              <SegmentedControl.Item value="7d">7 days</SegmentedControl.Item>
              <SegmentedControl.Item value="14d">14 days</SegmentedControl.Item>
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
              Export report
            </Button>
          </div>
        </div>
      </Surface>
      <MetricStrip
        items={[
          {
            label: 'Tasks delivered',
            value: analysis.delivered,
            note: `${analysis.planned} planned in this period`,
          },
          {
            label: 'Plan attainment',
            value: `${analysis.attainment}%`,
            note: `${analysis.planned - analysis.delivered} below plan`,
          },
          {
            label: 'Daily throughput',
            value: analysis.average.toFixed(1),
            note: 'delivered tasks / day',
          },
          {
            label: 'Delivery momentum',
            value: `${analysis.momentum > 0 ? '+' : ''}${analysis.momentum}%`,
            note: 'last half vs first half · equal days',
          },
        ]}
      />
      <Panel
        title="Delivery trend"
        description="Daily delivered tasks against plan · team history through October 1"
        actions={
          <div className={styles.legend}>
            <span>
              <i />
              Delivered
            </span>
            <span>
              <i data-planned />
              Planned
            </span>
          </div>
        }
      >
        <div className={shared.body}>
          <div className={styles.inspection}>
            <span className={shared.mono}>{formatDueDate(currentPoint.date)}</span>
            <strong>{currentPoint.completed} delivered</strong>
            <span>{currentPoint.planned} planned</span>
            <span className={shared.caption}>Focus a point to inspect a day.</span>
          </div>
          <div
            className={styles.chartViewport}
            tabIndex={0}
            role="region"
            aria-label="Delivery plot, scroll horizontally on small screens"
          >
            {' '}
            <svg
              className={styles.chart}
              viewBox="0 0 700 228"
              role="img"
              aria-labelledby={`${chartId}-title ${chartId}-desc`}
            >
              <title id={`${chartId}-title`}>
                Delivered versus planned tasks over {period === '7d' ? 7 : 14} days
              </title>
              <desc id={`${chartId}-desc`}>
                {analysis.delivered} delivered, {analysis.planned} planned. Exact daily values are
                available with Show daily data.
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
                    aria-label={`${formatDueDate(point.date)}: ${point.completed} delivered, ${point.planned} planned`}
                    onFocus={() => setInspected(point.date)}
                    onMouseEnter={() => setInspected(point.date)}
                  />
                  <text x={x(index)} y="216" textAnchor="middle" className={styles.axis}>
                    {period === '7d' || index % 2 === 0 || index === points.length - 1
                      ? formatDueDate(point.date)
                      : ''}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <div className={styles.chartFooter}>
            <span className={shared.caption}>
              Source: Virgo Studio delivery history · same series as Workplace
            </span>
            <Button
              size="small"
              variant="text"
              aria-expanded={showData}
              aria-controls={`${chartId}-data`}
              onClick={() => setShowData(!showData)}
            >
              {showData ? 'Hide daily data' : 'Show daily data'}
            </Button>
          </div>
          <div id={`${chartId}-data`} hidden={!showData}>
            <Table.Viewport aria-label="Daily delivery values">
              <Table density="compact" border="separators">
                <Table.Caption className={shared.srOnly}>Daily delivery history</Table.Caption>
                <Table.Header>
                  <Table.Row>
                    <Table.Head>Date</Table.Head>
                    <Table.Head align="end">Delivered</Table.Head>
                    <Table.Head align="end">Planned</Table.Head>
                    <Table.Head align="end">Gap</Table.Head>
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
          title="Project workload"
          description={`Current register · ${openTasks.length} open tasks across four focus areas`}
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
                      {summary.open} open{' '}
                      <span className={shared.caption}>/ {summary.total} tasks</span>
                    </span>
                  </div>
                  <Progress
                    size="sm"
                    value={summary.open}
                    max={Math.max(1, openTasks.length)}
                    aria-label={`${project.name}: ${summary.open} of ${openTasks.length} open tasks`}
                    className={styles.seriesProgress}
                    style={
                      {
                        '--series-color': `var(--vd-data-categorical-${project.color})`,
                      } as CSSProperties
                    }
                  />
                  <span className={shared.caption}>
                    {summary.hours}h estimated · {summary.review} in review · {summary.overdue}{' '}
                    overdue
                  </span>
                </div>
              );
            })}
          </div>
        </Panel>
        <Panel
          title="Task distribution"
          description={`Current register · ${state.tasks.length} tasks`}
        >
          <div className={styles.distribution}>
            <svg
              viewBox="0 0 160 160"
              role="img"
              aria-label={`Task status distribution. ${distributions.map((item) => `${item.status}: ${item.count}`).join(', ')}`}
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
                TASKS
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
          title="Ownership capacity"
          description="Open-task estimates by assignee · hours are estimates, not time logged"
        >
          <div className={styles.ownerGrid}>
            {taskAssignees.map((member) => {
              const owned = openTasks.filter((task) => task.assignee === member.id);
              return (
                <div key={member.id}>
                  <Person id={member.id} />
                  <strong>
                    {owned.reduce((sum, task) => sum + task.estimateHours, 0)}
                    <small>h</small>
                  </strong>
                  <span className={shared.caption}>{owned.length} open tasks</span>
                </div>
              );
            })}
          </div>
        </Panel>
        <Panel
          title="Attention signals"
          description={`Current task snapshot · ${taskReferenceDate}`}
        >
          <ul className={styles.signals}>
            <li>
              <Tag size="sm" intent="danger">
                {overdue.length}
              </Tag>
              <div>
                <strong>Overdue tasks</strong>
                <p>Resolve ownership before the release checkpoint.</p>
              </div>
            </li>
            <li>
              <Tag size="sm" intent="warning">
                {state.tasks.filter((task) => task.status === 'In Review').length}
              </Tag>
              <div>
                <strong>Awaiting review</strong>
                <p>Clear acceptance notes to keep delivery moving.</p>
              </div>
            </li>
            <li>
              <Tag size="sm" variant="outline">
                {openTasks.filter((task) => task.priority === 'Urgent').length}
              </Tag>
              <div>
                <strong>Urgent work</strong>
                <p>Keep support readiness visible to the team.</p>
              </div>
            </li>
          </ul>
          <div className={shared.footer}>
            <Link className={shared.link} to="/data/search-table">
              Investigate task register →
            </Link>
          </div>
        </Panel>
      </div>
    </div>
  );
}
