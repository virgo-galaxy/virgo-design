import type { CSSProperties } from 'react';
import { createContext, forwardRef, useContext, useEffect, useRef, useState } from 'react';

import { useControllableState } from '../../internal/hooks/useControllableState';
import { composeRefs } from '../../internal/utils/composeRefs';
import type {
  CarouselItemProps,
  CarouselProps,
  CarouselState,
  CarouselTrackProps,
  CarouselViewportProps,
} from './Carousel.types';

type Context = CarouselState & {
  draggable: boolean;
  wheel: boolean;
  dragging: boolean;
  setDragging: (value: boolean) => void;
};
const CarouselContext = createContext<Context | null>(null);
export function useCarouselState(): CarouselState {
  return useCarouselContext();
}
function useCarouselContext() {
  const value = useContext(CarouselContext);
  if (!value) throw new Error('Carousel parts must be used inside Carousel.Root.');
  return value;
}
const interactive = (target: EventTarget | null) =>
  target instanceof Element &&
  !!target.closest(
    'button,a,input,textarea,select,[role="slider"],[role="combobox"],[contenteditable="true"]',
  );
const clamp = (index: number, count: number) =>
  Math.max(0, Math.min(Number.isFinite(index) ? Math.floor(index) : 0, Math.max(0, count - 1)));

export const CarouselRoot = forwardRef<HTMLDivElement, CarouselProps>(function CarouselRoot(
  {
    count: countProp,
    index: controlledIndex,
    defaultIndex = 0,
    onIndexChange,
    loop = false,
    autoPlay = false,
    interval = 5000,
    draggable = true,
    wheel = false,
    layout = 'paged',
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    style,
    children,
    ...props
  },
  ref,
) {
  const count = Number.isFinite(countProp) ? Math.max(0, Math.floor(countProp)) : 0;
  const [value, setValue, reset] = useControllableState(
    controlledIndex,
    defaultIndex,
    onIndexChange,
  );
  const index = clamp(value ?? 0, count);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [suspended, setSuspended] = useState(false);
  useEffect(() => {
    if (controlledIndex === undefined) reset(index);
  }, [controlledIndex, index, reset]);
  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const update = () => setSuspended(document.hidden || (media?.matches ?? false));
    update();
    document.addEventListener('visibilitychange', update);
    media?.addEventListener?.('change', update);
    return () => {
      document.removeEventListener('visibilitychange', update);
      media?.removeEventListener?.('change', update);
    };
  }, []);
  const goTo = (next: number) => {
    if (layout === 'stacked' || count < 2 || !Number.isFinite(next)) return;
    setValue(loop ? ((Math.floor(next) % count) + count) % count : clamp(next, count));
  };
  const playing =
    autoPlay &&
    count > 1 &&
    layout === 'paged' &&
    !paused &&
    !hovered &&
    !focused &&
    !dragging &&
    !suspended &&
    (loop || index < count - 1);
  const state: Context = {
    index,
    count,
    layout,
    canPrevious: layout === 'paged' && count > 1 && (loop || index > 0),
    canNext: layout === 'paged' && count > 1 && (loop || index < count - 1),
    autoPlay,
    playing,
    paused,
    setPaused,
    goTo,
    previous: () => goTo(index - 1),
    next: () => goTo(index + 1),
    draggable,
    wheel,
    dragging,
    setDragging,
  };
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(
      () => setValue(loop ? (index + 1) % count : clamp(index + 1, count)),
      Math.max(250, Number.isFinite(interval) ? interval : 5000),
    );
    return () => window.clearTimeout(timer);
  }, [playing, interval, index, count, loop, setValue]);
  return (
    <CarouselContext.Provider value={state}>
      <div
        {...props}
        ref={ref}
        role={props.role ?? 'region'}
        aria-roledescription="carousel"
        data-index={index}
        data-layout={layout}
        data-dragging={dragging || undefined}
        data-playing={playing}
        style={{ '--carousel-index': index, ...style } as CSSProperties}
        onMouseEnter={(event) => {
          onMouseEnter?.(event);
          setHovered(true);
        }}
        onMouseLeave={(event) => {
          onMouseLeave?.(event);
          setHovered(false);
        }}
        onFocus={(event) => {
          onFocus?.(event);
          setFocused(true);
        }}
        onBlur={(event) => {
          onBlur?.(event);
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
        }}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
});

