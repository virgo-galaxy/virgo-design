import { Field, Select, type SelectOptionProps, type SelectSize } from '@virgo-design/ui';

interface FilterSelectProps {
  size?: SelectSize;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string; intent?: SelectOptionProps['intent'] }[];
}

export function FilterSelect({
  label,
  value,
  onChange,
  options,
  size = 'medium',
}: FilterSelectProps) {
  return (
    <Field>
      <Field.Label className="text-text-secondary text-(length:--vd-font-size-11)">
        {label}
      </Field.Label>
      <Select size={size} value={value} onValueChange={onChange}>
        <Select.Trigger />
        <Select.Content>
          {options.map((option) => (
            <Select.Option key={option.value} value={option.value} intent={option.intent}>
              {option.label}
            </Select.Option>
          ))}
        </Select.Content>
      </Select>
    </Field>
  );
}
