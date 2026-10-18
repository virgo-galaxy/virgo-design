import { ColorPicker as PrimitiveColorPicker } from '@virgo-design/primitives';
import { createContext, forwardRef, useContext, useState } from 'react';

import { useLocale } from '../../locale/context/locale-context';
import { Select } from '../Select';
import type {
  ColorPickerAlphaFieldProps,
  ColorPickerAreaProps,
  ColorPickerChannelFieldProps,
  ColorPickerContentProps,
  ColorPickerHexFieldProps,
  ColorPickerHueProps,
  ColorPickerInputProps,
  ColorPickerOpacityProps,
  ColorPickerPanelProps,
  ColorPickerPreviewProps,
  ColorPickerProps,
  ColorPickerSwatchProps,
  ColorPickerTriggerProps,
  ColorPickerValueProps,
} from './ColorPicker.types';

import styles from './ColorPicker.module.scss';

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
  const labels = useLocale().colorPicker;

  return (
    <PrimitiveColorPicker.Area
      {...props}
      saturationLabel={props.saturationLabel ?? labels.saturation}
      brightnessLabel={props.brightnessLabel ?? labels.brightness}
      ref={ref}
      className={[styles.area, className].filter(Boolean).join(' ')}
    />
  );
});

export const ColorPickerHue = forwardRef<HTMLInputElement, ColorPickerHueProps>(function Hue(
  { className, ...props },
  ref,
) {
  const labels = useLocale().colorPicker;

  return (
    <PrimitiveColorPicker.Hue
      {...props}
      aria-label={props['aria-label'] ?? labels.hue}
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
  function Trigger({ className, variant = 'swatch', valueLabel, children, ...props }, ref) {
    const labels = useLocale().colorPicker;

    return (
      <PrimitiveColorPicker.Trigger
        data-slot="trigger"
        {...props}
        aria-label={
          props['aria-label'] ?? (children === undefined ? labels.chooseColor : undefined)
        }
        ref={ref}
        data-variant={variant}
        className={[styles.trigger, className].filter(Boolean).join(' ')}
      >
        {children ?? (
          <>
            <ColorPickerPreview />
            {variant === 'value' ? (
              <span className={styles.triggerValue} title={valueLabel}>
                {valueLabel ?? <ColorPickerValue />}
              </span>
            ) : null}
          </>
        )}
      </PrimitiveColorPicker.Trigger>
    );
  },
);

export const ColorPickerValue = forwardRef<HTMLSpanElement, ColorPickerValueProps>(
  function Value(props, ref) {
    return <PrimitiveColorPicker.Value {...props} ref={ref} />;
  },
);

export const ColorPickerOpacity = forwardRef<HTMLInputElement, ColorPickerOpacityProps>(
  function Opacity({ className, ...props }, ref) {
    const labels = useLocale().colorPicker;

    return (
      <PrimitiveColorPicker.Opacity
        {...props}
        aria-label={props['aria-label'] ?? labels.opacity}
        ref={ref}
        className={[styles.opacity, className].filter(Boolean).join(' ')}
      />
    );
  },
);

export const ColorPickerAlphaField = forwardRef<HTMLInputElement, ColorPickerAlphaFieldProps>(
  function AlphaField({ className, ...props }, ref) {
    return (
      <PrimitiveColorPicker.AlphaField
        {...props}
        ref={ref}
        className={[styles.textField, className].filter(Boolean).join(' ')}
      />
    );
  },
);

export const ColorPickerPanel = forwardRef<HTMLDivElement, ColorPickerPanelProps>(function Panel(
  {
    labels: providedLabels,
    size = 'small',
    variant = 'full',
    alpha = variant === 'full',
    className,
    children,
    ...props
  },
  ref,
) {
  const locale = useLocale();
  const labels = { ...locale.colorPicker, ...providedLabels };
  const [format, setFormat] = useState('hex');

  return (
    <SizeContext.Provider value={size}>
      <ColorPickerContent
        {...props}
        ref={ref}
        data-variant={variant}
        className={[styles.panel, className].filter(Boolean).join(' ')}
      >
        <ColorPickerArea saturationLabel={labels.saturation} brightnessLabel={labels.brightness} />
        <div className={styles.tracks}>
          <ColorPickerHue aria-label={labels.hue} />
          {alpha ? <ColorPickerOpacity aria-label={labels.opacity} /> : null}
        </div>
        {variant === 'full' ? <ColorPickerPreview className={styles.panelPreview} /> : null}
        <div className={styles.panelFields} data-format={variant === 'simple' ? 'hex' : format}>
          {variant === 'full' ? (
            <Select size={size} value={format} onValueChange={setFormat}>
              <Select.Trigger aria-label={labels.format} />
              <Select.Content className={styles.formatMenu}>
                <Select.Option value="hex">HEX</Select.Option>
                <Select.Option value="rgb">RGB</Select.Option>
              </Select.Content>
            </Select>
          ) : null}
          <div className={styles.colorFields}>
            {variant === 'simple' || format === 'hex' ? (
              <ColorPickerHexField
                aria-label={labels.hex}
                includeAlpha={false}
                letterCase="upper"
              />
            ) : (
              <>
                <ColorPickerChannelField channel="r" aria-label={labels.red} />
                <ColorPickerChannelField channel="g" aria-label={labels.green} />
                <ColorPickerChannelField channel="b" aria-label={labels.blue} />
              </>
            )}
          </div>
          {alpha ? (
            <label className={styles.alphaField}>
              <ColorPickerAlphaField aria-label={labels.opacity} />
              <span aria-hidden="true">%</span>
            </label>
          ) : null}
        </div>
        {children ? <div className={styles.panelExtra}>{children}</div> : null}
      </ColorPickerContent>
    </SizeContext.Provider>
  );
});

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