export const CarouselViewport = forwardRef<HTMLDivElement, CarouselViewportProps>(
  function CarouselViewport(
    { onKeyDown, onPointerDown, onPointerMove, onPointerUp, onPointerCancel, ...props },
    ref,
  ) {
    const state = useCarouselContext();
    const localRef = useRef<HTMLDivElement>(null);
    const latest = useRef(state);
    useEffect(() => {
      latest.current = state;
    });
    const gesture = useRef<{ x: number; y: number; id: number; horizontal: boolean } | null>(null);
    useEffect(() => {
      if (!state.wheel || state.layout === 'stacked') return;
      const node = localRef.current;
      if (!node) return;
      let delta = 0;
      let locked = false;
      let timer: number | undefined;
      const onWheel = (event: WheelEvent) => {
        const x = event.shiftKey && Math.abs(event.deltaX) < 1 ? event.deltaY : event.deltaX;
        if (
          interactive(event.target) ||
          Math.abs(x) < 4 ||
          (!event.shiftKey && Math.abs(x) <= Math.abs(event.deltaY))
        )
          return;
        const context = latest.current;
        if (!locked && !(x > 0 ? context.canNext : context.canPrevious)) return;
        event.preventDefault();
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
          delta = 0;
          locked = false;
        }, 260);
        if (locked) return;
        delta += x * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? node.clientWidth : 1);
        if (Math.abs(delta) >= 72) {
          if (delta > 0) context.next();
          else context.previous();
          locked = true;
        }
      };
      node.addEventListener('wheel', onWheel, { passive: false });
      return () => {
        node.removeEventListener('wheel', onWheel);
        window.clearTimeout(timer);
      };
    }, [state.wheel, state.layout]);
    const finish = (node: HTMLDivElement, cancelled: boolean) => {
      const current = gesture.current;
      if (!current) return;
      const offset = Number.parseFloat(node.style.getPropertyValue('--carousel-drag-offset')) || 0;
      gesture.current = null;
      node.style.removeProperty('--carousel-drag-offset');
      state.setDragging(false);
      if (node.hasPointerCapture?.(current.id)) node.releasePointerCapture(current.id);
      if (!cancelled && current.horizontal && Math.abs(offset) >= 48) {
        if (offset < 0) state.next();
        else state.previous();
      }
    };
    return (
      <div
        {...props}
        ref={composeRefs(ref, localRef)}
        tabIndex={props.tabIndex ?? (state.layout === 'paged' ? 0 : undefined)}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented || interactive(event.target) || state.layout === 'stacked')
            return;
          const keys: Record<string, () => void> = {
            ArrowLeft: state.previous,
            ArrowRight: state.next,
            Home: () => state.goTo(0),
            End: () => state.goTo(state.count - 1),
          };
          const action = keys[event.key];
          if (action) {
            event.preventDefault();
            action();
          }
        }}
        onPointerDown={(event) => {
          onPointerDown?.(event);
          if (
            event.defaultPrevented ||
            event.button !== 0 ||
            !state.draggable ||
            state.layout === 'stacked' ||
            interactive(event.target)
          )
            return;
          gesture.current = {
            x: event.clientX,
            y: event.clientY,
            id: event.pointerId,
            horizontal: false,
          };
        }}
        onPointerMove={(event) => {
          onPointerMove?.(event);
          const current = gesture.current;
          if (event.defaultPrevented || !current || current.id !== event.pointerId) return;
          const x = event.clientX - current.x,
            y = event.clientY - current.y;
          if (!current.horizontal) {
            if (Math.abs(y) > Math.max(8, Math.abs(x))) {
              gesture.current = null;
              return;
            }
            if (Math.abs(x) < 8) return;
            current.horizontal = true;
            event.currentTarget.setPointerCapture?.(event.pointerId);
            state.setDragging(true);
          }
          event.preventDefault();
          const offset = (x > 0 && !state.canPrevious) || (x < 0 && !state.canNext) ? x * 0.2 : x;
          event.currentTarget.style.setProperty('--carousel-drag-offset', `${offset}px`);
        }}
        onPointerUp={(event) => {
          onPointerUp?.(event);
          finish(event.currentTarget, event.defaultPrevented);
        }}
        onPointerCancel={(event) => {
          onPointerCancel?.(event);
          finish(event.currentTarget, true);
        }}
      />
    );
  },
);
export const CarouselTrack = forwardRef<HTMLDivElement, CarouselTrackProps>(
  function CarouselTrack(props, ref) {
    const state = useCarouselContext();
    return (
      <div {...props} ref={ref} aria-live={state.playing ? 'off' : 'polite'} aria-atomic="false" />
    );
  },
);
export const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(function CarouselItem(
  { index, ...props },
  ref,
) {
  const state = useCarouselContext();
  const active = state.layout === 'stacked' || index === state.index;
  return (
    <div
      {...props}
      ref={ref}
      role={props.role ?? 'group'}
      aria-roledescription="slide"
      aria-label={props['aria-label'] ?? `${index + 1} / ${state.count}`}
      data-active={active}
      aria-hidden={active ? props['aria-hidden'] : true}
      inert={!active || props.inert}
    />
  );
});
