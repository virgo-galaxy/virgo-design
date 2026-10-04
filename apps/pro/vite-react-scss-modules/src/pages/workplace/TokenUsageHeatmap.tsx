import { Card, Surface, Tooltip } from '@virgo-design/ui';
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

import { useProData } from '@/application/pro-data-context';

import { buildTokenUsageCalendar, formatTokenCount, tokenUsageLevel } from './token-usage-calendar';
import styles from './WorkplacePage.module.scss';

type UsageDay = ReturnType<typeof buildTokenUsageCalendar>['days'][number];
const TokenUsageCell = memo(function TokenUsageCell({
  day,
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
      className={styles.heatmapCell}
      disabled={day.future}
      openDelay={0}
      closeOnClick={false}
      style={{ gridColumn: day.week + 1, gridRow: day.weekday + 1 }}
    >
      <Tooltip.Trigger
        render={(props) => <button {...props} />}
        className={styles.heatmapDay}
        data-level={tokenUsageLevel(day.tokens)}
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
      <Tooltip.Content className={styles.heatmapTooltip} placement="top" offset={10} arrow={false}>
        <Surface
          material="glass"
          tone="elevated"
          radius={8}
          elevation={2}
          className={styles.heatmapTooltipSurface}
        >
          <time dateTime={day.date}>{tooltipDate}</time>
          <strong>{tooltipValue}</strong>
        </Surface>
      </Tooltip.Content>
    </Tooltip>
  );
});

export function TokenUsageHeatmap() {
  const { tokenUsage, snapshot } = useProData();
  const { t, i18n } = useTranslation();
  const { year, days, weeks } = useMemo(
    () => buildTokenUsageCalendar(snapshot.date, tokenUsage),
    [snapshot.date, tokenUsage],
  );
  const [selectedDate, setSelectedDate] = useState(snapshot.date);
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
    <Card variant="outlined" className={styles.heatmapCard}>
      <Card.Header className={styles.panelHeader}>
        <div>
          <Card.Title as="h2">{t('workplace.annualTokenUsage')}</Card.Title>
          <Card.Description>{t('workplace.annualTokenUsageDescription')}</Card.Description>
        </div>
        <span className={styles.heatmapYear}>{year}</span>
      </Card.Header>
      <Card.Body>
        <div className={styles.heatmapViewport}>
          <div
            className={styles.heatmapCalendar}
            style={{ '--heatmap-weeks': weeks } as CSSProperties}
          >
            <div className={styles.heatmapMonths} aria-hidden="true">
              {months.map((day) => (
                <span key={day.date} style={{ gridColumn: `${day.week + 1} / span 3` }}>
                  {monthName.format(new Date(`${day.date}T00:00:00Z`))}
                </span>
              ))}
            </div>
            <div className={styles.heatmapWeekdays} aria-hidden="true">
              {[0, 2, 4].map((day) => (
                <span key={day} style={{ gridRow: day + 1 }}>
                  {weekdayName.format(new Date(Date.UTC(2024, 0, 1 + day)))}
                </span>
              ))}
            </div>
            <div
              className={styles.heatmapDays}
              role="group"
              aria-label={t('workplace.tokenUsageCalendar', { year })}
            >
              {days.map((day, index) => (
                <TokenUsageCell
                  key={day.date}
                  day={day}
                  index={index}
                  label={dayLabel(day)}
                  tooltipDate={dayLabels.get(day.date)!.date}
                  tooltipValue={dayLabels.get(day.date)!.value}
                  selected={selectedDate === day.date}
                  buttons={dayButtons}
                  onSelect={setSelectedDate}
                  onInspect={setInspectedDate}
                  onNavigate={navigateDay}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.heatmapFooter}>
          <span aria-live="polite">
            {inspected
              ? dayLabel(inspected)
              : t('workplace.tokenUsageSummary', {
                  tokens: formatTokenCount(total, i18n.language),
                  days: activeDays,
                })}
          </span>
          <div className={styles.heatmapLegend} aria-label={t('workplace.tokenUsageIntensity')}>
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
