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

import type {
  DropdownContentProps,
  DropdownItemProps,
  DropdownProps,
  DropdownTriggerProps,
} from './Dropdown.types';
import { positionDropdown } from './position';

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
function composeRefs<T>(
  forwarded: React.ForwardedRef<T>,
  internal: React.MutableRefObject<T | null>,
) {
  return (node: T | null) => {
    internal.current = node;
    if (typeof forwarded === 'function') forwarded(node);
    else if (forwarded) forwarded.current = node;
  };
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
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const open = !disabled && (controlledOpen ?? localOpen);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const intentRef = useRef<Intent>('none');
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();
  const setOpen = useCallback(
    (next: boolean) => {
      if (next && disabled) return;
      if (controlledOpen === undefined) setLocalOpen(next);
      if (next !== open) onOpenChange?.(next);
    },
    [controlledOpen, disabled, onOpenChange, open],
  );
  const cancelClose = useCallback(() => {
    if (closeTimer.current !== null) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);
  const requestOpen = (intent: Intent) => {
    if (disabled || triggerRef.current?.disabled) return;
    cancelClose();
    intentRef.current = intent;
    setOpen(true);
    if (open && contentRef.current) focusItem(contentRef.current, intent);
  };
  const scheduleClose = () => {
    if (trigger !== 'hover') return;
    cancelClose();
    closeTimer.current = setTimeout(() => {
      if (contentRef.current?.contains(document.activeElement)) triggerRef.current?.focus();
      setOpen(false);
    }, 150);
  };
  useEffect(() => cancelClose, [cancelClose]);
  useEffect(() => {
    if (disabled) {
      cancelClose();
      setLocalOpen(false);
    }
  }, [disabled, cancelClose]);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: Event) => {
      if (
        event.target instanceof Node &&
        !triggerRef.current?.contains(event.target) &&
        !contentRef.current?.contains(event.target)
      ) {
        cancelClose();
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('focusin', dismiss);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('focusin', dismiss);
    };
  }, [open, setOpen, cancelClose]);
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
      <div
        {...props}
        ref={ref}
        data-state={open ? 'open' : 'closed'}
        data-disabled={disabled || undefined}
      >
        {children}
      </div>
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
        } else if (event.key === 'Escape' && context.open) {
          event.preventDefault();
          context.setOpen(false);
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
    const [position, setPosition] = useState<ReturnType<typeof positionDropdown> | null>(null);
    const [theme, setTheme] = useState<string | undefined>();
    const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
    const typeahead = useRef({ text: '', time: 0 });
    useLayoutEffect(() => {
      if (!open) {
        setPosition(null);
        return;
      }
      const anchor = triggerRef.current;
      const content = contentRef.current;
      if (!anchor || !content) return;
      const update = () => {
        const rect = content.getBoundingClientRect();
        const viewport = content.querySelector<HTMLElement>('[data-dropdown-viewport]');
        // Measure the uncompressed menu so edge flipping stays stable after height constraints.
        const height = viewport
          ? Math.min(
              Number.parseFloat(getComputedStyle(viewport).maxHeight) || Infinity,
              viewport.scrollHeight,
            ) +
            rect.height -
            viewport.getBoundingClientRect().height
          : Math.max(rect.height, content.scrollHeight);
        const next = positionDropdown(
          anchor.getBoundingClientRect(),
          { left: rect.left, top: rect.top, width: rect.width, height },
          {
            width: document.documentElement.clientWidth || window.innerWidth,
            height: window.innerHeight,
          },
          placement,
          offset,
        );
        setPosition((previous) =>
          JSON.stringify(previous) === JSON.stringify(next) ? previous : next,
        );
      };
      const updateTheme = () => {
        setTheme(anchor.closest('[data-theme]')?.getAttribute('data-theme') ?? undefined);
        setDirection(getComputedStyle(anchor).direction === 'rtl' ? 'rtl' : 'ltr');
      };
      updateTheme();
      update();
      const resize = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(update);
      resize?.observe(anchor);
      resize?.observe(content);
      const mutation = new MutationObserver(updateTheme);
      for (let node: HTMLElement | null = anchor; node; node = node.parentElement)
        mutation.observe(node, { attributes: true, attributeFilter: ['data-theme', 'dir'] });
      window.addEventListener('resize', update);
      document.addEventListener('scroll', update, true);
      return () => {
        resize?.disconnect();
        mutation.disconnect();
        window.removeEventListener('resize', update);
        document.removeEventListener('scroll', update, true);
      };
    }, [open, placement, offset, triggerRef, contentRef, intentRef]);
    const positioned = position !== null;
    useLayoutEffect(() => {
      if (open && positioned && contentRef.current)
        focusItem(contentRef.current, intentRef.current);
    }, [open, positioned, contentRef, intentRef]);
    if (!open || typeof document === 'undefined') return null;
    const positioningStyle = {
      ...style,
      position: 'fixed',
      left: position?.left ?? 0,
      top: position?.top ?? 0,
      maxWidth: 'calc(100vw - 16px)',
      maxHeight: position?.maxHeight ?? 'calc(100vh - 16px)',
      visibility: position ? 'visible' : 'hidden',
      '--dropdown-arrow-x': `${position?.arrowX ?? 0}px`,
      '--dropdown-arrow-y': `${position?.arrowY ?? 0}px`,
      '--dropdown-trigger-width': `${triggerRef.current?.getBoundingClientRect().width ?? 0}px`,
    } as React.CSSProperties;
    return createPortal(
      <div
        {...props}
        ref={composeRefs(ref, contentRef)}
        id={context.contentId}
        role="menu"
        tabIndex={-1}
        aria-labelledby={context.triggerId}
        data-theme={theme}
        dir={direction}
        data-placement={position?.placement ?? placement}
        data-side={position?.side}
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
          } else if (event.key === 'Escape' || event.key === 'Tab') {
            if (event.key === 'Escape') {
              event.preventDefault();
              event.stopPropagation();
            }
            context.cancelClose();
            context.triggerRef.current?.focus();
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
      />,
      document.body,
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
        // Preserve focus deliberately moved by an action (for example, into a dialog).
        if (
          context.contentRef.current?.contains(document.activeElement) ||
          document.activeElement === document.body
        )
          context.triggerRef.current?.focus();
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
