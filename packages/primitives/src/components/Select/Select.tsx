import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
} from 'react';

import { useFieldControl, useFieldState } from '../../internal/form/field-context';
import { useControllableState } from '../../internal/hooks/useControllableState';
import { useDismiss } from '../../internal/overlay/dismiss';
import { LayerScope, useLayerRegistration, useOverlayLayer } from '../../internal/overlay/layers';
import { Portal } from '../../internal/overlay/Portal';
import { useFloatingPosition } from '../../internal/overlay/useFloatingPosition';
import { composeRefs } from '../../internal/utils/composeRefs';
import type {
  SelectContentProps,
  SelectMultipleProps,
  SelectOptionProps,
  SelectProps,
  SelectRemoveProps,
  SelectTriggerProps,
} from './Select.types';

type OpenFocusIntent = 'selected' | 'first' | 'last';

const TYPEAHEAD_RESET_MS = 500;

type SelectContextValue = {
  value: string | readonly string[] | undefined;
  multiple: boolean;
  removeValue: (value: string) => void;
  setValue: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  requestOpen: (intent?: OpenFocusIntent) => void;
  disabled: boolean;
  readOnly: boolean;
  contentId: string;
  triggerId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  openFocusIntentRef: React.MutableRefObject<OpenFocusIntent>;
};

const SelectContext = createContext<SelectContextValue | null>(null);

function useSelectContext(componentName: string) {
  const context = useContext(SelectContext);

  if (context === null) {
    throw new Error(`${componentName} must be used inside Select.`);
  }

  return context;
}

type SelectRootProps = Omit<SelectProps, 'value' | 'defaultValue' | 'onValueChange'> & {
  multiple?: boolean;
  value?: string | readonly string[] | undefined;
  defaultValue?: string | readonly string[] | undefined;
  onValueChange?: ((value: string | readonly string[]) => void) | undefined;
};

const SelectRoot = forwardRef<HTMLDivElement, SelectRootProps>(function SelectRoot(
  {
    id,
    multiple = false,
    value: controlledValue,
    defaultValue,
    onValueChange,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    disabled: disabledProp,
    readOnly: readOnlyProp,
    name,
    children,
    ...props
  },
  forwardedRef,
) {
  const field = useFieldState();
  const disabled = disabledProp ?? field.disabled ?? false;
  const readOnly = readOnlyProp ?? field.readOnly ?? false;
  const [value, setValue] = useControllableState(controlledValue, defaultValue, onValueChange);
  const [openState, setOpen, resetOpen] = useControllableState(
    controlledOpen,
    defaultOpen,
    onOpenChange,
  );
  const open = !disabled && !readOnly && Boolean(openState);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const openFocusIntentRef = useRef<OpenFocusIntent>('selected');
  const generatedId = useId();
  const fieldControl = useFieldControl({ id });
  const triggerId = fieldControl.id ?? `${generatedId}-trigger`;
  const contentId = `${generatedId}-content`;
  const contentRef = useRef<HTMLDivElement | null>(null);
  const layer = useOverlayLayer(triggerRef, contentRef);
  useLayerRegistration(layer, open);

  const requestOpen = useCallback(
    (intent: OpenFocusIntent = 'selected') => {
      if (disabled || readOnly) {
        return;
      }

      openFocusIntentRef.current = intent;
      setOpen(true);
    },
    [disabled, readOnly, setOpen],
  );

  useDismiss({
    open,
    layer,
    outsideFocus: false,
    escape: false,
    onDismiss: () => setOpen(false),
  });

  useEffect(() => {
    if (disabled || readOnly) resetOpen(false);
  }, [disabled, readOnly, resetOpen]);

  return (
    <SelectContext.Provider
      value={{
        value,
        multiple,
        removeValue: (removed) => {
          if (!disabled && !readOnly && Array.isArray(value))
            setValue(value.filter((entry) => entry !== removed));
        },
        setValue: (next) => {
          if (disabled || readOnly) return;
          if (multiple) {
            const values = Array.isArray(value) ? value : [];
            setValue(
              values.includes(next) ? values.filter((entry) => entry !== next) : [...values, next],
            );
          } else setValue(next);
        },
        open,
        setOpen,
        requestOpen,
        disabled,
        readOnly,
        contentId,
        triggerId,
        triggerRef,
        contentRef,
        openFocusIntentRef,
      }}
    >
      <LayerScope.Provider value={layer}>
        <div
          {...props}
          ref={composeRefs(forwardedRef, rootRef)}
          data-multiple={multiple || undefined}
          data-disabled={disabled || undefined}
          data-state={open ? 'open' : 'closed'}
        >
          {name ? (
            Array.isArray(value) ? (
              value.map((entry) => (
                <input key={entry} disabled={disabled} name={name} type="hidden" value={entry} />
              ))
            ) : (
              <input disabled={disabled} name={name} type="hidden" value={value ?? ''} />
            )
          ) : null}
          {children}
        </div>
      </LayerScope.Provider>
    </SelectContext.Provider>
  );
});

