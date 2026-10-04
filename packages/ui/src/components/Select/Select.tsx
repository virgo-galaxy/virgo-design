import { CheckIcon, ChevronDownIcon, CloseIcon } from '@virgo-design/icons';
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

import { useControlLabels } from '../../shared/control-labels';
import styles from './Select.module.scss';
import type {
  SelectContentProps,
  SelectMultipleProps,
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
  size: SelectProps['size'];
  labels: ReadonlyMap<string, ReactNode>;
  intents: ReadonlyMap<string, SelectOptionProps['intent']>;
  value: string | undefined;
  values: readonly string[];
  multiple: boolean;
};

const SelectVisualContext = createContext<SelectVisualContextValue | null>(null);

function useSelectVisualContext(componentName: string) {
  const context = useContext(SelectVisualContext);

  if (context === null) {
    throw new Error(`${componentName} must be used inside Select.`);
  }

  return context;
}

function collectOptionLabels(
  children: ReactNode,
  labels = new Map<string, ReactNode>(),
  intents = new Map<string, SelectOptionProps['intent']>(),
) {
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    if (child.type === SelectOption) {
      const optionProps = child.props as SelectOptionProps;
      labels.set(optionProps.value, optionProps.children);
      intents.set(optionProps.value, optionProps.intent);
      return;
    }

    const childProps = child.props as { children?: ReactNode };
    if (childProps.children !== undefined) {
      collectOptionLabels(childProps.children, labels, intents);
    }
  });

  return { labels, intents };
}

function optionText(label: ReactNode): string {
  if (typeof label === 'string' || typeof label === 'number') return String(label);
  if (Array.isArray(label)) return label.map(optionText).join('');
  if (isValidElement<{ children?: ReactNode }>(label)) return optionText(label.props.children);
  return '';
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
  const { labels, intents } = useMemo(() => collectOptionLabels(children), [children]);

  return (
    <SelectVisualContext.Provider
      value={{
        invalid,
        labels,
        intents,
        value,
        values: value === undefined ? [] : [value],
        multiple: false,
        size,
      }}
    >
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

export const SelectMultiple = forwardRef<HTMLDivElement, SelectMultipleProps>(
  function SelectMultiple(
    {
      children,
      value: controlledValue,
      defaultValue = [],
      onValueChange,
      size = 'medium',
      invalid = false,
      className,
      ...props
    },
    ref,
  ) {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const values = controlledValue ?? uncontrolledValue;
    const { labels, intents } = useMemo(() => collectOptionLabels(children), [children]);
    return (
      <SelectVisualContext.Provider
        value={{ invalid, labels, intents, value: undefined, values, multiple: true, size }}
      >
        <PrimitiveSelect.Multiple
          {...props}
          ref={ref}
          className={joinClassNames(styles.root, className)}
          data-invalid={invalid || undefined}
          data-size={size}
          defaultValue={defaultValue}
          value={controlledValue}
          onValueChange={(next) => {
            if (controlledValue === undefined) setUncontrolledValue(next);
            onValueChange?.(next);
          }}
        >
          {children}
        </PrimitiveSelect.Multiple>
      </SelectVisualContext.Provider>
    );
  },
);
SelectMultiple.displayName = 'Select.Multiple';

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
    const controlLabels = useControlLabels();
    const isInvalid = context.invalid || hasAriaInvalidValue(ariaInvalid);
    const selectedLabel =
      context.value === undefined ? undefined : context.labels.get(context.value);
    const visibleValue = renderValue
      ? renderValue(context.value, selectedLabel ?? placeholder)
      : (selectedLabel ?? children ?? placeholder);

    const trigger = (
      <PrimitiveSelect.Trigger
        {...props}
        ref={forwardedRef}
        className={joinClassNames(styles.trigger, className)}
        aria-invalid={isInvalid || undefined}
      >
        <span
          className={styles.value}
          data-slot="value"
          data-intent={context.value === undefined ? undefined : context.intents.get(context.value)}
          data-placeholder={selectedLabel === undefined || undefined}
        >
          {context.multiple ? (
            context.values.length ? (
              <span className={styles.srOnly}>
                {context.values
                  .map((value) => optionText(context.labels.get(value)) || value)
                  .join(', ')}
              </span>
            ) : (
              (children ?? placeholder)
            )
          ) : (
            visibleValue
          )}
        </span>
        <span className={styles.indicator} data-slot="indicator" aria-hidden="true">
          {indicator}
        </span>
      </PrimitiveSelect.Trigger>
    );
    if (!context.multiple) return trigger;
    return (
      <div className={styles.multipleControl}>
        {trigger}
        {context.values.length ? (
          <div className={styles.selectedValues}>
            {context.values.map((value) => {
              const label = context.labels.get(value) ?? value;
              const text = optionText(label) || value;
              return (
                <span
                  className={styles.selectedTag}
                  key={value}
                  data-slot="selected-tag"
                  data-intent={context.intents.get(value)}
                >
                  <span>{label}</span>
                  <PrimitiveSelect.Remove
                    value={value}
                    className={styles.remove}
                    aria-label={controlLabels.removeSelection.replace('{{value}}', text)}
                  >
                    <CloseIcon size={12} aria-hidden="true" />
                  </PrimitiveSelect.Remove>
                </span>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  },
);

SelectTrigger.displayName = 'Select.Trigger';

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(function SelectContent(
  { children, className, ...props },
  forwardedRef,
) {
  const context = useSelectVisualContext('Select.Content');
  return (
    <PrimitiveSelect.Content
      {...props}
      ref={forwardedRef}
      data-size={context.size}
      className={joinClassNames(styles.content, className)}
    >
      <div className={styles.viewport} data-slot="viewport" data-overlay-viewport="">
        {children}
      </div>
    </PrimitiveSelect.Content>
  );
});

SelectContent.displayName = 'Select.Content';

export const SelectOption = forwardRef<HTMLDivElement, SelectOptionProps>(function SelectOption(
  { children, className, intent, ...props },
  forwardedRef,
) {
  const context = useSelectVisualContext('Select.Option');
  return (
    <PrimitiveSelect.Option
      {...props}
      ref={forwardedRef}
      className={joinClassNames(styles.option, className)}
      data-multiple={context.multiple || undefined}
      data-intent={intent}
    >
      {context.multiple ? (
        <span className={styles.checkbox} data-slot="checkbox" aria-hidden="true">
          <CheckIcon className={styles.checkboxMark} />
        </span>
      ) : null}
      <span className={styles.optionLabel} data-slot="option-label">
        {children}
      </span>
      {context.multiple ? null : (
        <span className={styles.check} data-slot="check" aria-hidden="true">
          <CheckIcon />
        </span>
      )}
    </PrimitiveSelect.Option>
  );
});

SelectOption.displayName = 'Select.Option';
