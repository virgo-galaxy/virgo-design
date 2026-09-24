import { createContext, forwardRef, useCallback, useContext, useId, useMemo, useRef } from 'react';

import { useControllableState } from '../../internal/hooks/useControllableState';
import { composeRefs } from '../../internal/utils/composeRefs';
import type {
  NavigationMenuContentProps,
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
  NavigationMenuListProps,
  NavigationMenuOrientation,
  NavigationMenuProps,
  NavigationMenuTriggerProps,
} from './NavigationMenu.types';

type NavigationMenuContextValue = {
  orientation: NavigationMenuOrientation;
  value: string;
  setValue: (value: string) => void;
};

type NavigationMenuItemContextValue = {
  value: string;
  active: boolean;
  disabled: boolean;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  triggerId: string;
  contentId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLUListElement | null>;
};

const NavigationMenuContext = createContext<NavigationMenuContextValue | null>(null);
const NavigationMenuItemContext = createContext<NavigationMenuItemContextValue | null>(null);

function useNavigationMenuContext(part: string) {
  const context = useContext(NavigationMenuContext);

  if (context === null) {
    throw new Error(`${part} must be used inside NavigationMenu.Root.`);
  }

  return context;
}

function useNavigationMenuItemContext(part: string) {
  const context = useContext(NavigationMenuItemContext);

  if (context === null) {
    throw new Error(`${part} must be used inside NavigationMenu.Item.`);
  }

  return context;
}

function getScopeControls(control: HTMLElement) {
  const scope = control.closest<HTMLElement>('[data-vd-navigation-menu-scope]');

  if (!scope) {
    return [];
  }

  return Array.from(
    scope.querySelectorAll<HTMLElement>(
      '[data-vd-navigation-menu-control]:not(:disabled):not([aria-disabled="true"])',
    ),
  ).filter((candidate) => candidate.closest('[data-vd-navigation-menu-scope]') === scope);
}

function focusControlAtIndex(controls: HTMLElement[], index: number) {
  if (controls.length === 0) {
    return;
  }

  const normalizedIndex = ((index % controls.length) + controls.length) % controls.length;
  controls[normalizedIndex]?.focus();
}

function handleDirectionalNavigation(event: React.KeyboardEvent<HTMLElement>) {
  const scope = event.currentTarget.closest<HTMLElement>('[data-vd-navigation-menu-scope]');
  const orientation = scope?.dataset.orientation;
  const previousKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
  const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';

  if (![previousKey, nextKey, 'Home', 'End'].includes(event.key)) {
    return false;
  }

  const controls = getScopeControls(event.currentTarget);
  const currentIndex = controls.indexOf(event.currentTarget);
  const nextIndex =
    event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? controls.length - 1
        : event.key === nextKey
          ? currentIndex + 1
          : currentIndex - 1;

  event.preventDefault();
  focusControlAtIndex(controls, nextIndex);
  return true;
}

function focusFirstContentControl(contentRef: React.RefObject<HTMLUListElement | null>) {
  queueMicrotask(() => {
    const content = contentRef.current;
    const firstControl = content?.querySelector<HTMLElement>(
      '[data-vd-navigation-menu-control]:not(:disabled):not([aria-disabled="true"])',
    );
    firstControl?.focus();
  });
}

export const NavigationMenuRoot = forwardRef<HTMLElement, NavigationMenuProps>(
  function NavigationMenuRoot(
    {
      orientation = 'horizontal',
      value: controlledValue,
      defaultValue = '',
      onValueChange,
      children,
      ...props
    },
    forwardedRef,
  ) {
    const [value = '', setValue] = useControllableState(
      controlledValue,
      defaultValue,
      onValueChange,
    );
    const contextValue = useMemo(
      () => ({ orientation, value, setValue }),
      [orientation, setValue, value],
    );

    return (
      <NavigationMenuContext.Provider value={contextValue}>
        <nav {...props} ref={forwardedRef} data-orientation={orientation}>
          {children}
        </nav>
      </NavigationMenuContext.Provider>
    );
  },
);

NavigationMenuRoot.displayName = 'NavigationMenu';

export const NavigationMenuList = forwardRef<HTMLUListElement, NavigationMenuListProps>(
  function NavigationMenuList(props, forwardedRef) {
    const context = useNavigationMenuContext('NavigationMenu.List');

    return (
      <ul
        {...props}
        ref={forwardedRef}
        data-orientation={context.orientation}
        data-slot="list"
        data-vd-navigation-menu-scope=""
      />
    );
  },
);

NavigationMenuList.displayName = 'NavigationMenu.List';

