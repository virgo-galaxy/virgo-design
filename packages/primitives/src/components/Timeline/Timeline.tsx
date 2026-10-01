import { forwardRef } from 'react';

import type {
  TimelineDescriptionProps,
  TimelineIndicatorProps,
  TimelineItemProps,
  TimelineProps,
  TimelineTimeProps,
  TimelineTitleProps,
} from './Timeline.types';
export const Timeline = forwardRef<HTMLOListElement, TimelineProps>((props, ref) => (
  <ol {...props} ref={ref} />
));
export const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>((props, ref) => (
  <li {...props} ref={ref} />
));
export const TimelineTitle = forwardRef<HTMLHeadingElement, TimelineTitleProps>((props, ref) => (
  <h3 {...props} ref={ref} />
));
export const TimelineDescription = forwardRef<HTMLDivElement, TimelineDescriptionProps>(
  (props, ref) => <div {...props} ref={ref} />,
);
export const TimelineTime = forwardRef<HTMLTimeElement, TimelineTimeProps>((props, ref) => (
  <time {...props} ref={ref} />
));
export const TimelineIndicator = forwardRef<HTMLSpanElement, TimelineIndicatorProps>(
  (props, ref) => <span aria-hidden="true" {...props} ref={ref} />,
);
