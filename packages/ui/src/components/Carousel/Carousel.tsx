import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from '@virgo-design/icons';
import { Carousel as PrimitiveCarousel, useCarouselState } from '@virgo-design/primitives';
import {
  createContext,
  type CSSProperties,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useControlLabels } from '../../shared/control-labels';
import { Button } from '../Button';
import styles from './Carousel.module.scss';
import type {
  CarouselIndicatorsProps,
  CarouselItemProps,
  CarouselProps,
  CarouselTrackProps,
  CarouselViewportProps,
} from './Carousel.types';
const classes = (...values: Array<string | undefined>) => values.filter(Boolean).join(' ');
const ArrowContext = createContext<NonNullable<CarouselProps['arrows']>>('none');
export const CarouselRoot = forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
  { motion = 'slide', arrows = 'none', stackBelow, layout = 'paged', className, ...props },
  ref,
) {
  const [stacked, setStacked] = useState(false);
  useEffect(() => {
    if (stackBelow === undefined || !window.matchMedia) return;
    const media = window.matchMedia(`(max-width: ${stackBelow}px)`);
    const update = () => setStacked(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, [stackBelow]);
  return (
    <ArrowContext.Provider value={arrows}>
      <PrimitiveCarousel
        {...props}
        ref={ref}
        layout={stackBelow !== undefined && stacked ? 'stacked' : layout}
        data-slot="root"
        data-motion={motion}
        data-arrows={arrows}
        className={classes(styles.root, className)}
      />
    </ArrowContext.Provider>
  );
});
export const CarouselViewport = forwardRef<HTMLDivElement, CarouselViewportProps>(function Viewport(
  { className, children, ...props },
  ref,
) {
  const state = useCarouselState();
  const arrows = useContext(ArrowContext);
  const labels = useControlLabels();
  return (
    <PrimitiveCarousel.Viewport
      {...props}
      ref={ref}
      data-slot="viewport"
      className={classes(styles.viewport, className)}
    >
      {children}
      {arrows !== 'none' && state.count > 1 && state.layout === 'paged' ? (
        <div data-slot="arrows" className={styles.arrows}>
          <Button
            variant="outline"
            size="small"
            shape="circle"
            iconOnly
            aria-label={labels.previousSlide}
            disabled={!state.canPrevious}
            onClick={state.previous}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="small"
            shape="circle"
            iconOnly
            aria-label={labels.nextSlide}
            disabled={!state.canNext}
            onClick={state.next}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      ) : null}
    </PrimitiveCarousel.Viewport>
  );
});
export const CarouselTrack = forwardRef<HTMLDivElement, CarouselTrackProps>(function Track(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveCarousel.Track
      {...props}
      ref={ref}
      data-slot="track"
      className={classes(styles.track, className)}
    />
  );
});
export const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(function Item(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveCarousel.Item
      {...props}
      ref={ref}
      data-slot="item"
      className={classes(styles.item, className)}
    />
  );
});
export const CarouselIndicators = forwardRef<HTMLDivElement, CarouselIndicatorsProps>(
  function Indicators(
    { variant = 'dots', placement = 'outside', getSlideLabel, className, style, ...props },
    ref,
  ) {
    const state = useCarouselState();
    const labels = useControlLabels();
    if (state.layout === 'stacked' || state.count < 2) return null;
    return (
      <div
        {...props}
        ref={ref}
        data-slot="indicators"
        data-variant={variant}
        data-placement={placement}
        style={{ '--carousel-count': state.count, ...style } as CSSProperties}
        className={classes(styles.indicators, className)}
      >
        {variant === 'bar' ? (
          <span aria-hidden="true" data-slot="indicator-thumb" className={styles.barThumb} />
        ) : null}
        {Array.from({ length: state.count }, (_, index) => (
          <Button
            key={index}
            variant="text"
            size="small"
            iconOnly
            aria-label={getSlideLabel?.(index) ?? `${labels.goToSlide} ${index + 1}`}
            aria-current={state.index === index ? 'step' : undefined}
            data-active={state.index === index}
            onClick={() => state.goTo(index)}
            className={styles.indicator}
          >
            <span />
          </Button>
        ))}
      </div>
    );
  },
);
export function CarouselPlayback() {
  const state = useCarouselState();
  const labels = useControlLabels();
  if (!state.autoPlay || state.layout === 'stacked' || state.count < 2) return null;
  return (
    <Button
      data-slot="playback"
      variant="text"
      size="small"
      iconOnly
      aria-label={state.paused ? labels.playSlideshow : labels.pauseSlideshow}
      onClick={() => state.setPaused(!state.paused)}
    >
      {state.paused ? <PlayIcon /> : <PauseIcon />}
    </Button>
  );
}
