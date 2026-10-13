import { Field, Select, type SelectOptionProps, type SelectSize } from '@virgo-design/ui';

import styles from './filters.module.scss';

export function MultiFilterSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  size = 'medium',
  className,
}: {
  className?: string | undefined;
  size?: SelectSize;
  label: string;
  value: readonly string[];
  onChange: (value: string[]) => void;
  options: readonly { value: string; label: string; intent?: SelectOptionProps['intent'] }[];
  placeholder: string;
}) {
  return (
    <Field>
      <Field.Label className={styles.filterLabel}>{label}</Field.Label>
      <Select.Multiple className={className} size={size} value={value} onValueChange={onChange}>
        <Select.Trigger placeholder={placeholder} />
        <Select.Content>
          {options.map((option) => (
            <Select.Option key={option.value} value={option.value} intent={option.intent}>
              {option.label}
            </Select.Option>
          ))}
        </Select.Content>
      </Select.Multiple>
    </Field>
  );
}
