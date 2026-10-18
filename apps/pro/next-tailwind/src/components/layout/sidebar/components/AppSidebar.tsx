import { Layout, type LayoutSidebarDisplayState } from '@virgo-design/ui';
import { usePathname } from 'next/navigation';
import type { ReactNode, RefObject } from 'react';
import { useTranslation } from 'react-i18next';

import { type AppPreferences, sidebarWidthRanges } from '@/preferences';

import { SidebarControls } from './controls/SidebarControls';
import { SidebarNavigation } from './navigation/SidebarNavigation';

export function AppSidebar({
  preferences,
  canCustomize,
  canVisit,
  workspaceLabel,
  narrow,
  state,
  toggleRef,
  onWidthChange,
}: {
  preferences: AppPreferences;
  canCustomize: boolean;
  canVisit?: ((key: string) => boolean) | undefined;
  workspaceLabel?: ReactNode;
  narrow: boolean;
  state: LayoutSidebarDisplayState;
  toggleRef: RefObject<HTMLButtonElement | null>;
  onWidthChange: (width: number) => void;
}) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const railIconSize = preferences.sidebarRailWidth > 64 ? 'large' : 'regular';
  const overlay = narrow && state === 'expanded';

  return (
    <>
      <Layout.Sidebar
        className={[
          '[margin-block-start:var(--pro-header-height)]',
          '[border-inline-end:var(--vd-stroke-width,_var(--vd-border-width-1))_solid_var(--vd-border-subtle)]',
          "[&[data-resizable]]:[border-inline-end:0] [&_[data-slot='sidebar-contents']]:pt-8 [&_[data-slot='sidebar-body']]:[scrollbar-width:thin]",
          "[&_[data-slot='sidebar-body']]:py-4 [&[data-state='collapsed']_[data-slot='sidebar-body']]:px-4",
          "viewport-max-900:[&_[data-slot='sidebar-contents']]:pt-4 viewport-max-640:[&_[data-slot='sidebar-contents']]:pt-0",
        ].join(' ')}
        data-rail-icon-size={railIconSize}
        width={preferences.sidebarWidth}
        resizable={canCustomize && preferences.sidebarResizable}
        minWidth={sidebarWidthRanges.expanded.min}
        maxWidth={sidebarWidthRanges.expanded.max}
        mode={overlay ? 'overlay' : 'inline'}
        {...(preferences.sidebarSnap
          ? { resizeSnap: { collapseAt: 160, hideAt: 24, hysteresis: 16 } }
          : {})}
        onWidthChange={onWidthChange}
        collapsedWidth={preferences.sidebarRailWidth}
        collapsible
        surface={{ tone: 'default', border: 'none', elevation: overlay ? 2 : 0 }}
        trigger={
          <SidebarControls
            state={state}
            railIconSize={railIconSize}
            breathe={preferences.breathe}
            workspaceLabel={workspaceLabel}
            toggleRef={toggleRef}
          />
        }
      >
        {({ collapsed }) => (
          <SidebarNavigation
            canVisit={canVisit}
            collapsed={collapsed}
            railIconSize={railIconSize}
            pathname={pathname}
            showSubmenuHeader={preferences.showSubmenuHeader}
            sidebarStyle={preferences.sidebarStyle}
            showOverlayArrows={preferences.showOverlayArrows}
          />
        )}
      </Layout.Sidebar>
      {overlay ? (
        <Layout.SidebarTrigger
          action="collapse"
          className={[
            '[&[data-state]]:absolute [&[data-state]]:[inset:0] [&[data-state]]:[inset-block-start:var(--pro-header-height)]',
            '[&[data-state]]:[z-index:1] [&[data-state]]:w-full [&[data-state]]:h-full [&[data-state]]:rounded-none',
            '[&[data-state]]:[background:color-mix(in_srgb,_var(--vd-text-primary)_4%,_transparent)] [&[data-state]_>_svg]:hidden',
            '[&[data-state]:hover]:[background:color-mix(in_srgb,_var(--vd-text-primary)_4%,_transparent)]',
          ].join(' ')}
          aria-label={t('sidebar.closeNavigation')}
          onClick={() => toggleRef.current?.focus()}
        />
      ) : null}
    </>
  );
}
