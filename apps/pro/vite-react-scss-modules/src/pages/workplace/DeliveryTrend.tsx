import { Card, SegmentedControl, Table } from '@virgo-design/ui';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { formatDueDate, snapshot, type TrendPeriod, trendPoints } from '@/data/workplace';

import styles from './WorkplacePage.module.scss';

export function DeliveryTrend() {
  const { t, i18n } = useTranslation();
  const [period, setPeriod] = useState<TrendPeriod>('7d');
  const chartId = useId();
  const points = period === '7d' ? trendPoints.slice(-7) : trendPoints;
  const completed = points.reduce((sum, point) => sum + point.completed, 0);
  const planned = points.reduce((sum, point) => sum + point.planned, 0);
  const x = (index: number) => 44 + (index / (points.length - 1)) * 632;
  const y = (value: number) => 186 - (value / 25) * 160;
  const line = (key: 'completed' | 'planned') =>
    points.map((point, index) => `${x(index)},${y(point[key])}`).join(' ');
  const area = `M44,186 L${points.map((point, index) => `${x(index)},${y(point.completed)}`).join(' L')} L676,186 Z`;
  const ratio = Math.round((completed / planned) * 100);

  return (
    <Card variant="outlined" className={styles.trendCard}>
      <Card.Header className={styles.panelHeader}>
        <div>
          <Card.Title as="h2">{t('workplace.deliveryPulse')}</Card.Title>
          <Card.Description>{t('workplace.keepTheWorkMovingOneDayAtATime')}</Card.Description>
        </div>
        <SegmentedControl
          size="small"
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
          <div className={styles.legend}>
            <span>
              <i data-series="completed" />
              {t('workplace.delivered')}
            </span>
            <span>
              <i data-series="planned" />
              {t('workplace.planned')}
            </span>
          </div>
        </div>
        <figure className={styles.chart} tabIndex={0} aria-label={t('workplace.deliveryChart')}>
          <svg
            viewBox="0 0 700 228"
            role="img"
            aria-labelledby={`${chartId}-title ${chartId}-description`}
          >
            <title id={`${chartId}-title`}>
              {t('workplace.dailyTaskDeliveryValue', {
                v0: period === '7d' ? t('workplace.last7Days') : t('workplace.last14Days'),
              })}
            </title>
            <desc id={`${chartId}-description`}>
              {t('workplace.valueTasksDeliveredAgainstValuePlannedFromValueTo', {
                v0: completed,
                v1: planned,
                v2: points[0]?.date ?? '',
                v3: points.at(-1)?.date ?? '',
              })}
            </desc>
            {[0, 5, 10, 15, 20, 25].map((value) => (
              <g key={value}>
                <line x1="44" x2="676" y1={y(value)} y2={y(value)} className={styles.gridLine} />
                <text x="30" y={y(value) + 4} textAnchor="end" className={styles.chartLabel}>
                  {value}
                </text>
              </g>
            ))}
            <path d={area} className={styles.chartArea} />
            <polyline points={line('planned')} className={styles.plannedLine} />
            <polyline points={line('completed')} className={styles.completedLine} />
            {points.map((point, index) => (
              <g key={point.date}>
                <circle cx={x(index)} cy={y(point.completed)} r="3.5" className={styles.chartPoint}>
                  <title>
                    {t('workplace.valueValueDeliveredValuePlanned', {
                      v0: formatDueDate(point.date, i18n.language),
                      v1: point.completed,
                      v2: point.planned,
                    })}
                  </title>
                </circle>
                {period === '7d' || index % 2 === 0 || index === points.length - 1 ? (
                  <text x={x(index)} y="216" textAnchor="middle" className={styles.chartLabel}>
                    {formatDueDate(point.date, i18n.language)}
                  </text>
                ) : null}
              </g>
            ))}
          </svg>
          <figcaption className={styles.chartCaption}>
            <span>{t('workplace.dailyCompletedTasks')}</span>
            <span>
              {formatDueDate(points[0]?.date ?? snapshot.date, i18n.language)} —{' '}
              {formatDueDate(points.at(-1)?.date ?? snapshot.date, i18n.language)}
            </span>
          </figcaption>
        </figure>
        <div className={styles.srOnly}>
          <Table>
            <Table.Caption>{t('workplace.dailyDeliveryData')}</Table.Caption>
            <Table.Header>
              <Table.Row>
                <Table.Head>{t('workplace.date')}</Table.Head>
                <Table.Head>{t('workplace.delivered')}</Table.Head>
                <Table.Head>{t('workplace.planned')}</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {points.map((point) => (
                <Table.Row key={point.date}>
                  <Table.Head scope="row">{point.date}</Table.Head>
                  <Table.Cell>{point.completed}</Table.Cell>
                  <Table.Cell>{point.planned}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}