export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(
  { onValueChange, ...props },
  ref,
) {
  return (
    <SelectRoot {...props} ref={ref} onValueChange={(value) => onValueChange?.(value as string)} />
  );
});
Select.displayName = 'Select';

export const SelectMultiple = forwardRef<HTMLDivElement, SelectMultipleProps>(
  function SelectMultiple({ onValueChange, defaultValue = [], ...props }, ref) {
    return (
      <SelectRoot
        {...props}
        multiple
        ref={ref}
        defaultValue={defaultValue}
        onValueChange={(value) => onValueChange?.([...(value as readonly string[])])}
      />
    );
  },
);
SelectMultiple.displayName = 'Select.Multiple';

export const SelectRemove = forwardRef<HTMLButtonElement, SelectRemoveProps>(function SelectRemove(
  { value, onClick, disabled, ...props },
  ref,
) {
  const context = useSelectContext('Select.Remove');
  return (
    <button
      {...props}
      type="button"
      ref={ref}
      disabled={context.disabled || context.readOnly || disabled}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || context.disabled || context.readOnly || disabled) return;
        context.removeValue(value);
        context.triggerRef.current?.focus();
      }}
    />
  );
});
SelectRemove.displayName = 'Select.Remove';

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger(
    { disabled, onClick, onKeyDown, type = 'button', ...props },
    forwardedRef,
  ) {
    const context = useSelectContext('SelectTrigger');
    const fieldProps = useFieldControl({
      ...props,
      readOnly: context.readOnly,
      required: undefined,
      id: context.triggerId,
      disabled: context.disabled || disabled,
    });
    const { readOnly: fieldReadOnly, required: fieldRequired, ...triggerProps } = fieldProps;
    const isDisabled = fieldProps.disabled;

    return (
      <button
        {...triggerProps}
        ref={composeRefs(forwardedRef, context.triggerRef)}
        id={context.triggerId}
        aria-readonly={context.readOnly || fieldReadOnly || undefined}
        aria-required={triggerProps['aria-required'] ?? fieldRequired}
        type={type}
        aria-controls={context.open ? context.contentId : undefined}
        aria-expanded={context.open}
        aria-haspopup="listbox"
        data-state={context.open ? 'open' : 'closed'}
        disabled={isDisabled}
        onClick={(event) => {
          onClick?.(event);

          if (event.defaultPrevented || isDisabled || context.readOnly) {
            return;
          }

          if (context.open) {
            context.setOpen(false);
          } else {
            context.requestOpen('selected');
          }
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);

          if (event.defaultPrevented || isDisabled || context.readOnly) {
            return;
          }

          if (event.key === 'ArrowDown') {
            event.preventDefault();
            context.requestOpen('first');
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            context.requestOpen('last');
          }
        }}
      />
    );
  },
);

SelectTrigger.displayName = 'Select.Trigger';

function getEnabledOptions(content: HTMLElement) {
  return Array.from(
    content.querySelectorAll<HTMLElement>('[role="option"]:not([data-disabled="true"])'),
  );
}

