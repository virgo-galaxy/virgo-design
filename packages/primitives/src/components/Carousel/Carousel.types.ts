import type { HTMLAttributes } from 'react';

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of slides. */
  count: number;
  /** Controlled, zero-based slide index. */
  index?: number;
  /** Initial slide index. @default 0 */
  defaultIndex?: number;
  /** Called when navigation requests another slide. */
  onIndexChange?: (index: number) => void;
  /** Wrap navigation at either end. @default false */
  loop?: boolean;
  /** Enable automatic slide advance. Pauses during hover, focus, dragging, hidden documents and reduced motion. @default false */
  autoPlay?: boolean;
  /** Automatic advance interval in milliseconds. @default 5000 */
  interval?: number;
  /** Enable horizontal mouse and touch dragging on non-interactive content. @default true */
  draggable?: boolean;
  /** Enable horizontal trackpad and Shift-wheel navigation. Vertical scrolling is preserved. @default false */
  wheel?: boolean;
  /** Paged navigation or fully accessible stacked content. @default 'paged' */
  layout?: 'paged' | 'stacked';
}
export type CarouselViewportProps = HTMLAttributes<HTMLDivElement>;
export type CarouselTrackProps = HTMLAttributes<HTMLDivElement>;
export interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Zero-based position of this slide. */
  index: number;
}
export interface CarouselState {
  index: number;
  count: number;
  layout: 'paged' | 'stacked';
  canPrevious: boolean;
  canNext: boolean;
  autoPlay: boolean;
  playing: boolean;
  paused: boolean;
  setPaused: (paused: boolean) => void;
  goTo: (index: number) => void;
  previous: () => void;
  next: () => void;
}
