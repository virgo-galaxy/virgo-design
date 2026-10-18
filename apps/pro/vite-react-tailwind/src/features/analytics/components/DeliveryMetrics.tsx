import { Chart } from '@virgo-design/charts';
import { Statistic, Surface } from '@virgo-design/ui';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { TrendPointDto } from '@/api/analytics/types';

import { deliveryAnalysis } from '../model/delivery-analysis';
import { chartColors } from '../presentation/chart-colors';

const percent = (value: number) => `${Math.round(value)}%`;
const signedPercent = (value: number) => {
  const rounded = Math.round(value);

  return `${rounded > 0 ? '+' : ''}${rounded}%`;
};

export function DeliveryMetrics({ trendPoints }: { trendPoints: TrendPointDto[] }) {
  const { t, i18n } = useTranslation();
  const analysis = deliveryAnalysis('14d', trendPoints);
  const { points } = analysis;
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
    <div className="viewport-max-1400:grid-cols-2 viewport-max-640:gap-12 grid [grid-template-columns:repeat(4,_minmax(0,_1fr))] gap-16">
      {metrics.map((metric) => (
        <Surface
          key={metric.key}
          radius={8}
          className={[
            'flex items-center min-w-0 [min-height:144px] p-20 gap-12 [--metric-color:var(--vd-data-categorical-1)]',
            '[background:linear-gradient(_135deg,_color-mix(in_srgb,_var(--metric-color)_6%,_var(--vd-surface-default)),_color-mix(in_srgb,_var(--metric-color)_11%,_var(--vd-surface-default))_)]',
            'data-[metric=throughput]:[--metric-color:var(--vd-data-categorical-3)]',
            'data-[metric=attainment]:[--metric-color:var(--vd-data-categorical-6)]',
            'data-[metric=momentum]:[--metric-color:var(--vd-data-categorical-8)]',
            'viewport-max-640:flex-col viewport-max-640:items-stretch viewport-max-640:[min-height:180px] viewport-max-640:p-16',
            'viewport-max-640:gap-4',
          ].join(' ')}
          data-metric={metric.key}
        >
          <Statistic.Root
            className={[
              'flex-none [max-width:60%] grid gap-8',
              '[&_h2]:m-0 [&_h2]:text-(length:--vd-font-size-12) [&_h2]:font-[500] [&_h2]:text-text-secondary',
              "[&_[data-slot='value']]:[font-family:var(--vd-font-family-sans)] [&_[data-slot='value']]:text-(length:--vd-font-size-28)",
              "[&_[data-slot='value']]:font-[600] [&_[data-slot='value']]:leading-[1.2] [&_[data-slot='value']]:[letter-spacing:-0.6px]",
              "[&_[data-slot='value']]:tabular-nums [&_>_span]:text-text-tertiary [&_>_span]:text-(length:--vd-font-size-11)",
              "viewport-max-640:[max-width:none] viewport-max-640:gap-6 viewport-max-640:[&_[data-slot='value']]:text-(length:--vd-font-size-24)",
            ].join(' ')}
          >
            <h2>{metric.label}</h2>
            <Statistic.Value value={metric.value} animation formatter={metric.formatter} />
            <span>{metric.note}</span>
          </Statistic.Root>
          <div className="viewport-max-640:w-full viewport-max-640:flex-none [flex:1] min-w-0">
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
  );
}
