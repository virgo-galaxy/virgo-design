import { Chart } from '@virgo-design/charts';
import { Card, SegmentedControl } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getDeliveryTrend } from '@/api/analytics';
import type { TrendPointDto } from '@/api/analytics/types';
import { ResourceContent } from '@/components/feedback/resource-content';
import { useTaskDependentQuery } from '@/features/tasks';
import { formatDueDate } from '@/lib/formatting/format-due-date';

type TrendPeriod = '7d' | '14d';

function DeliveryTrendView({ trendPoints }: { trendPoints: TrendPointDto[] }) {
  const { t, i18n } = useTranslation();
  const [period, setPeriod] = useState<TrendPeriod>('7d');

  const points = period === '7d' ? trendPoints.slice(-7) : trendPoints;
  const completed = points.reduce((sum, point) => sum + point.completed, 0);
  const planned = points.reduce((sum, point) => sum + point.planned, 0);
  const ratio = planned ? Math.round((completed / planned) * 100) : 0;

  return (
    <Card
      variant="outlined"
      className={[
        'data-[size=md]:[align-content:start] data-[size=md]:[--card-padding:var(--vd-spacing-20)]',
        'data-[size=md]:[--card-title-font-size:var(--vd-font-size-14)] data-[size=md]:[--card-gap:var(--vd-spacing-20)]',
      ].join(' ')}
    >
      <Card.Header className="flex-wrap flex justify-between items-start gap-12 viewport-max-640:flex-wrap">
        <div>
          <Card.Title as="h2">{t('workplace.deliveryPulse')}</Card.Title>
          <Card.Description>{t('workplace.keepTheWorkMovingOneDayAtATime')}</Card.Description>
        </div>
        <SegmentedControl
          size="medium"
          variant="soft"
          motion="slide"
          aria-label={t('workplace.deliveryPeriod')}
          value={period}
          onValueChange={(value) => {
            if (value === '7d' || value === '14d') setPeriod(value);
          }}
        >
          <SegmentedControl.Item value="7d">{t('workplace.text7Days')}</SegmentedControl.Item>
          <SegmentedControl.Item value="14d">{t('workplace.text14Days')}</SegmentedControl.Item>
        </SegmentedControl>
      </Card.Header>
      <Card.Body>
        <div
          className={[
            'pro-delivery-trend-trend-summary',
            '[&_>_div:first-child]:flex [&_>_div:first-child]:items-baseline [&_>_div:first-child]:flex-wrap [&_>_div:first-child]:gap-8',
            '[&_strong]:font-mono [&_strong]:text-(length:--vd-font-size-32) [&_strong]:[line-height:var(--vd-line-height-1)]',
            '[&_strong]:[font-weight:var(--vd-font-weight-500)] [&_strong]:[letter-spacing:-1px] [&_span]:text-(length:--vd-font-size-12)',
            '[&_span]:text-text-tertiary',
            'viewport-max-640:flex-wrap',
            'flex items-end justify-between gap-12 [margin-block-end:var(--vd-spacing-16)]',
          ].join(' ')}
        >
          <div>
            <strong>{completed}</strong>
            <span>{t('workplace.tasksDelivered')}</span>
            <span
              className={[
                '[.pro-delivery-trend-trend-summary_&]:ms-4 [.pro-delivery-trend-trend-summary_&]:text-status-success-text',
                '[.pro-delivery-trend-trend-summary_&]:font-mono [.pro-delivery-trend-trend-summary_&]:text-(length:--vd-font-size-11)',
              ].join(' ')}
            >
              {t('workplace.valueOfPlan', { v0: ratio })}
            </span>
          </div>
        </div>
        <Chart.Root
          data={points}
          title={t('workplace.deliveryChart')}
          locale={i18n.language}
          height={260}
          showData
          dataTableLabel={t('workplace.dailyDeliveryData')}
          labelFormatter={(value) => formatDueDate(String(value), i18n.language)}
        >
          <Chart.Cartesian>
            <Chart.Grid />
            <Chart.XAxis dataKey="date" type="time" />
            <Chart.YAxis />
            <Chart.Area dataKey="completed" name={t('workplace.delivered')} curve="smooth" />
            <Chart.Line
              dataKey="planned"
              name={t('workplace.planned')}
              curve="smooth"
              marker="muted"
            />
            <Chart.Tooltip />
            <Chart.Legend />
          </Chart.Cartesian>
        </Chart.Root>
      </Card.Body>
    </Card>
  );
}

export function DeliveryTrend() {
  const resource = useTaskDependentQuery(getDeliveryTrend);

  return (
    <ResourceContent resource={resource}>
      {(trendPoints) => <DeliveryTrendView trendPoints={trendPoints} />}
    </ResourceContent>
  );
}
