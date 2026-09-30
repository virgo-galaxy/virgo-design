import { ChevronDownIcon, ChevronRightIcon } from '@virgo-design/icons';
import {
  NavigationMenu as PrimitiveNavigationMenu,
  Popover as PrimitivePopover,
} from '@virgo-design/primitives';
import {
  createContext,
  forwardRef,
  type ReactNode,
  type Ref,
  type SyntheticEvent,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Separator as BaseSeparator } from '../Separator';
import styles from './NavigationMenu.module.scss';
import type {
  NavigationMenuContentProps,
  NavigationMenuGroupLabelProps,
  NavigationMenuGroupProps,
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
  NavigationMenuListProps,
  NavigationMenuOrientation,
  NavigationMenuProps,
  NavigationMenuSeparatorProps,
  NavigationMenuSubmenu,
  NavigationMenuTriggerProps,
} from './NavigationMenu.types';

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

function composeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    }
  };
}

function composeHandlers<Event extends SyntheticEvent>(
  first?: (event: Event) => void,
  second?: (event: Event) => void,
) {
  return (event: Event) => {
    first?.(event);
    if (!event.defaultPrevented) second?.(event);
  };
}

type NavigationMenuVisualContextValue = {
  orientation: NavigationMenuOrientation;
  submenu: NavigationMenuSubmenu;
};

type NavigationMenuItemVisualContextValue = {
  expanded: boolean;
  icon: ReactNode;
  popover: boolean;
  triggerIdRef: React.MutableRefObject<string | undefined>;
};

const NavigationMenuVisualContext = createContext<NavigationMenuVisualContextValue>({
  orientation: 'horizontal',
  submenu: 'inline',
});
const NavigationMenuItemVisualContext = createContext<NavigationMenuItemVisualContextValue | null>(
  null,
);
const NavigationMenuDepthContext = createContext(0);
const NavigationMenuPopoverCloseContext = createContext<(() => void) | null>(null);
const NavigationMenuPopoverGroupContext = createContext<{
  activate: (id: string, close: () => void) => void;
  release: (id: string) => void;
  close: () => void;
} | null>(null);

// Each list owns one popup path; descendants get a separate group for their siblings.
function NavigationMenuPopoverGroup({ children }: { children?: ReactNode }) {
  const active = useRef<{ id: string; close: () => void } | null>(null);
  const group = useMemo(
    () => ({
      activate(id: string, close: () => void) {
        const previous = active.current;
        active.current = { id, close };
        if (previous && previous.id !== id) previous.close();
      },
      release(id: string) {
        if (active.current?.id === id) active.current = null;
      },
      close() {
        const previous = active.current;
        active.current = null;
        previous?.close();
      },
    }),
    [],
  );
  return (
    <NavigationMenuPopoverGroupContext.Provider value={group}>
      {children}
    </NavigationMenuPopoverGroupContext.Provider>
  );
}

function useNavigationMenuItemVisualContext() {
  const context = useContext(NavigationMenuItemVisualContext);
  if (context === null) {
    throw new Error('NavigationMenu UI parts must be used inside NavigationMenu.Item.');
  }
  return context;
}

const Root = forwardRef<HTMLElement, NavigationMenuProps>(function NavigationMenuRoot(
  { orientation = 'horizontal', submenu = 'inline', variant = 'default', className, ...props },
  forwardedRef,
) {
  return (
    <NavigationMenuVisualContext.Provider value={{ orientation, submenu }}>
      <NavigationMenuDepthContext.Provider value={0}>
        <PrimitiveNavigationMenu.Root
          {...props}
          ref={forwardedRef}
          className={classes(styles.root, className)}
          data-submenu={submenu}
          data-variant={variant}
          orientation={orientation}
        />
      </NavigationMenuDepthContext.Provider>
    </NavigationMenuVisualContext.Provider>
  );
});

Root.displayName = 'NavigationMenu';

const List = forwardRef<HTMLUListElement, NavigationMenuListProps>(function NavigationMenuList(
  { className, children, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveNavigationMenu.List
      {...props}
      ref={forwardedRef}
      className={classes(styles.list, className)}
    >
      <NavigationMenuPopoverGroup>{children}</NavigationMenuPopoverGroup>
    </PrimitiveNavigationMenu.List>
  );
});

List.displayName = 'NavigationMenu.List';

const Group = forwardRef<HTMLDivElement, NavigationMenuGroupProps>(function NavigationMenuGroup(
  { className, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveNavigationMenu.Group
      {...props}
      ref={forwardedRef}
      className={classes(styles.group, className)}
    />
  );
});

Group.displayName = 'NavigationMenu.Group';

const GroupLabel = forwardRef<HTMLDivElement, NavigationMenuGroupLabelProps>(
  function NavigationMenuGroupLabel({ className, ...props }, forwardedRef) {
    return (
      <PrimitiveNavigationMenu.GroupLabel
        {...props}
        ref={forwardedRef}
        className={classes(styles.groupLabel, className)}
      />
    );
  },
);

