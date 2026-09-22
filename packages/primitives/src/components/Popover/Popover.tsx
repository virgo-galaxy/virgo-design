import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
} from 'react';

import { useControllableState } from '../../internal/hooks/useControllableState';
import { DismissScope, hasLayerFocus, useDismiss } from '../../internal/overlay/dismiss';
import { focusFirst, getTabbables, returnFocus } from '../../internal/overlay/focus';
import { Portal } from '../../internal/overlay/Portal';
import { useFloatingPosition } from '../../internal/overlay/useFloatingPosition';
import { useHoverIntent } from '../../internal/overlay/useHoverIntent';
import { usePresence } from '../../internal/overlay/usePresence';
import { composeRefs } from '../../internal/utils/composeRefs';
import type {
  PopoverCloseProps,
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps,
} from './Popover.types';

type Context = {
  open: boolean;
  disabled: boolean;
  trigger: 'click' | 'hover';
  setOpen: (open: boolean) => void;
  requestOpen: (focus: boolean) => void;
  cancelClose: () => void;
  scheduleClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  focusOnOpen: React.MutableRefObject<boolean>;
  restoreFocus: React.MutableRefObject<boolean>;
  triggerId: string;
  contentId: string;
};
const PopoverContext = createContext<Context | null>(null);
function usePopover() {
  const context = useContext(PopoverContext);
  if (!context) throw new Error('Popover parts must be used inside Popover.');
  return context;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(function Popover(
  {
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    trigger = 'click',
    disabled = false,
    children,
    ...props
  },
  ref,
) {
  const [openState, setOpenState, resetOpen] = useControllableState(
    controlledOpen,
    defaultOpen,
    onOpenChange,
  );
  const open = !disabled && Boolean(openState);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const focusOnOpen = useRef(true);
  const restoreFocus = useRef(true);
  const wasOpen = useRef(false);
  const id = useId();
  const setOpen = (next: boolean) => {
    if (!next || !disabled) setOpenState(next);
  };
  const { cancelClose, scheduleClose } = useHoverIntent(trigger === 'hover' && !disabled, () => {
    // Interactive hover panels stay open while their form or buttons own keyboard focus.
    if (!hasLayerFocus(scope)) setOpen(false);
  });
  const scope = useDismiss({
    open,
    triggerRef,
    contentRef,
    onDismiss: (reason) => {
      cancelClose();
      if (reason === 'escape') returnFocus(triggerRef.current, contentRef.current, true);
      setOpen(false);
    },
  });
  useEffect(() => {
    if (disabled) {
      cancelClose();
      resetOpen(false);
    }
  }, [disabled, cancelClose, resetOpen]);
  useLayoutEffect(() => {
    // A pointer-only hover never took focus; returning it would dismiss the next hovered panel.
    if (wasOpen.current && !open && restoreFocus.current)
      returnFocus(triggerRef.current, contentRef.current);
    wasOpen.current = open;
  }, [open]);
  const requestOpen = (focus: boolean) => {
    if (disabled || triggerRef.current?.disabled) return;
    cancelClose();
    focusOnOpen.current = focus;
    restoreFocus.current = focus;
    setOpen(true);
    if (open && focus) focusFirst(contentRef.current);
  };
  return (
    <PopoverContext.Provider
      value={{
        open,
        disabled,
        trigger,
        setOpen,
        requestOpen,
        cancelClose,
        scheduleClose,
        triggerRef,
        contentRef,
        focusOnOpen,
        restoreFocus,
        triggerId: `${id}-trigger`,
        contentId: `${id}-content`,
      }}
    >
      <DismissScope.Provider value={scope}>
        <div
          {...props}
          ref={ref}
          data-state={open ? 'open' : 'closed'}
          data-disabled={disabled || undefined}
        >
          {children}
        </div>
      </DismissScope.Provider>
    </PopoverContext.Provider>
  );
});

export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  function PopoverTrigger(
    { render, disabled, onClick, onKeyDown, onPointerEnter, onPointerLeave, ...props },
    ref,
  ) {
    const context = usePopover();
    const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      ref: React.Ref<HTMLButtonElement>;
    } = {
      ...props,
      ref: composeRefs(ref, context.triggerRef),
      id: context.triggerId,
      type: 'button',
      disabled: context.disabled || disabled,
      'aria-haspopup': 'dialog',
      'aria-expanded': context.open,
      'aria-controls': context.open ? context.contentId : undefined,
      onClick: (event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (context.open) {
          context.cancelClose();
          context.setOpen(false);
        } else context.requestOpen(true);
      },
      onKeyDown: (event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (
          context.open &&
          (event.key === 'Enter' || event.key === ' ' || (event.key === 'Tab' && !event.shiftKey))
        ) {
          event.preventDefault();
          focusFirst(context.contentRef.current);
        }
      },
      onPointerEnter: (event) => {
        onPointerEnter?.(event);
        if (!event.defaultPrevented && context.trigger === 'hover' && event.pointerType !== 'touch')
          context.requestOpen(false);
      },
      onPointerLeave: (event) => {
        onPointerLeave?.(event);
        if (!event.defaultPrevented) context.scheduleClose();
      },
    };
    return render ? render(buttonProps) : <button {...buttonProps} />;
  },
);

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(
    {
      placement = 'bottomStart',
      offset = 8,
      style,
      onKeyDown,
      onPointerEnter,
      onPointerLeave,
      onFocusCapture,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...props
    },
    ref,
  ) {
    const context = usePopover();
    const { open, contentRef, triggerRef, focusOnOpen } = context;
    const present = usePresence(open, contentRef);
    const floating = useFloatingPosition({
      active: present,
      triggerRef,
      contentRef,
      placement,
      offset,
    });
    useLayoutEffect(() => {
      if (open && floating.positioned && focusOnOpen.current) focusFirst(contentRef.current);
    }, [open, floating.positioned, contentRef, focusOnOpen]);
    if (!present) return null;
    return (
      <Portal>
        <div
          {...props}
          ref={composeRefs(ref, contentRef)}
          id={context.contentId}
          role="dialog"
          tabIndex={-1}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy ?? (ariaLabel ? undefined : context.triggerId)}
          aria-hidden={!open || undefined}
          data-state={open ? 'open' : 'closed'}
          data-theme={floating.theme}
          dir={floating.direction}
          data-placement={floating.placement}
          data-side={floating.side}
          onFocusCapture={(event) => {
            context.restoreFocus.current = true;
            onFocusCapture?.(event);
          }}
          style={{ ...style, ...floating.style, ...(!open ? { pointerEvents: 'none' } : {}) }}
          onPointerEnter={(event) => {
            onPointerEnter?.(event);
            if (!event.defaultPrevented) context.cancelClose();
          }}
          onPointerLeave={(event) => {
            onPointerLeave?.(event);
            if (!event.defaultPrevented) context.scheduleClose();
          }}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            if (event.defaultPrevented || event.key !== 'Tab') return;
            const tabbables = getTabbables(event.currentTarget);
            const active = document.activeElement;
            if (
              event.shiftKey &&
              (active === tabbables[0] || active === event.currentTarget || !tabbables.length)
            ) {
              event.preventDefault();
              context.cancelClose();
              context.setOpen(false);
              returnFocus(triggerRef.current, contentRef.current, true);
            } else if (!event.shiftKey && (active === tabbables.at(-1) || !tabbables.length)) {
              // The portal is at the document end. Continue after the trigger instead of wrapping to the browser chrome.
              context.cancelClose();
              context.setOpen(false);
              returnFocus(triggerRef.current, contentRef.current, true);
            }
          }}
        />
      </Portal>
    );
  },
);

export const PopoverClose = forwardRef<HTMLButtonElement, PopoverCloseProps>(function PopoverClose(
  { onClick, ...props },
  ref,
) {
  const context = usePopover();
  return (
    <button
      {...props}
      ref={ref}
      type="button"
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        context.cancelClose();
        context.setOpen(false);
        returnFocus(context.triggerRef.current, context.contentRef.current);
      }}
    />
  );
});
