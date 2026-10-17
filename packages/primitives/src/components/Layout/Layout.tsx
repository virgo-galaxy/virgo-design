import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
} from 'react';

import { useControllableState } from '../../internal/hooks/useControllableState';
import { composeRefs } from '../../internal/utils/composeRefs';
import type {
  LayoutContentProps,
  LayoutFooterProps,
  LayoutHeaderProps,
  LayoutLaneProps,
  LayoutProps,
  LayoutSidebarDisplayState,
  LayoutSidebarProps,
  LayoutSidebarProviderProps,
  LayoutSidebarState,
  LayoutSidebarTriggerProps,
} from './Layout.types';

export const Layout = forwardRef<HTMLDivElement, LayoutProps>(function Layout(
  { direction = 'vertical', ...props },
  forwardedRef,
) {
  return <div {...props} ref={forwardedRef} data-direction={direction} />;
});

Layout.displayName = 'Layout';

export const LayoutHeader = forwardRef<HTMLElement, LayoutHeaderProps>(
  function LayoutHeader(props, forwardedRef) {
    return <header {...props} ref={forwardedRef} />;
  },
);

LayoutHeader.displayName = 'Layout.Header';

export const LayoutLane = forwardRef<HTMLDivElement, LayoutLaneProps>(function LayoutLane(
  { direction = 'vertical', ...props },
  forwardedRef,
) {
  return <div {...props} ref={forwardedRef} data-vd-layout-lane="" data-direction={direction} />;
});

LayoutLane.displayName = 'Layout.Lane';

type SidebarContextValue = LayoutSidebarState & {
  id: string;
  triggers: React.RefObject<Set<HTMLButtonElement>>;
  focusedInside: React.RefObject<boolean>;
};
const SidebarContext = createContext<SidebarContextValue | null>(null);

function useSidebarController({
  id,
  state: controlledState,
  defaultState,
  onStateChange,
}: {
  [Key in keyof LayoutSidebarProps]?: LayoutSidebarProps[Key] | undefined;
}): SidebarContextValue {
  const generatedId = useId();
  const triggers = useRef(new Set<HTMLButtonElement>());
  const focusedInside = useRef(false);
  const [value = 'expanded', setState] = useControllableState<LayoutSidebarDisplayState>(
    controlledState,
    defaultState ?? 'expanded',
    onStateChange,
  );
  const sidebarId = id ?? `vd-sidebar-${generatedId}`;

  useLayoutEffect(() => {
    if (value !== 'hidden') return;
    const sidebar = document.getElementById(sidebarId);
    if (
      !sidebar ||
      (!sidebar.contains(document.activeElement) &&
        !(focusedInside.current && document.activeElement === document.body))
    )
      return;
    const external = [...triggers.current].find(
      (button) => button.isConnected && !button.disabled && !sidebar.contains(button),
    );
    external?.focus();
    focusedInside.current = false;
  }, [value, sidebarId]);

  return {
    id: sidebarId,
    state: value,
    setState,
    collapsed: value !== 'expanded',
    triggers,
    focusedInside,
  };
}

export function LayoutSidebarProvider(props: LayoutSidebarProviderProps) {
  const context = useSidebarController(props);

  return <SidebarContext.Provider value={context}>{props.children}</SidebarContext.Provider>;
}

LayoutSidebarProvider.displayName = 'Layout.SidebarProvider';

export const LayoutSidebar = forwardRef<HTMLElement, LayoutSidebarProps>(function LayoutSidebar(
  { id, state: controlledState, defaultState, onStateChange, children, ...props },
  ref,
) {
  const provider = useContext(SidebarContext);
  const local = useSidebarController({
    id,
    state: controlledState,
    defaultState,
    onStateChange,
  });
  const state = provider ?? local;

  return (
    <SidebarContext.Provider value={state}>
      <aside
        {...props}
        ref={ref}
        id={state.id}
        data-state={state.state}
        aria-hidden={state.state === 'hidden' || props['aria-hidden'] || undefined}
        inert={state.state === 'hidden' || props.inert || undefined}
        onFocusCapture={(event) => {
          props.onFocusCapture?.(event);
          state.focusedInside.current = true;
        }}
        onBlurCapture={(event) => {
          props.onBlurCapture?.(event);
          if (
            event.relatedTarget instanceof Node &&
            !event.currentTarget.contains(event.relatedTarget)
          )
            state.focusedInside.current = false;
        }}
      >
        {typeof children === 'function' ? children(state) : children}
      </aside>
    </SidebarContext.Provider>
  );
});

LayoutSidebar.displayName = 'Layout.Sidebar';

export const LayoutSidebarTrigger = forwardRef<HTMLButtonElement, LayoutSidebarTriggerProps>(
  function LayoutSidebarTrigger({ action = 'toggle', render, onClick, disabled, ...props }, ref) {
    const context = useContext(SidebarContext);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const registeredTriggers = context?.triggers;

    useLayoutEffect(() => {
      const button = triggerRef.current;
      if (!button || !registeredTriggers || action === 'hide' || action === 'collapse') return;
      const triggers = registeredTriggers.current;
      triggers.add(button);

      return () => {
        triggers.delete(button);
      };
    }, [registeredTriggers, action]);

    if (!context)
      throw new Error(
        'Layout.SidebarTrigger must be used inside Layout.Sidebar or Layout.SidebarProvider.',
      );

    const buttonProps = {
      type: 'button' as const,
      'aria-label':
        action === 'hide'
          ? 'Hide sidebar'
          : action === 'expand'
            ? 'Expand sidebar'
            : action === 'collapse'
              ? 'Collapse sidebar'
              : context.collapsed
                ? 'Expand sidebar'
                : 'Collapse sidebar',
      ...props,
      ref: composeRefs(ref, triggerRef),
      disabled,
      'aria-controls': context.id,
      'aria-expanded': !context.collapsed,
      'data-state': context.state,
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (!event.defaultPrevented && !disabled)
          context.setState(
            action === 'toggle'
              ? context.collapsed
                ? 'expanded'
                : 'collapsed'
              : action === 'expand'
                ? 'expanded'
                : action === 'collapse'
                  ? 'collapsed'
                  : 'hidden',
          );
      },
    };

    return render ? render(buttonProps) : <button {...buttonProps} />;
  },
);

LayoutSidebarTrigger.displayName = 'Layout.SidebarTrigger';

export const LayoutContent = forwardRef<HTMLElement, LayoutContentProps>(function LayoutContent(
  { as: Component = 'main', ...props },
  forwardedRef,
) {
  const setRef = useCallback(
    (node: HTMLElement | null) => {
      if (typeof forwardedRef === 'function') return forwardedRef(node);
      if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );

  return <Component {...props} ref={setRef} />;
});

LayoutContent.displayName = 'Layout.Content';

export const LayoutFooter = forwardRef<HTMLElement, LayoutFooterProps>(
  function LayoutFooter(props, forwardedRef) {
    return <footer {...props} ref={forwardedRef} />;
  },
);

LayoutFooter.displayName = 'Layout.Footer';
