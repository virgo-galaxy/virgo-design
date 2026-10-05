import { Slider as PrimitiveSlider } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import styles from './Slider.module.scss';
import type { SliderRangeProps } from './Slider.types';

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
