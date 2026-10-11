import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useControllableState } from '../../internal/hooks/useControllableState';
import { useDismiss } from '../../internal/overlay/dismiss';
import {
  LayerScope,
  type OverlayLayer,
  useLayerBranch,
  useLayerRegistration,
  useOverlayLayer,
} from '../../internal/overlay/layers';
import { Portal } from '../../internal/overlay/Portal';
import { useFocusScope } from '../../internal/overlay/useFocusScope';
import { useModalIsolation } from '../../internal/overlay/useModalIsolation';
import { usePortalEnvironment } from '../../internal/overlay/usePortalEnvironment';
import { usePresence } from '../../internal/overlay/usePresence';
import { composeRefs } from '../../internal/utils/composeRefs';
import type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
} from './Dialog.types';

type CloseReason = 'programmatic' | 'close' | 'escape' | 'pointer';

type DialogContextValue = {
  open: boolean;
  present: boolean;
  modal: boolean;
  requestOpenChange: (open: boolean, reason?: CloseReason) => void;
  closeReasonRef: React.MutableRefObject<CloseReason>;
  closeAutoFocusPreventedRef: React.MutableRefObject<boolean>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  environment: ReturnType<typeof usePortalEnvironment>;
  layer: OverlayLayer;
  triggerId: string;
  contentId: string;
  defaultTitleId: string;
  defaultDescriptionId: string;
  titleId: string | undefined;
  descriptionId: string | undefined;
  setTitleId: (id: string | undefined) => void;
  setDescriptionId: (id: string | undefined) => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialog(part: string) {
  const context = useContext(DialogContext);
  if (!context) throw new Error(`${part} must be used inside Dialog.Root.`);
  return context;
}

export const DialogRoot = forwardRef<HTMLDivElement, DialogProps>(function DialogRoot(
  { open: controlledOpen, defaultOpen = false, onOpenChange, modal = true, children, ...props },
  ref,
) {
  const [openState, setOpenState] = useControllableState(controlledOpen, defaultOpen, onOpenChange);
  const open = Boolean(openState);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const rootForwardedRef = useMemo(() => {
    if (typeof ref !== 'function') return composeRefs(ref, rootRef);
    return (node: HTMLDivElement | null) => {
      rootRef.current = node;
      // ForwardedRef omits the cleanup return supported by React 19 callback refs.
      const cleanup = (ref as React.RefCallback<HTMLDivElement>)(node);
      if (typeof cleanup === 'function')
        return () => {
          rootRef.current = null;
          cleanup();
        };
    };
  }, [ref]);
  const environment = usePortalEnvironment(rootRef, open);
  const closeReasonRef = useRef<CloseReason>('programmatic');
  const closeAutoFocusPreventedRef = useRef(false);
  const previousOpenRef = useRef(open);
  const [titleId, setTitleId] = useState<string>();
  const [descriptionId, setDescriptionId] = useState<string>();
  const generatedId = useId();
  const layer = useOverlayLayer(triggerRef, contentRef);
  useLayerRegistration(layer, open);
  useLayoutEffect(() => {
    if (open) {
      closeReasonRef.current = 'programmatic';
      closeAutoFocusPreventedRef.current = false;
    }
  }, [open]);
  useLayoutEffect(() => {
    const wasOpen = previousOpenRef.current;
    previousOpenRef.current = open;
    if (
      !wasOpen ||
      open ||
      closeAutoFocusPreventedRef.current ||
      (closeReasonRef.current === 'pointer' && !modal)
    )
      return;
    const target = triggerRef.current;
    if (target?.isConnected) target.focus({ preventScroll: true });
    queueMicrotask(() => {
      if (target?.isConnected) target.focus({ preventScroll: true });
    });
  }, [modal, open]);
  const requestOpenChange = useCallback(
    (nextOpen: boolean, reason: CloseReason = 'programmatic') => {
      if (!nextOpen) closeReasonRef.current = reason;
      setOpenState(nextOpen);
    },
    [setOpenState],
  );

  return (
    <DialogContext.Provider
      value={{
        open,
        present: open,
        modal,
        requestOpenChange,
        closeReasonRef,
        closeAutoFocusPreventedRef,
        triggerRef,
        contentRef,
        environment,
        layer,
        triggerId: `${generatedId}-trigger`,
        contentId: `${generatedId}-content`,
        defaultTitleId: `${generatedId}-title`,
        defaultDescriptionId: `${generatedId}-description`,
        titleId,
        descriptionId,
        setTitleId,
        setDescriptionId,
      }}
    >
      <LayerScope.Provider value={layer}>
        <div {...props} ref={rootForwardedRef} data-state={open ? 'open' : 'closed'}>
          {children}
        </div>
      </LayerScope.Provider>
    </DialogContext.Provider>
  );
});

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  function DialogTrigger({ render, disabled, onClick, ...props }, ref) {
    const context = useDialog('Dialog.Trigger');
    const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      ref: React.Ref<HTMLButtonElement>;
      'data-state': 'open' | 'closed';
    } = {
      ...props,
      ref: composeRefs(ref, context.triggerRef),
      id: context.triggerId,
      type: 'button',
      disabled,
      'aria-haspopup': 'dialog',
      'aria-expanded': context.open,
      'aria-controls': context.open ? context.contentId : undefined,
      'data-state': context.open ? 'open' : 'closed',
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !disabled && !context.open) context.requestOpenChange(true);
      },
    };
    return render ? render(buttonProps) : <button {...buttonProps} />;
  },
);

