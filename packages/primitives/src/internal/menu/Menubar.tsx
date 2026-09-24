import { forwardRef, useCallback, useContext, useId, useRef, useState } from 'react';

import { useControllableState } from '../hooks/useControllableState';
import { BarContext, type BarEntry } from './context';
import { MenuScope } from './Root';
import type { MenubarMenuProps, MenubarRootProps } from './types';

export const MenubarRoot = forwardRef<HTMLDivElement, MenubarRootProps>(function MenubarRoot(
  { value: controlled, defaultValue = null, onValueChange, onKeyDown, ...props },
  ref,
) {
  const [value, setValue] = useControllableState(controlled, defaultValue, onValueChange);
  const [focused, setFocused] = useState<string | null>(null);
  const entries = useRef(new Map<string, BarEntry>());
  const register = useCallback((id: string, entry: BarEntry) => {
    entries.current.set(id, entry);
    setFocused((current) => {
      if (current && entries.current.get(current)?.node.getAttribute('aria-disabled') !== 'true')
        return current;
      return (
        [...entries.current].find(
          ([, item]) => item.node.getAttribute('aria-disabled') !== 'true',
        )?.[0] ??
        current ??
        id
      );
    });
    return () => {
      entries.current.delete(id);
      setFocused((current) =>
        current === id ? (entries.current.keys().next().value ?? null) : current,
      );
    };
  }, []);
  const orderedEntries = () =>
    [...entries.current.entries()]
      .filter(([, entry]) => entry.node.isConnected)
      .sort((a, b) =>
        a[1].node.compareDocumentPosition(b[1].node) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
      );
  const move = (id: string, direction: number | 'first' | 'last', open: boolean) => {
    const ordered = orderedEntries();
    const index = ordered.findIndex(([key]) => key === id);
    const next =
      direction === 'first'
        ? 0
        : direction === 'last'
          ? ordered.length - 1
          : (index + direction + ordered.length) % ordered.length;
    const entry = ordered[next];
    if (!entry) return;
    entry[1].node.focus({ preventScroll: true });
    if (open) {
      if (entry[1].node.getAttribute('aria-disabled') === 'true') setValue(null);
      else entry[1].open('first');
    }
  };
  return (
    <BarContext.Provider
      value={{ value: value ?? null, setValue, focused, setFocused, register, move }}
    >
      <div
        {...props}
        ref={ref}
        role="menubar"
        aria-orientation="horizontal"
        onKeyDown={(event) => {
          if ((event.target as Element).closest('[role="menu"]')) return;
          onKeyDown?.(event);
          if (event.defaultPrevented) return;
          const active = [...entries.current.entries()].find(([, e]) => e.node === event.target);
          if (!active) return;
          const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
          if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
            event.preventDefault();
            move(
              active[0],
              event.key === 'Home'
                ? 'first'
                : event.key === 'End'
                  ? 'last'
                  : (event.key === 'ArrowRight' ? !rtl : rtl)
                    ? 1
                    : -1,
              value != null,
            );
          } else if (event.key === 'Escape') {
            setValue(null);
          } else if (event.key === 'Tab') {
            setValue(null);
          } else if (
            event.key.length === 1 &&
            event.key !== ' ' &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.altKey
          ) {
            const keys = orderedEntries();
            const index = keys.findIndex(([key]) => key === active[0]);
            const next = [...keys.slice(index + 1), ...keys.slice(0, index + 1)].find(([, e]) =>
              e.node.textContent
                ?.trim()
                .toLocaleLowerCase()
                .startsWith(event.key.toLocaleLowerCase()),
            );
            if (next) {
              event.preventDefault();
              next[1].node.focus({ preventScroll: true });
              if (value != null) next[1].open('first');
            }
          }
        }}
      />
    </BarContext.Provider>
  );
});
export const MenubarMenu = forwardRef<HTMLDivElement, MenubarMenuProps>(function MenubarMenu(
  { value: provided, ...props },
  ref,
) {
  const bar = useContext(BarContext);
  const generated = useId();
  const value = provided ?? generated;
  if (!bar) throw new Error('Menubar.Menu must be used inside Menubar.Root.');
  return (
    <MenuScope
      {...props}
      ref={ref}
      mode="menubar"
      bar={bar}
      barValue={value}
      open={bar.value === value}
      onOpenChange={(open) => {
        if (open) bar.setValue(value);
        else if (bar.value === value) bar.setValue(null);
      }}
    />
  );
});
