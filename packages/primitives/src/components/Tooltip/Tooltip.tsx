import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { useControllableState } from '../../internal/hooks/useControllableState';
import { useDismiss } from '../../internal/overlay/dismiss';
import { LayerScope, useLayerRegistration, useOverlayLayer } from '../../internal/overlay/layers';
import { Portal } from '../../internal/overlay/Portal';
import { useFloatingPosition } from '../../internal/overlay/useFloatingPosition';
import { useHoverIntent } from '../../internal/overlay/useHoverIntent';
import { usePresence } from '../../internal/overlay/usePresence';
import { composeRefs } from '../../internal/utils/composeRefs';
import type { TooltipContentProps, TooltipProps, TooltipTriggerProps } from './Tooltip.types';
import { useTooltipHandoff } from './useTooltipHandoff';

type Context = {
  open: boolean;
  transition: { continuous: boolean; from: { left: number; top: number } | null };
  skipExit: boolean;
  disabled: boolean;
  closeOnClick: boolean;
  id: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  focused: React.MutableRefObject<boolean>;
  hovered: React.MutableRefObject<boolean>;
  dismissed: React.MutableRefObject<boolean>;
  show: (immediate: boolean) => void;
  dismiss: () => void;
  leave: () => void;
  cancelClose: () => void;
};
const TooltipContext = createContext<Context | null>(null);
function useTooltip() {
  const context = useContext(TooltipContext);
  if (!context) throw new Error('Tooltip parts must be used inside Tooltip.');
  return context;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  {
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    openDelay = 100,
    closeOnClick = true,
    smoothTransition = false,
    children,
    ...props
  },
  ref,
) {
  const [value, setOpen, resetOpen] = useControllableState(
    controlledOpen,
    defaultOpen,
    onOpenChange,
  );
  const [superseded, setSuperseded] = useState(false);
  const [skipExit, setSkipExit] = useState(false);
  const open = !disabled && !superseded && Boolean(value);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const focused = useRef(false);
  const hovered = useRef(false);
  const dismissed = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();
  const layer = useOverlayLayer(triggerRef, contentRef);
  useLayerRegistration(layer, open);
  const cancelOpen = useCallback(() => {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
  }, []);
  const { cancelClose, scheduleClose } = useHoverIntent(
    !disabled,
    () => {
      if (!focused.current && !hovered.current) setOpen(false);
    },
    100,
  );
  useLayoutEffect(() => {
    if (value) {
      setSuperseded(false);
      setSkipExit(false);
    }
  }, [value]);
  const transition = useTooltipHandoff(
    open,
    smoothTransition,
    triggerRef,
    contentRef,
    (immediate) => {
      cancelOpen();
      cancelClose();
      setSkipExit(immediate);
      setSuperseded(true);
      if (value) setOpen(false);
    },
  );
  const dismiss = (suppress = true) => {
    cancelOpen();
    cancelClose();
    dismissed.current = suppress;
    setOpen(false);
  };
  useDismiss({
    open,
    layer,
    onDismiss: (reason) => dismiss(reason !== 'focus'),
  });
  useEffect(() => cancelOpen, [cancelOpen]);
  useEffect(() => {
    if (disabled) {
      cancelOpen();
      cancelClose();
      resetOpen(false);
    }
  }, [disabled, cancelOpen, cancelClose, resetOpen]);
  const show = (immediate: boolean) => {
    cancelOpen();
    cancelClose();
    if (disabled || triggerRef.current?.disabled || dismissed.current || open) return;
    setSuperseded(false);
    setSkipExit(false);
    if (immediate || transition.isWarm() || openDelay <= 0) setOpen(true);
    else timer.current = setTimeout(() => setOpen(true), openDelay);
  };
  const leave = () => {
    cancelOpen();
    scheduleClose();
  };
  return (
    <TooltipContext.Provider
      value={{
        open,
        transition,
        skipExit,
        disabled,
        closeOnClick,
        id,
        triggerRef,
        contentRef,
        focused,
        hovered,
        dismissed,
        show,
        dismiss,
        leave,
        cancelClose,
      }}
    >
      <LayerScope.Provider value={layer}>
        <div
          {...props}
          ref={ref}
          data-state={open ? 'open' : 'closed'}
          data-disabled={disabled || undefined}
        >
          {children}
        </div>
      </LayerScope.Provider>
    </TooltipContext.Provider>
  );
});

