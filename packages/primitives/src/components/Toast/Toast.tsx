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
import { createPortal } from 'react-dom';

import { useControllableState } from '../../internal/hooks/useControllableState';
import { Portal } from '../../internal/overlay/Portal';
import { usePortalEnvironment } from '../../internal/overlay/usePortalEnvironment';
import { usePresence } from '../../internal/overlay/usePresence';
import type {
  ToastActionProps,
  ToastCloseProps,
  ToastDescriptionProps,
  ToastProps,
  ToastProviderProps,
  ToastTitleProps,
  ToastViewportProps,
} from './Toast.types';

type ToastProviderContextValue = {
  viewport: HTMLDivElement | null;
  setViewport: (viewport: HTMLDivElement | null) => void;
};

type ToastContextValue = {
  close: () => void;
  titleId: string;
  descriptionId: string;
  titleMounted: boolean;
  descriptionMounted: boolean;
  setTitleMounted: (mounted: boolean) => void;
  setDescriptionMounted: (mounted: boolean) => void;
};

const ToastProviderContext = createContext<ToastProviderContextValue | null>(null);
const ToastContext = createContext<ToastContextValue | null>(null);

function useToastProvider(part: string) {
  const context = useContext(ToastProviderContext);
  if (!context) throw new Error(`${part} must be used inside Toast.Provider.`);
  return context;
}

function useToast(part: string) {
  const context = useContext(ToastContext);
  if (!context) throw new Error(`${part} must be used inside Toast.Root.`);
  return context;
}

export function ToastProvider({ children, hotkey = ['F8'] }: ToastProviderProps) {
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
      if (!hotkey.includes(event.key) || !viewport) return;
      event.preventDefault();
      (viewport.querySelector<HTMLElement>('[data-toast-root] button') ?? viewport).focus({
        preventScroll: true,
      });
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [hotkey, viewport]);
  return (
    <ToastProviderContext.Provider value={{ viewport, setViewport }}>
      {children}
    </ToastProviderContext.Provider>
  );
}

