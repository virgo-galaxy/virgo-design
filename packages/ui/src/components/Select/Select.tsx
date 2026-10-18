import { CheckIcon, ChevronDownIcon, CloseIcon } from '@virgo-design/icons';
import { Select as PrimitiveSelect, useSelectState } from '@virgo-design/primitives';
import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  type ReactNode,
  useContext,
  useMemo,
} from 'react';

import { useLocale } from '../../locale/context/locale-context';
import type {
  SelectContentProps,
  SelectMultipleProps,
  SelectOptionProps,
  SelectProps,
  SelectTriggerProps,
} from './Select.types';

import styles from './Select.module.scss';

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

    // Fast Refresh can leave existing elements pointing at the previous component object.
    if (
      child.type === SelectOption ||
      (((typeof child.type === 'object' && child.type !== null) ||
        typeof child.type === 'function') &&
        'displayName' in child.type &&
        child.type.displayName === 'Select.Option')
    ) {
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
  { children, size = 'medium', invalid = false, className, ...props },
  forwardedRef,
) {
  const { labels, intents } = useMemo(() => collectOptionLabels(children), [children]);

  return (
    <SelectVisualContext.Provider
      value={{
        invalid,
        labels,
        intents,
        size,
      }}
    >
      <PrimitiveSelect
        {...props}
        ref={forwardedRef}
        className={joinClassNames(styles.root, className)}
        data-invalid={invalid || undefined}
        data-size={size}
      >
        {children}
      </PrimitiveSelect>
    </SelectVisualContext.Provider>
  );
});

Select.displayName = 'Select';

export const SelectMultiple = forwardRef<HTMLDivElement, SelectMultipleProps>(
  function SelectMultiple(
    { children, size = 'medium', invalid = false, className, ...props },
    ref,
  ) {
    const { labels, intents } = useMemo(() => collectOptionLabels(children), [children]);

    return (
      <SelectVisualContext.Provider value={{ invalid, labels, intents, size }}>
        <PrimitiveSelect.Multiple
          {...props}
          ref={ref}
          className={joinClassNames(styles.root, className)}
          data-invalid={invalid || undefined}
          data-size={size}
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
      placeholder: providedPlaceholder,
      className,
      'aria-invalid': ariaInvalid,
      ...props
    },
    forwardedRef,
  ) {
    const context = useSelectVisualContext('Select.Trigger');
    const selection = useSelectState();
    const value = selection.multiple ? undefined : selection.value;
    const values = selection.multiple ? selection.value : [];

    const controlLabels = useLocale().select;
    const placeholder = providedPlaceholder ?? controlLabels.placeholder;
    const isInvalid = context.invalid || hasAriaInvalidValue(ariaInvalid);
    const selectedLabel = value === undefined ? undefined : context.labels.get(value);
    const visibleValue = renderValue
      ? renderValue(value, selectedLabel ?? placeholder)
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
          data-intent={value === undefined ? undefined : context.intents.get(value)}
          data-placeholder={selectedLabel === undefined || undefined}
        >
          {selection.multiple ? (
            values.length ? (
              <span className={styles.srOnly}>
                {values.map((value) => optionText(context.labels.get(value)) || value).join(', ')}
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

    if (!selection.multiple) return trigger;

    return (
      <div className={styles.multipleControl}>
        {trigger}
        {values.length ? (
          <div className={styles.selectedValues}>
            {values.map((value) => {
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
                    aria-label={controlLabels.removeSelection(text)}
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
  useSelectVisualContext('Select.Option');
  const selection = useSelectState();

  return (
    <PrimitiveSelect.Option
      {...props}
      ref={forwardedRef}
      className={joinClassNames(styles.option, className)}
      data-multiple={selection.multiple || undefined}
      data-intent={intent}
    >
      {selection.multiple ? (
        <span className={styles.checkbox} data-slot="checkbox" aria-hidden="true">
          <CheckIcon className={styles.checkboxMark} />
        </span>
      ) : null}
      <span className={styles.optionLabel} data-slot="option-label">
        {children}
      </span>
      {selection.multiple ? null : (
        <span className={styles.check} data-slot="check" aria-hidden="true">
          <CheckIcon />
        </span>
      )}
    </PrimitiveSelect.Option>
  );
});

SelectOption.displayName = 'Select.Option';
