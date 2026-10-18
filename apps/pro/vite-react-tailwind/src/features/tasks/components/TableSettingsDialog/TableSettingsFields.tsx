import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from '@virgo-design/icons';
import { Field, Input, SegmentedControl, Select, Switch } from '@virgo-design/ui';
import { useEffect, useState } from 'react';

export function AlignmentChoices({
  label,
  value,
  labels,
  onChange,
}: {
  label: string;
  value: 'start' | 'center' | 'end';
  labels: readonly [string, string, string];
  onChange: (value: 'start' | 'center' | 'end') => void;
}) {
  return (
    <SegmentedControl
      aria-label={label}
      size="medium"
      motion="slide"
      value={value}
      onValueChange={(next) => onChange(next as typeof value)}
    >
      {(['start', 'center', 'end'] as const).map((alignment, index) => {
        const Icon = [AlignLeftIcon, AlignCenterIcon, AlignRightIcon][index]!;

        return (
          <SegmentedControl.Item
            key={alignment}
            value={alignment}
            aria-label={labels[index]}
            tooltip={labels[index]}
          >
            <span className="flex items-center">
              <Icon size={20} />
            </span>
          </SegmentedControl.Item>
        );
      })}
    </SegmentedControl>
  );
}

export function Choice({
  label,
  value,
  choices,
  onChange,
}: {
  label: string;
  value: string;
  choices: readonly [string, string][];
  onChange: (value: string) => void;
}) {
  return (
    <Field>
      <Field.Label>{label}</Field.Label>
      <Select size="medium" value={value} onValueChange={onChange}>
        <Select.Trigger />
        <Select.Content>
          {choices.map(([key, text]) => (
            <Select.Option key={key} value={key}>
              {text}
            </Select.Option>
          ))}
        </Select.Content>
      </Select>
    </Field>
  );
}

export function NumberSetting({
  label,
  value,
  min = 1,
  max = 3000,
  onChange,
  className,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string | undefined;
}) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);

  const commit = () => {
    const next = Number(draft);

    if (draft && Number.isFinite(next)) {
      const clamped = Math.max(min, Math.min(max, Math.round(next)));
      setDraft(String(clamped));
      onChange(clamped);
    } else setDraft(String(value));
  };

  return (
    <Field className={className}>
      <Field.Label>{label}</Field.Label>
      <Input
        size="medium"
        type="number"
        min={min}
        max={max}
        step={1}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            event.currentTarget.blur();
          }
        }}
      />
    </Field>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="pro-table-settings-dialog-toggle flex gap-16 items-center justify-between [min-height:var(--vd-sizing-36)] [font-size:var(--vd-font-size-12)]">
      <span>{label}</span>
      <Switch
        aria-label={label}
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
    </div>
  );
}
