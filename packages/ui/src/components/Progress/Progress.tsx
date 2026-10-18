import { forwardRef, useId } from 'react';

import type { ProgressProps } from './Progress.types';

import styles from './Progress.module.scss';

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

function finiteOr(value: number, fallback: number) {
  return Number.isFinite(value) ? value : fallback;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  {
    value,
    max = 100,
    size = 'md',
    intent = 'default',
    label,
    showValue = false,
    className,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-valuetext': ariaValueText,
    ...props
  },
  ref,
) {
  const labelId = useId();
  const normalizedMax = Number.isFinite(max) && max > 0 ? max : 100;
  const normalizedValue = Math.min(Math.max(finiteOr(value, 0), 0), normalizedMax);
  const percentage = (normalizedValue / normalizedMax) * 100;
  const displayedPercentage = Math.round(percentage);

  return (
    <div
      {...props}
      ref={ref}
      className={classes(styles.root, className)}
      data-size={size}
      data-intent={intent}
    >
      {label !== undefined || showValue ? (
        <div className={styles.header}>
          {label !== undefined ? (
            <span id={labelId} className={styles.label}>
              {label}
            </span>
          ) : (
            <span />
          )}
          {showValue ? <span className={styles.value}>{displayedPercentage}%</span> : null}
        </div>
      ) : null}
      <div
        className={styles.track}
        role="progressbar"
        aria-label={ariaLabel}
        aria-labelledby={
          ariaLabelledBy ?? (ariaLabel === undefined && label !== undefined ? labelId : undefined)
        }
        aria-valuetext={ariaValueText}
        aria-valuemin={0}
        aria-valuemax={normalizedMax}
        aria-valuenow={normalizedValue}
      >
        <div className={styles.indicator} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
});

Progress.displayName = 'Progress';
