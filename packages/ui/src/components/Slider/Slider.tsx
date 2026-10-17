import { Slider as PrimitiveSlider } from '@virgo-design/primitives';
import { type CSSProperties, forwardRef, useLayoutEffect, useRef, useState } from 'react';

import { useComposedRefs } from '../../internal/utils/composeRefs';
import styles from './Slider.module.scss';
import type { SliderProps } from './Slider.types';

export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  {
    size = 'medium',
    className,
    style,
    value,
    defaultValue,
    min = 0,
    max = 100,
    step = 1,
    onValueChange,
    ...props
  },
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [visualValue, setVisualValue] = useState(
    value ?? defaultValue ?? (Number(min) + Number(max)) / 2,
  );
  const setRef = useComposedRefs(ref, inputRef);

  // Read the browser-sanitized value so the fill follows native bounds and step rounding.
  useLayoutEffect(() => {
    if (inputRef.current) setVisualValue(inputRef.current.valueAsNumber);
  }, [value, defaultValue, min, max, step]);

  const distance = Number(max) - Number(min);
  const progress =
    distance > 0 ? Math.max(0, Math.min(100, ((visualValue - Number(min)) / distance) * 100)) : 0;

  return (
    <PrimitiveSlider
      {...props}
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      ref={setRef}
      data-size={size}
      style={{ '--slider-progress': `${progress}%`, ...style } as CSSProperties}
      className={[styles.root, className].filter(Boolean).join(' ')}
      onValueChange={(next) => {
        if (value === undefined) setVisualValue(next);
        onValueChange?.(next);
      }}
    />
  );
});
