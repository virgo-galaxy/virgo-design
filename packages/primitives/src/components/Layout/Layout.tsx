import { createContext, forwardRef, useContext, useId } from 'react';

import { useControllableState } from '../../internal/hooks/useControllableState';
import type {
  LayoutContentProps,
  LayoutFooterProps,
  LayoutHeaderProps,
  LayoutProps,
  LayoutSidebarProps,
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

const SidebarContext = createContext<(LayoutSidebarState & { id: string }) | null>(null);

export const LayoutSidebar = forwardRef<HTMLElement, LayoutSidebarProps>(function LayoutSidebar(
  {
    id,
    collapsed: controlledCollapsed,
    defaultCollapsed = false,
    onCollapsedChange,
    children,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const [value, setCollapsed] = useControllableState(
    controlledCollapsed,
    defaultCollapsed,
    onCollapsedChange,
  );
  const state = { collapsed: Boolean(value), setCollapsed, id: id ?? `vd-sidebar-${generatedId}` };
  return (
    <SidebarContext.Provider value={state}>
      <aside
        {...props}
        ref={ref}
        id={state.id}
        data-state={state.collapsed ? 'collapsed' : 'expanded'}
      >
        {typeof children === 'function' ? children(state) : children}
      </aside>
    </SidebarContext.Provider>
  );
});
LayoutSidebar.displayName = 'Layout.Sidebar';

export const LayoutSidebarTrigger = forwardRef<HTMLButtonElement, LayoutSidebarTriggerProps>(
  function LayoutSidebarTrigger({ render, onClick, disabled, ...props }, ref) {
    const context = useContext(SidebarContext);
    if (!context) throw new Error('Layout.SidebarTrigger must be used inside Layout.Sidebar.');
    const buttonProps = {
      type: 'button' as const,
      'aria-label': context.collapsed ? 'Expand sidebar' : 'Collapse sidebar',
      ...props,
      ref,
      disabled,
      'aria-controls': context.id,
      'aria-expanded': !context.collapsed,
      'data-state': context.collapsed ? 'collapsed' : 'expanded',
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (!event.defaultPrevented && !disabled) context.setCollapsed(!context.collapsed);
      },
    };
    return render ? render(buttonProps) : <button {...buttonProps} />;
  },
);
LayoutSidebarTrigger.displayName = 'Layout.SidebarTrigger';

export const LayoutContent = forwardRef<HTMLElement, LayoutContentProps>(
  function LayoutContent(props, forwardedRef) {
    return <main {...props} ref={forwardedRef} />;
  },
);

LayoutContent.displayName = 'Layout.Content';

export const LayoutFooter = forwardRef<HTMLElement, LayoutFooterProps>(
  function LayoutFooter(props, forwardedRef) {
    return <footer {...props} ref={forwardedRef} />;
  },
);

LayoutFooter.displayName = 'Layout.Footer';
