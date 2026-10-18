import { Chart } from '@virgo-design/charts';
import { useTranslation } from 'react-i18next';

import type { TaskStatusSummaryDto } from '@/api/analytics/types';
import { Panel } from '@/components/display/panel';
import { taskStatuses, taskStatusLabelNames } from '@/features/tasks';

import { chartColors } from '../presentation/chart-colors';

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
      className="[&_>_div:first-child]:[border-bottom:0] [&_>_div:first-child]:pb-8"
      title={t('analytics.taskDistribution')}
      description={t('analytics.currentRegisterValueTasks', { v0: taskCount })}
    >
      <div
        className={[
          'viewport-max-1400:[grid-template-columns:1fr] viewport-max-1400:gap-0 viewport-max-1400:pt-0',
          'viewport-max-1000:[grid-template-columns:minmax(0,_1fr)_minmax(0,_1fr)] viewport-max-640:px-16 viewport-max-640:gap-8',
          'viewport-max-640:[min-height:250px]',
          'grid [grid-template-columns:minmax(0,_1.1fr)_minmax(0,_1fr)] items-center gap-12',
          '[padding:var(--vd-spacing-16)_var(--vd-spacing-24)_var(--vd-spacing-24)] [min-height:310px]',
        ].join(' ')}
      >
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
        <ul
          className={[
            '[&_li]:grid [&_li]:[grid-template-columns:minmax(0,_1fr)_auto_38px] [&_li]:gap-12 [&_li]:items-center',
            '[&_li]:text-(length:--vd-font-size-12) [&_span]:flex [&_span]:items-center [&_span]:gap-8 [&_span]:text-text-secondary [&_i]:[width:7px]',
            '[&_i]:[height:7px] [&_i]:[border-radius:50%] [&_i]:flex-none [&_strong]:font-[500] [&_strong]:tabular-nums [&_small]:[text-align:right]',
            '[&_small]:text-text-tertiary [&_small]:text-(length:--vd-font-size-11)',
            'viewport-max-1400:grid-cols-2 viewport-max-1400:gap-16 viewport-max-1400:[&_li]:[grid-template-columns:minmax(0,_1fr)_auto]',
            'viewport-max-1400:[&_li]:gap-8 viewport-max-1400:[&_small]:hidden viewport-max-1000:[grid-template-columns:1fr]',
            '[list-style:none] m-0 p-0 grid gap-20',
          ].join(' ')}
        >
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
