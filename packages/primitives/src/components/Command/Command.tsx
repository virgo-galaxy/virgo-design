import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { useControllableState } from '../../internal/hooks/useControllableState';
import { composeRefs } from '../../internal/utils/composeRefs';
import type {
  CommandEmptyProps,
  CommandFilter,
  CommandGroupProps,
  CommandInputProps,
  CommandItemProps,
  CommandListProps,
  CommandProps,
  CommandSeparatorProps,
} from './Command.types';

type CommandRecord = {
  id: string;
  value: string;
  keywords: readonly string[];
  disabled: boolean;
  text: string;
  node: HTMLDivElement;
  onSelect?: (value: string) => void;
};

type CommandContextValue = {
  search: string;
  activeValue: string | undefined;
  listId: string;
  revision: number;
  visibleCount: number;
  setSearch: (search: string) => void;
  setActiveValue: (value: string) => void;
  register: (record: CommandRecord) => () => void;
  matches: (value: string, keywords: readonly string[], text: string) => boolean;
  move: (key: 'ArrowDown' | 'ArrowUp' | 'Home' | 'End') => void;
  select: (value: string, onSelect?: (value: string) => void) => void;
  getActiveId: () => string | undefined;
};

const CommandContext = createContext<CommandContextValue | null>(null);
const EMPTY_KEYWORDS: readonly string[] = [];

function useCommand(part: string) {
  const context = useContext(CommandContext);

  if (!context) throw new Error(`${part} must be used inside Command.Root.`);

  return context;
}

function normalize(value: string) {
  return value.trim().toLocaleLowerCase();
}

const defaultFilter: CommandFilter = (value, search, keywords) => {
  const query = normalize(search);

  if (!query) return true;

  return normalize([value, ...keywords].join(' ')).includes(query);
};

function textFromChildren(children: React.ReactNode): string {
  if (typeof children === 'string' || typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(textFromChildren).join(' ');
  if (children && typeof children === 'object' && 'props' in children) {
    return textFromChildren(
      (children as React.ReactElement<{ children?: React.ReactNode }>).props.children,
    );
  }

  return '';
}

export const CommandRoot = forwardRef<HTMLDivElement, CommandProps>(function CommandRoot(
  {
    search: controlledSearch,
    defaultSearch = '',
    onSearchChange,
    value: controlledValue,
    defaultValue,
    onValueChange,
    shouldFilter = true,
    filter = defaultFilter,
    children,
    ...props
  },
  ref,
) {
  const [searchState, setSearch] = useControllableState(
    controlledSearch,
    defaultSearch,
    onSearchChange,
  );
  const [activeValue, setActiveValue] = useControllableState(
    controlledValue,
    defaultValue,
    onValueChange,
  );
  const search = searchState ?? '';
  const records = useRef(new Map<string, CommandRecord>());
  const [revision, setRevision] = useState(0);
  const listId = `${useId()}-list`;

  const matches = useCallback(
    (value: string, keywords: readonly string[], text: string) =>
      !shouldFilter || filter(value, search, [...keywords, text]),
    [filter, search, shouldFilter],
  );
  const orderedVisible = useCallback(
    () =>
      [...records.current.values()]
        .filter((record) => matches(record.value, record.keywords, record.text))
        .sort((left, right) =>
          left.node.compareDocumentPosition(right.node) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
        ),
    [matches],
  );
  const enabledVisible = useCallback(
    () => orderedVisible().filter((record) => !record.disabled),
    [orderedVisible],
  );
  const register = useCallback((record: CommandRecord) => {
    records.current.set(record.id, record);
    setRevision((current) => current + 1);

    return () => {
      records.current.delete(record.id);
      setRevision((current) => current + 1);
    };
  }, []);
  const visibleCount = orderedVisible().length;

  useLayoutEffect(() => {
    const enabled = enabledVisible();
    if (!enabled.length) return;
    if (!enabled.some((record) => record.value === activeValue)) setActiveValue(enabled[0]!.value);
  }, [activeValue, enabledVisible, revision, search, setActiveValue]);

  const move = (key: 'ArrowDown' | 'ArrowUp' | 'Home' | 'End') => {
    const enabled = enabledVisible();

    if (!enabled.length) return;

    const current = enabled.findIndex((record) => record.value === activeValue);
    const next =
      key === 'Home'
        ? 0
        : key === 'End'
          ? enabled.length - 1
          : key === 'ArrowDown'
            ? (current + 1 + enabled.length) % enabled.length
            : (current - 1 + enabled.length) % enabled.length;
    const record = enabled[next];

    if (!record) return;

    setActiveValue(record.value);
    record.node.scrollIntoView?.({ block: 'nearest' });
  };

  const select = (value: string, onSelect?: (value: string) => void) => {
    const record = [...records.current.values()].find((candidate) => candidate.value === value);

    if (!record || record.disabled || !matches(record.value, record.keywords, record.text)) return;

    setActiveValue(value);
    (onSelect ?? record.onSelect)?.(value);
  };

  const getActiveId = () =>
    [...records.current.values()].find(
      (record) =>
        record.value === activeValue &&
        !record.disabled &&
        matches(record.value, record.keywords, record.text),
    )?.id;

  const context: CommandContextValue = {
    search,
    activeValue,
    listId,
    revision,
    visibleCount,
    setSearch,
    setActiveValue,
    register,
    matches,
    move,
    select,
    getActiveId,
  };

  return (
    <CommandContext.Provider value={context}>
      <div {...props} ref={ref} data-command-root="">
        {children}
      </div>
    </CommandContext.Provider>
  );
});

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(function CommandInput(
  { onChange, onKeyDown, ...props },
  ref,
) {
  const context = useCommand('Command.Input');

  return (
    <input
      {...props}
      ref={ref}
      type="text"
      role="combobox"
      aria-autocomplete="list"
      aria-expanded="true"
      aria-controls={context.listId}
      aria-activedescendant={context.getActiveId()}
      autoComplete="off"
      value={context.search}
      onChange={(event) => {
        onChange?.(event);
        if (!event.defaultPrevented) context.setSearch(event.currentTarget.value);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
          event.preventDefault();
          context.move(event.key as 'ArrowDown' | 'ArrowUp' | 'Home' | 'End');
        } else if (event.key === 'Enter' && context.activeValue) {
          event.preventDefault();
          context.select(context.activeValue);
        }
      }}
    />
  );
});

