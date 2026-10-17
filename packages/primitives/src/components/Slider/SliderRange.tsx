import { type CSSProperties, forwardRef, useEffect, useRef } from 'react';

import { useFieldControl } from '../../internal/form/field-context';
import { useControllableState } from '../../internal/hooks/useControllableState';
import type { SliderRangeProps } from './Slider.types';

export const SliderRange = forwardRef<HTMLDivElement, SliderRangeProps>(function SliderRange(
  {
    value: controlled,
    defaultValue,
    min = 0,
    max = 100,
    step = 1,
    thumbLabels,
    getValueText,
    onValueChange,
    onThumbFocus,
    name,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onLostPointerCapture,
    onKeyDown,
    ...props
  },
  ref,
) {
  const { disabled, readOnly, required, ...field } = useFieldControl(props);
  const lower = Number.isFinite(min) ? min : 0;
  const upper = Math.max(lower, Number.isFinite(max) ? max : 100);
  const increment = Number.isFinite(step) && step > 0 ? step : 1;
  const snap = (number: number) =>
    Math.max(
      lower,
      Math.min(
        upper,
        Number((lower + Math.round((number - lower) / increment) * increment).toFixed(10)),
      ),
    );
  const normalize = (input: readonly number[]) =>
    (input.length >= 2 ? input : [input[0] ?? lower, upper])
      .map((number) => snap(Number.isFinite(number) ? number : lower))
      .sort((a, b) => a - b);

  const initial = normalize(defaultValue ?? [lower, upper]);
  const [raw, setValue, resetValue] = useControllableState(
    controlled === undefined ? undefined : [...controlled],
    initial,
    onValueChange,
  );
  const values = normalize(raw ?? initial);
  const valuesRef = useRef(values);
  valuesRef.current = values;
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ index: number; values: number[]; pointerId: number } | null>(null);
  const lastThumb = useRef(0);
  const initialRef = useRef(initial);
  initialRef.current = initial;

  useEffect(() => {
    const form = trackRef.current?.closest('form');
    const reset = () => {
      if (controlled === undefined) resetValue(initialRef.current);
    };
    form?.addEventListener('reset', reset);
    return () => form?.removeEventListener('reset', reset);
  }, [controlled, resetValue]);

  const change = (index: number, number: number) => {
    const current = valuesRef.current;
    const next = [...current];
    next[index] = Math.max(
      current[index - 1] ?? lower,
      Math.min(current[index + 1] ?? upper, snap(number)),
    );
    if (next[index] === current[index]) return;

    if (controlled === undefined) valuesRef.current = next;
    setValue(next);
  };

  const atPointer = (x: number) => {
    const track = trackRef.current!;
    const rect = track.getBoundingClientRect();
    const ratio = rect.width ? Math.max(0, Math.min(1, (x - rect.left) / rect.width)) : 0;
    return (
      lower + (getComputedStyle(track).direction === 'rtl' ? 1 - ratio : ratio) * (upper - lower)
    );
  };

  const percentage = (number: number) =>
    upper > lower ? `${((number - lower) / (upper - lower)) * 100}%` : '0%';

  return (
    <div
      {...field}
      ref={ref}
      role="group"
      aria-required={undefined}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      data-slot="range-slider"
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        const thumb = (event.target as HTMLElement).closest<HTMLElement>('[data-slot="thumb"]');
        if (!thumb) return;
        const index = Number(thumb.dataset.index);
        const number = values[index]!;
        if (
          ![
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
            'Home',
            'End',
            'PageUp',
            'PageDown',
          ].includes(event.key)
        )
          return;
        event.preventDefault();
        if (disabled || readOnly) return;
        const direction = getComputedStyle(event.currentTarget).direction === 'rtl' ? -1 : 1;
        const delta =
          event.key === 'ArrowRight'
            ? direction
            : event.key === 'ArrowLeft'
              ? -direction
              : ['ArrowUp', 'PageUp'].includes(event.key)
                ? 1
                : -1;
        change(
          index,
          event.key === 'Home'
            ? (values[index - 1] ?? lower)
            : event.key === 'End'
              ? (values[index + 1] ?? upper)
              : number + delta * increment * (event.key.startsWith('Page') ? 10 : 1),
        );
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          drag.current ||
          disabled ||
          readOnly ||
          upper === lower
        )
          return;
        event.preventDefault();
        const number = atPointer(event.clientX);
        const thumb = (event.target as HTMLElement).closest('[data-slot="thumb"]');
        let index = thumb
          ? Number(thumb.getAttribute('data-index'))
          : Math.min(lastThumb.current, values.length - 1);
        if (!thumb)
          values.forEach((value, candidate) => {
            if (Math.abs(value - number) < Math.abs(values[index]! - number)) index = candidate;
          });
        lastThumb.current = index;
        drag.current = { index, values: [...values], pointerId: event.pointerId };
        event.currentTarget
          .querySelector<HTMLElement>(`[data-slot="thumb"][data-index="${index}"]`)
          ?.focus();
        event.currentTarget.setPointerCapture?.(event.pointerId);
        change(index, number);
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (
          !event.defaultPrevented &&
          drag.current &&
          drag.current.pointerId === event.pointerId &&
          !disabled &&
          !readOnly
        )
          change(drag.current.index, atPointer(event.clientX));
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event);
        if (drag.current?.pointerId !== event.pointerId) return;
        drag.current = null;
        if (event.currentTarget.hasPointerCapture?.(event.pointerId))
          event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={(event) => {
        onPointerCancel?.(event);
        if (drag.current?.pointerId !== event.pointerId) return;
        if (drag.current) setValue(drag.current.values);
        drag.current = null;
        if (event.currentTarget.hasPointerCapture?.(event.pointerId))
          event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onLostPointerCapture={(event) => {
        onLostPointerCapture?.(event);
        drag.current = null;
      }}
    >
      <div
        ref={trackRef}
        data-slot="track"
        style={
          {
            '--slider-range-start': percentage(values[0]!),
            '--slider-range-end': percentage(values.at(-1)!),
          } as CSSProperties
        }
      >
        <div data-slot="range" />
        {values.map((number, index) => (
          <span
            key={index}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            data-slot="thumb"
            data-index={index}
            style={{ insetInlineStart: percentage(number) }}
            aria-label={thumbLabels?.[index] ?? `${field['aria-label'] ?? 'Value'} ${index + 1}`}
            aria-describedby={field['aria-describedby']}
            aria-invalid={field['aria-invalid']}
            aria-orientation="horizontal"
            aria-valuemin={values[index - 1] ?? lower}
            aria-valuemax={values[index + 1] ?? upper}
            aria-valuenow={number}
            aria-valuetext={getValueText?.(number, index)}
            aria-disabled={disabled || undefined}
            aria-readonly={readOnly || undefined}
            onFocus={() => {
              lastThumb.current = index;
              onThumbFocus?.(index);
            }}
          >
            <span data-slot="value" aria-hidden="true">
              {getValueText?.(number, index) ?? number}
            </span>
          </span>
        ))}
      </div>
      {name
        ? values.map((number, index) => (
            <input
              key={index}
              type="hidden"
              name={name}
              value={number}
              disabled={disabled}
              required={required}
            />
          ))
        : null}
    </div>
  );
});
