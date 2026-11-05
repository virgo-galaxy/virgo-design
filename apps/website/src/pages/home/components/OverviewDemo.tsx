import { Chart } from '@virgo-design/charts';
import { Avatar, Button, Checkbox, Select, Surface, Switch } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from '../home-demo.module.scss';

const series = { week: [20, 34, 51, 44, 41, 61, 73], month: [18, 28, 36, 52, 47, 68, 86] };
const people = ['AL', 'CY', 'MK'];
const taskNames = ['update', 'docs', 'tokens'] as const;
type Status = 'progress' | 'done' | 'todo';

export function OverviewDemo({
  detailed = false,
  appearance,
  height = detailed ? 190 : 180,
}: {
  detailed?: boolean;
  appearance?: 'light' | 'dark';
  height?: number;
}) {
  const { t, i18n } = useTranslation();
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  const [statuses, setStatuses] = useState<Status[]>(['done', 'progress', 'todo']);
  const [showCompleted, setShowCompleted] = useState(true);
  const weekdays = new Intl.DateTimeFormat(i18n.language, { weekday: 'short', timeZone: 'UTC' });
  const data = series[period].map((value, index) => ({
    label:
      period === 'week'
        ? weekdays.format(new Date(Date.UTC(2025, 1, 24 + index)))
        : `${index * 4 + 1}`,
    value,
  }));
  const updateStatus = (index: number, status: Status) =>
    setStatuses((current) => current.map((item, i) => (i === index ? status : item)));

  return (
    <Surface
      className={styles.overview!}
      tone="elevated"
      border="subtle"
      radius={16}
      elevation={detailed ? 0 : 2}
      data-theme={appearance}
    >
      <div className={styles.overviewHeader}>
        <h3>{t('home.demo.overview')}</h3>
        <Button.Group size="mini" aria-label={t('home.demo.period')}>
          {(['week', 'month'] as const).map((value) => (
            <Button
              key={value}
              size="mini"
              variant={period === value ? 'secondary' : 'text'}
              aria-pressed={period === value}
              onClick={() => setPeriod(value)}
            >
              {t(`home.demo.${value}`)}
            </Button>
          ))}
        </Button.Group>
      </div>
      <Chart.Root
        data={data}
        title={t('home.demo.overview')}
        locale={i18n.language}
        height={height}
        animated={false}
      >
        <Chart.Responsive height={height}>
          <Chart.Cartesian>
            <Chart.Grid />
            <Chart.XAxis dataKey="label" />
            <Chart.YAxis domain={[0, 100]} />
            <Chart.Area dataKey="value" name={t('home.demo.activity')} curve="smooth" />
            <Chart.Tooltip />
          </Chart.Cartesian>
        </Chart.Responsive>
      </Chart.Root>
      {detailed ? (
        <>
          <div className={styles.overviewTasks}>
            {taskNames.map((name, index) =>
              !showCompleted && statuses[index] === 'done' ? null : (
                <div className={styles.taskRow} key={name}>
                  <Checkbox
                    aria-label={t('home.demo.complete', { task: t(`home.demo.${name}`) })}
                    checked={statuses[index] === 'done'}
                    onChange={(event) =>
                      updateStatus(index, event.target.checked ? 'done' : 'progress')
                    }
                  />
                  <span className={styles.taskTitle}>{t(`home.demo.${name}`)}</span>
                  <Avatar
                    fallback={people[index]}
                    size="sm"
                    className={styles.avatar}
                    aria-hidden="true"
                  />
                  <div className={styles.status} data-status={statuses[index]}>
                    <Select
                      size="small"
                      value={statuses[index]}
                      onValueChange={(value) => updateStatus(index, value as Status)}
                    >
                      <Select.Trigger
                        aria-label={t('home.demo.status', { task: t(`home.demo.${name}`) })}
                      />
                      <Select.Content>
                        {(['done', 'progress', 'todo'] as const).map((value) => (
                          <Select.Option key={value} value={value}>
                            {t(`home.demo.${value}`)}
                          </Select.Option>
                        ))}
                      </Select.Content>
                    </Select>
                  </div>
                </div>
              ),
            )}
          </div>
          <div className={styles.overviewFooter}>
            <span aria-live="polite">
              {t('home.demo.completed', {
                count: statuses.filter((status) => status === 'done').length,
              })}
            </span>
            <Switch size="small" checked={showCompleted} onCheckedChange={setShowCompleted}>
              {t('home.demo.showCompleted')}
            </Switch>
          </div>
        </>
      ) : null}
    </Surface>
  );
}