function focusOptionAtIndex(options: HTMLElement[], index: number) {
  if (options.length === 0) {
    return;
  }

  const normalizedIndex = ((index % options.length) + options.length) % options.length;
  options[normalizedIndex]?.focus();
}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(function SelectContent(
  { onKeyDown, placement = 'bottomStart', offset = 4, style, ...props },
  forwardedRef,
) {
  const context = useSelectContext('SelectContent');
  const contentRef = context.contentRef;
  const floating = useFloatingPosition({
    active: context.open,
    triggerRef: context.triggerRef,
    contentRef,
    placement,
    offset,
  });
  const typeaheadRef = useRef('');
  const typeaheadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (typeaheadTimerRef.current !== null) {
        clearTimeout(typeaheadTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!context.open) {
      return;
    }

    const content = contentRef.current;

    if (!content) {
      return;
    }

    const options = getEnabledOptions(content);
    const selectedOption = content.querySelector<HTMLElement>(
      '[role="option"][data-selected="true"]:not([data-disabled="true"])',
    );
    const intent = context.openFocusIntentRef.current;
    const target =
      intent === 'first'
        ? options[0]
        : intent === 'last'
          ? options.at(-1)
          : (selectedOption ?? options[0]);

    target?.focus();
  }, [context.open, context.openFocusIntentRef, contentRef]);

  if (!context.open) {
    return null;
  }

  return (
    <Portal>
      <div
        {...props}
        ref={composeRefs(forwardedRef, contentRef)}
        id={context.contentId}
        data-theme={floating.theme}
        dir={floating.direction}
        data-placement={floating.placement}
        data-side={floating.side}
        style={{ ...style, ...floating.style }}
        role="listbox"
        aria-multiselectable={context.multiple || undefined}
        aria-labelledby={context.triggerId}
        data-state="open"
        onKeyDown={(event) => {
          onKeyDown?.(event);

          if (event.defaultPrevented) {
            return;
          }

          const content = contentRef.current;

          if (!content) {
            return;
          }

          const options = getEnabledOptions(content);
          const activeIndex = options.findIndex((option) => option === document.activeElement);

          if (event.key === 'ArrowDown') {
            event.preventDefault();
            focusOptionAtIndex(options, activeIndex < 0 ? 0 : activeIndex + 1);
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            focusOptionAtIndex(options, activeIndex < 0 ? options.length - 1 : activeIndex - 1);
          } else if (event.key === 'Home') {
            event.preventDefault();
            focusOptionAtIndex(options, 0);
          } else if (event.key === 'End') {
            event.preventDefault();
            focusOptionAtIndex(options, options.length - 1);
          } else if (event.key === 'Escape') {
            event.preventDefault();
            context.setOpen(false);
            context.triggerRef.current?.focus();
          } else if (event.key === 'Tab') {
            context.setOpen(false);
          } else if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey) {
            if (typeaheadTimerRef.current !== null) {
              clearTimeout(typeaheadTimerRef.current);
            }

            typeaheadRef.current += event.key.toLocaleLowerCase();
            typeaheadTimerRef.current = setTimeout(() => {
              typeaheadRef.current = '';
              typeaheadTimerRef.current = null;
            }, TYPEAHEAD_RESET_MS);

            const query = typeaheadRef.current;
            const startIndex = activeIndex < 0 ? 0 : activeIndex + 1;
            const orderedOptions = [...options.slice(startIndex), ...options.slice(0, startIndex)];
            const match = orderedOptions.find((option) =>
              option.textContent?.trim().toLocaleLowerCase().startsWith(query),
            );

            if (match) {
              event.preventDefault();
              match.focus();
            }
          }
        }}
      />
    </Portal>
  );
});

SelectContent.displayName = 'Select.Content';

export const SelectOption = forwardRef<HTMLDivElement, SelectOptionProps>(function SelectOption(
  { value, disabled = false, onClick, onKeyDown, onPointerMove, ...props },
  forwardedRef,
) {
  const context = useSelectContext('SelectOption');
  const isSelected = Array.isArray(context.value)
    ? context.value.includes(value)
    : context.value === value;

  const selectOption = () => {
    if (disabled || context.disabled || context.readOnly) return;
    context.setValue(value);
    if (!context.multiple) {
      context.setOpen(false);
      context.triggerRef.current?.focus();
    }
  };

  return (
    <div
      {...props}
      ref={forwardedRef}
      role="option"
      tabIndex={-1}
      aria-disabled={disabled || undefined}
      aria-selected={isSelected}
      data-disabled={disabled || undefined}
      data-selected={isSelected || undefined}
      data-value={value}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          selectOption();
        }
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);

        if (event.defaultPrevented) {
          return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectOption();
        }
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);

        if (!event.defaultPrevented && !disabled) {
          event.currentTarget.focus();
        }
      }}
    />
  );
});

SelectOption.displayName = 'Select.Option';
