import type {
  TimelineItemProps as PrimitiveItemProps,
  TimelineProps as PrimitiveProps,
} from '@virgo-design/primitives';
export interface TimelineProps extends PrimitiveProps {
  /** Visual spacing. @default 'medium' */
  size?: 'small' | 'medium' | 'large' | undefined;
}
export interface TimelineItemProps extends PrimitiveItemProps {
  /** Presentation of an event's progress. @default 'pending' */
  status?: 'pending' | 'active' | 'complete' | undefined;
}
export type {
  TimelineDescriptionProps,
  TimelineIndicatorProps,
  TimelineTimeProps,
  TimelineTitleProps,
} from '@virgo-design/primitives';
