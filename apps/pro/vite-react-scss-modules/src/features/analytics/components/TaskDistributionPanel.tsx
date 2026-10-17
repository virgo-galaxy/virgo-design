import { Chart } from '@virgo-design/charts';
import { useTranslation } from 'react-i18next';

import { Panel } from '@/components/page/Panel';
import type { TaskStatusSummaryDto } from '@/contracts/analytics';
import { taskStatuses, taskStatusLabelNames } from '@/features/tasks';

import { chartColors } from '../presentation/chart-colors';
import styles from '../styles/analytics.module.scss';

export function TaskDistributionPanel({ summary }: { summary: TaskStatusSummaryDto }) {
  const { t, i18n } = useTranslation();
  const { taskCount } = summary;
  const distributions = taskStatuses.map((status, index) => ({
    name: t(`tasks.statusLabels.${taskStatusLabelNames[status]}`),
    value: summary.statusDistribution.find((item) => item.status === status)?.count ?? 0,
    color: chartColors[index]!,
  }));

  return (
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
  );
}
