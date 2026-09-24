import type { ButtonHTMLAttributes, Ref } from 'react';
import { forwardRef, useLayoutEffect, useRef } from 'react';

import { useMenu } from './context';
import type { ContextMenuTriggerProps, MenuTriggerProps } from './types';

export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(function MenuTrigger(
  {
    render,
    disabled = false,
    onClick,
    onKeyDown,
    onFocus,
    onPointerMove,
    onPointerLeave,
    ...props
  },
  ref,
) {
  const c = useMenu();
  const entryId = c.id;
  const { register } = c.parent?.collection ?? c.collection;
  const isSub = c.mode === 'submenu';
  const isBar = c.mode === 'menubar';
  const isDisabled = disabled || c.disabled;
  const latest = useRef(c);
  useLayoutEffect(() => {
    latest.current = c;
  });
  useLayoutEffect(() => {
    const node = c.triggerRef.current as HTMLButtonElement | null;
    if (!node || !isSub) return;
    return register(entryId, {
      node,
      text: () => node.querySelector('[data-menu-label]')?.textContent ?? node.textContent ?? '',
    });
  }, [register, entryId, isSub, c.triggerRef]);
  const barRegister = c.bar?.register;
  const barValue = c.barValue;
  useLayoutEffect(() => {
    const node = c.triggerRef.current as HTMLButtonElement | null;
    if (!node || !isBar || barValue === undefined) return;
    return barRegister?.(barValue, { node, open: (intent) => latest.current.requestOpen(intent) });
  }, [barRegister, barValue, isBar, c.triggerRef]);
  const buttonProps: ButtonHTMLAttributes<HTMLButtonElement> & { ref: Ref<HTMLButtonElement> } = {
    ...props,
    ref: (node: HTMLButtonElement | null) => {
      c.triggerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    id: c.triggerId,
    type: 'button',
    role: isSub || isBar ? 'menuitem' : props.role,
    disabled: !isSub && !isBar && isDisabled,
    'aria-disabled': isDisabled || undefined,
    tabIndex: isSub ? -1 : isBar ? (c.bar?.focused === c.barValue ? 0 : -1) : props.tabIndex,
    'aria-haspopup': 'menu',
    'aria-expanded': c.open,
    'aria-controls': c.open ? c.contentId : undefined,
    // Portalled submenus remain owned by their invoking menuitem.
    'aria-owns': isSub && c.open ? c.contentId : undefined,
    onClick: (event) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
      if (event.defaultPrevented) return;
      if (c.open && !isSub) c.close();
      else c.requestOpen('first');
    },
    onFocus: (event) => {
      onFocus?.(event);
      if (event.defaultPrevented) return;
      if (isSub) c.parent?.setActiveChild(c.open ? c.id : null);
      if (isBar && c.barValue !== undefined) c.bar?.setFocused(c.barValue);
    },
    onKeyDown: (event) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || isDisabled) return;
      const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
      if (isSub && event.key === (rtl ? 'ArrowLeft' : 'ArrowRight')) {
        event.preventDefault();
        event.stopPropagation();
        c.requestOpen('first');
      } else if (!isSub && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
        event.preventDefault();
        c.requestOpen(event.key === 'ArrowUp' ? 'last' : 'first');
      } else if (isSub && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        c.requestOpen('first');
      }
    },
    onPointerMove: (event) => {
      onPointerMove?.(event);
      if (event.defaultPrevented || event.pointerType === 'touch') return;
      if (isSub) {
        event.currentTarget.focus({ preventScroll: true });
        if (!isDisabled) c.requestOpen('none');
      } else if (isBar && c.bar?.value !== null && !isDisabled) {
        event.currentTarget.focus({ preventScroll: true });
        c.requestOpen('none');
      }
    },
    onPointerLeave: (event) => {
      onPointerLeave?.(event);
      if (!event.defaultPrevented && isSub) c.scheduleClose();
    },
  };
  return render ? render(buttonProps) : <button {...buttonProps} />;
});

export const ContextTrigger = forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  function ContextTrigger(
    { render, disabled, tabIndex = 0, onContextMenu, onKeyDown, ...props },
    ref,
  ) {
    const c = useMenu();
    const blocked = disabled || c.disabled;
    const triggerProps = {
      ...props,
      ref: (node: HTMLDivElement | null) => {
        c.triggerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      id: c.triggerId,
      tabIndex: blocked ? -1 : tabIndex,
      'aria-disabled': blocked || undefined,
      'aria-haspopup': 'menu' as const,
      'aria-expanded': c.open,
      'aria-controls': c.open ? c.contentId : undefined,
      onContextMenu: (event: React.MouseEvent<HTMLDivElement>) => {
        onContextMenu?.(event);
        if (event.defaultPrevented || blocked) return;
        event.preventDefault();
        c.setPoint({ left: event.clientX, top: event.clientY, width: 0, height: 0 });
        c.requestOpen('first');
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || blocked) return;
        if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) {
          event.preventDefault();
          c.setPoint(undefined);
          c.requestOpen('first');
        }
      },
    };
    return render ? render(triggerProps) : <div {...triggerProps} />;
  },
);
