import type { ButtonHTMLAttributes, Ref } from 'react';
import { forwardRef, useLayoutEffect, useRef } from 'react';

import { composeRefs } from '../utils/composeRefs';
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
  const menu = useMenu();
  const entryId = menu.id;
  const { register } = menu.parent?.collection ?? menu.collection;
  const isSub = menu.mode === 'submenu';
  const isBar = menu.mode === 'menubar';
  const isDisabled = disabled || menu.disabled;

  const latest = useRef(menu);

  useLayoutEffect(() => {
    latest.current = menu;
  });

  useLayoutEffect(() => {
    const node = menu.triggerRef.current as HTMLButtonElement | null;
    if (!node || !isSub) return;
    return register(entryId, {
      node,
      text: () => node.querySelector('[data-menu-label]')?.textContent ?? node.textContent ?? '',
    });
  }, [register, entryId, isSub, menu.triggerRef]);

  const barRegister = menu.bar?.register;
  const barValue = menu.barValue;

  useLayoutEffect(() => {
    const node = menu.triggerRef.current as HTMLButtonElement | null;
    if (!node || !isBar || barValue === undefined) return;
    return barRegister?.(barValue, { node, open: (intent) => latest.current.requestOpen(intent) });
  }, [barRegister, barValue, isBar, menu.triggerRef]);

  const buttonProps: ButtonHTMLAttributes<HTMLButtonElement> & { ref: Ref<HTMLButtonElement> } = {
    ...props,
    ref: composeRefs(ref, menu.triggerRef),
    id: menu.triggerId,
    type: 'button',
    role: isSub || isBar ? 'menuitem' : props.role,
    disabled: !isSub && !isBar && isDisabled,
    'aria-disabled': isDisabled || undefined,
    tabIndex: isSub ? -1 : isBar ? (menu.bar?.focused === menu.barValue ? 0 : -1) : props.tabIndex,
    'aria-haspopup': 'menu',
    'aria-expanded': menu.open,
    'aria-controls': menu.open ? menu.contentId : undefined,
    // Portalled submenus remain owned by their invoking menuitem.
    'aria-owns': isSub && menu.open ? menu.contentId : undefined,
    onClick: (event) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
      if (event.defaultPrevented) return;
      if (menu.open && !isSub) menu.close();
      else menu.requestOpen('first');
    },
    onFocus: (event) => {
      onFocus?.(event);
      if (event.defaultPrevented) return;
      if (isSub) menu.parent?.setActiveChild(menu.open ? menu.id : null);
      if (isBar && menu.barValue !== undefined) menu.bar?.setFocused(menu.barValue);
    },
    onKeyDown: (event) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || isDisabled) return;
      const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
      if (isSub && event.key === (rtl ? 'ArrowLeft' : 'ArrowRight')) {
        event.preventDefault();
        event.stopPropagation();
        menu.requestOpen('first');
      } else if (!isSub && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
        event.preventDefault();
        menu.requestOpen(event.key === 'ArrowUp' ? 'last' : 'first');
      } else if (isSub && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        menu.requestOpen('first');
      }
    },
    onPointerMove: (event) => {
      onPointerMove?.(event);
      if (event.defaultPrevented || event.pointerType === 'touch') return;
      if (isSub) {
        event.currentTarget.focus({ preventScroll: true });
        if (!isDisabled) menu.requestOpen('none');
      } else if (isBar && menu.bar?.value !== null && !isDisabled) {
        event.currentTarget.focus({ preventScroll: true });
        menu.requestOpen('none');
      }
    },
    onPointerLeave: (event) => {
      onPointerLeave?.(event);
      if (!event.defaultPrevented && isSub) menu.scheduleClose();
    },
  };

  return render ? render(buttonProps) : <button {...buttonProps} />;
});

export const ContextTrigger = forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  function ContextTrigger(
    { render, disabled, tabIndex = 0, onContextMenu, onKeyDown, ...props },
    ref,
  ) {
    const menu = useMenu();
    const blocked = disabled || menu.disabled;
    const triggerProps = {
      ...props,
      ref: composeRefs(ref, menu.triggerRef),
      id: menu.triggerId,
      tabIndex: blocked ? -1 : tabIndex,
      'aria-disabled': blocked || undefined,
      'aria-haspopup': 'menu' as const,
      'aria-expanded': menu.open,
      'aria-controls': menu.open ? menu.contentId : undefined,
      onContextMenu: (event: React.MouseEvent<HTMLDivElement>) => {
        onContextMenu?.(event);
        if (event.defaultPrevented || blocked) return;
        event.preventDefault();
        menu.setPoint({ left: event.clientX, top: event.clientY, width: 0, height: 0 });
        menu.requestOpen('first');
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || blocked) return;
        if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) {
          event.preventDefault();
          menu.setPoint(undefined);
          menu.requestOpen('first');
        }
      },
    };

    return render ? render(triggerProps) : <div {...triggerProps} />;
  },
);
