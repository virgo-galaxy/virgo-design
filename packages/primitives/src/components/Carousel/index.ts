import { CarouselItem, CarouselRoot, CarouselTrack, CarouselViewport } from './Carousel';
export const Carousel = Object.assign(CarouselRoot, {
  Root: CarouselRoot,
  Viewport: CarouselViewport,
  Track: CarouselTrack,
  Item: CarouselItem,
});
export { useCarouselState } from './Carousel';
export type {
  CarouselItemProps,
  CarouselProps,
  CarouselState,
  CarouselTrackProps,
  CarouselViewportProps,
} from './Carousel.types';
