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
        className={[
          'relative flex-none [width:144px] [height:115px] [margin-block:-25px] p-0 [border:0]',
          '[border-radius:var(--vd-shape-radius-8,_var(--vd-radius-8))] [background:transparent] cursor-pointer',
          '[&_img]:block [&_img]:[width:144px] [&_img]:[height:auto] [&_img]:pointer-events-none [&_img]:[transform:translateY(12px)]',
          '[&_img]:[transition:transform_480ms_cubic-bezier(0.22,_1.2,_0.36,_1)] [&:hover_img]:[transform:translateY(2px)]',
          'focus-visible:[outline:var(--vd-border-width-2)_solid_var(--vd-border-focus)] focus-visible:[outline-offset:4px]',
          'viewport-max-640:[width:88px] viewport-max-640:[height:71px] viewport-max-640:[margin-block:-12px] viewport-max-640:[&_img]:[width:88px]',
          'motion-reduce:[&_img]:[transition:none]',
        ].join(' ')}
        aria-label={t('workplace.openTokenCalendar')}
        render={(props) => <button {...props} />}
      >
        <img src={calendarChartArtwork} alt="" width={160} height={128} aria-hidden="true" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          size="md"
          className={[
            'data-[size=md]:[--dialog-width:880px] data-[size=md]:[--dialog-section-padding:var(--vd-spacing-24)]',
            'viewport-max-640:data-[size=md]:[--dialog-section-padding:var(--vd-spacing-12)]',
          ].join(' ')}
        >
          <Dialog.Header className="flex items-start justify-between gap-16">
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
            <div
              className={[
                '[&_strong]:text-text-primary [&_strong]:text-(length:--vd-font-size-24) [&_strong]:[font-weight:var(--vd-font-weight-600)]',
                '[&_strong]:tabular-nums',
                'viewport-max-640:[&_strong]:text-(length:--vd-font-size-20)',
                'flex justify-between items-baseline flex-wrap gap-12 [margin-block-end:var(--vd-spacing-20)] text-text-secondary',
              ].join(' ')}
            >
              <SegmentedControl
                size="small"
                variant="soft"
                motion="slide"
                className="[flex:0_0_auto] w-fit ms-auto"
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
              className={[
                'pro-token-usage-calendar-token-month-calendar',
                "[&[data-fullscreen='true'][data-size]]:[--calendar-day-height:90px] [&[data-fullscreen='true'][data-size]]:p-0",
                "[&[data-fullscreen='true'][data-size]]:[border:0] [&[data-fullscreen='true'][data-size]]:[background:transparent]",
                "[&[data-fullscreen='true'][data-size]_[data-calendar-grid]]:[border-spacing:var(--vd-spacing-6)]",
                "[&[data-fullscreen='true'][data-size]_td]:[border:0] [&[data-fullscreen='true'][data-size]_[data-calendar-date]]:gap-6",
                "[&[data-fullscreen='true'][data-size]_[data-calendar-date]]:items-center",
                "[&[data-fullscreen='true'][data-size]_[data-calendar-date]]:justify-center",
                "[&[data-fullscreen='true'][data-size]_[data-calendar-date]]:[border-radius:var(--vd-shape-radius-8,_var(--vd-radius-8))]",
                "[&[data-fullscreen='true'][data-size]_[data-calendar-date]]:[padding:var(--vd-spacing-8)_var(--vd-spacing-4)]",
                "[&[data-fullscreen='true'][data-size]_[data-calendar-date]:has([data-token-level='normal'])]:bg-status-success-subtle",
                "[&[data-fullscreen='true'][data-size]_[data-calendar-date]:has([data-token-level='normal'])_[data-token-level]]:text-status-success-text",
                "[&[data-fullscreen='true'][data-size]_[data-calendar-date]:has([data-token-level='high'])]:bg-status-danger-subtle",
                "[&[data-fullscreen='true'][data-size]_[data-calendar-date]:has([data-token-level='high'])_[data-token-level]]:text-status-danger-text",
                "[&[data-fullscreen='true'][data-size]_[data-calendar-date]:has([data-token-level='zero'])]:bg-fill-hover",
                "[&[data-fullscreen='true'][data-size]_[data-calendar-date]:has([data-token-level='future'])]:bg-fill-hover",
                "[&[data-fullscreen='true'][data-size]_[data-calendar-date]:has([data-token-level='zero'])_[data-token-level]]:text-text-tertiary",
                "[&[data-fullscreen='true'][data-size]_[data-calendar-date]:has([data-token-level='future'])_[data-token-level]]:text-text-tertiary",
                "[&[data-fullscreen='true'][data-size]_[data-calendar-date-number]]:text-(length:--vd-font-size-18)",
                "[&[data-fullscreen='true'][data-size]_[data-calendar-date-content]]:text-center",
                "[&[data-fullscreen='true'][data-size]_[data-calendar-date-content]]:text-(length:--vd-font-size-14)",
                "[&[data-fullscreen='true'][data-size]_[data-calendar-date-content]]:tabular-nums",
                "[&[data-fullscreen='true'][data-size]_[data-calendar-date-content]]:[font-weight:var(--vd-font-weight-600)]",
                "[&[data-fullscreen='true'][data-size]_td[aria-selected='true']_[data-calendar-date]]:border-brand-primary",
                "[&[data-fullscreen='true'][data-size]_td[aria-selected='true']_[data-calendar-date]]:text-text-primary",
                "[&[data-fullscreen='true'][data-size]_[data-outside='true']]:[opacity:0.4]",
                "[&[data-fullscreen='true'][data-size][data-mode='month']_[data-calendar-date][data-outside='true']]:[border-color:transparent]",
                "viewport-max-640:[&[data-fullscreen='true'][data-size]]:[--calendar-day-height:72px]",
                "viewport-max-640:[&[data-fullscreen='true'][data-size]_[data-calendar-grid]]:[border-spacing:var(--vd-spacing-2)]",
                "viewport-max-640:[&[data-fullscreen='true'][data-size]_[data-calendar-date-number]]:text-(length:--vd-font-size-14)",
                "viewport-max-640:[&[data-fullscreen='true'][data-size]_[data-calendar-date-content]]:text-(length:--vd-font-size-11)",
              ].join(' ')}
              locale={i18n.language}
              weekStartsOn={1}
              month={month}
              onMonthChange={setMonth}
              value={selected}
              onValueChange={setSelected}
              min={`${year}-01-01`}
              max={`${year}-12-31`}
              renderHeader={({ onMonthChange }) => (
                <Button.Group
                  layout="custom"
                  className="flex gap-8 items-center [&_>_div]:[width:auto]"
                >
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
                    <Select.Content className="[min-width:120px]">
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
                    <span className="viewport-max-640:[.pro-token-usage-calendar-token-month-calendar[data-fullscreen='true'][data-size]_&]:hidden">
                      {amount}
                    </span>
                    <span
                      className={[
                        'hidden',
                        "viewport-max-640:[.pro-token-usage-calendar-token-month-calendar[data-fullscreen='true'][data-size]_&]:inline",
                        "viewport-max-640:[.pro-token-usage-calendar-token-month-calendar[data-fullscreen='true'][data-size]_&]:whitespace-nowrap",
                      ].join(' ')}
                    >
                      {unit ? amount.slice(0, -unit.length) : amount}
                    </span>
                    <span
                      className={[
                        "viewport-max-640:[.pro-token-usage-calendar-token-month-calendar[data-fullscreen='true'][data-size]_&]:text-(length:--vd-font-size-10)",
                        "viewport-max-640:[.pro-token-usage-calendar-token-month-calendar[data-fullscreen='true'][data-size]_&]:[letter-spacing:-0.2px]",
                        "viewport-max-640:[.pro-token-usage-calendar-token-month-calendar[data-fullscreen='true'][data-size]_&]:whitespace-nowrap",
                        'block [margin-block-start:var(--vd-spacing-2)] [font-size:var(--vd-font-size-10)] [font-weight:var(--vd-font-weight-400)]',
                      ].join(' ')}
                    >
                      {day?.future ? (
                        t('workplace.tokenNotRecorded')
                      ) : (
                        <>
                          <span className="hidden viewport-max-640:[.pro-token-usage-calendar-token-month-calendar[data-fullscreen='true'][data-size]_&]:inline">
                            {unit}{' '}
                          </span>
                          Token
                        </>
                      )}
                    </span>
                  </span>
                );
              }}
            />
            <div
              className={[
                "[&_>_span]:inline-flex [&_>_span]:items-center [&_>_span]:gap-6 [&_>_span::before]:content-[''] [&_>_span::before]:[width:8px]",
                '[&_>_span::before]:[height:8px] [&_>_span::before]:[border-radius:50%] [&_>_span::before]:[background:var(--vd-text-tertiary)]',
                "[&_>_[data-token-level='normal']::before]:bg-status-success-accent [&_>_[data-token-level='high']::before]:bg-status-danger-accent",
                'flex flex-wrap justify-center gap-16 [margin-block-start:var(--vd-spacing-16)] text-text-secondary [font-size:var(--vd-font-size-12)]',
              ].join(' ')}
            >
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
            <section
              className={[
                '[border-top:1px_solid_var(--vd-border-subtle)]',
                '[&_h3]:[font-size:13px] [&_h3]:[margin:0_0_8px] [&_p]:[font-size:12px] [&_p]:text-text-secondary [&_ul]:[list-style:none]',
                '[&_ul]:[margin:12px_0] [&_ul]:p-0 [&_ul]:[max-height:200px] [&_ul]:overflow-auto [&_li]:flex [&_li]:justify-between [&_li]:[gap:16px]',
                '[&_li]:[padding:10px_0] [&_li]:[border-bottom:1px_solid_var(--vd-border-subtle)] [&_li]:[font-size:12px]',
                '[&_li_>_span:first-child]:min-w-0 [&_li_>_span:first-child]:grid [&_li_>_span:first-child]:[gap:4px]',
                '[&_li_>_span:last-child]:whitespace-nowrap',
                '[margin-top:20px] [padding-top:16px]',
              ].join(' ')}
              aria-label={t('workplace.tokenRecords')}
            >
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
              <p className="mb-0">{t('workplace.tokenDemoNote')}</p>
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
