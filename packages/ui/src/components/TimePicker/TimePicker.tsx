import { ClockIcon } from '@virgo-design/icons';
import {
  Field as PrimitiveField,
  TimePicker as PrimitiveTimePicker,
} from '@virgo-design/primitives';
import { forwardRef, useRef, useState } from 'react';

import { useComposedRefs } from '../../internal/utils/composeRefs';
import { useLocale } from '../../locale/context/locale-context';
import { Button } from '../Button';
import { Popover } from '../Popover';
import { TimeColumn } from './TimeColumn';
import styles from './TimePicker.module.scss';
import type { TimePickerProps } from './TimePicker.types';

const hours = Array.from({ length: 24 }, (_, index) => index);
const subdivisions = Array.from({ length: 60 }, (_, index) => index);
const pad = (value: number) => String(value).padStart(2, '0');

const TimePickerCore = forwardRef<HTMLInputElement, TimePickerProps>(function TimePickerCore(
  {
    size = 'medium',
    loop = false,
    showSeconds,
    showClear = false,
    showConfirm = false,
    className,
    value,
    defaultValue = '',
    onValueChange,
    onKeyDown,
    onClick,
    ...props
  },
  forwardedRef,
) {
  const { timePicker: labels, input } = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);
  const composedRef = useComposedRefs(forwardedRef, inputRef);

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);

  const current = value ?? uncontrolledValue;
  const parts = String(current || props.min || '00:00').split(':');
  const step = props.step === 'any' ? 0 : Number(props.step ?? (showSeconds ? 1 : 60));
  const seconds = showSeconds ?? (parts.length > 2 || (step > 0 && step % 60 !== 0));
  const locked = Boolean(props.disabled || props.readOnly);

  // Use native validity for bounds, midnight-crossing ranges and step bases.
  const probe = typeof document === 'undefined' ? null : document.createElement('input');
  if (probe) {
    probe.type = 'time';
    probe.min = String(props.min ?? '');
    probe.max = String(props.max ?? '');
    probe.step = String(props.step ?? (showSeconds ? 1 : 60));
    probe.defaultValue = inputRef.current?.defaultValue ?? current;
  }

  const candidate = (index: number, next: number) => {
    const updated = [parts[0] ?? '00', parts[1] ?? '00'];
    if (seconds || parts.length > 2) updated.push(parts[2] ?? '00');
    updated[index] = pad(next) + (index === 2 ? (parts[2]?.slice(2) ?? '') : '');
    return updated.join(':');
  };

  const allowed = (time: string) => {
    if (!probe) return true;
    probe.value = time;
    return Boolean(probe.value) && probe.validity.valid;
  };

  const commit = (next: string) => {
    const input = inputRef.current;

    if (!input || locked || (next && !allowed(next))) return;

    const owner = input.ownerDocument.defaultView!;
    Object.getOwnPropertyDescriptor(owner.HTMLInputElement.prototype, 'value')!.set!.call(
      input,
      next,
    );
    input.dispatchEvent(new owner.Event('input', { bubbles: true }));
  };

  return (
    <Popover
      className={styles.wrapper}
      data-size={size}
      anchor="root"
      open={open && !locked}
      onOpenChange={setOpen}
      disabled={locked}
      onClick={(event) => {
        if (event.target === event.currentTarget && !locked) setOpen(true);
      }}
    >
      <PrimitiveTimePicker
        {...props}
        ref={composedRef}
        step={props.step ?? (showSeconds ? 1 : undefined)}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(next) => {
          if (value === undefined) setUncontrolledValue(next);
          onValueChange?.(next);
        }}
        data-size={size}
        className={[styles.root, className].filter(Boolean).join(' ')}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented && !locked) {
            event.preventDefault();
            setOpen(true);
          }
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (
            !event.defaultPrevented &&
            !locked &&
            (event.key === 'F4' || event.key === ' ' || (event.altKey && event.key === 'ArrowDown'))
          ) {
            event.preventDefault();
            setOpen(true);
          }
        }}
      />
      <Popover.Trigger
        aria-label={labels.chooseTime}
        disabled={locked}
        render={(attributes) => (
          <button {...attributes} type="button" className={styles.trigger}>
            <ClockIcon className={styles.icon} />
          </button>
        )}
      />
      <Popover.Content aria-label={labels.chooseTime} className={styles.content}>
        <div className={styles.columns} data-time-columns="">
          {[labels.timeHours, labels.timeMinutes, ...(seconds ? [labels.timeSeconds] : [])].map(
            (label, index) => (
              <TimeColumn
                key={label}
                label={label}
                values={index === 0 ? hours : subdivisions}
                selected={parseInt(parts[index] ?? '0', 10)}
                loop={loop}
                allowed={(next) => allowed(candidate(index, next))}
                onSelect={(next) => commit(candidate(index, next))}
              />
            ),
          )}
        </div>
        {showClear || showConfirm ? (
          <div className={styles.footer}>
            {showClear ? (
              <Button
                size="small"
                variant="text"
                disabled={!current || props.required}
                onClick={() => commit('')}
              >
                {input.clearInput}
              </Button>
            ) : null}
            {showConfirm ? (
              <Button size="small" variant="primary" onClick={() => setOpen(false)}>
                {labels.confirmTime}
              </Button>
            ) : null}
          </div>
        ) : null}
      </Popover.Content>
    </Popover>
  );
});

export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  function TimePicker(props, ref) {
    return (
      <PrimitiveField.Control
        render={(attributes) => (
          <TimePickerCore
            {...attributes}
            {...props}
            ref={ref}
            disabled={props.disabled ?? attributes.disabled}
            readOnly={props.readOnly ?? attributes.readOnly}
            required={props.required ?? attributes.required}
          />
        )}
      />
    );
  },
);
