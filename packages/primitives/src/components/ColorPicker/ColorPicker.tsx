import { createContext, forwardRef, useContext, useState } from 'react';

import { useFieldControl, useFieldState } from '../../internal/form/field-context';
import { useControllableState } from '../../internal/hooks/useControllableState';
import { Popover } from '../Popover';
import {
  clamp,
  colorToHsv,
  colorToRgb,
  hsvToColor,
  normalizeColor,
  rgbToColor,
} from './color-model';
import type {
  ColorPickerAreaProps,
  ColorPickerChannelFieldProps,
  ColorPickerHexFieldProps,
  ColorPickerHueProps,
  ColorPickerInputProps,
  ColorPickerPreviewProps,
  ColorPickerProps,
  ColorPickerSwatchProps,
} from './ColorPicker.types';
const normalize = normalizeColor;
const Context = createContext<{
  hsv: { h: number; s: number; v: number };
  setHsv: (value: { h: number; s: number; v: number }) => void;
  value: string;
  disabled: boolean;
  readOnly: boolean;
  setValue: (value: string) => void;
} | null>(null);
function useColor() {
  const context = useContext(Context);
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
    normalize(defaultValue),
    onValueChange,
  );
  const value = normalize(raw);
  const [hint, setHint] = useState(() => ({ value, ...colorToHsv(value) }));
  const hsv = hint.value === value ? hint : colorToHsv(value);
  const setValue = (next: string) => {
    if (!disabled && !readOnly && /^#[0-9a-f]{6}$/i.test(next)) {
      const normalized = normalize(next);
      const nextHsv = colorToHsv(normalized);
      setHint({ value: normalized, ...nextHsv, h: nextHsv.s ? nextHsv.h : hsv.h });
      setRaw(normalized);
    }
  };
  return (
    <Context.Provider
      value={{
        value,
        disabled,
        readOnly,
        setValue,
        hsv,
        setHsv: (next) => {
          if (disabled || readOnly) return;
          const normalized = hsvToColor(next);
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
    </Context.Provider>
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
        value={context.value}
        disabled={context.disabled || field.disabled}
        aria-readonly={context.readOnly || field.readOnly || undefined}
        onClick={(event) => {
          onClick?.(event);
          if (context.readOnly || field.readOnly) event.preventDefault();
        }}
        onChange={(event) => {
          if (context.readOnly || field.readOnly) return;
          onChange?.(event);
          if (!event.defaultPrevented) context.setValue(event.currentTarget.value);
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
        aria-pressed={context.value === normalize(value)}
        disabled={context.disabled || context.readOnly || props.disabled}
        data-color={normalize(value)}
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
        style={{ backgroundColor: context.value, ...style }}
      />
    );
  },
);

export const ColorPickerTrigger = Popover.Trigger;
export const ColorPickerContent = Popover.Content;
export const ColorPickerHexField = forwardRef<HTMLInputElement, ColorPickerHexFieldProps>(
  function HexField(
    { letterCase = 'lower', onChange, onBlur, onKeyDown, disabled, readOnly, ...props },
    ref,
  ) {
    const context = useColor();
    const format = (value: string) => (letterCase === 'upper' ? value.toUpperCase() : value);
    const [draft, setDraft] = useState<{ color: string; text: string } | null>(null);
    const text = draft?.color === context.value ? draft.text : format(context.value);
    const field = useFieldControl({ ...props, disabled, readOnly });
    const blocked = context.disabled || field.disabled || context.readOnly || field.readOnly;
    const commit = () => {
      if (!blocked && /^#[0-9a-f]{6}$/i.test(text)) context.setValue(text);
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
export const ColorPickerChannelField = forwardRef<HTMLInputElement, ColorPickerChannelFieldProps>(
  function ChannelField(
    { channel, onChange, onBlur, onKeyDown, disabled, readOnly, ...props },
    ref,
  ) {
    const context = useColor();
    const rgb = colorToRgb(context.value);
    const [draft, setDraft] = useState<{
      color: string;
      text: string;
      channel: typeof channel;
    } | null>(null);
    const text =
      draft?.color === context.value && draft.channel === channel
        ? draft.text
        : String(rgb[channel]);
    const field = useFieldControl({ ...props, disabled, readOnly });
    const blocked = context.disabled || field.disabled || context.readOnly || field.readOnly;
    const commit = () => {
      const parsed = text.trim() === '' ? NaN : Number(text);
      if (!blocked && Number.isFinite(parsed))
        context.setValue(rgbToColor({ ...rgb, [channel]: parsed }));
      setDraft(null);
    };
    return (
      <input
        {...field}
        ref={ref}
        type="number"
        min={0}
        max={255}
        step={1}
        data-slot="channel-field"
        value={text}
        disabled={context.disabled || field.disabled}
        readOnly={context.readOnly || field.readOnly}
        onChange={(event) => {
          onChange?.(event);
          if (event.defaultPrevented || blocked) return;
          const raw = event.currentTarget.value;
          setDraft({ color: context.value, channel, text: raw });
          if (raw.trim() !== '' && Number.isFinite(Number(raw)))
            context.setValue(rgbToColor({ ...rgb, [channel]: Number(raw) }));
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
