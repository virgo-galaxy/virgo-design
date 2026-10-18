import { SidebarCollapseIcon, SidebarExpandIcon } from '@virgo-design/icons';
import { Layout as PrimitiveLayout } from '@virgo-design/primitives';
import {
  type CSSProperties,
  forwardRef,
  type JSX,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { useComposedRefs } from '../../internal/utils/composeRefs';
import { useLocale } from '../../locale/context/locale-context';
import { Surface } from '../Surface';
import type {
  LayoutContentProps,
  LayoutFloatingProps,
  LayoutFooterProps,
  LayoutHeaderProps,
  LayoutLaneProps,
  LayoutProps,
  LayoutSidebarProps,
  LayoutSidebarProviderProps,
  LayoutSidebarState,
  LayoutSidebarTriggerProps,
  LayoutSurface,
} from './Layout.types';
import { SidebarResizeHandle } from './SidebarResizeHandle';

import styles from './Layout.module.scss';

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
    gap,
    paddingInline,
    contentAlign = 'start',
    logo,
    actions,
    surface,
    style,
    children,
    ...props
  },
  forwardedRef,
) {
  const hasContent = children !== undefined && children !== null && children !== false;

  return (
    <PrimitiveLayout.Header
      {...props}
      ref={forwardedRef}
      className={joinClassNames(styles.header, Boolean(surface) && styles.surfaceRegion, className)}
      data-position={position}
      data-content-align={contentAlign}
      data-composed={logo != null || hasContent || actions != null || undefined}
      style={
        {
          '--vd-layout-header-height': height === undefined ? undefined : cssLength(height),
          '--vd-layout-header-gap': gap === undefined ? undefined : cssLength(gap),
          '--vd-layout-header-padding-inline':
            paddingInline === undefined ? undefined : cssLength(paddingInline),
          top: position === 'static' ? undefined : top,
          ...style,
        } as CSSProperties
      }
    >
      <SurfaceLayer surface={surface} />
      {logo != null ? (
        <div className={styles.logo} data-slot="header-logo">
          {logo}
        </div>
      ) : null}
      {hasContent ? (
        <div className={styles.headerContent} data-slot="header-content">
          {children}
        </div>
      ) : null}
      {actions != null ? (
        <div className={styles.actions} data-slot="header-actions">
          {actions}
        </div>
      ) : null}
    </PrimitiveLayout.Header>
  );
});

LayoutHeader.displayName = 'Layout.Header';

export const LayoutLane = forwardRef<HTMLDivElement, LayoutLaneProps>(function LayoutLane(
  {
    className,
    width = '100%',
    maxWidth = 'none',
    minHeight,
    inset = 0,
    insetInline,
    insetBlock,
    surface,
    style,
    children,
    ...props
  },
  forwardedRef,
) {
  const resolvedInsetInline = insetInline ?? inset;
  const resolvedInsetBlock = insetBlock ?? inset;

  return (
    <PrimitiveLayout.Lane
      {...props}
      ref={forwardedRef}
      className={joinClassNames(styles.lane, Boolean(surface) && styles.surfaceRegion, className)}
      style={
        {
          // Each Lane owns its boundary; never inherit dimensions or insets from an outer Lane.
          '--vd-layout-lane-width': cssLength(width),
          '--vd-layout-lane-max-width': cssLength(maxWidth),
          '--vd-layout-lane-inset-inline': cssLength(resolvedInsetInline),
          '--vd-layout-lane-inset-block': cssLength(resolvedInsetBlock),
          minHeight,
          ...style,
        } as CSSProperties
      }
    >
      <SurfaceLayer surface={surface} />
      {children}
    </PrimitiveLayout.Lane>
  );
});

LayoutLane.displayName = 'Layout.Lane';

function SidebarContents({
  state,
  collapseBelow,
  header,
  footer,
  children,
  collapsible,
  trigger,
  triggerPlacement,
  collapsedWidth,
  surface,
}: { [Key in keyof Omit<LayoutSidebarProps, 'state'>]?: LayoutSidebarProps[Key] | undefined } & {
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
    let previous = current.current.state;
    const update = () => {
      if (media.matches === narrow) return;
      narrow = media.matches;
      if (narrow) {
        previous = current.current.state;
        if (previous !== 'hidden') current.current.setState('collapsed');
      } else if (current.current.state !== 'hidden') current.current.setState(previous);
    };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [collapseBelow]);
  const renderSlot = (slot: LayoutSidebarProps['children']) =>
    typeof slot === 'function' ? slot(state) : slot;
  const hidden = state.state === 'hidden' || (state.collapsed && collapsedWidth === 0);
  const collapseControl =
    collapsible && trigger !== null ? (
      trigger === undefined ? (
        <LayoutSidebarTrigger />
      ) : (
        trigger
      )
    ) : null;
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
        {collapseControl != null && triggerPlacement !== 'edge' ? (
          <div className={styles.sidebarControls}>{collapseControl}</div>
        ) : null}
      </div>
      {state.state !== 'hidden' && collapseControl != null && triggerPlacement === 'edge' ? (
        <div className={styles.sidebarEdgeControls} data-slot="sidebar-edge-controls">
          {collapseControl}
        </div>
      ) : null}
    </>
  );
}

export const LayoutSidebarProvider: {
  (props: LayoutSidebarProviderProps): JSX.Element;
  displayName: string;
} = PrimitiveLayout.SidebarProvider;

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
    resizeSnap,
    onResizeEnd,
    header,
    footer,
    trigger,
    triggerPlacement = 'footer',
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
  const composedRef = useComposedRefs(ref, sidebarRef);
  const [resizedWidth, setResizedWidth] = useState<number | null>(null);
  const [resizing, setResizing] = useState(false);

  useEffect(() => {
    setResizedWidth(null);
  }, [width]);

  const renderedWidth = resizedWidth ?? width;

  return (
    <PrimitiveLayout.Sidebar
      {...props}
      ref={composedRef}
      className={joinClassNames(styles.sidebar, styles.surfaceRegion, className)}
      data-mode={mode}
      data-side={side}
      data-trigger-placement={triggerPlacement}
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
            triggerPlacement={triggerPlacement}
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
          {resizable ? (
            <SidebarResizeHandle
              sidebarRef={sidebarRef}
              sidebarState={state}
              expandedWidth={renderedWidth}
              collapsedWidth={collapsedWidth}
              side={side}
              minWidth={minWidth}
              maxWidth={maxWidth}
              resizeSnap={resizeSnap}
              onResizeEnd={onResizeEnd}
              onResizingChange={setResizing}
              onWidthChange={(next) => {
                setResizedWidth(next);
                onWidthChange?.(next);
              }}
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
    const labels = useLocale().layout;
    return (
      <PrimitiveLayout.SidebarTrigger
        {...props}
        ref={ref}
        className={joinClassNames(styles.sidebarTrigger, className)}
        render={(buttonProps) => {
          buttonProps = {
            ...buttonProps,
            'aria-label':
              props['aria-label'] ??
              (props.action === 'hide'
                ? labels.hideSidebar
                : props.action === 'expand'
                  ? labels.expandSidebar
                  : props.action === 'collapse'
                    ? labels.collapseSidebar
                    : buttonProps['aria-expanded']
                      ? labels.collapseSidebar
                      : labels.expandSidebar),
          };
          const content =
            children ??
            ((props.action !== 'expand' && buttonProps['aria-expanded']) ||
            props.action === 'collapse' ||
            props.action === 'hide' ? (
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
