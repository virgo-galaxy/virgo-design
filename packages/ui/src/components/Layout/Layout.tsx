import { SidebarCollapseIcon, SidebarExpandIcon } from '@virgo-design/icons';
import { Layout as PrimitiveLayout } from '@virgo-design/primitives';
import {
  type CSSProperties,
  forwardRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { Surface } from '../Surface';
import styles from './Layout.module.scss';
import type {
  LayoutContentProps,
  LayoutFloatingProps,
  LayoutFooterProps,
  LayoutHeaderProps,
  LayoutProps,
  LayoutSidebarProps,
  LayoutSidebarState,
  LayoutSidebarTriggerProps,
  LayoutSurface,
} from './Layout.types';

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

function SurfaceLayer({ surface }: { surface: LayoutSurface | undefined }) {
  return surface ? <Surface {...surface} className={styles.surface} aria-hidden="true" /> : null;
}

const cssLength = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);

export const Layout = forwardRef<HTMLDivElement, LayoutProps>(function Layout(
  { className, minHeight, surface, style, children, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveLayout
      {...props}
      ref={forwardedRef}
      className={joinClassNames(styles.root, Boolean(surface) && styles.surfaceRegion, className)}
      style={{ minHeight, ...style }}
    >
      <SurfaceLayer surface={surface} />
      {children}
    </PrimitiveLayout>
  );
});

Layout.displayName = 'Layout';

export const LayoutHeader = forwardRef<HTMLElement, LayoutHeaderProps>(function LayoutHeader(
  {
    className,
    height,
    position = 'static',
    top = 0,
    logo,
    actions,
    surface,
    style,
    children,
    ...props
  },
  forwardedRef,
) {
  return (
    <PrimitiveLayout.Header
      {...props}
      ref={forwardedRef}
      className={joinClassNames(styles.header, Boolean(surface) && styles.surfaceRegion, className)}
      data-position={position}
      data-composed={logo != null || actions != null || undefined}
      style={
        {
          '--vd-layout-header-height': height === undefined ? undefined : cssLength(height),
          top: position === 'sticky' ? top : undefined,
          ...style,
        } as CSSProperties
      }
    >
      <SurfaceLayer surface={surface} />
      {logo != null ? <div className={styles.logo}>{logo}</div> : null}
      {children}
      {actions != null ? <div className={styles.actions}>{actions}</div> : null}
    </PrimitiveLayout.Header>
  );
});

LayoutHeader.displayName = 'Layout.Header';

