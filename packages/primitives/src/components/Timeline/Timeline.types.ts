import type { HTMLAttributes, LiHTMLAttributes, OlHTMLAttributes, TimeHTMLAttributes } from 'react';
export type TimelineProps = OlHTMLAttributes<HTMLOListElement>;
export type TimelineItemProps = LiHTMLAttributes<HTMLLIElement>;
export type TimelineTitleProps = HTMLAttributes<HTMLHeadingElement>;
export type TimelineDescriptionProps = HTMLAttributes<HTMLDivElement>;
export type TimelineTimeProps = TimeHTMLAttributes<HTMLTimeElement>;
export type TimelineIndicatorProps = HTMLAttributes<HTMLSpanElement>;