export const CommandList = forwardRef<HTMLDivElement, CommandListProps>(
  function CommandList(props, ref) {
    const context = useCommand('Command.List');

    return <div {...props} ref={ref} id={context.listId} role="listbox" />;
  },
);

export const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>(
  function CommandEmpty(props, ref) {
    const context = useCommand('Command.Empty');

    if (context.visibleCount > 0) return null;

    return <div {...props} ref={ref} role={props.role ?? 'status'} />;
  },
);

export const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(function CommandGroup(
  { heading, children, ...props },
  ref,
) {
  const context = useCommand('Command.Group');
  const headingId = `${useId()}-heading`;
  const localRef = useRef<HTMLDivElement | null>(null);
  const [empty, setEmpty] = useState(false);

  useLayoutEffect(() => {
    setEmpty(!localRef.current?.querySelector('[data-command-item]:not([hidden])'));
  }, [context.search, context.revision]);

  return (
    <div
      {...props}
      ref={composeRefs(ref, localRef)}
      role="group"
      aria-labelledby={heading ? headingId : props['aria-labelledby']}
      hidden={empty || props.hidden}
    >
      {heading ? <div id={headingId}>{heading}</div> : null}
      {children}
    </div>
  );
});

export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(function CommandItem(
  {
    value,
    keywords = EMPTY_KEYWORDS,
    disabled = false,
    textValue,
    onSelect,
    onClick,
    onPointerMove,
    children,
    ...props
  },
  ref,
) {
  const context = useCommand('Command.Item');
  const { register } = context;
  const id = `${useId()}-item`;
  const localRef = useRef<HTMLDivElement | null>(null);
  const text = textValue ?? textFromChildren(children);
  const visible = context.matches(value, keywords, text);

  useLayoutEffect(() => {
    const node = localRef.current;

    if (!node) return;

    return register({
      id,
      value,
      keywords,
      disabled,
      text: textValue ?? node.textContent ?? text,
      node,
      ...(onSelect ? { onSelect } : {}),
    });
  }, [disabled, id, keywords, onSelect, register, text, textValue, value]);

  return (
    <div
      {...props}
      ref={composeRefs(ref, localRef)}
      id={id}
      role="option"
      aria-selected={context.activeValue === value}
      aria-disabled={disabled || undefined}
      data-command-item=""
      data-active={context.activeValue === value || undefined}
      data-disabled={disabled || undefined}
      hidden={!visible}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (!event.defaultPrevented && !disabled) context.setActiveValue(value);
      }}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) context.select(value, onSelect);
      }}
    >
      {children}
    </div>
  );
});

export const CommandSeparator = forwardRef<HTMLDivElement, CommandSeparatorProps>(
  function CommandSeparator(props, ref) {
    return <div {...props} ref={ref} role="separator" aria-orientation="horizontal" />;
  },
);