export const NavigationMenuItem = forwardRef<HTMLLIElement, NavigationMenuItemProps>(
  function NavigationMenuItem(
    {
      value,
      disabled = false,
      expanded: controlledExpanded,
      defaultExpanded = false,
      onExpandedChange,
      children,
      ...props
    },
    forwardedRef,
  ) {
    const navigationMenu = useNavigationMenuContext('NavigationMenu.Item');
    const [expandedState, setExpandedState] = useControllableState(
      controlledExpanded,
      defaultExpanded,
      onExpandedChange,
    );
    const expanded = !disabled && Boolean(expandedState);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const contentRef = useRef<HTMLUListElement | null>(null);
    const generatedId = useId();
    const setExpanded = useCallback(
      (nextExpanded: boolean) => {
        if (!disabled || !nextExpanded) {
          setExpandedState(nextExpanded);
        }
      },
      [disabled, setExpandedState],
    );
    const contextValue = useMemo<NavigationMenuItemContextValue>(
      () => ({
        value,
        active: navigationMenu.value === value,
        disabled,
        expanded,
        setExpanded,
        triggerId: `${generatedId}-trigger`,
        contentId: `${generatedId}-content`,
        triggerRef,
        contentRef,
      }),
      [disabled, expanded, generatedId, navigationMenu.value, setExpanded, value],
    );

    return (
      <NavigationMenuItemContext.Provider value={contextValue}>
        <li
          {...props}
          ref={forwardedRef}
          data-active={contextValue.active || undefined}
          data-disabled={disabled || undefined}
          data-slot="item"
          data-state={expanded ? 'open' : 'closed'}
        >
          {children}
        </li>
      </NavigationMenuItemContext.Provider>
    );
  },
);

NavigationMenuItem.displayName = 'NavigationMenu.Item';

export const NavigationMenuLink = forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  function NavigationMenuLink(
    { render, tabIndex, onClick, onKeyDown, 'aria-current': ariaCurrent, ...props },
    forwardedRef,
  ) {
    const navigationMenu = useNavigationMenuContext('NavigationMenu.Link');
    const item = useNavigationMenuItemContext('NavigationMenu.Link');
    const linkProps: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      ref: React.Ref<HTMLAnchorElement>;
      'data-active': true | undefined;
      'data-disabled': true | undefined;
      'data-vd-navigation-menu-control': '';
    } = {
      ...props,
      ref: forwardedRef,
      tabIndex: item.disabled ? -1 : tabIndex,
      'aria-current': ariaCurrent ?? (item.active ? 'page' : undefined),
      'aria-disabled': item.disabled || undefined,
      'data-active': item.active || undefined,
      'data-disabled': item.disabled || undefined,
      'data-vd-navigation-menu-control': '',
      onClick: (event) => {
        if (item.disabled) {
          event.preventDefault();
          return;
        }

        onClick?.(event);
        if (!event.defaultPrevented) {
          navigationMenu.setValue(item.value);
        }
      },
      onKeyDown: (event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented && !item.disabled) {
          handleDirectionalNavigation(event);
        }
      },
    };

    return render ? render(linkProps) : <a {...linkProps} />;
  },
);

NavigationMenuLink.displayName = 'NavigationMenu.Link';

export const NavigationMenuTrigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  function NavigationMenuTrigger(
    { render, disabled: triggerDisabled, onClick, onKeyDown, type = 'button', ...props },
    forwardedRef,
  ) {
    const item = useNavigationMenuItemContext('NavigationMenu.Trigger');
    const disabled = item.disabled || Boolean(triggerDisabled);
    const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      ref: React.Ref<HTMLButtonElement>;
      'data-state': 'open' | 'closed';
      'data-vd-navigation-menu-control': '';
    } = {
      ...props,
      ref: composeRefs(forwardedRef, item.triggerRef),
      id: item.triggerId,
      type,
      disabled,
      'aria-controls': item.contentId,
      'aria-expanded': item.expanded,
      'data-state': item.expanded ? 'open' : 'closed',
      'data-vd-navigation-menu-control': '',
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !disabled) {
          item.setExpanded(!item.expanded);
        }
      },
      onKeyDown: (event) => {
        onKeyDown?.(event);

        if (event.defaultPrevented || disabled) {
          return;
        }

        const scope = event.currentTarget.closest<HTMLElement>('[data-vd-navigation-menu-scope]');
        const openKey = scope?.dataset.orientation === 'horizontal' ? 'ArrowDown' : 'ArrowRight';

        if (event.key === openKey) {
          event.preventDefault();
          item.setExpanded(true);
          focusFirstContentControl(item.contentRef);
        } else if (event.key === 'Escape' && item.expanded) {
          event.preventDefault();
          item.setExpanded(false);
        } else {
          handleDirectionalNavigation(event);
        }
      },
    };

    return render ? render(buttonProps) : <button {...buttonProps} />;
  },
);

NavigationMenuTrigger.displayName = 'NavigationMenu.Trigger';

export const NavigationMenuContent = forwardRef<HTMLUListElement, NavigationMenuContentProps>(
  function NavigationMenuContent({ onKeyDown, ...props }, forwardedRef) {
    const item = useNavigationMenuItemContext('NavigationMenu.Content');

    return (
      <ul
        {...props}
        ref={composeRefs(forwardedRef, item.contentRef)}
        id={item.contentId}
        aria-labelledby={item.triggerId}
        data-orientation="vertical"
        data-slot="content"
        data-state={item.expanded ? 'open' : 'closed'}
        data-vd-navigation-menu-scope=""
        hidden={!item.expanded}
        onKeyDown={(event) => {
          onKeyDown?.(event);

          if (!event.defaultPrevented && (event.key === 'Escape' || event.key === 'ArrowLeft')) {
            event.preventDefault();
            event.stopPropagation();
            item.setExpanded(false);
            item.triggerRef.current?.focus();
          }
        }}
      />
    );
  },
);

NavigationMenuContent.displayName = 'NavigationMenu.Content';
