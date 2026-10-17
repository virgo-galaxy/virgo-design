import { createContext, forwardRef, useContext, useState } from 'react';

import { useFieldControl, useFieldState } from '../../internal/form/field-context';
import { useControllableState } from '../../internal/hooks/useControllableState';
import { Popover } from '../Popover';
import {
  clamp,
  colorToAlpha,
  colorToHsv,
  colorToRgb,
  hsvToColor,
  isColor,
  normalizeColor,
  rgbToColor,
  withAlpha,
} from './color-model';
import type {
  ColorPickerAlphaFieldProps,
  ColorPickerAreaProps,
  ColorPickerChannelFieldProps,
  ColorPickerHexFieldProps,
  ColorPickerHueProps,
  ColorPickerInputProps,
  ColorPickerOpacityProps,
  ColorPickerPreviewProps,
  ColorPickerProps,
  ColorPickerSwatchProps,
  ColorPickerValueProps,
} from './ColorPicker.types';

type ColorPickerContextValue = {
  hsv: { h: number; s: number; v: number };
  setHsv: (value: { h: number; s: number; v: number }) => void;
  value: string;
  disabled: boolean;
  readOnly: boolean;
  setValue: (value: string) => void;
};

const ColorPickerContext = createContext<ColorPickerContextValue | null>(null);

function useColor() {
  const context = useContext(ColorPickerContext);

  if (!context) throw new Error('ColorPicker parts require ColorPicker.');

  return context;
}

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(function ColorPicker(
  {
    value: controlled,
    defaultValue = '#000000',
    onValueChange,
    name,
    disabled: localDisabled,
    readOnly: localReadOnly,
    children,
    open,
    defaultOpen,
    onOpenChange,
    ...props
  },
  ref,
) {
  const field = useFieldState();
  const disabled = localDisabled ?? field.disabled ?? false;
  const readOnly = localReadOnly ?? field.readOnly ?? false;
  const [raw = '', setRaw] = useControllableState(
    controlled,
    normalizeColor(defaultValue),
    onValueChange,
  );
  const value = normalizeColor(raw);
  const [hint, setHint] = useState(() => ({ value, ...colorToHsv(value) }));
  const hsv = hint.value === value ? hint : colorToHsv(value);

  const setValue = (next: string) => {
    if (!disabled && !readOnly && isColor(next)) {
      const normalized = normalizeColor(next);
      const nextHsv = colorToHsv(normalized);
      setHint({ value: normalized, ...nextHsv, h: nextHsv.s ? nextHsv.h : hsv.h });
      setRaw(normalized);
    }
  };

  return (
    <ColorPickerContext.Provider
      value={{
        value,
        disabled,
        readOnly,
        setValue,
        hsv,
        setHsv: (next) => {
          if (disabled || readOnly) return;
          const normalized = withAlpha(hsvToColor(next), colorToAlpha(value));
          setHint({ ...next, value: normalized });
          setRaw(normalized);
        },
      }}
    >
      <Popover
        {...props}
        {...(open === undefined ? {} : { open })}
        {...(defaultOpen === undefined ? {} : { defaultOpen })}
        {...(onOpenChange === undefined ? {} : { onOpenChange })}
        disabled={disabled}
        data-slot="root"
        ref={ref}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
      >
        {name ? <input type="hidden" name={name} value={value} disabled={disabled} /> : null}
        {children}
      </Popover>
    </ColorPickerContext.Provider>
  );
});

export const ColorPickerInput = forwardRef<HTMLInputElement, ColorPickerInputProps>(
  function ColorPickerInput({ onChange, onClick, ...props }, ref) {
    const context = useColor();
    const field = useFieldControl(props);

    return (
      <input
        {...field}
        ref={ref}
        type="color"
        value={context.value.slice(0, 7)}
        disabled={context.disabled || field.disabled}
        aria-readonly={context.readOnly || field.readOnly || undefined}
        onClick={(event) => {
          onClick?.(event);
          if (context.readOnly || field.readOnly) event.preventDefault();
        }}
        onChange={(event) => {
          if (context.readOnly || field.readOnly) return;
          onChange?.(event);
          if (!event.defaultPrevented)
            context.setValue(withAlpha(event.currentTarget.value, colorToAlpha(context.value)));
        }}
      />
    );
  },
);

export const ColorPickerSwatch = forwardRef<HTMLButtonElement, ColorPickerSwatchProps>(
  function ColorPickerSwatch({ value, onClick, ...props }, ref) {
    const context = useColor();

    return (
      <button
        type="button"
        aria-label={value}
        {...props}
        ref={ref}
        aria-pressed={context.value === normalizeColor(value)}
        disabled={context.disabled || context.readOnly || props.disabled}
        data-color={normalizeColor(value)}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) context.setValue(value);
        }}
      />
    );
  },
);

