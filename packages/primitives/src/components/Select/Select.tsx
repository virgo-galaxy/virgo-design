import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
} from 'react';

import { useControllableState } from '../../internal/hooks/useControllableState';
import { useDismiss } from '../../internal/overlay/dismiss';
import { LayerScope, useLayerRegistration, useOverlayLayer } from '../../internal/overlay/layers';
import { composeRefs } from '../../internal/utils/composeRefs';
import type {
  SelectContentProps,
  SelectOptionProps,
  SelectProps,
  SelectTriggerProps,
} from './Select.types';

type OpenFocusIntent = 'selected' | 'first' | 'last';

const TYPEAHEAD_RESET_MS = 500;

type SelectContextValue = {
  value: string | undefined;
  setValue: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  requestOpen: (intent?: OpenFocusIntent) => void;
  disabled: boolean;
  contentId: string;
  triggerId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
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

export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(
  {
    id,
    value: controlledValue,
    defaultValue,
    onValueChange,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    name,
    children,
    ...props
  },
  forwardedRef,
) {
  const [value, setValue] = useControllableState(controlledValue, defaultValue, onValueChange);
  const [openState, setOpen] = useControllableState(controlledOpen, defaultOpen, onOpenChange);
  const open = openState ?? false;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const openFocusIntentRef = useRef<OpenFocusIntent>('selected');
  const generatedId = useId();
  const triggerId = id ?? `${generatedId}-trigger`;
  const contentId = `${generatedId}-content`;
  const layer = useOverlayLayer(rootRef, rootRef);
  useLayerRegistration(layer, open);

  const requestOpen = useCallback(
    (intent: OpenFocusIntent = 'selected') => {
      if (disabled) {
        return;
      }

      openFocusIntentRef.current = intent;
      setOpen(true);
    },
    [disabled, setOpen],
  );

  useDismiss({
    open,
    layer,
    outsideFocus: false,
    escape: false,
    onDismiss: () => setOpen(false),
  });

  useEffect(() => {
    if (disabled && open) {
      setOpen(false);
    }
  }, [disabled, open, setOpen]);

  return (
    <SelectContext.Provider
      value={{
        value,
        setValue,
        open,
        setOpen,
        requestOpen,
        disabled,
        contentId,
        triggerId,
        triggerRef,
        openFocusIntentRef,
      }}
    >
      <LayerScope.Provider value={layer}>
        <div
          {...props}
          ref={composeRefs(forwardedRef, rootRef)}
          data-disabled={disabled || undefined}
          data-state={open ? 'open' : 'closed'}
        >
          {name ? (
            <input disabled={disabled} name={name} type="hidden" value={value ?? ''} />
          ) : null}
          {children}
        </div>
      </LayerScope.Provider>
    </SelectContext.Provider>
  );
});

Select.displayName = 'Select';

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger(
    { disabled, onClick, onKeyDown, type = 'button', ...props },
    forwardedRef,
  ) {
    const context = useSelectContext('SelectTrigger');
    const isDisabled = context.disabled || disabled;

    return (
      <button
        {...props}
        ref={composeRefs(forwardedRef, context.triggerRef)}
        id={context.triggerId}
        type={type}
        aria-controls={context.open ? context.contentId : undefined}
        aria-expanded={context.open}
        aria-haspopup="listbox"
        data-state={context.open ? 'open' : 'closed'}
        disabled={isDisabled}
        onClick={(event) => {
          onClick?.(event);

          if (event.defaultPrevented || isDisabled) {
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

          if (event.defaultPrevented || isDisabled) {
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
  { onKeyDown, ...props },
  forwardedRef,
) {
  const context = useSelectContext('SelectContent');
  const contentRef = useRef<HTMLDivElement | null>(null);
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
  }, [context.open, context.openFocusIntentRef]);

  if (!context.open) {
    return null;
  }

  return (
    <div
      {...props}
      ref={composeRefs(forwardedRef, contentRef)}
      id={context.contentId}
      role="listbox"
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
  );
});

SelectContent.displayName = 'Select.Content';

export const SelectOption = forwardRef<HTMLDivElement, SelectOptionProps>(function SelectOption(
  { value, disabled = false, onClick, onKeyDown, onPointerMove, ...props },
  forwardedRef,
) {
  const context = useSelectContext('SelectOption');
  const isSelected = context.value === value;

  const selectOption = () => {
    if (disabled) {
      return;
    }

    context.setValue(value);
    context.setOpen(false);
    context.triggerRef.current?.focus();
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
