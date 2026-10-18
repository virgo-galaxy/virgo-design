import { useEffect, useLayoutEffect, useRef } from 'react';

import { Skeleton } from '../Skeleton';
import type { StatisticAnimationOptions } from './Statistic.types';

import styles from './Statistic.module.scss';

const useClientLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// Resolve elapsed time (x) to progress (y), matching the CSS cubic-bezier token.
function decelerate(easing: string) {
  if (easing === 'linear') return (progress: number) => progress;
  const points = easing
    .match(/^cubic-bezier\(([^)]+)\)$/)?.[1]
    ?.split(',')
    .map(Number);
  const [x1, y1, x2, y2] =
    points?.length === 4 && points.every(Number.isFinite) ? points : [0.16, 1, 0.3, 1];
  const curve = (t: number, a: number, b: number) =>
    3 * (1 - t) ** 2 * t * a + 3 * (1 - t) * t ** 2 * b + t ** 3;
  return (progress: number) => {
    if (progress <= 0 || progress >= 1) return Math.min(1, Math.max(0, progress));
    let lower = 0;
    let upper = 1;
    for (let i = 0; i < 20; i++) {
      const t = (lower + upper) / 2;
      if (curve(t, x1!, x2!) < progress) lower = t;
      else upper = t;
    }
    return curve((lower + upper) / 2, y1!, y2!);
  };
}

function frameText(current: number, target: number) {
  if (current === target) return String(target);
  const [mantissa, exponent = '0'] = String(target).split('e');
  const precision = Math.min(
    20,
    Math.max(0, (mantissa?.split('.')[1]?.length ?? 0) - Number(exponent)),
  );
  return String(Number(current.toFixed(precision)));
}

function duration(value: number | undefined, token: string, fallback: number) {
  if (value !== undefined && Number.isFinite(value)) return Math.max(0, value);
  const parsed = Number.parseFloat(token);
  return Number.isFinite(parsed)
    ? Math.max(0, parsed * (token.endsWith('ms') ? 1 : 1000))
    : fallback;
}

export function StatisticNumber({
  value,
  animation,
  formatter,
  loading = false,
}: {
  value: number;
  animation: boolean | StatisticAnimationOptions | undefined;
  formatter: ((value: number) => string) | undefined;
  loading?: boolean;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const currentRef = useRef<number | null>(null);
  const initialRef = useRef(true);
  const enabled = Boolean(animation) && Number.isFinite(value);
  const options = typeof animation === 'object' ? animation : undefined;
  const from = options?.from;
  const initialDuration = options?.duration;
  const updateDuration = options?.updateDuration;
  const text = formatter ? formatter(value) : String(value);

  useClientLayoutEffect(() => {
    const node = nodeRef.current;
    if (loading || !node) return;
    let active = true;
    let frame: number | undefined;
    const write = (next: number) => {
      if (!active) return;
      currentRef.current = next;
      node.textContent = formatter ? formatter(next) : frameText(next, value);
    };
    const finish = () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      initialRef.current = false;
      write(value);
    };
    if (!enabled) {
      finish();
      return;
    }

    const initial = initialRef.current;
    const start = currentRef.current ?? (Number.isFinite(from) ? from! : 0);
    const style = getComputedStyle(node);
    const ms = initial
      ? duration(
          initialDuration,
          style.getPropertyValue('--statistic-animation-duration').trim(),
          560,
        )
      : duration(
          updateDuration,
          style.getPropertyValue('--statistic-animation-update-duration').trim(),
          360,
        );
    const ease = decelerate(style.getPropertyValue('--statistic-animation-easing').trim());
    const motion =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : undefined;
    const onMotionChange = () => {
      if (motion?.matches) finish();
    };
    motion?.addEventListener('change', onMotionChange);
    if (motion?.matches || ms === 0 || start === value) finish();
    else {
      write(start);
      let startTime: number | undefined;
      const tick = (time: number) => {
        if (!active) return;
        startTime ??= time;
        const progress = Math.min(1, Math.max(0, (time - startTime) / ms));
        if (progress > 0) initialRef.current = false;
        if (progress === 1) finish();
        else {
          const eased = ease(progress);
          write(start * (1 - eased) + value * eased);
          frame = window.requestAnimationFrame(tick);
        }
      };
      frame = window.requestAnimationFrame(tick);
    }
    return () => {
      active = false;
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      motion?.removeEventListener('change', onMotionChange);
    };
  }, [value, enabled, from, initialDuration, updateDuration, formatter, loading]);

  if (loading) return <Skeleton style={{ width: '5em', height: '1em' }} />;
  return (
    <>
      <span ref={nodeRef} data-slot="number" aria-hidden={enabled || undefined}>
        {text}
      </span>
      {enabled ? <span className={styles.accessibleValue}>{text}</span> : null}
    </>
  );
}
