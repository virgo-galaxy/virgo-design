import { Chart } from '@virgo-design/charts';
import { Statistic, Surface } from '@virgo-design/ui';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { TrendPointDto } from '@/api/analytics/types';

import { deliveryAnalysis } from '../model/delivery-analysis';
import { chartColors } from '../presentation/chart-colors';

import styles from '../styles/analytics.module.scss';

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
  );
}