export const TooltipTrigger = forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  function TooltipTrigger(
    {
      render,
      onPointerEnter,
      onPointerLeave,
      onPointerDown,
      onFocus,
      onBlur,
      onClick,
      disabled,
      'aria-describedby': describedBy,
      ...props
    },
    ref,
  ) {
    const context = useTooltip();
    const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      ref: React.Ref<HTMLButtonElement>;
    } = {
      ...props,
      ref: composeRefs(ref, context.triggerRef),
      type: 'button',
      disabled: disabled || context.disabled,
      'aria-describedby':
        [describedBy, context.open ? context.id : undefined].filter(Boolean).join(' ') || undefined,
      onPointerEnter: (event) => {
        onPointerEnter?.(event);
        if (event.defaultPrevented || event.pointerType === 'touch') return;
        context.hovered.current = true;
        context.dismissed.current = false;
        context.show(false);
      },
      onPointerLeave: (event) => {
        onPointerLeave?.(event);
        if (event.defaultPrevented) return;
        context.hovered.current = false;
        context.leave();
      },
      onFocus: (event) => {
        onFocus?.(event);
        if (event.defaultPrevented) return;
        context.focused.current = true;
        context.show(true);
      },
      onBlur: (event) => {
        onBlur?.(event);
        if (event.defaultPrevented) return;
        context.focused.current = false;
        context.dismissed.current = false;
        context.leave();
      },
      onPointerDown: (event) => {
        onPointerDown?.(event);
        if (event.defaultPrevented) return;
        if (context.closeOnClick) context.dismiss();
      },
      onClick: (event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (context.closeOnClick) {
          context.dismiss();
        } else if (event.detail > 0) {
          // A pointer click may focus the native button, but hover should still own this tooltip's
          // lifetime. Once the pointer leaves, that incidental focus must not pin the panel open.
          context.focused.current = false;
        } else if (document.activeElement === context.triggerRef.current) {
          // Keyboard activation can happen after a prior pointer click without another focus event.
          context.focused.current = true;
          context.show(true);
        }
      },
    };
    return render ? render(buttonProps) : <button {...buttonProps} />;
  },
);

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent(
    { placement = 'top', offset = 8, style, onPointerEnter, onPointerLeave, ...props },
    ref,
  ) {
    const context = useTooltip();
    const present = usePresence(context.open, context.contentRef);
    const floating = useFloatingPosition({
      active: present && !context.skipExit,
      triggerRef: context.triggerRef,
      contentRef: context.contentRef,
      placement,
      offset,
    });
    const motionStyle = {
      '--tooltip-handoff-x': `${context.transition.from ? context.transition.from.left - Number(floating.style.left) : 0}px`,
      '--tooltip-handoff-y': `${context.transition.from ? context.transition.from.top - Number(floating.style.top) : 0}px`,
    } as React.CSSProperties;
    // Smooth handoff moves one panel; ordinary tooltips finish their own exit in place.
    if (!present || context.skipExit) return null;
    return (
      <Portal>
        <div
          {...props}
          ref={composeRefs(ref, context.contentRef)}
          id={context.id}
          role="tooltip"
          data-state={context.open ? 'open' : 'closed'}
          data-continuous={context.transition.continuous || undefined}
          aria-hidden={!context.open || floating.referenceHidden || undefined}
          data-theme={floating.theme}
          dir={floating.direction}
          data-side={floating.side}
          data-placement={floating.placement}
          style={{
            ...style,
            ...floating.style,
            ...motionStyle,
            ...(floating.referenceHidden ? { visibility: 'hidden' } : {}),
            ...(!context.open ? { pointerEvents: 'none' } : {}),
          }}
          onPointerEnter={(event) => {
            onPointerEnter?.(event);
            if (event.defaultPrevented) return;
            context.hovered.current = true;
            context.cancelClose();
          }}
          onPointerLeave={(event) => {
            onPointerLeave?.(event);
            if (event.defaultPrevented) return;
            context.hovered.current = false;
            context.leave();
          }}
        />
      </Portal>
    );
  },
);
