import { forwardRef, useLayoutEffect, useRef } from 'react';

import { Portal } from '../overlay/Portal';
import { useFloatingPosition } from '../overlay/useFloatingPosition';
import { composeRefs } from '../utils/composeRefs';
import { focusEntry, moveEntry, searchEntry } from './collection';
import { useMenu } from './context';
import type { MenuContentProps } from './types';

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(function MenuContent(
  { placement, offset, onKeyDown, onPointerEnter, onPointerLeave, style, ...props },
  ref,
) {
  const menu = useMenu();
  const trigger = menu.triggerRef;
  const isSub = menu.mode === 'submenu';
  const rtl = trigger.current ? getComputedStyle(trigger.current).direction === 'rtl' : false;
  const floating = useFloatingPosition({
    active: menu.open,
    triggerRef: trigger,
    contentRef: menu.contentRef,
    placement: placement ?? (isSub ? (rtl ? 'leftTop' : 'rightTop') : 'bottomStart'),
    offset: offset ?? (menu.mode === 'context' ? 0 : isSub ? 4 : 8),
    ...(menu.point ? { anchorRect: menu.point } : {}),
  });

  const search = useRef({ text: '', time: 0 });
  const { ordered, register } = menu.collection;

  useLayoutEffect(() => {
    if (menu.open && floating.positioned) {
      search.current = { text: '', time: 0 };
      focusEntry({ ordered, register }, menu.intentRef.current, menu.contentRef.current);
    }
  }, [menu.open, floating.positioned, ordered, register, menu.intentRef, menu.contentRef]);

  if (!menu.open) return null;

  return (
    <Portal>
      <div
        {...props}
        ref={composeRefs(ref, menu.contentRef)}
        id={menu.contentId}
        role="menu"
        tabIndex={-1}
        aria-labelledby={
          props['aria-label'] ? undefined : (props['aria-labelledby'] ?? menu.triggerId)
        }
        aria-orientation="vertical"
        data-state="open"
        data-theme={floating.theme}
        data-virgo-theme={floating.themeStyle}
        dir={floating.direction}
        data-placement={floating.placement}
        data-side={floating.side}
        style={{ ...style, ...floating.style }}
        onPointerEnter={(event) => {
          onPointerEnter?.(event);
          if (!event.defaultPrevented) menu.cancelClose();
        }}
        onPointerLeave={(event) => {
          onPointerLeave?.(event);
          if (!event.defaultPrevented) menu.scheduleClose();
        }}
        onKeyDown={(event) => {
          // Portal events bubble through the React tree: only the nearest menu handles them.
          if ((event.target as Element).closest('[role="menu"]') !== event.currentTarget) return;
          onKeyDown?.(event);
          if (event.defaultPrevented) return;
          const forward = floating.direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
          const back = floating.direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
          if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
            event.preventDefault();
            menu.setActiveChild(null);
            moveEntry(menu.collection, event.key);
          } else if (event.key === back && isSub) {
            event.preventDefault();
            event.stopPropagation();
            menu.close(true);
          } else if (
            (event.key === forward || event.key === back) &&
            menu.bar &&
            menu.barValue !== undefined
          ) {
            event.preventDefault();
            event.stopPropagation();
            menu.bar.move(menu.barValue, event.key === forward ? 1 : -1, true);
          } else if (event.key === 'Tab') {
            // Let the browser continue its natural tab order from the invoking control.
            menu.closeAll(true);
          } else if (
            event.key.length === 1 &&
            event.key !== ' ' &&
            !event.ctrlKey &&
            !event.altKey &&
            !event.metaKey
          ) {
            const now = Date.now();
            const text =
              (now - search.current.time < 500 ? search.current.text : '') +
              event.key.toLocaleLowerCase();
            search.current = { text, time: now };
            event.preventDefault();
            searchEntry(menu.collection, new Set(text).size === 1 ? text[0]! : text);
          }
        }}
      />
    </Portal>
  );
});
