import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useControllableState } from '../../internal/hooks/useControllableState';
import { useDismiss } from '../../internal/overlay/dismiss';
import { focusFirst, getTabbables, returnFocus } from '../../internal/overlay/focus';
import {
  hasLayerFocus,
  LayerScope,
  useLayerRegistration,
  useOverlayLayer,
} from '../../internal/overlay/layers';
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
  autoFocus: boolean;
  setOpen: (open: boolean) => void;
  requestOpen: (focus: boolean) => void;
  cancelClose: () => void;
  scheduleClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  anchorRef: React.RefObject<HTMLElement | null>;
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
    anchor = 'trigger',
    autoFocus = true,
    disabled = false,
    restoreFocusOnClose = true,
    children,
    ...props
  },
  ref,
) {
  const parentPopover = useContext(PopoverContext);
  const [openState, setOpenState, resetOpen] = useControllableState(
    controlledOpen,
    defaultOpen,
    onOpenChange,
  );
  const open = !disabled && Boolean(openState);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  const rootRef = useMemo(() => ({ current: root }), [root]);
  const composedRootRef = useMemo(
    () => composeRefs(ref, setRoot),
    [ref],
  );
  const anchorRef = anchor === 'root' ? rootRef : triggerRef;
  const contentRef = useRef<HTMLDivElement | null>(null);
  const focusOnOpen = useRef(true);
  const restoreFocus = useRef(true);
  const wasOpen = useRef(false);
  const id = useId();
  const layer = useOverlayLayer(anchorRef, contentRef);
  useLayerRegistration(layer, open);
  const setOpen = (next: boolean) => {
    if (!next || !disabled) setOpenState(next);
  };
  const { cancelClose, scheduleClose } = useHoverIntent(trigger === 'hover' && !disabled, () => {
    // Interactive hover panels stay open while their form or buttons own keyboard focus.
    if (!hasLayerFocus(layer)) setOpen(false);
  });
  // A portalled child is still part of its ancestors' hover region.
  const cancelTreeClose = () => {
    cancelClose();
    parentPopover?.cancelClose();
  };
  const scheduleTreeClose = () => {
    scheduleClose();
    parentPopover?.scheduleClose();
  };
  useDismiss({
    open,
    layer,
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
    // External state changes can close a panel before its hover timer finishes.
    if (!open) cancelClose();
    // A pointer-only hover never took focus; returning it would dismiss the next hovered panel.
    if (wasOpen.current && !open && restoreFocus.current && restoreFocusOnClose)
      returnFocus(triggerRef.current, contentRef.current);
    wasOpen.current = open;
  }, [open, restoreFocusOnClose, cancelClose]);
  const requestOpen = (focus: boolean) => {
    if (disabled || triggerRef.current?.disabled) return;
    cancelTreeClose();
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
        autoFocus,
        setOpen,
        requestOpen,
        cancelClose: cancelTreeClose,
        scheduleClose: scheduleTreeClose,
        triggerRef,
        contentRef,
        anchorRef,
        focusOnOpen,
        restoreFocus,
        triggerId: `${id}-trigger`,
        contentId: `${id}-content`,
      }}
    >
      <LayerScope.Provider value={layer}>
        <div
          {...props}
          ref={composedRootRef}
          data-state={open ? 'open' : 'closed'}
          data-disabled={disabled || undefined}
        >
          {children}
        </div>
      </LayerScope.Provider>
    </PopoverContext.Provider>
  );
});

export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  function PopoverTrigger(
    {
      render,
      disabled,
      onClick,
      onFocus,
      onKeyDown,
      onPointerCancel,
      onPointerDown,
      onPointerEnter,
      onPointerLeave,
      onPointerUp,
      ...props
    },
    ref,
  ) {
    const context = usePopover();
    const pointerDownRef = useRef(false);
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
      onFocus: (event) => {
        onFocus?.(event);
        if (!event.defaultPrevented && context.trigger === 'hover' && !pointerDownRef.current)
          context.requestOpen(false);
      },
      onPointerDown: (event) => {
        pointerDownRef.current = true;
        onPointerDown?.(event);
      },
      onPointerUp: (event) => {
        pointerDownRef.current = false;
        onPointerUp?.(event);
      },
      onPointerCancel: (event) => {
        pointerDownRef.current = false;
        onPointerCancel?.(event);
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
    const { open, contentRef, triggerRef, anchorRef, focusOnOpen } = context;
    const present = usePresence(open, contentRef);
    const floating = useFloatingPosition({
      active: present,
      triggerRef: anchorRef,
      contentRef,
      placement,
      offset,
    });
    useLayoutEffect(() => {
      if (open && floating.positioned && focusOnOpen.current && context.autoFocus)
        focusFirst(contentRef.current);
    }, [open, floating.positioned, contentRef, focusOnOpen, context.autoFocus]);
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
          data-virgo-theme={floating.themeStyle}
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
