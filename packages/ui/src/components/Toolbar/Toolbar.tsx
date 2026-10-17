import { forwardRef, useEffect, useRef } from 'react';

import { ActionGroup } from '../../internal/action-group/ActionGroup';
import { useComposedRefs } from '../../internal/utils/composeRefs';
import type { ToolbarProps } from './Toolbar.types';

const controlSelector = 'button, a[href], input, select, textarea, [role="button"], [tabindex]';

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(
  { orientation = 'horizontal', loop = true, onKeyDown, onFocus, ...props },
  forwardedRef,
) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const currentRef = useRef<HTMLElement | null>(null);
  const controlsRef = useRef<HTMLElement[]>([]);
  const composedRef = useComposedRefs(forwardedRef, rootRef);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const original = new Map<HTMLElement, string | null>();
    const update = () => {
      const controls = [...root.querySelectorAll<HTMLElement>(controlSelector)].filter(
        (control) =>
          control.closest('[role="toolbar"]') === root &&
          !control.closest('[role="menu"], [role="listbox"], [hidden], [inert]') &&
          !control.matches(':disabled, [aria-disabled="true"], input[type="hidden"]') &&
          getComputedStyle(control).display !== 'none' &&
          getComputedStyle(control).visibility !== 'hidden',
      );
      controlsRef.current = controls;
      const current = controls.includes(currentRef.current!) ? currentRef.current : controls[0];
      currentRef.current = current ?? null;
      for (const control of controls) {
        if (!original.has(control)) original.set(control, control.getAttribute('tabindex'));
        control.tabIndex = control === current ? 0 : -1;
      }
    };

    update();

    const observer = new MutationObserver(update);
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled', 'aria-disabled', 'hidden', 'inert', 'class', 'style'],
    });

    return () => {
      observer.disconnect();
      for (const [control, tabIndex] of original) {
        if (tabIndex === null) control.removeAttribute('tabindex');
        else control.setAttribute('tabindex', tabIndex);
      }
      controlsRef.current = [];
    };
  }, []);

  return (
    <ActionGroup
      {...props}
      orientation={orientation}
      role="toolbar"
      aria-orientation={orientation}
      ref={composedRef}
      onFocus={(event) => {
        onFocus?.(event);
        const target = event.target as HTMLElement;
        if (!controlsRef.current.includes(target)) return;
        currentRef.current = target;
        for (const control of controlsRef.current) control.tabIndex = control === target ? 0 : -1;
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        const target = event.target as HTMLElement;
        if (
          event.defaultPrevented ||
          event.altKey ||
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey ||
          !controlsRef.current.includes(target) ||
          target.matches('input, select, textarea, [contenteditable="true"]') ||
          target.closest('[role="radiogroup"], [role="tablist"]') ||
          target.getAttribute('aria-expanded') === 'true'
        )
          return;
        const controls = controlsRef.current;
        const index = controls.indexOf(target);
        const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
        const nextKey = orientation === 'vertical' ? 'ArrowDown' : rtl ? 'ArrowLeft' : 'ArrowRight';
        const previousKey =
          orientation === 'vertical' ? 'ArrowUp' : rtl ? 'ArrowRight' : 'ArrowLeft';
        let next = index;
        if (event.key === nextKey) next++;
        else if (event.key === previousKey) next--;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = controls.length - 1;
        else return;
        event.preventDefault();
        next = loop
          ? (next + controls.length) % controls.length
          : Math.max(0, Math.min(next, controls.length - 1));
        controls[next]?.focus();
      }}
    />
  );
});

Toolbar.displayName = 'Toolbar';
