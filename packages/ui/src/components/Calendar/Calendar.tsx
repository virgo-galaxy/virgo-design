import { ChevronLeftIcon, ChevronRightIcon } from '@virgo-design/icons';
import { Calendar as PrimitiveCalendar } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import { useControlLabels } from '../../shared/control-labels';
import styles from './Calendar.module.scss';
import type { CalendarProps } from './Calendar.types';
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  { size = 'medium', className, ...props },
  ref,
) {
  const labels = useControlLabels();
  return (
    <PrimitiveCalendar
      previousMonthLabel={labels.previousMonth}
      nextMonthLabel={labels.nextMonth}
      previousMonthContent={<ChevronLeftIcon size={16} />}
      nextMonthContent={<ChevronRightIcon size={16} />}
      {...props}
      ref={ref}
      data-size={size}
      className={[styles.root, className].filter(Boolean).join(' ')}
    />
  );
});
