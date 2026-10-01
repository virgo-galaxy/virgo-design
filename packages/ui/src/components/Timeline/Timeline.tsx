import { Timeline as PrimitiveTimeline } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import styles from './Timeline.module.scss';
import type {
  TimelineDescriptionProps,
  TimelineIndicatorProps,
  TimelineItemProps,
  TimelineProps,
  TimelineTimeProps,
  TimelineTitleProps,
} from './Timeline.types';
export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(function Timeline(
  { size = 'medium', className, ...props },
  ref,
) {
  return (
    <PrimitiveTimeline
      {...props}
      ref={ref}
      data-size={size}
      className={[styles.root, className].filter(Boolean).join(' ')}
    />
  );
});
export const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>(function Item(
  { status = 'pending', className, ...props },
  ref,
) {
  return (
    <PrimitiveTimeline.Item
      {...props}
      ref={ref}
      data-status={status}
      className={[styles.item, className].filter(Boolean).join(' ')}
    />
  );
});
export const TimelineTitle = forwardRef<HTMLHeadingElement, TimelineTitleProps>(function Title(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveTimeline.Title
      {...props}
      ref={ref}
      className={[styles.title, className].filter(Boolean).join(' ')}
    />
  );
});
export const TimelineDescription = forwardRef<HTMLDivElement, TimelineDescriptionProps>(
  function Description({ className, ...props }, ref) {
    return (
      <PrimitiveTimeline.Description
        {...props}
        ref={ref}
        className={[styles.description, className].filter(Boolean).join(' ')}
      />
    );
  },
);
export const TimelineTime = forwardRef<HTMLTimeElement, TimelineTimeProps>(function Time(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveTimeline.Time
      {...props}
      ref={ref}
      className={[styles.time, className].filter(Boolean).join(' ')}
    />
  );
});
export const TimelineIndicator = forwardRef<HTMLSpanElement, TimelineIndicatorProps>(
  function Indicator({ className, ...props }, ref) {
    return (
      <PrimitiveTimeline.Indicator
        {...props}
        ref={ref}
        className={[styles.indicator, className].filter(Boolean).join(' ')}
      />
    );
  },
);
