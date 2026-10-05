import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@virgo-design/icons';
import { Button, Calendar, Dialog, Select } from '@virgo-design/ui';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useProData } from '@/application/pro-data-context';
import calendarChartArtwork from '@/assets/illustrations/calendar-chart.svg';

import { buildTokenUsageCalendar, formatTokenCount } from './token-usage-calendar';
import styles from './WorkplacePage.module.scss';

const highUsageThreshold = 100000000;

export function TokenUsageCalendar() {
  const { tokenUsage, snapshot } = useProData();
  const { t, i18n } = useTranslation();
  const openingDate = `${snapshot.date.slice(0, 4)}-09-07`;
  const [month, setMonth] = useState(openingDate.slice(0, 7));
  const [selected, setSelected] = useState(openingDate);
  const { year, days } = useMemo(
    () => buildTokenUsageCalendar(snapshot.date, tokenUsage),
    [snapshot.date, tokenUsage],
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
              <Dialog.Description>{t('workplace.annualTokenUsageDescription')}</Dialog.Description>
            </div>
            <Dialog.Close aria-label={t('workplace.closeTokenCalendar')} variant="text">
              <CloseIcon />
            </Dialog.Close>
          </Dialog.Header>
          <Dialog.Body>
            <div className={styles.tokenMonthSummary}>
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
                    aria-label={t('shared.controls.previousMonth')}
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
                    <Select.Trigger aria-label={t('shared.controls.chooseMonth')}>
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
                    aria-label={t('shared.controls.nextMonth')}
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
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
