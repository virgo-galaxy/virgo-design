import { Chart } from '@virgo-design/charts';
import { Card, SegmentedControl } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getDeliveryTrend } from '@/api/analytics';
import type { TrendPointDto } from '@/api/analytics/types';
import { ResourceContent } from '@/components/resource-content';
import { useTaskDependentQuery } from '@/features/tasks';
import { formatDueDate } from '@/lib/formatting/format-due-date';

import styles from './DeliveryTrend.module.scss';

type TrendPeriod = '7d' | '14d';

function DeliveryTrendView({ trendPoints }: { trendPoints: TrendPointDto[] }) {
  const { t, i18n } = useTranslation();
  const [period, setPeriod] = useState<TrendPeriod>('7d');

  const points = period === '7d' ? trendPoints.slice(-7) : trendPoints;
  const completed = points.reduce((sum, point) => sum + point.completed, 0);
  const planned = points.reduce((sum, point) => sum + point.planned, 0);
  const ratio = planned ? Math.round((completed / planned) * 100) : 0;

  return (
    <Card variant="outlined" className={styles.trendCard}>
      <Card.Header className={styles.panelHeader}>
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
        <div className={styles.trendSummary}>
          <div>
            <strong>{completed}</strong>
            <span>{t('workplace.tasksDelivered')}</span>
            <span className={styles.trendRatio}>{t('workplace.valueOfPlan', { v0: ratio })}</span>
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
