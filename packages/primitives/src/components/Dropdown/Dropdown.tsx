import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
} from 'react';

import { useControllableState } from '../../internal/hooks/useControllableState';
import { useDismiss } from '../../internal/overlay/dismiss';
import { returnFocus } from '../../internal/overlay/focus';
import { LayerScope, useLayerRegistration, useOverlayLayer } from '../../internal/overlay/layers';
import { Portal } from '../../internal/overlay/Portal';
import { useFloatingPosition } from '../../internal/overlay/useFloatingPosition';
import { useHoverIntent } from '../../internal/overlay/useHoverIntent';
import { composeRefs } from '../../internal/utils/composeRefs';
import type {
  DropdownContentProps,
  DropdownItemProps,
  DropdownProps,
  DropdownTriggerProps,
} from './Dropdown.types';

type Intent = 'none' | 'first' | 'last' | 'selected';
type Context = {
  open: boolean;
  disabled: boolean;
  trigger: 'click' | 'hover';
  setOpen: (open: boolean) => void;
  requestOpen: (intent: Intent) => void;
  cancelClose: () => void;
  scheduleClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  intentRef: React.MutableRefObject<Intent>;
  triggerId: string;
  contentId: string;
};
const DropdownContext = createContext<Context | null>(null);
function useDropdown() {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('Dropdown parts must be used inside Dropdown.');
  return context;
}
function items(content: HTMLElement) {
  return Array.from(
    content.querySelectorAll<HTMLButtonElement>('[data-dropdown-item]:not(:disabled)'),
  );
}
function focusItem(content: HTMLElement, intent: Intent) {
  if (intent === 'none') return;
  const options = items(content);
  const selected = options.find((item) => item.getAttribute('aria-checked') === 'true');
  (intent === 'last'
    ? options.at(-1)
    : intent === 'selected'
      ? (selected ?? options[0])
      : options[0]
  )?.focus();
  if (!options.length) content.focus();
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(function Dropdown(
  {
    trigger = 'click',
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
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
  const intentRef = useRef<Intent>('none');
  const id = useId();
  const layer = useOverlayLayer(triggerRef, contentRef);
  useLayerRegistration(layer, open);
  const setOpen = useCallback(
    (next: boolean) => {
      if (next && disabled) return;
      setOpenState(next);
    },
    [disabled, setOpenState],
  );
  const { cancelClose, scheduleClose } = useHoverIntent(trigger === 'hover' && !disabled, () => {
    if (contentRef.current?.contains(document.activeElement))
      returnFocus(triggerRef.current, contentRef.current);
    setOpen(false);
  });
  const requestOpen = (intent: Intent) => {
    if (disabled || triggerRef.current?.disabled) return;
    cancelClose();
    intentRef.current = intent;
    setOpen(true);
    if (open && contentRef.current) focusItem(contentRef.current, intent);
  };
  useEffect(() => {
    if (disabled) {
      cancelClose();
      resetOpen(false);
    }
  }, [disabled, cancelClose, resetOpen]);
  useDismiss({
    open,
    layer,
    onDismiss: (reason) => {
      cancelClose();
      if (reason === 'escape') returnFocus(triggerRef.current, contentRef.current, true);
      setOpen(false);
    },
  });
  return (
    <DropdownContext.Provider
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
        intentRef,
        triggerId: `${id}-trigger`,
        contentId: `${id}-menu`,
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
    </DropdownContext.Provider>
  );
});

export const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  function DropdownTrigger(
    { render, disabled, onClick, onKeyDown, onPointerEnter, onPointerLeave, ...props },
    ref,
  ) {
    const context = useDropdown();
    const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      ref: React.Ref<HTMLButtonElement>;
    } = {
      ...props,
      ref: composeRefs(ref, context.triggerRef),
      id: context.triggerId,
      type: 'button',
      disabled: context.disabled || disabled,
      'aria-haspopup': 'menu',
      'aria-expanded': context.open,
      'aria-controls': context.open ? context.contentId : undefined,
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          if (context.open) context.setOpen(false);
          else context.requestOpen('selected');
        }
      },
      onKeyDown: (event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          context.requestOpen(event.key === 'ArrowUp' ? 'last' : 'first');
        } else if ((event.key === 'Enter' || event.key === ' ') && context.open) {
          event.preventDefault();
          context.requestOpen('selected');
        }
      },
      onPointerEnter: (event) => {
        onPointerEnter?.(event);
        if (!event.defaultPrevented && context.trigger === 'hover' && event.pointerType !== 'touch')
          context.requestOpen('none');
      },
      onPointerLeave: (event) => {
        onPointerLeave?.(event);
        if (!event.defaultPrevented) context.scheduleClose();
      },
    };
    return render ? render(buttonProps) : <button {...buttonProps} />;
  },
);

