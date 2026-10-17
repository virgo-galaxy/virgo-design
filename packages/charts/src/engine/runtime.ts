import type { EChartsOption, EChartsType } from 'echarts';
import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

import type { ChartRenderer } from '../types';

export type ChartInit = (
  element: HTMLElement,
  theme: null,
  options: { renderer: ChartRenderer; width: number; height: number },
) => EChartsType;

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false),
  );

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');

    if (!media) return;

    const change = () => setReduced(media.matches);

    change();
    media.addEventListener('change', change);

    return () => media.removeEventListener('change', change);
  }, []);

  return reduced;
}

export function useChartRuntime({
  ref,
  init,
  renderer,
  height,
  option,
  onReady,
}: {
  ref: RefObject<HTMLDivElement | null>;
  init: ChartInit;
  renderer: ChartRenderer;
  height: number;
  option: EChartsOption | null;
  onReady?: ((chart: EChartsType) => (() => void) | void) | undefined;
}) {
  const chart = useRef<EChartsType | null>(null);
  const readyCleanup = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const instance = init(element, null, { renderer, width: element.clientWidth || 640, height });

    chart.current = instance;

    let frame = 0;
    const resize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() =>
        instance.resize({
          width: element.clientWidth || 640,
          height: element.clientHeight || height,
        }),
      );
    };
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(resize);

    observer?.observe(element);

    if (!observer) window.addEventListener('resize', resize);

    return () => {
      readyCleanup.current?.();
      observer?.disconnect();
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frame);
      instance.dispose();
      chart.current = null;
    };
    // Height and option updates are handled by resize/setOption, preserving the engine's diff.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, init, renderer]);

  useEffect(() => {
    const instance = chart.current;

    if (!instance || !onReady) return;

    const cleanup = onReady(instance);
    let stopped = false;
    const stop = () => {
      if (stopped) return;

      stopped = true;
      cleanup?.();
    };

    readyCleanup.current = stop;

    return stop;
  }, [onReady, ref, init, renderer]);

  useEffect(() => {
    const instance = chart.current;

    if (!instance || !option) return;

    instance.setOption(option, { notMerge: false, replaceMerge: ['series'], lazyUpdate: false });
    ref.current
      ?.querySelectorAll('svg, canvas')
      .forEach((node) => node.setAttribute('aria-hidden', 'true'));
  }, [option, renderer, ref]);

  useEffect(() => {
    chart.current?.resize({ height });
  }, [height, renderer]);

  return chart;
}
