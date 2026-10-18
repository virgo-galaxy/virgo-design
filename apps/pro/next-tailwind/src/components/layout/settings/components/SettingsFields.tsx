import { Input, Switch } from '@virgo-design/ui';
import { useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function PixelInput({
  id,
  width,
  min,
  max,
  type = 'text',
  onChange,
}: {
  id: string;
  width: number;
  min: number;
  max: number;
  type?: 'text' | 'number';
  onChange: (width: number) => void;
}) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState<{ width: number; text: string } | null>(null);
  const text = draft?.width === width ? draft.text : String(width);

  const commit = (value: string) => {
    const number = Number(value);

    if (/^\d+$/.test(value) && Number.isFinite(number))
      onChange(Math.min(max, Math.max(min, number)));

    setDraft(null);
  };

  return (
    <Input
      id={id}
      size="medium"
      type={type}
      steppers={type === 'number'}
      stepperReverse={type === 'number'}
      min={min}
      max={max}
      step={1}
      inputMode="numeric"
      value={text}
      suffix={t('settings.px')}
      aria-describedby={`${id}-hint`}
      rootClassName={
        type === 'number'
          ? '[width:calc(var(--vd-sizing-80)_+_var(--vd-sizing-40))] flex-none'
          : '[width:var(--vd-sizing-80)] flex-none'
      }
      className="[text-align:right] tabular-nums"
      onChange={(event) => {
        const value = event.currentTarget.value;
        const number = Number(value);
        const valid = /^\d+$/.test(value) && number >= min && number <= max;

        setDraft({ width: valid ? number : width, text: value });

        if (valid) onChange(number);
      }}
      onBlur={(event) => commit(event.currentTarget.value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          event.currentTarget.blur();
        } else if (event.key === 'Escape') {
          event.preventDefault();
          event.stopPropagation();
          event.currentTarget.value = String(width);
          setDraft(null);
          event.currentTarget.blur();
        }
      }}
    />
  );
}

export function SettingToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean, anchorY: number) => void;
}) {
  const id = useId();
  const pointerY = useRef<number | null>(null);

  return (
    <div
      className={[
        '[&_p]:m-0 [&_p]:text-text-tertiary [&_p]:text-(length:--vd-font-size-12) [&_p]:[line-height:var(--vd-line-height-4)]',
        '[&_>_div]:[display:contents] [&_>_div_>_label]:[grid-column:1] [&_>_div_>_label]:[grid-row:1] [&_label]:text-text-primary',
        '[&_p]:[grid-column:1] [&_p]:[grid-row:2] [&_p]:mt-4 [&_>_label]:[grid-column:2] [&_>_label]:[grid-row:1]',
        'grid [grid-template-columns:minmax(0,_1fr)_auto] items-center gap-x-16',
      ].join(' ')}
      onPointerDownCapture={(event) => {
        pointerY.current = event.clientY;
      }}
      onKeyDownCapture={() => {
        pointerY.current = null;
      }}
    >
      <div>
        <label htmlFor={id}>{label}</label>
        <p id={`${id}-hint`}>{description}</p>
      </div>
      <Switch
        id={id}
        checked={checked}
        onChange={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          onChange(event.currentTarget.checked, pointerY.current ?? bounds.top + bounds.height / 2);
          pointerY.current = null;
        }}
        aria-describedby={`${id}-hint`}
        size="default"
      />
    </div>
  );
}
