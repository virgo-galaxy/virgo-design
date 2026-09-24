import {
  createContext,
  type ForwardedRef,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
} from 'react';

import { useControllableState } from '../../internal/hooks/useControllableState';
import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionMultipleProps,
  AccordionProps,
  AccordionSingleProps,
  AccordionTriggerProps,
} from './Accordion.types';

type AccordionContextValue = {
  headingLevel: number;
  isItemOpen: (value: string) => boolean;
  toggleItem: (value: string) => void;
  getTriggerId: (value: string) => string;
  getContentId: (value: string) => string;
};

type AccordionItemContextValue = {
  value: string;
  disabled: boolean;
  open: boolean;
  triggerId: string;
  contentId: string;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordionContext(part: string) {
  const context = useContext(AccordionContext);

  if (context === null) {
    throw new Error(`${part} must be used inside Accordion.Root.`);
  }

  return context;
}

function useAccordionItemContext(part: string) {
  const context = useContext(AccordionItemContext);

  if (context === null) {
    throw new Error(`${part} must be used inside Accordion.Item.`);
  }

  return context;
}

function getValueId(value: string) {
  return encodeURIComponent(value);
}

interface AccordionRootLayoutProps extends AccordionCommonLayoutProps {
  openValues: ReadonlySet<string>;
  toggleItem: (value: string) => void;
}

interface AccordionCommonLayoutProps {
  type: 'single' | 'multiple';
  headingLevel: 2 | 3 | 4 | 5 | 6 | undefined;
  forwardedRef: ForwardedRef<HTMLDivElement>;
  id: string | undefined;
  children?: React.ReactNode;
  rootProps: React.HTMLAttributes<HTMLDivElement>;
}

function AccordionRootLayout({
  type,
  headingLevel = 3,
  forwardedRef,
  id,
  children,
  rootProps,
  openValues,
  toggleItem,
}: AccordionRootLayoutProps) {
  const generatedId = useId();
  const baseId = id ?? `vd-accordion-${generatedId}`;
  const contextValue = useMemo<AccordionContextValue>(
    () => ({
      headingLevel,
      isItemOpen: (value) => openValues.has(value),
      toggleItem,
      getTriggerId: (value) => `${baseId}-trigger-${getValueId(value)}`,
      getContentId: (value) => `${baseId}-content-${getValueId(value)}`,
    }),
    [baseId, headingLevel, openValues, toggleItem],
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <div {...rootProps} ref={forwardedRef} id={id} data-type={type} data-vd-accordion-root="">
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface SingleAccordionRootProps extends AccordionSingleProps {
  forwardedRef: ForwardedRef<HTMLDivElement>;
}

function SingleAccordionRoot({
  forwardedRef,
  id,
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  headingLevel,
  children,
  type,
  ...rootProps
}: SingleAccordionRootProps) {
  const [value = '', setValue] = useControllableState(controlledValue, defaultValue, onValueChange);
  const toggleItem = useCallback(
    (itemValue: string) => setValue(value === itemValue ? '' : itemValue),
    [setValue, value],
  );

  return (
    <AccordionRootLayout
      type={type}
      headingLevel={headingLevel}
      forwardedRef={forwardedRef}
      id={id}
      rootProps={rootProps}
      openValues={new Set(value ? [value] : [])}
      toggleItem={toggleItem}
    >
      {children}
    </AccordionRootLayout>
  );
}

interface MultipleAccordionRootProps extends AccordionMultipleProps {
  forwardedRef: ForwardedRef<HTMLDivElement>;
}

function MultipleAccordionRoot({
  forwardedRef,
  id,
  value: controlledValue,
  defaultValue = [],
  onValueChange,
  headingLevel,
  children,
  type,
  ...rootProps
}: MultipleAccordionRootProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(() => [...defaultValue]);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;
  const toggleItem = useCallback(
    (itemValue: string) => {
      const nextValue = value.includes(itemValue)
        ? value.filter((value) => value !== itemValue)
        : [...value, itemValue];

      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }

      onValueChange?.(nextValue);
    },
    [isControlled, onValueChange, value],
  );

  return (
    <AccordionRootLayout
      type={type}
      headingLevel={headingLevel}
      forwardedRef={forwardedRef}
      id={id}
      rootProps={rootProps}
      openValues={new Set(value)}
      toggleItem={toggleItem}
    >
      {children}
    </AccordionRootLayout>
  );
}

export const AccordionRoot = forwardRef<HTMLDivElement, AccordionProps>(
  function AccordionRoot(props, forwardedRef) {
    return props.type === 'single' ? (
      <SingleAccordionRoot {...props} forwardedRef={forwardedRef} />
    ) : (
      <MultipleAccordionRoot {...props} forwardedRef={forwardedRef} />
    );
  },
);

AccordionRoot.displayName = 'Accordion';

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { value, disabled = false, children, ...props },
  forwardedRef,
) {
  const context = useAccordionContext('Accordion.Item');
  const open = context.isItemOpen(value);
  const itemContextValue = useMemo<AccordionItemContextValue>(
    () => ({
      value,
      disabled,
      open,
      triggerId: context.getTriggerId(value),
      contentId: context.getContentId(value),
    }),
    [context, disabled, open, value],
  );

  return (
    <AccordionItemContext.Provider value={itemContextValue}>
      <div
        {...props}
        ref={forwardedRef}
        data-disabled={disabled || undefined}
        data-state={open ? 'open' : 'closed'}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
});

AccordionItem.displayName = 'Accordion.Item';

function getEnabledTriggers(currentTrigger: HTMLButtonElement) {
  const root = currentTrigger.closest<HTMLElement>('[data-vd-accordion-root]');

  if (!root) {
    return [];
  }

  return Array.from(
    root.querySelectorAll<HTMLButtonElement>('[data-vd-accordion-trigger]:not(:disabled)'),
  ).filter((trigger) => trigger.closest('[data-vd-accordion-root]') === root);
}

function focusTriggerAtIndex(triggers: HTMLButtonElement[], index: number) {
  if (triggers.length === 0) {
    return;
  }

  const normalizedIndex = ((index % triggers.length) + triggers.length) % triggers.length;
  triggers[normalizedIndex]?.focus();
}

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger(
    { render, disabled: triggerDisabled, onClick, onKeyDown, type = 'button', ...props },
    forwardedRef,
  ) {
    const accordion = useAccordionContext('Accordion.Trigger');
    const item = useAccordionItemContext('Accordion.Trigger');
    const disabled = item.disabled || Boolean(triggerDisabled);
    const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      ref: React.Ref<HTMLButtonElement>;
      'data-state': 'open' | 'closed';
      'data-vd-accordion-trigger': '';
    } = {
      ...props,
      ref: forwardedRef,
      id: item.triggerId,
      type,
      disabled,
      'aria-controls': item.contentId,
      'aria-expanded': item.open,
      'data-state': item.open ? 'open' : 'closed',
      'data-vd-accordion-trigger': '',
      onClick: (event) => {
        onClick?.(event);

        if (!event.defaultPrevented && !disabled) {
          accordion.toggleItem(item.value);
        }
      },
      onKeyDown: (event) => {
        onKeyDown?.(event);

        if (event.defaultPrevented || disabled) {
          return;
        }

        const triggers = getEnabledTriggers(event.currentTarget);
        const currentIndex = triggers.indexOf(event.currentTarget);

        if (event.key === 'ArrowDown') {
          event.preventDefault();
          focusTriggerAtIndex(triggers, currentIndex + 1);
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          focusTriggerAtIndex(triggers, currentIndex - 1);
        } else if (event.key === 'Home') {
          event.preventDefault();
          focusTriggerAtIndex(triggers, 0);
        } else if (event.key === 'End') {
          event.preventDefault();
          focusTriggerAtIndex(triggers, triggers.length - 1);
        }
      },
    };
    const trigger = render ? render(buttonProps) : <button {...buttonProps} />;

    return (
      <div role="heading" aria-level={accordion.headingLevel} data-slot="header">
        {trigger}
      </div>
    );
  },
);

AccordionTrigger.displayName = 'Accordion.Trigger';

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  function AccordionContent(props, forwardedRef) {
    const item = useAccordionItemContext('Accordion.Content');

    return (
      <div
        {...props}
        ref={forwardedRef}
        id={item.contentId}
        role="region"
        aria-labelledby={item.triggerId}
        data-state={item.open ? 'open' : 'closed'}
        hidden={!item.open}
      />
    );
  },
);

AccordionContent.displayName = 'Accordion.Content';
