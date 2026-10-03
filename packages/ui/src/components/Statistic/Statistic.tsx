import { ArrowDownIcon, ArrowUpIcon } from '@virgo-design/icons';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { Skeleton } from '../Skeleton';
import styles from './Statistic.module.scss';
import type { StatisticProps, StatisticTrendProps } from './Statistic.types';
const classes = (...values: (string | undefined)[]) => values.filter(Boolean).join(' ');
const Label = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function StatisticLabel(
  { className, ...props },
  ref,
) {
  return (
    <div {...props} ref={ref} className={classes(styles.label, className)} data-slot="label" />
  );
});
const Value = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function StatisticValue(
  { className, ...props },
  ref,
) {
  return (
    <div {...props} ref={ref} className={classes(styles.value, className)} data-slot="value" />
  );
});
const Description = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function StatisticDescription({ className, ...props }, ref) {
    return (
      <div
        {...props}
        ref={ref}
        className={classes(styles.description, className)}
        data-slot="description"
      />
    );
  },
);
const Trend = forwardRef<HTMLSpanElement, StatisticTrendProps>(function StatisticTrend(
  { direction = 'neutral', intent = 'neutral', className, children, ...props },
  ref,
) {
  return (
    <span
      {...props}
      ref={ref}
      className={classes(styles.trend, className)}
      data-direction={direction}
      data-intent={intent}
    >
      {direction === 'up' ? (
        <ArrowUpIcon aria-hidden="true" size={14} />
      ) : direction === 'down' ? (
        <ArrowDownIcon aria-hidden="true" size={14} />
      ) : null}
      {children}
    </span>
  );
});
const Root = forwardRef<HTMLDivElement, StatisticProps>(function Statistic(
  {
    label,
    value,
    prefix,
    suffix,
    trend,
    description,
    loading = false,
    children,
    className,
    ...props
  },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={classes(styles.root, className)}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
    >
      {children ?? (
        <>
          <dl>
            <dt className={styles.label}>{label}</dt>
            <dd className={styles.value}>
              {loading ? (
                <Skeleton style={{ width: '5em', height: '1em' }} />
              ) : (
                <>
                  {prefix ? <span className={styles.affix}>{prefix}</span> : null}
                  <span>{value}</span>
                  {suffix ? <span className={styles.affix}>{suffix}</span> : null}
                </>
              )}
            </dd>
          </dl>
          {trend ? <div>{trend}</div> : null}
          {description ? <Description>{description}</Description> : null}
        </>
      )}
    </div>
  );
});
export const Statistic = Object.assign(Root, { Root, Label, Value, Trend, Description });
