import { forwardRef } from 'react';

import { Button } from '../Button';
import styles from './Steps.module.scss';
import type {
  StepsDescriptionProps,
  StepsIndicatorProps,
  StepsItemProps,
  StepsProps,
  StepsTitleProps,
  StepsTriggerProps,
} from './Steps.types';
const classes = (...values: Array<string | undefined>) => values.filter(Boolean).join(' ');
export const StepsRoot = forwardRef<HTMLOListElement, StepsProps>(function Steps(
  { orientation = 'horizontal', className, ...props },
  ref,
) {
  return (
    <ol
      role="list"
      {...props}
      ref={ref}
      data-slot="steps"
      data-orientation={orientation}
      className={classes(styles.root, className)}
    />
  );
});
export const StepsItem = forwardRef<HTMLLIElement, StepsItemProps>(function Item(
  { status = 'upcoming', className, ...props },
  ref,
) {
  return (
    <li
      {...props}
      ref={ref}
      aria-current={status === 'current' ? 'step' : props['aria-current']}
      data-slot="item"
      data-status={status}
      className={classes(styles.item, className)}
    />
  );
});
export const StepsTrigger = forwardRef<HTMLButtonElement, StepsTriggerProps>(function Trigger(
  { className, ...props },
  ref,
) {
  return (
    <Button
      variant="text"
      {...props}
      ref={ref}
      data-slot="trigger"
      className={classes(styles.trigger, className)}
    />
  );
});
export const StepsIndicator = forwardRef<HTMLSpanElement, StepsIndicatorProps>(function Indicator(
  { className, ...props },
  ref,
) {
  return (
    <span
      aria-hidden="true"
      {...props}
      ref={ref}
      data-slot="indicator"
      className={classes(styles.indicator, className)}
    />
  );
});
export const StepsTitle = forwardRef<HTMLSpanElement, StepsTitleProps>(function Title(
  { className, ...props },
  ref,
) {
  return (
    <span {...props} ref={ref} data-slot="title" className={classes(styles.title, className)} />
  );
});
export const StepsDescription = forwardRef<HTMLSpanElement, StepsDescriptionProps>(
  function Description({ className, ...props }, ref) {
    return (
      <span
        {...props}
        ref={ref}
        data-slot="description"
        className={classes(styles.description, className)}
      />
    );
  },
);
