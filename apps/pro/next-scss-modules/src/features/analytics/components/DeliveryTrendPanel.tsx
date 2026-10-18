import { Chart } from '@virgo-design/charts';
import { useTranslation } from 'react-i18next';

import type { TrendPointDto } from '@/api/analytics/types';
import { Panel } from '@/components/display/panel';
import { formatDueDate } from '@/lib/formatting/format-due-date';

import { deliveryAnalysis } from '../model/delivery-analysis';
import { chartColors } from '../presentation/chart-colors';

import styles from '../styles/analytics.module.scss';

export function DeliveryTrendPanel({ trendPoints }: { trendPoints: TrendPointDto[] }) {
  const { t, i18n } = useTranslation();
  const analysis = deliveryAnalysis('14d', trendPoints);
  const { points } = analysis;

  return (
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
  );
}
