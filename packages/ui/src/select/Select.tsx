import { CheckIcon, ChevronDownIcon } from '@virgo-design/icons';
import {
  Select as PrimitiveSelect,
  SelectContent as PrimitiveSelectContent,
  SelectOption as PrimitiveSelectOption,
  SelectTrigger as PrimitiveSelectTrigger,
} from '@virgo-design/primitives';
import { forwardRef, useState } from 'react';

import styles from './Select.module.scss';
import type { SelectProps } from './Select.types';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

function hasAriaInvalidValue(value: SelectProps['aria-invalid']) {
  return value !== undefined && value !== false && value !== 'false';
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    options,
    value: controlledValue,
    defaultValue,
    onValueChange,
    placeholder = 'Select an option',
    size = 'medium',
    invalid = false,
    disabled = false,
    className,
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-invalid': ariaInvalid,
    ...props
  },
  forwardedRef,
) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const value = controlledValue === undefined ? uncontrolledValue : controlledValue;
  const isInvalid = invalid || hasAriaInvalidValue(ariaInvalid);
  const selectedOption = options.find((option) => option.value === value);

  const handleValueChange = (nextValue: string) => {
    if (controlledValue === undefined) {
      setUncontrolledValue(nextValue);
    }

    onValueChange?.(nextValue);
  };

  return (
    <PrimitiveSelect
      {...props}
      className={joinClassNames(styles.root, className)}
      id={id}
      data-invalid={isInvalid || undefined}
      data-size={size}
      disabled={disabled}
      onValueChange={handleValueChange}
      value={value}
    >
      <PrimitiveSelectTrigger
        ref={forwardedRef}
        className={styles.trigger}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-invalid={invalid ? true : ariaInvalid}
      >
        <span className={styles.value} data-placeholder={!selectedOption || undefined}>
          {selectedOption?.label ?? placeholder}
        </span>
        <span className={styles.indicator} aria-hidden="true">
          <ChevronDownIcon />
        </span>
      </PrimitiveSelectTrigger>

      <PrimitiveSelectContent className={styles.content}>
        <div className={styles.viewport}>
          {options.map((option) => (
            <PrimitiveSelectOption
              className={styles.option}
              disabled={option.disabled}
              key={option.value}
              value={option.value}
            >
              <span className={styles.optionLabel}>{option.label}</span>
              <span className={styles.check} aria-hidden="true">
                <CheckIcon />
              </span>
            </PrimitiveSelectOption>
          ))}
        </div>
      </PrimitiveSelectContent>
    </PrimitiveSelect>
  );
});

Select.displayName = 'Select';
