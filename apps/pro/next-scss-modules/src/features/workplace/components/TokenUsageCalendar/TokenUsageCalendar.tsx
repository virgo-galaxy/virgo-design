import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@virgo-design/icons';
import { Button, Calendar, Dialog, SegmentedControl, Select } from '@virgo-design/ui';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { TokenUsageReportDto } from '@/api/analytics/types';
import calendarChartArtworkAsset from '@/assets/illustrations/calendar-chart.svg';
import { ResourceContent } from '@/components/feedback/resource-content';
import { CatalogBoundary, projectName, useTaskCatalog } from '@/features/catalog';
import { businessLabel } from '@/lib/formatting/business-labels';

import { useTokenUsageResource } from '../../data/token-usage-context';
import {
  buildTokenUsageCalendar,
  formatTokenCount,
  latestTokenUsageDate,
} from '../../model/token-usage-calendar';

import styles from './TokenUsageCalendar.module.scss';

const calendarChartArtwork = calendarChartArtworkAsset.src;

const highUsageThreshold = 100000;

function TokenUsageCalendarView({
  year: reportYear,
  onYearChange,
  report,
}: {
  report: TokenUsageReportDto;
  year: number;
  onYearChange: (year: number) => void;
}) {
  const { tokenUsage, referenceDate, tokenRecords, reportingYears, reportingScope } = report;
  const { projects, metadata } = useTaskCatalog();
  const taskAssignees = metadata.members;
  const { t, i18n } = useTranslation();

  const openingDate = latestTokenUsageDate(referenceDate, tokenUsage, reportYear);
  const [selectedMonth, setMonth] = useState(openingDate.slice(0, 7));
  const month = selectedMonth.startsWith(String(reportYear))
    ? selectedMonth
    : openingDate.slice(0, 7);
  const [selectedDate, setSelected] = useState(openingDate);
  const selected = selectedDate.startsWith(String(reportYear)) ? selectedDate : openingDate;

  const dayRecords = tokenRecords
    .filter((record) => record.recordedAt.slice(0, 10) === selected)
    .sort((a, b) => b.recordedAt.localeCompare(a.recordedAt));

  const { year, days } = useMemo(
    () => buildTokenUsageCalendar(referenceDate, tokenUsage, reportYear),
    [referenceDate, tokenUsage, reportYear],
  );
  const records = useMemo(() => new Map(days.map((day) => [day.date, day])), [days]);
  const total = days
    .filter((day) => day.date.startsWith(month))
    .reduce((sum, day) => sum + day.tokens, 0);

  const fullMonth = new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${month}-01T00:00:00Z`));
  const monthName = new Intl.DateTimeFormat(i18n.language, { month: 'short', timeZone: 'UTC' });
  const months = Array.from(
    { length: 12 },
    (_, index) => `${year}-${String(index + 1).padStart(2, '0')}`,
  );
  const monthIndex = months.indexOf(month);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) {
          setMonth(openingDate.slice(0, 7));
          setSelected(openingDate);
        }
      }}
    >
      <Dialog.Trigger
        className={styles.calendarTrigger}
        aria-label={t('workplace.openTokenCalendar')}
        render={(props) => <button {...props} />}
      >
        <img src={calendarChartArtwork} alt="" width={160} height={128} aria-hidden="true" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content size="md" className={styles.tokenCalendarDialog}>
          <Dialog.Header className={styles.tokenCalendarHeader}>
            <div>
              <Dialog.Title>{t('workplace.monthlyTokenCalendar')}</Dialog.Title>
              <Dialog.Description>
                {t(`workplace.tokenScopes.${reportingScope}`)}
              </Dialog.Description>
            </div>
            <Dialog.Close aria-label={t('workplace.closeTokenCalendar')} variant="text">
              <CloseIcon />
            </Dialog.Close>
          </Dialog.Header>
          <Dialog.Body>
            <div className={styles.tokenMonthSummary}>
              <SegmentedControl
                size="small"
                variant="soft"
                motion="slide"
                className={styles.yearSwitch!}
                aria-label={t('workplace.reportingYear')}
                value={String(year)}
                onValueChange={(value) => onYearChange(Number(value))}
              >
                {reportingYears.map((year) => (
                  <SegmentedControl.Item key={year} value={String(year)}>
                    {year}
                  </SegmentedControl.Item>
                ))}
              </SegmentedControl>
              <span>{fullMonth}</span>
              <strong>
                {t('workplace.tokenUsageValue', { tokens: formatTokenCount(total, i18n.language) })}
              </strong>
            </div>
            <Calendar
              fullscreen
              fixedWeeks
              size="medium"
              className={styles.tokenMonthCalendar}
              locale={i18n.language}
              weekStartsOn={1}
              month={month}
              onMonthChange={setMonth}
              value={selected}
              onValueChange={setSelected}
              min={`${year}-01-01`}
              max={`${year}-12-31`}
              renderHeader={({ onMonthChange }) => (
                <Button.Group layout="custom" className={styles.tokenCalendarControls}>
                  <Button
                    iconOnly
                    size="medium"
                    variant="text"
                    aria-label={t('workplace.previousMonth')}
                    disabled={monthIndex <= 0}
                    onClick={() => {
                      const previous = months[monthIndex - 1];
                      if (previous) onMonthChange(previous);
                    }}
                  >
                    <ChevronLeftIcon />
                  </Button>
                  <Select
                    size="medium"
                    value={month}
                    onValueChange={(next) => {
                      if (next) onMonthChange(next);
                    }}
                  >
                    <Select.Trigger aria-label={t('workplace.chooseMonth')}>
                      {monthName.format(new Date(`${month}-01T00:00:00Z`))}
                    </Select.Trigger>
                    <Select.Content className={styles.tokenCalendarMonthOptions}>
                      {months.map((entry) => (
                        <Select.Option key={entry} value={entry}>
                          {monthName.format(new Date(`${entry}-01T00:00:00Z`))}
                        </Select.Option>
                      ))}
                    </Select.Content>
                  </Select>
                  <Button
                    iconOnly
                    size="medium"
                    variant="text"
                    aria-label={t('workplace.nextMonth')}
                    disabled={monthIndex >= 11}
                    onClick={() => {
                      const next = months[monthIndex + 1];
                      if (next) onMonthChange(next);
                    }}
                  >
                    <ChevronRightIcon />
                  </Button>
                </Button.Group>
              )}
              renderDateContent={(date) => {
                if (!date.startsWith(month)) return null;

                const day = records.get(date);
                const tokens = day?.tokens ?? 0;
                const amount = day?.future ? '—' : formatTokenCount(tokens, i18n.language);
                const unit = day?.future ? '' : (amount.match(/[^\d.,]+$/)?.[0] ?? '');

                return (
                  <span
                    data-token-level={
                      day?.future
                        ? 'future'
                        : tokens === 0
                          ? 'zero'
                          : tokens >= highUsageThreshold
                            ? 'high'
                            : 'normal'
                    }
                  >
                    <span className={styles.tokenFullAmount}>{amount}</span>
                    <span className={styles.tokenShortAmount}>
                      {unit ? amount.slice(0, -unit.length) : amount}
                    </span>
                    <span className={styles.tokenCalendarUnit}>
                      {day?.future ? (
                        t('workplace.tokenNotRecorded')
                      ) : (
                        <>
                          <span className={styles.tokenShortUnit}>{unit} </span>Token
                        </>
                      )}
                    </span>
                  </span>
                );
              }}
            />
            <div className={styles.tokenCalendarLegend}>
              <span data-token-level="zero">{t('workplace.tokenCalendarZero')}</span>
              <span data-token-level="normal">
                {t('workplace.tokenCalendarNormal', {
                  tokens: formatTokenCount(highUsageThreshold, i18n.language),
                })}
              </span>
              <span data-token-level="high">
                {t('workplace.tokenCalendarHigh', {
                  tokens: formatTokenCount(highUsageThreshold, i18n.language),
                })}
              </span>
            </div>
            <section className={styles.tokenRecordSection} aria-label={t('workplace.tokenRecords')}>
              <h3>
                {t('workplace.tokenRecords')} · {selected}
              </h3>
              <p>
                {t('workplace.tokenRecordSummary', {
                  count: dayRecords.length,
                  input: formatTokenCount(
                    dayRecords.reduce((sum, record) => sum + record.inputTokens, 0),
                    i18n.language,
                  ),
                  output: formatTokenCount(
                    dayRecords.reduce((sum, record) => sum + record.outputTokens, 0),
                    i18n.language,
                  ),
                })}
              </p>
              <ul>
                {dayRecords.length ? (
                  dayRecords.map((record) => (
                    <li key={record.id}>
                      <span>
                        <strong>{t(`notifications.inbox.kinds.${record.kind}`)}</strong>
                        <span>{businessLabel(record.taskTitle, i18n.language)}</span>
                        <small>
                          {businessLabel(
                            taskAssignees.find((person) => person.id === record.userId)?.name ??
                              'Admin',
                            i18n.language,
                          )}{' '}
                          · {businessLabel(projectName(record.project, projects), i18n.language)}
                        </small>
                      </span>
                      <span>
                        {formatTokenCount(record.inputTokens + record.outputTokens, i18n.language)}{' '}
                        Token
                      </span>
                    </li>
                  ))
                ) : (
                  <li>{t('workplace.noTokenRecords')}</li>
                )}
              </ul>
              <p className={styles.tokenDemoNote}>{t('workplace.tokenDemoNote')}</p>
            </section>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

export function TokenUsageCalendar(props: {
  year: number | null;
  onYearChange: (year: number) => void;
}) {
  const resource = useTokenUsageResource();

  return (
    <ResourceContent resource={resource}>
      {(report) => (
        <CatalogBoundary>
          <TokenUsageCalendarView
            report={report}
            year={props.year ?? Number(report.referenceDate.slice(0, 4))}
            onYearChange={props.onYearChange}
          />
        </CatalogBoundary>
      )}
    </ResourceContent>
  );
}