export const ColorPickerPreview = forwardRef<HTMLSpanElement, ColorPickerPreviewProps>(
  function ColorPickerPreview({ style, ...props }, ref) {
    const context = useColor();

    return (
      <span
        aria-hidden="true"
        {...props}
        ref={ref}
        data-color={context.value}
        style={
          {
            backgroundColor: context.value,
            '--color-picker-color': context.value,
            ...style,
          } as React.CSSProperties
        }
      />
    );
  },
);

export const ColorPickerTrigger = Popover.Trigger;
export const ColorPickerContent = Popover.Content;
export const ColorPickerValue = forwardRef<HTMLSpanElement, ColorPickerValueProps>(function Value(
  { letterCase = 'upper', ...props },
  ref,
) {
  const { value } = useColor();

  return (
    <span {...props} ref={ref} data-slot="value">
      {letterCase === 'upper' ? value.toUpperCase() : value}
    </span>
  );
});

export const ColorPickerHexField = forwardRef<HTMLInputElement, ColorPickerHexFieldProps>(
  function HexField(
    {
      letterCase = 'lower',
      includeAlpha = true,
      onChange,
      onBlur,
      onKeyDown,
      disabled,
      readOnly,
      ...props
    },
    ref,
  ) {
    const context = useColor();
    const format = (value: string) => {
      const color = includeAlpha ? value : value.slice(0, 7);
      return letterCase === 'upper' ? color.toUpperCase() : color;
    };
    const [draft, setDraft] = useState<{ color: string; text: string } | null>(null);
    const text = draft?.color === context.value ? draft.text : format(context.value);
    const field = useFieldControl({ ...props, disabled, readOnly });
    const blocked = context.disabled || field.disabled || context.readOnly || field.readOnly;


    const commit = () => {
      if (!blocked && isColor(text))
        context.setValue(includeAlpha ? text : withAlpha(text, colorToAlpha(context.value)));
      setDraft(null);
    };

    return (
      <input
        {...field}
        ref={ref}
        type="text"
        data-slot="hex-field"
        spellCheck={false}
        value={text}
        disabled={context.disabled || field.disabled}
        readOnly={context.readOnly || field.readOnly}
        onChange={(event) => {
          onChange?.(event);
          if (!event.defaultPrevented && !blocked)
            setDraft({ color: context.value, text: event.currentTarget.value });
        }}
        onBlur={(event) => {
          onBlur?.(event);
          if (!event.defaultPrevented) commit();
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented || event.nativeEvent.isComposing) return;
          if (event.key === 'Enter') {
            event.preventDefault();
            commit();
          }
          if (event.key === 'Escape') {
            setDraft(null);
          }
        }}
      />
    );
  },
);
const ColorPickerChannelInput = forwardRef<
  HTMLInputElement,
  Omit<ColorPickerChannelFieldProps, 'channel'> & { channel: 'r' | 'g' | 'b' | 'alpha' }
>(function ChannelField(
  { channel, onChange, onBlur, onKeyDown, disabled, readOnly, ...props },
  ref,
) {
  const context = useColor();
  const rgb = colorToRgb(context.value);
  const maximum = channel === 'alpha' ? 100 : 255;
  const current =
    channel === 'alpha' ? Math.round((colorToAlpha(context.value) / 255) * 100) : rgb[channel];
  const changeChannel = (value: number) =>
    context.setValue(
      channel === 'alpha'
        ? withAlpha(context.value, (value / 100) * 255)
        : withAlpha(rgbToColor({ ...rgb, [channel]: value }), colorToAlpha(context.value)),
    );
  const [draft, setDraft] = useState<{
    color: string;
    text: string;
    channel: typeof channel;
  } | null>(null);
  const text =
    draft?.color === context.value && draft.channel === channel ? draft.text : String(current);
  const field = useFieldControl({ ...props, disabled, readOnly });
  const blocked = context.disabled || field.disabled || context.readOnly || field.readOnly;

  const commit = () => {
    const parsed = text.trim() === '' ? NaN : Number(text);
    if (!blocked && Number.isFinite(parsed)) changeChannel(parsed);
    setDraft(null);
  };

  return (
    <input
      {...field}
      ref={ref}
      type="number"
      min={0}
      max={maximum}
      step={1}
      data-slot={channel === 'alpha' ? 'alpha-field' : 'channel-field'}
      value={text}
      disabled={context.disabled || field.disabled}
      readOnly={context.readOnly || field.readOnly}
      onChange={(event) => {
        onChange?.(event);
        if (event.defaultPrevented || blocked) return;
        const raw = event.currentTarget.value;
        setDraft({ color: context.value, channel, text: raw });
        if (raw.trim() !== '' && Number.isFinite(Number(raw))) changeChannel(Number(raw));
      }}
      onBlur={(event) => {
        onBlur?.(event);
        if (!event.defaultPrevented) commit();
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || event.nativeEvent.isComposing) return;
        if (event.key === 'Enter') {
          event.preventDefault();
          commit();
        }
        if (event.key === 'Escape') setDraft(null);
      }}
    />
  );
});

export const ColorPickerChannelField = forwardRef<HTMLInputElement, ColorPickerChannelFieldProps>(
  function ChannelField(props, ref) {
    return <ColorPickerChannelInput {...props} ref={ref} />;
  },
);

