import { Layout, type LayoutSidebarDisplayState } from '@virgo-design/ui';
import type { ReactNode, RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { type AppPreferences, sidebarWidthRanges } from '@/preferences';

import { SidebarControls } from './controls/SidebarControls';
import { SidebarNavigation } from './navigation/SidebarNavigation';

import styles from './AppSidebar.module.scss';

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
  const { pathname } = useLocation();
  const railIconSize = preferences.sidebarRailWidth > 64 ? 'large' : 'regular';
  const overlay = narrow && state === 'expanded';

  return (
    <>
      <Layout.Sidebar
        className={styles.sidebar}
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
          className={styles.sidebarBackdrop}
          aria-label={t('app.closeNavigation')}
          onClick={() => toggleRef.current?.focus()}
        />
      ) : null}
    </>
  );
}
