import {
  CarouselIndicators,
  CarouselItem,
  CarouselPlayback,
  CarouselRoot,
  CarouselTrack,
  CarouselViewport,
} from './Carousel';
export const Carousel = Object.assign(CarouselRoot, {
  Root: CarouselRoot,
  Viewport: CarouselViewport,
  Track: CarouselTrack,
  Item: CarouselItem,
  Indicators: CarouselIndicators,
  Playback: CarouselPlayback,
});
export type {
  CarouselIndicatorsProps,
  CarouselItemProps,
  CarouselProps,
  CarouselState,
  CarouselTrackProps,
  CarouselViewportProps,
} from './Carousel.types';
export { useCarouselState } from '@virgo-design/primitives';