export const ToastRoot = forwardRef<HTMLDivElement, ToastProps>(function ToastRoot(
  {
    open: controlledOpen,
    defaultOpen = true,
    onOpenChange,
    duration = 5000,
    priority = 'polite',
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur,
    children,
    ...props
  },
  ref,
) {
  const provider = useToastProvider('Toast.Root');
  const [openState, setOpen] = useControllableState(controlledOpen, defaultOpen, onOpenChange);
  const open = Boolean(openState);
  const id = useId();
  const [titleMounted, setTitleMounted] = useState(false);
  const [descriptionMounted, setDescriptionMounted] = useState(false);
  const [pointerPaused, setPointerPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const paused = pointerPaused || focusPaused;
  const localRef = useRef<HTMLDivElement | null>(null);
  const remaining = useRef(duration);
  const startedAt = useRef(0);
  const close = useCallback(() => setOpen(false), [setOpen]);

  useEffect(() => {
    if (!open) return;
    remaining.current = duration;
  }, [duration, open]);

  useEffect(() => {
    if (!open || !provider.viewport || paused || duration <= 0) return;
    startedAt.current = Date.now();
    const timer = window.setTimeout(close, remaining.current);
    return () => {
      window.clearTimeout(timer);
      remaining.current = Math.max(0, remaining.current - (Date.now() - startedAt.current));
    };
  }, [close, duration, open, paused, provider.viewport]);

  const present = usePresence(open, localRef);
  if (!present || !provider.viewport) return null;
  const context: ToastContextValue = {
    close,
    titleId: `${id}-title`,
    descriptionId: `${id}-description`,
    titleMounted,
    descriptionMounted,
    setTitleMounted,
    setDescriptionMounted,
  };
  return createPortal(
    <ToastContext.Provider value={context}>
      <div
        {...props}
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        role={priority === 'assertive' ? 'alert' : 'status'}
        aria-live={priority}
        aria-atomic="true"
        aria-labelledby={titleMounted ? context.titleId : undefined}
        aria-describedby={descriptionMounted ? context.descriptionId : undefined}
        data-toast-root=""
        data-state={open ? 'open' : 'closed'}
        onPointerEnter={(event) => {
          onPointerEnter?.(event);
          if (!event.defaultPrevented) setPointerPaused(true);
        }}
        onPointerLeave={(event) => {
          onPointerLeave?.(event);
          if (!event.defaultPrevented) setPointerPaused(false);
        }}
        onFocus={(event) => {
          onFocus?.(event);
          if (!event.defaultPrevented) setFocusPaused(true);
        }}
        onBlur={(event) => {
          onBlur?.(event);
          if (!event.defaultPrevented && !event.currentTarget.contains(event.relatedTarget)) {
            setFocusPaused(false);
          }
        }}
      >
        {children}
      </div>
    </ToastContext.Provider>,
    provider.viewport,
  );
});

export const ToastTitle = forwardRef<HTMLDivElement, ToastTitleProps>(function ToastTitle(
  { id, ...props },
  ref,
) {
  const context = useToast('Toast.Title');
  const { setTitleMounted } = context;
  useLayoutEffect(() => {
    setTitleMounted(true);
    return () => setTitleMounted(false);
  }, [setTitleMounted]);
  return <div {...props} ref={ref} id={id ?? context.titleId} />;
});

export const ToastDescription = forwardRef<HTMLDivElement, ToastDescriptionProps>(
  function ToastDescription({ id, ...props }, ref) {
    const context = useToast('Toast.Description');
    const { setDescriptionMounted } = context;
    useLayoutEffect(() => {
      setDescriptionMounted(true);
      return () => setDescriptionMounted(false);
    }, [setDescriptionMounted]);
    return <div {...props} ref={ref} id={id ?? context.descriptionId} />;
  },
);

export const ToastAction = forwardRef<HTMLButtonElement, ToastActionProps>(function ToastAction(
  { render, onClick, disabled, ...props },
  ref,
) {
  const context = useToast('Toast.Action');
  const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    ref: React.Ref<HTMLButtonElement>;
  } = {
    ...props,
    ref,
    type: 'button',
    disabled,
    onClick: (event) => {
      onClick?.(event);
      if (!event.defaultPrevented && !disabled) context.close();
    },
  };
  return render ? render(buttonProps) : <button {...buttonProps} />;
});

export const ToastClose = forwardRef<HTMLButtonElement, ToastCloseProps>(function ToastClose(
  { render, onClick, disabled, ...props },
  ref,
) {
  const context = useToast('Toast.Close');
  const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    ref: React.Ref<HTMLButtonElement>;
  } = {
    ...props,
    ref,
    type: 'button',
    disabled,
    onClick: (event) => {
      onClick?.(event);
      if (!event.defaultPrevented && !disabled) context.close();
    },
  };
  return render ? render(buttonProps) : <button {...buttonProps} />;
});

export const ToastViewport = forwardRef<HTMLDivElement, ToastViewportProps>(function ToastViewport(
  { 'aria-label': ariaLabel = 'Notifications', tabIndex = -1, portal = false, ...props },
  ref,
) {
  const context = useToastProvider('Toast.Viewport');
  const anchorRef = useRef<HTMLSpanElement>(null);
  const environment = usePortalEnvironment(anchorRef, portal);
  const { setViewport } = context;
  const setViewportRef = useCallback(
    (node: HTMLDivElement | null) => {
      setViewport(node);
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref, setViewport],
  );
  const viewport = (
    <div
      data-theme={portal ? environment.theme : undefined}
      data-virgo-theme={portal ? environment.themeStyle : undefined}
      dir={portal ? environment.direction : undefined}
      {...props}
      ref={setViewportRef}
      role="region"
      aria-label={ariaLabel}
      tabIndex={tabIndex}
    />
  );
  return portal ? (
    <>
      <span ref={anchorRef} hidden aria-hidden="true" data-toast-anchor="" />
      <Portal>{viewport}</Portal>
    </>
  ) : (
    viewport
  );
});
