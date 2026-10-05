import { ColorPicker as PrimitiveColorPicker } from '@virgo-design/primitives';
import { createContext, forwardRef, useContext } from 'react';

import styles from './ColorPicker.module.scss';
import type {
  ColorPickerAreaProps,
  ColorPickerChannelFieldProps,
  ColorPickerContentProps,
  ColorPickerHexFieldProps,
  ColorPickerHueProps,
  ColorPickerInputProps,
  ColorPickerPreviewProps,
  ColorPickerProps,
  ColorPickerSwatchProps,
  ColorPickerTriggerProps,
} from './ColorPicker.types';
const SizeContext = createContext<NonNullable<ColorPickerProps['size']>>('medium');
export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(function ColorPicker(
  { size = 'medium', className, ...props },
  ref,
) {
  return (
    <SizeContext.Provider value={size}>
      <PrimitiveColorPicker
        {...props}
        ref={ref}
        data-size={size}
        className={[styles.root, className].filter(Boolean).join(' ')}
      />
    </SizeContext.Provider>
  );
});
export const ColorPickerInput = forwardRef<HTMLInputElement, ColorPickerInputProps>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveColorPicker.Input
      data-slot="native-input"
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
        data-slot="swatch"
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
        data-slot="preview"
        {...props}
        ref={ref}
        className={[styles.preview, className].filter(Boolean).join(' ')}
      />
    );
  },
);

export const ColorPickerArea = forwardRef<HTMLDivElement, ColorPickerAreaProps>(function Area(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveColorPicker.Area
      {...props}
      ref={ref}
      className={[styles.area, className].filter(Boolean).join(' ')}
    />
  );
});

export const ColorPickerHue = forwardRef<HTMLInputElement, ColorPickerHueProps>(function Hue(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveColorPicker.Hue
      {...props}
      ref={ref}
      className={[styles.hue, className].filter(Boolean).join(' ')}
    />
  );
});

export const ColorPickerHexField = forwardRef<HTMLInputElement, ColorPickerHexFieldProps>(
  function HexField({ className, ...props }, ref) {
    return (
      <PrimitiveColorPicker.HexField
        {...props}
        ref={ref}
        className={[styles.textField, className].filter(Boolean).join(' ')}
      />
    );
  },
);

export const ColorPickerChannelField = forwardRef<HTMLInputElement, ColorPickerChannelFieldProps>(
  function ChannelField({ className, ...props }, ref) {
    return (
      <PrimitiveColorPicker.ChannelField
        {...props}
        ref={ref}
        className={[styles.textField, className].filter(Boolean).join(' ')}
      />
    );
  },
);

export const ColorPickerTrigger = forwardRef<HTMLButtonElement, ColorPickerTriggerProps>(
  function Trigger({ className, ...props }, ref) {
    return (
      <PrimitiveColorPicker.Trigger
        data-slot="trigger"
        {...props}
        ref={ref}
        className={[styles.trigger, className].filter(Boolean).join(' ')}
      />
    );
  },
);

export const ColorPickerContent = forwardRef<HTMLDivElement, ColorPickerContentProps>(
  function Content({ className, ...props }, ref) {
    const size = useContext(SizeContext);
    return (
      <PrimitiveColorPicker.Content
        {...props}
        ref={ref}
        data-slot="content"
        data-size={size}
        className={[styles.content, className].filter(Boolean).join(' ')}
      />
    );
  },
);