export const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  function DropdownContent(
    {
      placement = 'bottomLeft',
      offset = 8,
      style,
      onKeyDown,
      onPointerEnter,
      onPointerLeave,
      ...props
    },
    ref,
  ) {
    const context = useDropdown();
    const { open, triggerRef, contentRef, intentRef } = context;
    const floating = useFloatingPosition({
      active: open,
      triggerRef,
      contentRef,
      placement,
      offset,
    });
    const typeahead = useRef({ text: '', time: 0 });
    const positioned = floating.positioned;
    useLayoutEffect(() => {
      if (open && positioned && contentRef.current)
        focusItem(contentRef.current, intentRef.current);
    }, [open, positioned, contentRef, intentRef]);
    if (!open) return null;
    const positioningStyle = {
      ...style,
      ...floating.style,
      '--dropdown-arrow-x': 'var(--overlay-arrow-x)',
      '--dropdown-arrow-y': 'var(--overlay-arrow-y)',
      '--dropdown-trigger-width': 'var(--overlay-trigger-width)',
    } as React.CSSProperties;
    return (
      <Portal>
        <div
          {...props}
          ref={composeRefs(ref, contentRef)}
          id={context.contentId}
          role="menu"
          tabIndex={-1}
          aria-labelledby={context.triggerId}
          data-theme={floating.theme}
          data-virgo-theme={floating.themeStyle}
          dir={floating.direction}
          data-placement={floating.placement}
          data-side={floating.side}
          style={positioningStyle}
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
            if (event.defaultPrevented) return;
            const options = items(event.currentTarget);
            const index = options.indexOf(document.activeElement as HTMLButtonElement);
            if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
              event.preventDefault();
              const next =
                event.key === 'Home'
                  ? 0
                  : event.key === 'End'
                    ? options.length - 1
                    : event.key === 'ArrowDown'
                      ? index + 1
                      : index < 0
                        ? options.length - 1
                        : index - 1;
              options[(next + options.length) % options.length]?.focus();
            } else if (event.key === 'Tab') {
              context.cancelClose();
              returnFocus(context.triggerRef.current, context.contentRef.current, true);
              context.setOpen(false);
            } else if (
              event.key.length === 1 &&
              event.key !== ' ' &&
              !event.ctrlKey &&
              !event.altKey &&
              !event.metaKey
            ) {
              const now = Date.now();
              const text =
                (now - typeahead.current.time < 500 ? typeahead.current.text : '') +
                event.key.toLocaleLowerCase();
              typeahead.current = { text, time: now };
              const query = new Set(text).size === 1 ? text[0]! : text;
              const ordered = [...options.slice(index + 1), ...options.slice(0, index + 1)];
              const match = ordered.find((item) =>
                item.textContent?.trim().toLocaleLowerCase().startsWith(query),
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
  },
);

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(function DropdownItem(
  { checked, disabled, onSelect, onClick, onPointerMove, ...props },
  ref,
) {
  const context = useDropdown();
  const isDisabled = context.disabled || disabled;
  return (
    <button
      {...props}
      ref={ref}
      type="button"
      tabIndex={-1}
      role={checked === undefined ? 'menuitem' : 'menuitemradio'}
      aria-checked={checked}
      aria-disabled={isDisabled || undefined}
      disabled={isDisabled}
      data-dropdown-item=""
      data-checked={checked}
      onClick={(event) => {
        if (isDisabled) return;
        onClick?.(event);
        if (event.defaultPrevented) return;
        onSelect?.(event);
        if (event.defaultPrevented) return;
        context.cancelClose();
        context.setOpen(false);
        returnFocus(context.triggerRef.current, context.contentRef.current);
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (!event.defaultPrevented && !isDisabled && event.pointerType !== 'touch')
          event.currentTarget.focus({ preventScroll: true });
      }}
    />
  );
});

export const DropdownSeparator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function DropdownSeparator(props, ref) {
    return <div {...props} ref={ref} role="separator" />;
  },
);
