import {
  Timeline as Root,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from './Timeline';
export const Timeline = Object.assign(Root, {
  Root,
  Item: TimelineItem,
  Title: TimelineTitle,
  Description: TimelineDescription,
  Time: TimelineTime,
  Indicator: TimelineIndicator,
});
export type {
  TimelineDescriptionProps,
  TimelineIndicatorProps,
  TimelineItemProps,
  TimelineProps,
  TimelineTimeProps,
  TimelineTitleProps,
} from './Timeline.types';
