import { Slider as PrimitiveSlider } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import type { SliderRangeProps } from './Slider.types';

import styles from './Slider.module.scss';

export const SliderRange = forwardRef<HTMLDivElement, SliderRangeProps>(function SliderRange(
  { size = 'medium', className, ...props },
  ref,
) {
  return (
    <PrimitiveSlider.Range
      {...props}
      ref={ref}
      data-size={size}
      className={[styles.rangeRoot, className].filter(Boolean).join(' ')}
    />
  );
});
