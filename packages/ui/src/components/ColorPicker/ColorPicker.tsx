import { ColorPicker as PrimitiveColorPicker } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import styles from './ColorPicker.module.scss';
import type {
  ColorPickerInputProps,
  ColorPickerPreviewProps,
  ColorPickerProps,
  ColorPickerSwatchProps,
} from './ColorPicker.types';
export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(function ColorPicker(
  { size = 'medium', className, ...props },
  ref,
) {
  return (
    <PrimitiveColorPicker
      {...props}
      ref={ref}
      data-size={size}
      className={[styles.root, className].filter(Boolean).join(' ')}
    />
  );
});
export const ColorPickerInput = forwardRef<HTMLInputElement, ColorPickerInputProps>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveColorPicker.Input
      {...props}
      ref={ref}
      className={[styles.input, className].filter(Boolean).join(' ')}
    />
  );
});
export const ColorPickerSwatch = forwardRef<HTMLButtonElement, ColorPickerSwatchProps>(
  function Swatch({ className, value, style, ...props }, ref) {
    return (
      <PrimitiveColorPicker.Swatch
        {...props}
        ref={ref}
        value={value}
        style={{ backgroundColor: value, ...style }}
        className={[styles.swatch, className].filter(Boolean).join(' ')}
      />
    );
  },
);
export const ColorPickerPreview = forwardRef<HTMLSpanElement, ColorPickerPreviewProps>(
  function Preview({ className, ...props }, ref) {
    return (
      <PrimitiveColorPicker.Preview
        {...props}
        ref={ref}
        className={[styles.preview, className].filter(Boolean).join(' ')}
      />
    );
  },
);