export function DialogPortal({ children }: DialogPortalProps) {
  const context = useDialog('Dialog.Portal');
  const present = usePresence(context.open, context.contentRef);
  if (!present) return null;
  return (
    <DialogContext.Provider value={{ ...context, present }}>
      <Portal>{children}</Portal>
    </DialogContext.Provider>
  );
}

export const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(function DialogOverlay(
  { style, ...props },
  ref,
) {
  const context = useDialog('Dialog.Overlay');
  const environment = context.environment;
  const overlayRef = useRef<HTMLDivElement | null>(null);
  useLayerBranch(context.layer, overlayRef, context.open && context.modal);
  if (!context.present || !context.modal) return null;
  return (
    <div
      data-theme={environment.theme}
      data-virgo-theme={environment.themeStyle}
      dir={environment.direction}
      {...props}
      ref={composeRefs(ref, overlayRef)}
      aria-hidden="true"
      data-state={context.open && context.modal ? 'open' : 'closed'}
      style={{ ...style, ...(!context.open ? { pointerEvents: 'none' } : {}) }}
    />
  );
});

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(
  {
    onOpenAutoFocus,
    onCloseAutoFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    style,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    ...props
  },
  ref,
) {
  const context = useDialog('Dialog.Content');
  const environment = context.environment;
  useDismiss({
    open: context.open,
    layer: context.layer,
    outsideFocus: false,
    onDismiss: (reason, event) => {
      if (reason === 'escape') {
        onEscapeKeyDown?.(event as KeyboardEvent);
        if (!event.defaultPrevented) context.requestOpenChange(false, 'escape');
        return;
      }
      if (reason === 'pointer') {
        onPointerDownOutside?.(event as PointerEvent);
        if (event.defaultPrevented) return;
        if (context.modal) event.preventDefault();
        context.requestOpenChange(false, 'pointer');
      }
    },
  });
  useModalIsolation(context.layer, context.open && context.modal);
  useFocusScope({
    active: context.open,
    trapped: context.modal,
    layer: context.layer,
    contentRef: context.contentRef,
    restoreFocus: () =>
      context.closeReasonRef.current === 'pointer' && !context.modal
        ? false
        : context.triggerRef.current,
    ...(onOpenAutoFocus ? { onOpenAutoFocus } : {}),
    ...(onCloseAutoFocus
      ? {
          onCloseAutoFocus: (event: Event) => {
            onCloseAutoFocus(event);
            context.closeAutoFocusPreventedRef.current = event.defaultPrevented;
          },
        }
      : {}),
  });
  if (!context.present) return null;

  const labelledBy =
    ariaLabelledBy === undefined
      ? ariaLabel
        ? undefined
        : context.titleId
      : ariaLabelledBy || undefined;
  const describedBy =
    ariaDescribedBy === undefined ? context.descriptionId : ariaDescribedBy || undefined;

  return (
    <div
      data-theme={environment.theme}
      data-virgo-theme={environment.themeStyle}
      dir={environment.direction}
      {...props}
      ref={composeRefs(ref, context.contentRef)}
      id={context.contentId}
      role="dialog"
      tabIndex={-1}
      aria-modal={(context.open && context.modal) || undefined}
      aria-hidden={!context.open || undefined}
      aria-label={ariaLabel}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      data-state={context.open ? 'open' : 'closed'}
      style={{ ...style, ...(!context.open ? { pointerEvents: 'none' } : {}) }}
    />
  );
});

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(function DialogTitle(
  { id, ...props },
  ref,
) {
  const context = useDialog('Dialog.Title');
  const titleId = id ?? context.defaultTitleId;
  const { setTitleId } = context;
  useLayoutEffect(() => {
    setTitleId(titleId);
    return () => setTitleId(undefined);
  }, [setTitleId, titleId]);
  return <h2 {...props} ref={ref} id={titleId} />;
});

export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  function DialogDescription({ id, ...props }, ref) {
    const context = useDialog('Dialog.Description');
    const descriptionId = id ?? context.defaultDescriptionId;
    const { setDescriptionId } = context;
    useLayoutEffect(() => {
      setDescriptionId(descriptionId);
      return () => setDescriptionId(undefined);
    }, [setDescriptionId, descriptionId]);
    return <p {...props} ref={ref} id={descriptionId} />;
  },
);

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(function DialogClose(
  { render, onClick, ...props },
  ref,
) {
  const context = useDialog('Dialog.Close');
  const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    ref: React.Ref<HTMLButtonElement>;
    'data-state': 'open' | 'closed';
  } = {
    ...props,
    ref,
    type: 'button',
    'data-state': context.open ? 'open' : 'closed',
    onClick: (event) => {
      onClick?.(event);
      if (!event.defaultPrevented) context.requestOpenChange(false, 'close');
    },
  };
  return render ? render(buttonProps) : <button {...buttonProps} />;
});