function SidebarContents({
  state,
  collapseBelow,
  header,
  footer,
  children,
  collapsible,
  trigger,
  collapsedWidth,
  surface,
}: { [Key in keyof LayoutSidebarProps]?: LayoutSidebarProps[Key] | undefined } & {
  state: LayoutSidebarState;
}) {
  const current = useRef(state);
  useLayoutEffect(() => {
    current.current = state;
  }, [state]);
  useEffect(() => {
    if (collapseBelow === undefined || typeof window.matchMedia !== 'function') return;
    const media = window.matchMedia(`(max-width: ${collapseBelow}px)`);
    let narrow = false;
    let previous = current.current.collapsed;
    const update = () => {
      if (media.matches === narrow) return;
      narrow = media.matches;
      if (narrow) {
        previous = current.current.collapsed;
        current.current.setCollapsed(true);
      } else current.current.setCollapsed(previous);
    };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [collapseBelow]);
  const renderSlot = (slot: LayoutSidebarProps['children']) =>
    typeof slot === 'function' ? slot(state) : slot;
  const hidden = state.collapsed && collapsedWidth === 0;
  return (
    <>
      <SurfaceLayer surface={hidden ? undefined : surface} />
      <div
        data-slot="sidebar-contents"
        className={styles.sidebarContents}
        hidden={hidden}
        inert={hidden || undefined}
      >
        {header != null ? <div className={styles.sidebarHeader}>{renderSlot(header)}</div> : null}
        <div data-slot="sidebar-body" className={styles.sidebarBody}>
          {renderSlot(children)}
        </div>
        {footer != null ? <div className={styles.sidebarFooter}>{renderSlot(footer)}</div> : null}
        {collapsible && trigger !== null ? (
          <div className={styles.sidebarControls}>
            {trigger === undefined ? <LayoutSidebarTrigger /> : trigger}
          </div>
        ) : null}
      </div>
    </>
  );
}

export const LayoutSidebar = forwardRef<HTMLElement, LayoutSidebarProps>(function LayoutSidebar(
  {
    width = 'calc(var(--vd-sizing-80) * 3)',
    collapsedWidth = 'var(--vd-sizing-64)',
    collapsible = false,
    collapseBelow,
    resizable = false,
    minWidth,
    maxWidth,
    onWidthChange,
    header,
    footer,
    trigger,
    children,
    mode = 'inline',
    offset = 'var(--vd-spacing-24)',
    side = 'start',
    surface,
    className,
    style,
    ...props
  },
  ref,
) {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const resizeCleanupRef = useRef<(() => void) | null>(null);
  const [resizedWidth, setResizedWidth] = useState<number | null>(null);
  const [resizing, setResizing] = useState(false);

  useEffect(() => {
    setResizedWidth(null);
  }, [width]);

  useEffect(
    () => () => {
      resizeCleanupRef.current?.();
    },
    [],
  );

  const clampWidth = (nextWidth: number) =>
    Math.min(maxWidth ?? Number.POSITIVE_INFINITY, Math.max(minWidth ?? 0, nextWidth));

  const updateWidth = (nextWidth: number) => {
    const clampedWidth = clampWidth(nextWidth);
    setResizedWidth(clampedWidth);
    onWidthChange?.(clampedWidth);
  };

  const startResize = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!resizable || event.button !== 0 || !sidebarRef.current) return;

    resizeCleanupRef.current?.();
    const startX = event.clientX;
    const startWidth = sidebarRef.current.getBoundingClientRect().width;
    const direction = side === 'end' ? -1 : 1;
    setResizedWidth(startWidth);
    setResizing(true);

    const onPointerMove = (pointerEvent: PointerEvent) => {
      updateWidth(startWidth + (pointerEvent.clientX - startX) * direction);
    };
    const stopResize = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', stopResize);
      window.removeEventListener('pointercancel', stopResize);
      resizeCleanupRef.current = null;
      setResizing(false);
    };

    resizeCleanupRef.current = stopResize;
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', stopResize);
    window.addEventListener('pointercancel', stopResize);
    event.currentTarget.focus();
    event.preventDefault();
  };

  const resizeWithKeyboard = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!resizable || !sidebarRef.current) return;

    const currentWidth = sidebarRef.current.getBoundingClientRect().width;
    const direction = side === 'end' ? -1 : 1;
    let nextWidth: number | undefined;

    if (event.key === 'ArrowLeft') nextWidth = currentWidth - 8 * direction;
    if (event.key === 'ArrowRight') nextWidth = currentWidth + 8 * direction;
    if (event.key === 'Home' && minWidth !== undefined) nextWidth = minWidth;
    if (event.key === 'End' && maxWidth !== undefined) nextWidth = maxWidth;
    if (nextWidth === undefined) return;

    event.preventDefault();
    updateWidth(nextWidth);
  };

  const renderedWidth = resizedWidth ?? width;
  const numericWidth = resizedWidth ?? (typeof width === 'number' ? width : undefined);

  return (
    <PrimitiveLayout.Sidebar
      {...props}
      ref={(node) => {
        sidebarRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={joinClassNames(styles.sidebar, styles.surfaceRegion, className)}
      data-mode={mode}
      data-side={side}
      data-resizable={resizable || undefined}
      data-resizing={resizing || undefined}
      style={
        {
          '--vd-layout-sidebar-width': cssLength(renderedWidth),
          '--vd-layout-sidebar-collapsed-width': cssLength(collapsedWidth),
          '--vd-layout-sidebar-offset': cssLength(offset),
          ...style,
        } as CSSProperties
      }
    >
      {(state) => (
        <>
          <SidebarContents
            state={state}
            collapseBelow={collapseBelow}
            header={header}
            footer={footer}
            collapsible={collapsible}
            trigger={trigger}
            collapsedWidth={collapsedWidth}
            surface={{
              tone: 'default',
              border: 'subtle',
              ...(mode === 'floating'
                ? { radius: state.collapsed ? 'full' : 12, elevation: 2 }
                : {}),
              ...surface,
            }}
          >
            {children}
          </SidebarContents>
          {resizable && !state.collapsed ? (
            <div
              role="separator"
              aria-label="Resize sidebar"
              aria-orientation="vertical"
              aria-valuemin={minWidth}
              aria-valuemax={maxWidth}
              aria-valuenow={numericWidth === undefined ? undefined : Math.round(numericWidth)}
              tabIndex={0}
              className={styles.sidebarResizeHandle}
              data-side={side}
              data-slot="sidebar-resize-handle"
              onPointerDown={startResize}
              onKeyDown={resizeWithKeyboard}
            />
          ) : null}
        </>
      )}
    </PrimitiveLayout.Sidebar>
  );
});
LayoutSidebar.displayName = 'Layout.Sidebar';

