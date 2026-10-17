import { createContext, forwardRef, useContext, useId, useLayoutEffect, useRef } from 'react';

import { useControllableState } from '../hooks/useControllableState';
import { composeRefs } from '../utils/composeRefs';
import { useMenu } from './context';
import type {
  MenuCheckboxItemProps,
  MenuGroupProps,
  MenuItemProps,
  MenuRadioGroupProps,
  MenuRadioItemProps,
} from './types';

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(function MenuItem(
  {
    disabled = false,
    textValue,
    closeOnSelect = true,
    onSelect,
    onClick,
    onPointerMove,
    onFocus,
    ...props
  },
  ref,
) {
  const menu = useMenu();
  const nodeRef = useRef<HTMLButtonElement | null>(null);
  const id = useId();
  const textRef = useRef(textValue);

  useLayoutEffect(() => {
    textRef.current = textValue;
  }, [textValue]);
  const { register } = menu.collection;

  useLayoutEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    return register(id, {
      node,
      text: () =>
        textRef.current ??
        node.querySelector('[data-menu-label]')?.textContent ??
        node.textContent ??
        '',
    });
  }, [id, register]);

  const blocked = disabled || menu.disabled;

  return (
    <button
      {...props}
      ref={composeRefs(ref, nodeRef)}
      type="button"
      role={props.role ?? 'menuitem'}
      tabIndex={-1}
      aria-disabled={blocked || undefined}
      data-disabled={blocked || undefined}
      onClick={(event) => {
        if (blocked) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
        if (event.defaultPrevented) return;
        onSelect?.(event);
        if (event.defaultPrevented) return;
        if (closeOnSelect) menu.closeAll(true);
      }}
      onFocus={(event) => {
        onFocus?.(event);
        if (!event.defaultPrevented) menu.setActiveChild(null);
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (!event.defaultPrevented && event.pointerType !== 'touch')
          event.currentTarget.focus({ preventScroll: true });
      }}
    />
  );
});

export const MenuCheckboxItem = forwardRef<HTMLButtonElement, MenuCheckboxItemProps>(
  function MenuCheckboxItem(
    {
      checked: controlled,
      defaultChecked = false,
      onCheckedChange,
      onSelect,
      closeOnSelect = false,
      ...props
    },
    ref,
  ) {
    const [checked, setChecked] = useControllableState<boolean | 'mixed'>(
      controlled,
      defaultChecked,
      onCheckedChange ? (next) => onCheckedChange(next === true) : undefined,
    );

    return (
      <MenuItem
        {...props}
        ref={ref}
        role="menuitemcheckbox"
        aria-checked={checked ?? false}
        data-checked={checked ?? false}
        closeOnSelect={closeOnSelect}
        onSelect={(event) => {
          onSelect?.(event);
          if (!event.defaultPrevented) setChecked(checked !== true);
        }}
      />
    );
  },
);

const RadioContext = createContext<{
  value: string | undefined;
  setValue: (value: string) => void;
} | null>(null);

export const MenuGroup = forwardRef<HTMLDivElement, MenuGroupProps>(function MenuGroup(props, ref) {
  return <div {...props} ref={ref} role="group" />;
});

export const MenuRadioGroup = forwardRef<HTMLDivElement, MenuRadioGroupProps>(
  function MenuRadioGroup({ value: controlled, defaultValue, onValueChange, ...props }, ref) {
    const [value, setValue] = useControllableState(controlled, defaultValue, onValueChange);

    return (
      <RadioContext.Provider value={{ value, setValue }}>
        <MenuGroup {...props} ref={ref} />
      </RadioContext.Provider>
    );
  },
);
export const MenuRadioItem = forwardRef<HTMLButtonElement, MenuRadioItemProps>(
  function MenuRadioItem({ value, onSelect, closeOnSelect = false, ...props }, ref) {
    const context = useContext(RadioContext);
    if (!context) throw new Error('RadioItem must be used inside RadioGroup.');

    const checked = context.value === value;

    return (
      <MenuItem
        {...props}
        ref={ref}
        role="menuitemradio"
        aria-checked={checked}
        data-checked={checked}
        closeOnSelect={closeOnSelect}
        onSelect={(event) => {
          onSelect?.(event);
          if (!event.defaultPrevented) context.setValue(value);
        }}
      />
    );
  },
);
export const MenuSeparator = forwardRef<HTMLDivElement, MenuGroupProps>(
  function MenuSeparator(props, ref) {
    return <div {...props} ref={ref} role="separator" aria-orientation="horizontal" />;
  },
);
