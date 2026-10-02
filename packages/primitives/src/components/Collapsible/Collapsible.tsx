import { createContext, forwardRef, useContext, useId, useMemo } from 'react';

import { useControllableState } from '../../internal/hooks/useControllableState';
import type {
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleTriggerProps,
} from './Collapsible.types';

type CollapsibleContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerId: string;
  contentId: string;
};

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

function useCollapsibleContext(part: string) {
  const context = useContext(CollapsibleContext);

  if (context === null) {
    throw new Error(`${part} must be used inside Collapsible.Root.`);
  }

  return context;
}

export const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleProps>(
  function CollapsibleRoot(
    { id, open: controlledOpen, defaultOpen = false, onOpenChange, children, ...props },
    forwardedRef,
  ) {
    const generatedId = useId();
    const baseId = id ?? `vd-collapsible-${generatedId}`;
    const [openState, setOpen] = useControllableState(controlledOpen, defaultOpen, onOpenChange);
    const open = Boolean(openState);
    const contextValue = useMemo<CollapsibleContextValue>(
      () => ({
        open,
        setOpen,
        triggerId: `${baseId}-trigger`,
        contentId: `${baseId}-content`,
      }),
      [baseId, open, setOpen],
    );

    return (
      <CollapsibleContext.Provider value={contextValue}>
        <div {...props} ref={forwardedRef} id={id} data-state={open ? 'open' : 'closed'}>
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  },
);

CollapsibleRoot.displayName = 'Collapsible';

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  function CollapsibleTrigger(
    { render, disabled, onClick, type = 'button', ...props },
    forwardedRef,
  ) {
    const context = useCollapsibleContext('Collapsible.Trigger');
    const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      ref: React.Ref<HTMLButtonElement>;
      'data-state': 'open' | 'closed';
    } = {
      ...props,
      ref: forwardedRef,
      id: context.triggerId,
      type,
      disabled,
      'aria-controls': context.contentId,
      'aria-expanded': context.open,
      'data-state': context.open ? 'open' : 'closed',
      onClick: (event) => {
        onClick?.(event);

        if (!event.defaultPrevented && !disabled) {
          context.setOpen(!context.open);
        }
      },
    };

    return render ? render(buttonProps) : <button {...buttonProps} />;
  },
);

CollapsibleTrigger.displayName = 'Collapsible.Trigger';

export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  function CollapsibleContent(
    { keepMounted = false, 'aria-label': label, 'aria-labelledby': labelledBy, inert, ...props },
    forwardedRef,
  ) {
    const context = useCollapsibleContext('Collapsible.Content');

    return (
      <div
        {...props}
        ref={forwardedRef}
        id={context.contentId}
        role="region"
        aria-label={label}
        aria-labelledby={labelledBy ?? (label ? undefined : context.triggerId)}
        aria-hidden={context.open ? props['aria-hidden'] : true}
        inert={!context.open || inert}
        data-state={context.open ? 'open' : 'closed'}
        hidden={!context.open && !keepMounted}
      />
    );
  },
);

CollapsibleContent.displayName = 'Collapsible.Content';