export const LayoutSidebarTrigger = forwardRef<HTMLButtonElement, LayoutSidebarTriggerProps>(
  function LayoutSidebarTrigger({ className, children, render, ...props }, ref) {
    return (
      <PrimitiveLayout.SidebarTrigger
        {...props}
        ref={ref}
        className={joinClassNames(styles.sidebarTrigger, className)}
        render={(buttonProps) => {
          const content =
            children ??
            (buttonProps['aria-expanded'] ? (
              <SidebarCollapseIcon aria-hidden="true" />
            ) : (
              <SidebarExpandIcon aria-hidden="true" />
            ));
          return render ? (
            render({ ...buttonProps, children: content })
          ) : (
            <button {...buttonProps}>{content}</button>
          );
        }}
      />
    );
  },
);
LayoutSidebarTrigger.displayName = 'Layout.SidebarTrigger';

export const LayoutContent = forwardRef<HTMLElement, LayoutContentProps>(function LayoutContent(
  { className, padding, scrollable = false, surface, style, children, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveLayout.Content
      {...props}
      ref={forwardedRef}
      className={joinClassNames(
        styles.content,
        Boolean(surface) && styles.surfaceRegion,
        className,
      )}
      data-scrollable={scrollable || undefined}
      style={{
        padding: padding === undefined ? undefined : `var(--vd-spacing-${padding})`,
        ...style,
      }}
    >
      <SurfaceLayer surface={surface} />
      {children}
    </PrimitiveLayout.Content>
  );
});

LayoutContent.displayName = 'Layout.Content';

export const LayoutFloating = forwardRef<HTMLDivElement, LayoutFloatingProps>(
  function LayoutFloating(
    { placement = 'bottom-end', offset = 'var(--vd-spacing-24)', className, style, ...props },
    ref,
  ) {
    return (
      <div
        {...props}
        ref={ref}
        className={joinClassNames(styles.floating, className)}
        data-placement={placement}
        style={{ '--vd-layout-floating-offset': cssLength(offset), ...style } as CSSProperties}
      />
    );
  },
);
LayoutFloating.displayName = 'Layout.Floating';

export const LayoutFooter = forwardRef<HTMLElement, LayoutFooterProps>(function LayoutFooter(
  { className, surface, children, ...props },
  forwardedRef,
) {
  return (
    <PrimitiveLayout.Footer
      {...props}
      ref={forwardedRef}
      className={joinClassNames(styles.footer, Boolean(surface) && styles.surfaceRegion, className)}
    >
      <SurfaceLayer surface={surface} />
      {children}
    </PrimitiveLayout.Footer>
  );
});

LayoutFooter.displayName = 'Layout.Footer';
