import type { RefObject } from 'react';
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

import { useFieldControl, useFieldState } from '../../internal/form/field-context';
import { useControllableState } from '../../internal/hooks/useControllableState';
import { useDismiss } from '../../internal/overlay/dismiss';
import { LayerScope, useLayerRegistration, useOverlayLayer } from '../../internal/overlay/layers';
import { Portal } from '../../internal/overlay/Portal';
import { useFloatingPosition } from '../../internal/overlay/useFloatingPosition';
import { composeRefs } from '../../internal/utils/composeRefs';
import type {
  ComboboxClearProps,
  ComboboxContentProps,
  ComboboxEmptyProps,
  ComboboxGroupProps,
  ComboboxInputProps,
  ComboboxOptionProps,
  ComboboxProps,
} from './Combobox.types';
type Entry = {
  value: string;
  text: string;
  disabled: boolean;
  id: string;
  node: HTMLElement;
  keywords: readonly string[];
};
const noKeywords: readonly string[] = [];
const defaultFilter = (text: string, query: string, keywords: readonly string[]) =>
  [text, ...keywords]
    .join(' ')
    .normalize('NFKC')
    .toLocaleLowerCase()
    .includes(query.normalize('NFKC').trim().toLocaleLowerCase());
type Context = {
  value: string;
  inputValue: string;
  open: boolean;
  disabled: boolean;
  readOnly: boolean;
  contentId: string;
  inputId: string;
  active: Entry | undefined;
  enabled: Entry[];
  count: number;
  inputRef: RefObject<HTMLInputElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  composing: React.MutableRefObject<boolean>;
  register: (entry: Entry) => () => void;
  matches: (text: string, keywords: readonly string[]) => boolean;
  setOpen: (open: boolean) => void;
  setInput: (value: string) => void;
  highlight: (value: string) => void;
  choose: (value: string, text: string) => void;
  clear: () => void;
};
const ComboboxContext = createContext<Context | null>(null);
function useCombobox() {
  const context = useContext(ComboboxContext);
  if (!context) throw new Error('Combobox parts require Combobox.');
  return context;
}
export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(function Combobox(
  {
    value: controlledValue,
    defaultValue = '',
    onValueChange,
    inputValue: controlledInput,
    defaultInputValue = '',
    onInputValueChange,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    disabled: disabledProp,
    readOnly: readOnlyProp,
    name,
    shouldFilter = true,
    filter = defaultFilter,
    children,
    ...props
  },
  ref,
) {
  const field = useFieldState();
  const disabled = disabledProp ?? field.disabled ?? false;
  const readOnly = readOnlyProp ?? field.readOnly ?? false;
  const [value = '', setValue] = useControllableState(controlledValue, defaultValue, onValueChange);
  const [input = '', setInputValue] = useControllableState(
    controlledInput,
    defaultInputValue,
    onInputValueChange,
  );
  const [openState, setOpenState, resetOpen] = useControllableState(
    controlledOpen,
    defaultOpen,
    onOpenChange,
  );
  const [editing, setEditing] = useState(Boolean(defaultInputValue));
  const [highlighted, setHighlighted] = useState<string>();
  const [entries, setEntries] = useState<Entry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const composing = useRef(false);
  const id = useId();
  const open = Boolean(openState) && !disabled && !readOnly;
  const register = useCallback((entry: Entry) => {
    setEntries((old) => [...old.filter((x) => x.id !== entry.id), entry]);
    return () => setEntries((old) => old.filter((x) => x.id !== entry.id));
  }, []);
  const inputValue =
    controlledInput !== undefined
      ? input
      : editing
        ? input
        : (entries.find((entry) => entry.value === value)?.text ?? '');
  const query = controlledInput !== undefined || editing ? inputValue : '';
  const matches = (text: string, keywords: readonly string[]) =>
    !shouldFilter || filter(text, query, keywords);
  const matching = entries
    .filter((entry) => matches(entry.text, entry.keywords))
    .sort((a, b) =>
      a.node.compareDocumentPosition(b.node) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
    );
  const enabled = matching.filter((entry) => !entry.disabled);
  const active = open
    ? (enabled.find((entry) => entry.value === highlighted) ?? enabled[0])
    : undefined;
  const layer = useOverlayLayer(rootRef, contentRef);
  useLayerRegistration(layer, open);
  const isLocked = () =>
    disabled || readOnly || Boolean(inputRef.current?.disabled || inputRef.current?.readOnly);
  const setOpen = (next: boolean) => {
    if (!next || !isLocked()) setOpenState(next);
  };
  useDismiss({ open, layer, escape: false, onDismiss: () => setOpen(false) });
  useLayoutEffect(() => {
    if (disabled || readOnly) resetOpen(false);
  }, [disabled, readOnly, resetOpen]);
  useLayoutEffect(() => {
    active?.node.scrollIntoView?.({ block: 'nearest' });
  }, [active?.node]);
  const choose = (next: string, text: string) => {
    if (isLocked()) return;
    setValue(next);
    setInputValue(text);
    setEditing(false);
    setOpen(false);
    setHighlighted(undefined);
    inputRef.current?.focus({ preventScroll: true });
  };
  const clear = () => {
    if (isLocked()) return;
    setValue('');
    setInputValue('');
    setEditing(false);
    setHighlighted(undefined);
    inputRef.current?.focus({ preventScroll: true });
  };
  return (
    <ComboboxContext.Provider
      value={{
        value,
        inputValue,
        open,
        disabled,
        readOnly,
        contentId: `${id}-listbox`,
        inputId: `${id}-input`,
        inputRef,
        contentRef,
        composing,
        register,
        matches,
        enabled,
        active,
        count: matching.length,
        setOpen,
        setInput: (next) => {
          setInputValue(next);
          setEditing(true);
          setHighlighted(undefined);
          setOpen(true);
        },
        highlight: setHighlighted,
        choose,
        clear,
      }}
    >
      <LayerScope.Provider value={layer}>
        <div
          {...props}
          ref={composeRefs(ref, rootRef)}
          data-state={open ? 'open' : 'closed'}
          data-disabled={disabled || undefined}
          data-readonly={readOnly || undefined}
        >
          {name ? <input type="hidden" name={name} value={value} disabled={disabled} /> : null}
          {children}
        </div>
      </LayerScope.Provider>
    </ComboboxContext.Provider>
  );
});
export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(
  function ComboboxInput(
    { onChange, onClick, onKeyDown, onFocus, onCompositionStart, onCompositionEnd, ...props },
    ref,
  ) {
    const context = useCombobox();
    const field = useFieldControl(props);
    const inputId = field.id ?? context.inputId;
    return (
      <input
        {...field}
        ref={composeRefs(ref, context.inputRef)}
        id={inputId}
        role="combobox"
        autoComplete="off"
        value={context.inputValue}
        disabled={context.disabled || field.disabled}
        readOnly={context.readOnly || field.readOnly}
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-expanded={context.open}
        aria-controls={context.open ? context.contentId : undefined}
        aria-activedescendant={context.active?.id}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) context.setOpen(true);
        }}
        onFocus={(event) => {
          onFocus?.(event);
          if (!event.defaultPrevented) context.setOpen(true);
        }}
        onCompositionStart={(event) => {
          context.composing.current = true;
          onCompositionStart?.(event);
        }}
        onCompositionEnd={(event) => {
          context.composing.current = false;
          onCompositionEnd?.(event);
        }}
        onChange={(event) => {
          onChange?.(event);
          if (!event.defaultPrevented && !event.currentTarget.readOnly)
            context.setInput(event.currentTarget.value);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (
            event.defaultPrevented ||
            context.disabled ||
            context.readOnly ||
            event.currentTarget.disabled ||
            event.currentTarget.readOnly ||
            context.composing.current ||
            event.nativeEvent.isComposing ||
            event.nativeEvent.keyCode === 229
          )
            return;
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            context.setOpen(true);
            const index = context.enabled.findIndex((x) => x.value === context.active?.value);
            const next = !context.open
              ? event.key === 'ArrowDown'
                ? 0
                : context.enabled.length - 1
              : event.key === 'ArrowDown'
                ? Math.min(index + 1, context.enabled.length - 1)
                : Math.max(index - 1, 0);
            const target = context.enabled[next];
            if (target) context.highlight(target.value);
          } else if (event.key === 'Enter' && context.open && context.active) {
            event.preventDefault();
            context.choose(context.active.value, context.active.text);
          } else if (event.key === 'Escape' && context.open) {
            event.preventDefault();
            event.stopPropagation();
            context.setOpen(false);
          } else if (event.key === 'Tab') context.setOpen(false);
          // Home/End and horizontal arrows retain native text-editing behavior.
        }}
      />
    );
  },
);
export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(
  function ComboboxContent(
    { portal = true, placement = 'bottomStart', offset = 4, style, children, ...props },
    ref,
  ) {
    const context = useCombobox();
    const position = useFloatingPosition({
      active: context.open,
      triggerRef: context.inputRef,
      contentRef: context.contentRef,
      placement,
      offset,
    });
    const content = (
      <div
        {...props}
        ref={composeRefs(ref, context.contentRef)}
        id={context.contentId}
        role="listbox"
        aria-labelledby={context.inputRef.current?.id ?? context.inputId}
        hidden={!context.open}
        data-theme={position.theme}
        data-virgo-theme={position.themeStyle}
        dir={position.direction}
        data-placement={position.placement}
        style={{ ...position.style, ...style }}
      >
        {children}
      </div>
    );
    return portal ? <Portal>{content}</Portal> : content;
  },
);
export const ComboboxOption = forwardRef<HTMLDivElement, ComboboxOptionProps>(
  function ComboboxOption(
    {
      value,
      id: customId,
      textValue,
      keywords = noKeywords,
      disabled = false,
      onClick,
      onPointerDown,
      onPointerMove,
      ...props
    },
    ref,
  ) {
    const context = useCombobox();
    const generatedId = useId();
    const id = customId ?? generatedId;
    const nodeRef = useRef<HTMLDivElement>(null);
    const register = context.register;
    const entry = useMemo(
      () => ({ value, text: textValue, keywords, disabled, id }),
      [value, textValue, keywords, disabled, id],
    );
    useLayoutEffect(() => {
      const node = nodeRef.current;
      if (node) return register({ ...entry, node });
    }, [entry, register]);
    return (
      <div
        {...props}
        ref={composeRefs(ref, nodeRef)}
        id={id}
        role="option"
        aria-selected={context.value === value}
        aria-disabled={disabled || undefined}
        hidden={!context.matches(textValue, keywords)}
        data-highlighted={context.active?.value === value || undefined}
        onPointerDown={(event) => {
          onPointerDown?.(event);
          if (!event.defaultPrevented) event.preventDefault();
        }}
        onPointerMove={(event) => {
          onPointerMove?.(event);
          if (!event.defaultPrevented && !disabled) context.highlight(value);
        }}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented && !disabled) context.choose(value, textValue);
        }}
      />
    );
  },
);
export const ComboboxEmpty = forwardRef<HTMLDivElement, ComboboxEmptyProps>(
  function ComboboxEmpty(props, ref) {
    const context = useCombobox();
    return <div role="status" {...props} ref={ref} hidden={context.count !== 0} />;
  },
);
export const ComboboxGroup = forwardRef<HTMLDivElement, ComboboxGroupProps>(function ComboboxGroup(
  { label, children, ...props },
  ref,
) {
  const id = useId();
  const context = useCombobox();
  const groupRef = useRef<HTMLDivElement>(null);
  const [hasResults, setHasResults] = useState(true);
  useLayoutEffect(() => {
    setHasResults(Boolean(groupRef.current?.querySelector('[role="option"]:not([hidden])')));
  }, [context.count, context.inputValue, context.open, context.enabled, children]);
  return (
    <div
      {...props}
      role="group"
      aria-labelledby={id}
      ref={composeRefs(ref, groupRef)}
      hidden={!hasResults || !context.open}
    >
      <div id={id}>{label}</div>
      {children}
    </div>
  );
});
export const ComboboxClear = forwardRef<HTMLButtonElement, ComboboxClearProps>(
  function ComboboxClear({ onClick, onPointerDown, ...props }, ref) {
    const context = useCombobox();
    return (
      <button
        type="button"
        {...props}
        ref={ref}
        disabled={context.disabled || context.readOnly || props.disabled}
        onPointerDown={(event) => {
          onPointerDown?.(event);
          if (!event.defaultPrevented) event.preventDefault();
        }}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) context.clear();
        }}
      />
    );
  },
);
