import { ClockIcon } from '@virgo-design/icons';
import { TimePicker as PrimitiveTimePicker } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import styles from './TimePicker.module.scss';
import type { TimePickerProps } from './TimePicker.types';
export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(function TimePicker(
  { size = 'medium', className, ...props },
  ref,
) {
  return (
    <span className={styles.wrapper} data-size={size}>
      <PrimitiveTimePicker
        {...props}
        ref={ref}
        data-size={size}
        className={[styles.root, className].filter(Boolean).join(' ')}
      />
      <ClockIcon size={20} className={styles.icon} />
    </span>
  );
});