GroupLabel.displayName = 'NavigationMenu.GroupLabel';

const Item = forwardRef<HTMLLIElement, NavigationMenuItemProps>(function NavigationMenuItem(
  {
    icon,
    expanded: controlledExpanded,
    defaultExpanded = false,
    onExpandedChange,
    disabled = false,
    className,
    children,
    ...props
  },
  forwardedRef,
) {
  const { submenu } = useContext(NavigationMenuVisualContext);
  const parentPopoverClose = useContext(NavigationMenuPopoverCloseContext);
  const group = useContext(NavigationMenuPopoverGroupContext);
  const itemId = useId();
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded);
  const currentExpanded = controlledExpanded ?? uncontrolledExpanded;
  const expanded = !disabled && currentExpanded;
  const popover = submenu === 'popover';
  const triggerIdRef = useRef<string | undefined>(undefined);
  const setExpanded = useCallback(
    (nextExpanded: boolean) => {
      const next = !disabled && nextExpanded;
      if (controlledExpanded === undefined) setUncontrolledExpanded(next);
      if (!Object.is(next, expanded)) onExpandedChange?.(next);
    },
    [controlledExpanded, disabled, expanded, onExpandedChange],
  );
  const closeRef = useRef<() => void>(() => {});
  useLayoutEffect(() => {
    closeRef.current = () => setExpanded(false);
  }, [setExpanded]);
  useLayoutEffect(() => {
    if (!popover || !expanded || !group) return;
    group.activate(itemId, () => closeRef.current());
    return () => group.release(itemId);
  }, [expanded, group, itemId, popover]);
  const itemContext = { expanded, icon, popover, triggerIdRef };
  const content = (
    <NavigationMenuItemVisualContext.Provider value={itemContext}>
      <NavigationMenuPopoverCloseContext.Provider
        value={
          popover
            ? () => {
                setExpanded(false);
                parentPopoverClose?.();
              }
            : parentPopoverClose
        }
      >
        {popover ? (
          <PrimitivePopover
            className={styles.popoverRoot}
            data-navigation-menu-popover=""
            disabled={disabled}
            open={expanded}
            restoreFocusOnClose={false}
            trigger="hover"
            onOpenChange={setExpanded}
          >
            {children}
          </PrimitivePopover>
        ) : (
          children
        )}
      </NavigationMenuPopoverCloseContext.Provider>
    </NavigationMenuItemVisualContext.Provider>
  );

  return (
    <PrimitiveNavigationMenu.Item
      {...props}
      ref={forwardedRef}
      className={classes(styles.item, className)}
      disabled={disabled}
      expanded={expanded}
      onExpandedChange={setExpanded}
    >
      {content}
    </PrimitiveNavigationMenu.Item>
  );
});

Item.displayName = 'NavigationMenu.Item';

const Link = forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(function NavigationMenuLink(
  { render, className, children, onClick, onPointerEnter, onFocus, ...props },
  forwardedRef,
) {
  const { icon, popover } = useNavigationMenuItemVisualContext();
  const group = useContext(NavigationMenuPopoverGroupContext);
  const closePopover = useContext(NavigationMenuPopoverCloseContext);
  const handleClick: NavigationMenuLinkProps['onClick'] = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented) closePopover?.();
  };
  const handlePointerEnter: NavigationMenuLinkProps['onPointerEnter'] = (event) => {
    onPointerEnter?.(event);
    if (!event.defaultPrevented && event.pointerType !== 'touch' && popover) group?.close();
  };
  const handleFocus: NavigationMenuLinkProps['onFocus'] = (event) => {
    onFocus?.(event);
    if (!event.defaultPrevented && popover) group?.close();
  };

  return (
    <PrimitiveNavigationMenu.Link
      {...props}
      ref={forwardedRef}
      className={classes(styles.control, styles.link, className)}
      {...(render ? { render } : {})}
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      onFocus={handleFocus}
    >
      {icon !== undefined && icon !== null ? (
        <span className={styles.icon} data-slot="icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className={styles.label} data-slot="label">
        {children}
      </span>
    </PrimitiveNavigationMenu.Link>
  );
});

Link.displayName = 'NavigationMenu.Link';

const Separator = forwardRef<HTMLLIElement, NavigationMenuSeparatorProps>(
  function NavigationMenuSeparator({ className, ...props }, forwardedRef) {
    const { orientation } = useContext(NavigationMenuVisualContext);
    const separatorOrientation = orientation === 'horizontal' ? 'vertical' : 'horizontal';

    return (
      <li
        {...props}
        ref={forwardedRef}
        className={classes(styles.separator, className)}
        data-orientation={separatorOrientation}
        data-slot="separator"
        role="presentation"
        aria-hidden="true"
      >
        <BaseSeparator decorative orientation={separatorOrientation} />
      </li>
    );
  },
);

Separator.displayName = 'NavigationMenu.Separator';

const Trigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  function NavigationMenuTrigger(
    { render, className, children, indicator = true, ...props },
    forwardedRef,
  ) {
    const item = useNavigationMenuItemVisualContext();
    const { orientation } = useContext(NavigationMenuVisualContext);
    const depth = useContext(NavigationMenuDepthContext);
    const opensSideways = item.popover && (orientation === 'vertical' || depth > 0);
    const visualChildren = (
      <>
        {item.icon !== undefined && item.icon !== null ? (
          <span className={styles.icon} data-slot="icon" aria-hidden="true">
            {item.icon}
          </span>
        ) : null}
        <span className={styles.label} data-slot="label">
          {children}
        </span>
        {indicator ? (
          <span
            className={classes(styles.indicator, !opensSideways && styles.disclosureIndicator)}
            data-slot="indicator"
            data-direction={opensSideways ? 'right' : item.expanded ? 'up' : 'down'}
            aria-hidden="true"
          >
            {opensSideways ? <ChevronRightIcon /> : <ChevronDownIcon />}
          </span>
        ) : null}
      </>
    );

    if (!item.popover) {
      if (render) {
        return (
          <PrimitiveNavigationMenu.Trigger
            {...props}
            ref={forwardedRef}
            className={className}
            render={render}
          >
            {children}
          </PrimitiveNavigationMenu.Trigger>
        );
      }

      return (
        <PrimitiveNavigationMenu.Trigger
          {...props}
          ref={forwardedRef}
          className={classes(styles.control, styles.trigger, className)}
        >
          {visualChildren}
        </PrimitiveNavigationMenu.Trigger>
      );
    }

    return (
      <PrimitiveNavigationMenu.Trigger
        {...props}
        ref={forwardedRef}
        className={classes(!render && styles.control, !render && styles.trigger, className)}
        render={(navigationProps) => (
          <PrimitivePopover.Trigger
            render={(popoverProps) => {
              item.triggerIdRef.current = navigationProps.id;
              const mergedProps = {
                ...navigationProps,
                ...popoverProps,
                ref: composeRefs(navigationProps.ref, popoverProps.ref),
                id: navigationProps.id,
                type: navigationProps.type,
                className: navigationProps.className,
                children: navigationProps.children,
                disabled: navigationProps.disabled || popoverProps.disabled,
                'aria-controls': popoverProps['aria-controls'],
                'aria-expanded': navigationProps['aria-expanded'],
                onClick: navigationProps.onClick,
                onFocus: composeHandlers(navigationProps.onFocus, popoverProps.onFocus),
                onKeyDown: composeHandlers(navigationProps.onKeyDown, popoverProps.onKeyDown),
                onPointerCancel: composeHandlers(
                  navigationProps.onPointerCancel,
                  popoverProps.onPointerCancel,
                ),
                onPointerDown: composeHandlers(
                  navigationProps.onPointerDown,
                  popoverProps.onPointerDown,
                ),
                onPointerEnter: composeHandlers(
                  navigationProps.onPointerEnter,
                  popoverProps.onPointerEnter,
                ),
                onPointerLeave: composeHandlers(
                  navigationProps.onPointerLeave,
                  popoverProps.onPointerLeave,
                ),
                onPointerUp: composeHandlers(navigationProps.onPointerUp, popoverProps.onPointerUp),
              };

              return render ? render(mergedProps) : <button {...mergedProps} />;
            }}
          />
        )}
      >
        {render ? children : visualChildren}
      </PrimitiveNavigationMenu.Trigger>
    );
  },
);

Trigger.displayName = 'NavigationMenu.Trigger';

const Content = forwardRef<HTMLUListElement, NavigationMenuContentProps>(
  function NavigationMenuContent({ className, children, ...props }, forwardedRef) {
    const { orientation } = useContext(NavigationMenuVisualContext);
    const depth = useContext(NavigationMenuDepthContext);
    const item = useNavigationMenuItemVisualContext();
    const content = (
      <PrimitiveNavigationMenu.Content
        {...props}
        ref={forwardedRef}
        className={classes(styles.content, className)}
      >
        <NavigationMenuDepthContext.Provider value={depth + 1}>
          <NavigationMenuPopoverGroup>{children}</NavigationMenuPopoverGroup>
        </NavigationMenuDepthContext.Provider>
      </PrimitiveNavigationMenu.Content>
    );

    if (!item.popover) return content;

    return (
      <PrimitivePopover.Content
        aria-labelledby={item.triggerIdRef.current}
        className={styles.popoverContent}
        data-navigation-menu-popover-content=""
        placement={orientation === 'horizontal' && depth === 0 ? 'bottomStart' : 'rightTop'}
      >
        {content}
      </PrimitivePopover.Content>
    );
  },
);

Content.displayName = 'NavigationMenu.Content';

export const NavigationMenu = Object.assign(Root, {
  Root,
  List,
  Group,
  GroupLabel,
  Item,
  Link,
  Separator,
  Trigger,
  Content,
});
