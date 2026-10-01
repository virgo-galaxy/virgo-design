import { CheckIcon, ChevronDownIcon } from '@virgo-design/icons';
import { Select as PrimitiveSelect } from '@virgo-design/primitives';
import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

import styles from './Select.module.scss';
import type {
  SelectContentProps,
  SelectOptionProps,
  SelectProps,
  SelectTriggerProps,
} from './Select.types';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

function hasAriaInvalidValue(value: SelectTriggerProps['aria-invalid']) {
  return value !== undefined && value !== false && value !== 'false';
}

type SelectVisualContextValue = {
  invalid: boolean;
  labels: ReadonlyMap<string, ReactNode>;
  value: string | undefined;
};

const SelectVisualContext = createContext<SelectVisualContextValue | null>(null);

function useSelectVisualContext(componentName: string) {
  const context = useContext(SelectVisualContext);

  if (context === null) {
    throw new Error(`${componentName} must be used inside Select.`);
  }

  return context;
}

function collectOptionLabels(children: ReactNode, labels = new Map<string, ReactNode>()) {
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    if (child.type === SelectOption) {
      const optionProps = child.props as SelectOptionProps;
      labels.set(optionProps.value, optionProps.children);
      return;
    }

    const childProps = child.props as { children?: ReactNode };
    if (childProps.children !== undefined) {
      collectOptionLabels(childProps.children, labels);
    }
  });

  return labels;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(
  {
    children,
    value: controlledValue,
    defaultValue,
    onValueChange,
    size = 'medium',
    invalid = false,
    className,
    ...props
  },
  forwardedRef,
) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const value = controlledValue === undefined ? uncontrolledValue : controlledValue;
  const labels = useMemo(() => collectOptionLabels(children), [children]);

  return (
    <SelectVisualContext.Provider value={{ invalid, labels, value }}>
      <PrimitiveSelect
        {...props}
        ref={forwardedRef}
        className={joinClassNames(styles.root, className)}
        data-invalid={invalid || undefined}
        data-size={size}
        defaultValue={defaultValue}
        value={controlledValue}
        onValueChange={(nextValue) => {
          if (controlledValue === undefined) {
            setUncontrolledValue(nextValue);
          }

          onValueChange?.(nextValue);
        }}
      >
        {children}
      </PrimitiveSelect>
    </SelectVisualContext.Provider>
  );
});

Select.displayName = 'Select';

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger(
    {
      children,
      renderValue,
      indicator = <ChevronDownIcon />,
      placeholder = 'Select an option',
      className,
      'aria-invalid': ariaInvalid,
      ...props
    },
    forwardedRef,
  ) {
    const context = useSelectVisualContext('Select.Trigger');
    const isInvalid = context.invalid || hasAriaInvalidValue(ariaInvalid);
    const selectedLabel =
      context.value === undefined ? undefined : context.labels.get(context.value);
    const visibleValue = renderValue
      ? renderValue(context.value, selectedLabel ?? placeholder)
      : (selectedLabel ?? children ?? placeholder);

    return (
      <PrimitiveSelect.Trigger
        {...props}
        ref={forwardedRef}
        className={joinClassNames(styles.trigger, className)}
        aria-invalid={isInvalid || undefined}
      >
        <span
          className={styles.value}
          data-slot="value"
          data-placeholder={selectedLabel === undefined || undefined}
        >
          {visibleValue}
        </span>
        <span className={styles.indicator} data-slot="indicator" aria-hidden="true">
          {indicator}
        </span>
      </PrimitiveSelect.Trigger>
    );
  },
);

SelectTrigger.displayName = 'Select.Trigger';

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(function SelectContent(
  { children, className, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveSelect.Content
      {...props}
      ref={forwardedRef}
      className={joinClassNames(styles.content, className)}
    >
      <div className={styles.viewport} data-slot="viewport">
        {children}
      </div>
    </PrimitiveSelect.Content>
  );
});

SelectContent.displayName = 'Select.Content';

export const SelectOption = forwardRef<HTMLDivElement, SelectOptionProps>(function SelectOption(
  { children, className, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveSelect.Option
      {...props}
      ref={forwardedRef}
      className={joinClassNames(styles.option, className)}
    >
      <span className={styles.optionLabel} data-slot="option-label">
        {children}
      </span>
      <span className={styles.check} data-slot="check" aria-hidden="true">
        <CheckIcon />
      </span>
    </PrimitiveSelect.Option>
  );
});

SelectOption.displayName = 'Select.Option';