export const ColorPickerAlphaField = forwardRef<HTMLInputElement, ColorPickerAlphaFieldProps>(
  function AlphaField(props, ref) {
    return <ColorPickerChannelInput {...props} channel="alpha" ref={ref} />;
  },
);

export const ColorPickerArea = forwardRef<HTMLDivElement, ColorPickerAreaProps>(function Area(
  {
    saturationLabel,
    brightnessLabel,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    style,
    children,
    ...props
  },
  ref,
) {
  const context = useColor();
  const blocked = context.disabled || context.readOnly;

  const update = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (blocked || !rect.width || !rect.height) return;
    context.setHsv({
      ...context.hsv,
      s: clamp(((event.clientX - rect.left) / rect.width) * 100, 100),
      v: clamp((1 - (event.clientY - rect.top) / rect.height) * 100, 100),
    });
  };

  return (
    <div
      {...props}
      ref={ref}
      role="group"
      data-slot="area"
      data-disabled={context.disabled || undefined}
      data-readonly={context.readOnly || undefined}
      style={
        {
          '--color-picker-hue': context.hsv.h,
          '--color-picker-saturation': context.hsv.s + '%',
          '--color-picker-brightness': 100 - context.hsv.v + '%',
          ...style,
        } as React.CSSProperties
      }
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (event.defaultPrevented || blocked || event.button !== 0) return;
        event.preventDefault();
        event.currentTarget.setPointerCapture?.(event.pointerId);
        event.currentTarget.querySelector<HTMLInputElement>('input')?.focus();
        update(event);
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (!event.defaultPrevented && event.currentTarget.hasPointerCapture?.(event.pointerId))
          update(event);
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event);
        if (event.currentTarget.hasPointerCapture?.(event.pointerId))
          event.currentTarget.releasePointerCapture(event.pointerId);
      }}
    >
      <input
        type="range"
        data-slot="saturation"
        aria-label={saturationLabel}
        min={0}
        max={100}
        value={context.hsv.s}
        disabled={context.disabled}
        aria-readonly={context.readOnly || undefined}
        onKeyDown={(event) => {
          if (context.readOnly) event.preventDefault();
        }}
        onPointerDown={(event) => {
          if (context.readOnly) event.preventDefault();
        }}
        onChange={(event) =>
          context.setHsv({ ...context.hsv, s: Number(event.currentTarget.value) })
        }
      />
      <input
        type="range"
        data-slot="brightness"
        aria-label={brightnessLabel}
        min={0}
        max={100}
        value={context.hsv.v}
        disabled={context.disabled}
        aria-readonly={context.readOnly || undefined}
        onKeyDown={(event) => {
          if (context.readOnly) event.preventDefault();
        }}
        onPointerDown={(event) => {
          if (context.readOnly) event.preventDefault();
        }}
        onChange={(event) =>
          context.setHsv({ ...context.hsv, v: Number(event.currentTarget.value) })
        }
      />
      <span data-slot="area-thumb" aria-hidden="true" style={{ backgroundColor: context.value }} />
      {children}
    </div>
  );
});

export const ColorPickerHue = forwardRef<HTMLInputElement, ColorPickerHueProps>(function Hue(
  { onChange, onKeyDown, onPointerDown, ...props },
  ref,
) {
  const context = useColor();

  return (
    <input
      {...props}
      ref={ref}
      type="range"
      data-slot="hue"
      min={0}
      max={360}
      step={1}
      value={context.hsv.h}
      disabled={context.disabled || props.disabled}
      aria-readonly={context.readOnly || undefined}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (context.readOnly) event.preventDefault();
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (context.readOnly) event.preventDefault();
      }}
      onChange={(event) => {
        onChange?.(event);
        if (!event.defaultPrevented)
          context.setHsv({ ...context.hsv, h: Number(event.currentTarget.value) });
      }}
    />
  );
});

export const ColorPickerOpacity = forwardRef<HTMLInputElement, ColorPickerOpacityProps>(
  function Opacity({ onChange, onKeyDown, onPointerDown, style, ...props }, ref) {
    const context = useColor();

    return (
      <input
        {...props}
        ref={ref}
        type="range"
        data-slot="opacity"
        min={0}
        max={100}
        step={1}
        value={Math.round((colorToAlpha(context.value) / 255) * 100)}
        disabled={context.disabled || props.disabled}
        aria-readonly={context.readOnly || undefined}
        style={
          {
            '--color-picker-opaque-color': context.value.slice(0, 7),
            ...style,
          } as React.CSSProperties
        }
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (context.readOnly) event.preventDefault();
        }}
        onPointerDown={(event) => {
          onPointerDown?.(event);
          if (context.readOnly) event.preventDefault();
        }}
        onChange={(event) => {
          onChange?.(event);
          if (!event.defaultPrevented)
            context.setValue(
              withAlpha(context.value, (Number(event.currentTarget.value) / 100) * 255),
            );
        }}
      />
    );
  },
);
