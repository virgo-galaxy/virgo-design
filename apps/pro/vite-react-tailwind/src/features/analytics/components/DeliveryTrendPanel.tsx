import { Chart } from '@virgo-design/charts';
import { useTranslation } from 'react-i18next';

import type { TrendPointDto } from '@/api/analytics/types';
import { Panel } from '@/components/display/panel';
import { formatDueDate } from '@/lib/formatting/format-due-date';

import { deliveryAnalysis } from '../model/delivery-analysis';
import { chartColors } from '../presentation/chart-colors';

export function DeliveryTrendPanel({ trendPoints }: { trendPoints: TrendPointDto[] }) {
  const { t, i18n } = useTranslation();
  const analysis = deliveryAnalysis('14d', trendPoints);
  const { points } = analysis;

  return (
    <Panel
      className="[&_>_div:first-child]:[border-bottom:0] [&_>_div:first-child]:pb-8"
      title={t('analytics.deliveryTrend')}
      description={t('analytics.trendDescription')}
    >
      <div
        className={[
          '[&_strong]:text-(length:--vd-font-size-28) [&_strong]:font-[600] [&_strong]:tabular-nums [&_span]:text-text-tertiary',
          '[&_span]:text-(length:--vd-font-size-12) [&_em]:[font-style:normal] [&_em]:text-(length:--vd-font-size-11)',
          '[&_em]:text-status-success-text [&_em]:ml-8',
          'flex items-baseline gap-8 [padding:var(--vd-spacing-8)_var(--vd-spacing-24)_var(--vd-spacing-12)]',
        ].join(' ')}
      >
        <strong>{analysis.delivered}</strong>
        <span>{t('analytics.delivered')}</span>
        <em>{t('analytics.attainmentValue', { value: analysis.attainment })}</em>
      </div>
      <div className="viewport-max-640:px-12 [padding:var(--vd-spacing-8)_var(--vd-spacing-20)_var(--vd-spacing-20)] min-w-0">
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
