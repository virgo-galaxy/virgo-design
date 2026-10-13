import { Field, Select, type SelectOptionProps, type SelectSize } from '@virgo-design/ui';

import styles from './filters.module.scss';

export function FilterSelect({
  label,
  value,
  onChange,
  options,
  size = 'medium',
}: {
  size?: SelectSize;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string; intent?: SelectOptionProps['intent'] }[];
}) {
  return (
    <Field>
      <Field.Label className={styles.filterLabel}>{label}</Field.Label>
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
