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
  const c = useMenu();
  const trigger = c.triggerRef;
  const isSub = c.mode === 'submenu';
  const rtl = trigger.current ? getComputedStyle(trigger.current).direction === 'rtl' : false;
  const floating = useFloatingPosition({
    active: c.open,
    triggerRef: trigger,
    contentRef: c.contentRef,
    placement: placement ?? (isSub ? (rtl ? 'leftTop' : 'rightTop') : 'bottomStart'),
    offset: offset ?? (c.mode === 'context' ? 0 : isSub ? 4 : 8),
    ...(c.point ? { anchorRect: c.point } : {}),
  });
  const search = useRef({ text: '', time: 0 });
  const { ordered, register } = c.collection;
  useLayoutEffect(() => {
    if (c.open && floating.positioned) {
      search.current = { text: '', time: 0 };
      focusEntry({ ordered, register }, c.intentRef.current, c.contentRef.current);
    }
  }, [c.open, floating.positioned, ordered, register, c.intentRef, c.contentRef]);
  if (!c.open) return null;
  return (
    <Portal>
      <div
        {...props}
        ref={composeRefs(ref, c.contentRef)}
        id={c.contentId}
        role="menu"
        tabIndex={-1}
        aria-labelledby={
          props['aria-label'] ? undefined : (props['aria-labelledby'] ?? c.triggerId)
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
          if (!event.defaultPrevented) c.cancelClose();
        }}
        onPointerLeave={(event) => {
          onPointerLeave?.(event);
          if (!event.defaultPrevented) c.scheduleClose();
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
            c.setActiveChild(null);
            moveEntry(c.collection, event.key);
          } else if (event.key === back && isSub) {
            event.preventDefault();
            event.stopPropagation();
            c.close(true);
          } else if (
            (event.key === forward || event.key === back) &&
            c.bar &&
            c.barValue !== undefined
          ) {
            event.preventDefault();
            event.stopPropagation();
            c.bar.move(c.barValue, event.key === forward ? 1 : -1, true);
          } else if (event.key === 'Tab') {
            // Let the browser continue its natural tab order from the invoking control.
            c.closeAll(true);
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
            searchEntry(c.collection, new Set(text).size === 1 ? text[0]! : text);
          }
        }}
      />
    </Portal>
  );
});
