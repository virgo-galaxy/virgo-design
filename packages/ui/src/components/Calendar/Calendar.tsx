import { ChevronLeftIcon, ChevronRightIcon } from '@virgo-design/icons';
import { Calendar as PrimitiveCalendar } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import { useLocale } from '../../locale/context/locale-context';
import styles from './Calendar.module.scss';
import type { CalendarProps } from './Calendar.types';
import { CalendarHeader } from './CalendarHeader';

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  { size = 'medium', fullscreen = false, renderHeader, className, ...props },
  ref,
) {
  const { calendar: labels, locale: defaultLocale } = useLocale();
  const locale = props.locale ?? defaultLocale;

  return (
    <PrimitiveCalendar
      previousMonthLabel={labels.previousMonth}
      nextMonthLabel={labels.nextMonth}
      previousYearLabel={labels.previousYear}
      nextYearLabel={labels.nextYear}
      previousMonthContent={<ChevronLeftIcon size={16} />}
      nextMonthContent={<ChevronRightIcon size={16} />}
      {...props}
      locale={locale}
      renderHeader={
        renderHeader ??
        (fullscreen ? (header) => <CalendarHeader {...header} locale={locale} /> : undefined)
      }
      ref={ref}
      data-size={size}
      data-fullscreen={fullscreen}
      className={[styles.root, className].filter(Boolean).join(' ')}
    />
  );
});
