import { Card, SegmentedControl, Tooltip } from '@virgo-design/ui';
import {
  type CSSProperties,
  memo,
  type RefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import type { TokenUsageReportDto } from '@/api/analytics/types';
import { ResourceContent } from '@/components/feedback/resource-content';

import { useTokenUsageResource } from '../../data/token-usage-context';
import {
  buildTokenUsageCalendar,
  formatTokenCount,
  tokenUsageScale,
} from '../../model/token-usage-calendar';

type UsageDay = ReturnType<typeof buildTokenUsageCalendar>['days'][number];

const TokenUsageCell = memo(function TokenUsageCell({
  day,
  level,
  index,
  label,
  tooltipDate,
  tooltipValue,
  selected,
  buttons,
  onSelect,
  onInspect,
  onNavigate,
}: {
  day: UsageDay;
  level: number;
  index: number;
  label: string;
  tooltipDate: string;
  tooltipValue: string;
  selected: boolean;
  buttons: RefObject<Map<string, HTMLButtonElement>>;
  onSelect: (date: string) => void;
  onInspect: (date: string | null) => void;
  onNavigate: (key: string, index: number) => boolean;
}) {
  return (
    <Tooltip
      className="block min-w-0 [aspect-ratio:1]"
      disabled={day.future}
      openDelay={0}
      closeOnClick={false}
      style={{ gridColumn: day.week + 1, gridRow: day.weekday + 1 }}
    >
      <Tooltip.Trigger
        render={(props) => <button {...props} />}
        className={[
          'block w-full h-full [aspect-ratio:1] min-w-0 p-0 [border:var(--vd-stroke-width,_1px)_solid_var(--vd-border-subtle)]',
          '[border-radius:var(--vd-shape-radius-4,_3px)] cursor-pointer',
          'hover:[outline:2px_solid_var(--vd-brand-primary)] hover:[outline-offset:1px] focus-visible:[outline:2px_solid_var(--vd-brand-primary)]',
          'focus-visible:[outline-offset:1px] [&[data-future]]:[opacity:0.45] [&[data-future]]:[cursor:default]',
        ].join(' ')}
        data-level={level}
        data-future={day.future || undefined}
        ref={(node) => {
          if (node) buttons.current.set(day.date, node);
          else buttons.current.delete(day.date);
        }}
        tabIndex={selected ? 0 : -1}
        aria-label={label}
        onMouseEnter={() => onInspect(day.date)}
        onMouseLeave={() => onInspect(null)}
        onFocus={() => {
          onSelect(day.date);
          onInspect(day.date);
        }}
        onBlur={() => onInspect(null)}
        onKeyDown={(event) => {
          if (onNavigate(event.key, index)) event.preventDefault();
        }}
      />
      <Tooltip.Content
        className={[
          '[&[data-size]]:[--tooltip-background:var(--vd-chart-tooltip-surface,_var(--vd-surface-elevated))]',
          '[&[data-size]]:[--tooltip-foreground:var(--vd-text-primary)]',
          '[&[data-size]]:[--vd-tooltip-backdrop-filter:var(--vd-chart-tooltip-backdrop-filter,_none)]',
          '[&[data-size]]:[--material-radius:var(--vd-chart-tooltip-radius,_var(--vd-shape-radius-8,_var(--vd-radius-8)))]',
          '[&[data-size]]:[min-width:160px] [&[data-size]]:p-12',
          '[&[data-size]]:[border:var(--vd-stroke-width,_1px)_solid_var(--vd-chart-tooltip-border,_var(--vd-border-subtle))]',
          '[&[data-size]]:[border-radius:var(--material-radius)] [&[data-size]]:[box-shadow:var(--vd-chart-tooltip-shadow,_var(--vd-elevation-2))]',
          '[&[data-size]]:pointer-events-none [&[data-size]_time]:block [&[data-size]_time]:text-text-secondary',
          '[&[data-size]_time]:text-(length:--vd-font-size-12) [&[data-size]_strong]:block [&[data-size]_strong]:mt-8',
          '[&[data-size]_strong]:text-(length:--vd-font-size-14) [&[data-size]_strong]:[font-weight:var(--vd-font-weight-500)]',
          '[&[data-size]_strong]:tabular-nums',
        ].join(' ')}
        placement="top"
        offset={10}
        arrow={false}
      >
        <time dateTime={day.date}>{tooltipDate}</time>
        <strong>{tooltipValue}</strong>
      </Tooltip.Content>
    </Tooltip>
  );
});

function TokenUsageHeatmapView({
  year: reportYear,
  onYearChange,
  report,
}: {
  report: TokenUsageReportDto;
  year: number;
  onYearChange: (year: number) => void;
}) {
  const { tokenUsage, referenceDate, reportingYears, reportingScope } = report;
  const { t, i18n } = useTranslation();
  const { year, days, weeks } = useMemo(
    () => buildTokenUsageCalendar(referenceDate, tokenUsage, reportYear),
    [referenceDate, tokenUsage, reportYear],
  );
  const usageLevel = useMemo(() => tokenUsageScale(days.map((day) => day.tokens)), [days]);

  const [selectedDate, setSelectedDate] = useState(referenceDate);
  const focusedDate = selectedDate.startsWith(String(year))
    ? selectedDate
    : year < Number(referenceDate.slice(0, 4))
      ? `${year}-12-31`
      : `${year}-01-01`;
  const [inspectedDate, setInspectedDate] = useState<string | null>(null);
  const dayButtons = useRef(new Map<string, HTMLButtonElement>());

  const lastRecordedIndex = days.filter((day) => !day.future).length - 1;

  const navigateDay = useCallback(
    (key: string, index: number) => {
      const step = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 }[key];
      const next =
        key === 'Home'
          ? 0
          : key === 'End'
            ? lastRecordedIndex
            : step !== undefined
              ? Math.max(0, Math.min(lastRecordedIndex, index + step))
              : null;

      if (next === null) return false;

      dayButtons.current.get(days[next]!.date)?.focus();

      return true;
    },
    [days, lastRecordedIndex],
  );

  const activeDays = days.filter((day) => day.tokens > 0).length;
  const total = days.reduce((sum, day) => sum + day.tokens, 0);
  const monthName = new Intl.DateTimeFormat(i18n.language, { month: 'short', timeZone: 'UTC' });
  const weekdayName = new Intl.DateTimeFormat(i18n.language, { weekday: 'short', timeZone: 'UTC' });

  const dayLabels = useMemo(() => {
    const fullDate = new Intl.DateTimeFormat(i18n.language, { dateStyle: 'long', timeZone: 'UTC' });
    const shortDate = new Intl.DateTimeFormat(i18n.language, {
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });
    const exactCount = new Intl.NumberFormat(i18n.language);

    return new Map(
      days.map((day) => [
        day.date,
        {
          label: t(day.future ? 'workplace.tokenUsageFuture' : 'workplace.tokenUsageDay', {
            date: fullDate.format(new Date(`${day.date}T00:00:00Z`)),
            tokens: formatTokenCount(day.tokens, i18n.language),
            exact: exactCount.format(day.tokens),
          }),
          date: shortDate.format(new Date(`${day.date}T00:00:00Z`)),
          value: t('workplace.tokenUsageValue', {
            tokens: formatTokenCount(day.tokens, i18n.language),
          }),
        },
      ]),
    );
  }, [days, i18n.language, t]);

  const dayLabel = (day: UsageDay) => dayLabels.get(day.date)!.label;
  const inspected = days.find((day) => day.date === inspectedDate);
  const months = days.filter((day) => day.date.endsWith('-01'));

  return (
    <Card
      variant="outlined"
      className={[
        'data-[size=md]:[align-content:start] data-[size=md]:[--card-padding:var(--vd-spacing-20)]',
        'data-[size=md]:[--card-title-font-size:var(--vd-font-size-14)] data-[size=md]:[--card-gap:var(--vd-spacing-20)]',
        '[--usage-empty:var(--vd-fill-hover)] [--usage-1:var(--vd-data-sequential-2)] [--usage-2:var(--vd-data-sequential-3)]',
        '[--usage-3:var(--vd-data-sequential-4)] [--usage-4:var(--vd-data-sequential-6)]',
        "[&_[data-level='0']]:[background:var(--usage-empty)] [&_[data-level='1']]:[background:var(--usage-1)]",
        "[&_[data-level='2']]:[background:var(--usage-2)] [&_[data-level='3']]:[background:var(--usage-3)]",
        "[&_[data-level='4']]:[background:var(--usage-4)]",
      ].join(' ')}
    >
      <Card.Header className="flex-wrap flex justify-between items-start gap-12 viewport-max-640:flex-wrap">
        <div>
          <Card.Title as="h2">
            {t(
              reportingScope === 'personal'
                ? 'workplace.personalAnnualTokenUsage'
                : 'workplace.annualTokenUsage',
            )}
          </Card.Title>
          <Card.Description>{t(`workplace.tokenScopes.${reportingScope}`)}</Card.Description>
        </div>
        <SegmentedControl
          size="small"
          variant="soft"
          motion="slide"
          className="[flex:0_0_auto] w-fit [&&]:ms-auto"
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
      </Card.Header>
      <Card.Body>
        <div className="overflow-x-auto [scrollbar-width:thin] py-4">
          <div
            className="grid [grid-template-columns:32px_minmax(0,_1fr)] [grid-template-rows:auto_auto] gap-8 [min-width:800px] p-2"
            style={{ '--heatmap-weeks': weeks } as CSSProperties}
          >
            <div
              className={[
                'grid [grid-template-columns:repeat(var(--heatmap-weeks),_minmax(0,_1fr))] [gap:4px] [grid-column:2] text-text-tertiary',
                'text-(length:--vd-font-size-11)',
                '[&_span]:whitespace-nowrap',
              ].join(' ')}
              aria-hidden="true"
            >
              {months.map((day) => (
                <span key={day.date} style={{ gridColumn: `${day.week + 1} / span 3` }}>
                  {monthName.format(new Date(`${day.date}T00:00:00Z`))}
                </span>
              ))}
            </div>
            <div
              className="grid [grid-template-rows:repeat(7,_minmax(0,_1fr))] [gap:4px] items-center text-text-tertiary [font-size:var(--vd-font-size-10)]"
              aria-hidden="true"
            >
              {[0, 2, 4].map((day) => (
                <span key={day} style={{ gridRow: day + 1 }}>
                  {weekdayName.format(new Date(Date.UTC(2024, 0, 1 + day)))}
                </span>
              ))}
            </div>
            <div
              className="grid [grid-template-columns:repeat(var(--heatmap-weeks),_minmax(0,_1fr))] [gap:4px] [grid-column:2] [grid-template-rows:repeat(7,_minmax(0,_1fr))]"
              role="group"
              aria-label={t('workplace.tokenUsageCalendar', { year })}
            >
              {days.map((day, index) => (
                <TokenUsageCell
                  key={day.date}
                  day={day}
                  level={usageLevel(day.tokens)}
                  index={index}
                  label={dayLabel(day)}
                  tooltipDate={dayLabels.get(day.date)!.date}
                  tooltipValue={dayLabels.get(day.date)!.value}
                  selected={focusedDate === day.date}
                  buttons={dayButtons}
                  onSelect={setSelectedDate}
                  onInspect={setInspectedDate}
                  onNavigate={navigateDay}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-12 [min-height:36px] [margin-block-start:var(--vd-spacing-12)] text-text-tertiary [font-size:var(--vd-font-size-11)]">
          <span aria-live="polite">
            {inspected
              ? dayLabel(inspected)
              : t('workplace.tokenUsageSummary', {
                  year,
                  tokens: formatTokenCount(total, i18n.language),
                  days: activeDays,
                })}
          </span>
          <div
            className={[
              '[&_i]:[width:11px] [&_i]:[height:11px] [&_i]:[border:var(--vd-stroke-width,_1px)_solid_var(--vd-border-subtle)]',
              '[&_i]:[border-radius:var(--vd-shape-radius-4,_2px)]',
              'flex flex-none items-center gap-4',
            ].join(' ')}
            aria-label={t('workplace.tokenUsageIntensity')}
          >
            <span>{t('workplace.lessUsage')}</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <i key={level} data-level={level} aria-hidden="true" />
            ))}
            <span>{t('workplace.moreUsage')}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export function TokenUsageHeatmap(props: {
  year: number | null;
  onYearChange: (year: number) => void;
}) {
  const resource = useTokenUsageResource();

  return (
    <ResourceContent resource={resource}>
      {(report) => (
        <TokenUsageHeatmapView
          report={report}
          year={props.year ?? Number(report.referenceDate.slice(0, 4))}
          onYearChange={props.onYearChange}
        />
      )}
    </ResourceContent>
  );
}
