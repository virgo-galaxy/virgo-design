import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { useControllableState } from '../../internal/hooks/useControllableState';
import { composeRefs } from '../../internal/utils/composeRefs';
import type {
  TreeGroupProps,
  TreeItemProps,
  TreeLabelProps,
  TreeProps,
  TreeToggleProps,
} from './Tree.types';
const emptyValues: readonly string[] = [];
type Context = {
  expanded: readonly string[];
  selected: readonly string[];
  disabled: boolean;
  mode: NonNullable<TreeProps['selectionMode']>;
  toggle: (value: string) => void;
  select: (value: string) => void;
};
const TreeContext = createContext<Context | null>(null);
const ItemContext = createContext<{
  value: string;
  expanded: boolean;
  disabled: boolean;
  labelId: string;
  setLabelId: (id: string) => void;
  branch: boolean;
} | null>(null);
function useTree() {
  const context = useContext(TreeContext);
  if (!context) throw new Error('Tree parts require Tree.');
  return context;
}
function useItem() {
  const context = useContext(ItemContext);
  if (!context) throw new Error('Tree item parts require Tree.Item.');
  return context;
}
function visibleItems(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>('[role="treeitem"]')).filter(
    (node) =>
      node.closest('[role="tree"]') === root &&
      !node.closest('[hidden], [inert]') &&
      node.getAttribute('aria-disabled') !== 'true',
  );
}
export const Tree = forwardRef<HTMLDivElement, TreeProps>(function Tree(
  {
    expandedValues,
    defaultExpandedValues = emptyValues,
    onExpandedValuesChange,
    selectedValues,
    defaultSelectedValues = emptyValues,
    onSelectedValuesChange,
    selectionMode = 'single',
    disabled = false,
    onKeyDown,
    onFocus,
    children,
    ...props
  },
  ref,
) {
  const [expanded = emptyValues, setExpanded] = useControllableState(
    expandedValues,
    defaultExpandedValues,
    onExpandedValuesChange,
  );
  const [selection = emptyValues, setSelected] = useControllableState(
    selectedValues,
    defaultSelectedValues,
    onSelectedValuesChange,
  );
  const selected =
    selectionMode === 'none'
      ? emptyValues
      : selectionMode === 'single'
        ? selection.slice(0, 1)
        : selection;
  const rootRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const query = useRef('');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const toggle = (value: string) =>
    setExpanded(
      expanded.includes(value) ? expanded.filter((x) => x !== value) : [...expanded, value],
    );
  const select = (value: string) => {
    if (disabled || selectionMode === 'none') return;
    const next =
      selectionMode === 'single'
        ? [value]
        : selected.includes(value)
          ? selected.filter((x) => x !== value)
          : [...selected, value];
    if (next.join('\0') !== selected.join('\0')) setSelected(next);
  };
  useEffect(() => () => clearTimeout(timer.current), []);
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sync = () => {
      const items = disabled ? [] : visibleItems(root);
      let target = lastFocused.current;
      const restore = Boolean(target && target.ownerDocument.activeElement === target);
      while (target && !items.includes(target))
        target = target.parentElement?.closest<HTMLElement>('[role="treeitem"]') ?? null;
      target ??=
        items.find((node) => node.getAttribute('aria-selected') === 'true') ?? items[0] ?? null;
      root.querySelectorAll<HTMLElement>('[role="treeitem"]').forEach((node) => {
        node.tabIndex = node === target ? 0 : -1;
      });
      root.tabIndex = !disabled && items.length === 0 ? 0 : -1;
      if (restore && target !== lastFocused.current) target?.focus();
      lastFocused.current = target;
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['hidden', 'aria-disabled'],
    });
    return () => observer.disconnect();
  }, [disabled, expanded]);
  return (
    <TreeContext.Provider
      value={{ expanded, selected, disabled, mode: selectionMode, toggle, select }}
    >
      <div
        {...props}
        ref={composeRefs(ref, rootRef)}
        role="tree"
        aria-disabled={disabled || undefined}
        aria-multiselectable={selectionMode === 'multiple' || undefined}
        onFocus={(event) => {
          onFocus?.(event);
          const root = rootRef.current;
          const item = (event.target as HTMLElement).closest<HTMLElement>('[role="treeitem"]');
          if (root && item && item.closest('[role="tree"]') === root) {
            lastFocused.current = item;
            root.querySelectorAll<HTMLElement>('[role="treeitem"]').forEach((node) => {
              node.tabIndex = node === item ? 0 : -1;
            });
          }
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (
            event.defaultPrevented ||
            disabled ||
            event.nativeEvent.isComposing ||
            event.altKey ||
            event.metaKey ||
            event.ctrlKey
          )
            return;
          const root = rootRef.current;
          if (!root || (event.target as HTMLElement).closest('[role="tree"]') !== root) return;
          const items = visibleItems(root);
          const item = (event.target as HTMLElement).closest<HTMLElement>('[role="treeitem"]');
          if (!item) return;
          const index = items.indexOf(item);
          if (index < 0) return;
          const value = item.dataset.treeValue!;
          const rtl = getComputedStyle(root).direction === 'rtl';
          const openKey = rtl ? 'ArrowLeft' : 'ArrowRight';
          const closeKey = rtl ? 'ArrowRight' : 'ArrowLeft';
          let target: HTMLElement | undefined;
          if (event.key === 'ArrowDown') target = items[Math.min(index + 1, items.length - 1)];
          else if (event.key === 'ArrowUp') target = items[Math.max(index - 1, 0)];
          else if (event.key === 'Home') target = items[0];
          else if (event.key === 'End') target = items.at(-1);
          else if (event.key === openKey) {
            if (item.getAttribute('aria-expanded') === 'false') toggle(value);
            else if (item.getAttribute('aria-expanded') === 'true')
              target =
                items[index + 1]?.parentElement?.closest('[role="treeitem"]') === item
                  ? items[index + 1]
                  : undefined;
          } else if (event.key === closeKey) {
            if (item.getAttribute('aria-expanded') === 'true') toggle(value);
            else
              target = item.parentElement?.closest<HTMLElement>('[role="treeitem"]') ?? undefined;
          } else if (event.key === 'Enter' || event.key === ' ') select(value);
          else if (event.key.length === 1 && !event.nativeEvent.isComposing) {
            clearTimeout(timer.current);
            query.current += event.key.toLocaleLowerCase();
            timer.current = setTimeout(() => {
              query.current = '';
            }, 500);
            const search = [...items.slice(index + 1), ...items.slice(0, index + 1)];
            target = search.find((node) =>
              (node.dataset.textValue ?? node.querySelector('[data-tree-label]')?.textContent ?? '')
                .trim()
                .toLocaleLowerCase()
                .startsWith(query.current),
            );
            if (!target) return;
          } else return;
          event.preventDefault();
          target?.focus({ preventScroll: true });
        }}
      >
        {children}
      </div>
    </TreeContext.Provider>
  );
});
export const TreeItem = forwardRef<HTMLDivElement, TreeItemProps>(function TreeItem(
  { value, branch = false, disabled = false, textValue, children, onClick, ...props },
  ref,
) {
  const tree = useTree();
  const generatedLabelId = useId();
  const [labelId, setLabelId] = useState(generatedLabelId);
  const parent = useContext(ItemContext);
  const expanded = branch && tree.expanded.includes(value);
  const isDisabled = disabled || tree.disabled || Boolean(parent?.disabled);
  return (
    <ItemContext.Provider
      value={{ value, expanded, disabled: isDisabled, labelId, setLabelId, branch }}
    >
      <div
        {...props}
        ref={ref}
        role="treeitem"
        tabIndex={-1}
        aria-labelledby={props['aria-labelledby'] ?? (props['aria-label'] ? undefined : labelId)}
        aria-expanded={branch ? expanded : undefined}
        aria-selected={
          tree.mode !== 'none' && !isDisabled ? tree.selected.includes(value) : undefined
        }
        aria-disabled={isDisabled || undefined}
        data-tree-value={value}
        data-text-value={textValue}
        onClick={(event) => {
          onClick?.(event);
          if (
            !event.defaultPrevented &&
            !isDisabled &&
            (event.target as HTMLElement).closest('[role="treeitem"]') === event.currentTarget
          ) {
            event.currentTarget.focus();
            tree.select(value);
          }
        }}
      >
        {children}
      </div>
    </ItemContext.Provider>
  );
});
export const TreeLabel = forwardRef<HTMLDivElement, TreeLabelProps>(function TreeLabel(
  { id, ...props },
  ref,
) {
  const item = useItem();
  const setLabelId = item.setLabelId;
  useLayoutEffect(() => {
    if (id) setLabelId(id);
  }, [id, setLabelId]);
  return <div {...props} ref={ref} id={id ?? item.labelId} data-tree-label="" />;
});
export const TreeGroup = forwardRef<HTMLDivElement, TreeGroupProps>(function TreeGroup(props, ref) {
  const item = useItem();
  return <div {...props} ref={ref} role="group" hidden={!item.expanded} />;
});
export const TreeToggle = forwardRef<HTMLButtonElement, TreeToggleProps>(function TreeToggle(
  { onClick, ...props },
  ref,
) {
  const item = useItem();
  const tree = useTree();
  return (
    <button
      type="button"
      aria-labelledby={item.labelId}
      {...props}
      ref={ref}
      tabIndex={-1}
      disabled={item.disabled || !item.branch}
      aria-expanded={item.expanded}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !item.disabled && item.branch) {
          event.preventDefault();
          tree.toggle(item.value);
          event.currentTarget.closest<HTMLElement>('[role="treeitem"]')?.focus();
        }
      }}
    />
  );
});
