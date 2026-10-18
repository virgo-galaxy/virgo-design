import { Button, Drawer, Layout, Tooltip } from '@virgo-design/ui';
import type { CSSProperties, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppPreferences } from '@/preferences';
import { SettingsDrawer, SettingsTrigger } from '@/preferences/react';

import { AppContent } from './content/AppContent';
import { AppFooter } from './footer/AppFooter';
import { AppHeader } from './header/AppHeader';
import { AppSidebar } from './sidebar/AppSidebar';
import { useSidebar } from './sidebar/use-sidebar';
import { useSettingsDrawer } from './use-settings-drawer';

import styles from './AppShell.module.scss';

export function AppShell({
  children,
  headerActions,
  accountMenu,
  settingsActions,
  workspaceLabel,
  canCustomize = true,
  canVisit,
}: {
  children: ReactNode;
  headerActions?: ReactNode;
  accountMenu?: ReactNode;
  settingsActions?: ReactNode;
  workspaceLabel?: ReactNode;
  canCustomize?: boolean;
  canVisit?: ((key: string) => boolean) | undefined;
}) {
  const { t } = useTranslation();
  const { preferences, updatePreferences, resetPreferences, appearance, storageAvailable } =
    useAppPreferences(canCustomize);
  const sidebar = useSidebar({ preferences, updatePreferences, canCustomize });
  const settings = useSettingsDrawer(updatePreferences);

  return (
    <Tooltip.Provider size="medium" arrow={preferences.showOverlayArrows}>
      <Drawer
        className={styles.settingsRoot}
        open={settings.open}
        onOpenChange={settings.onOpenChange}
      >
        <Layout.SidebarProvider
          id="pro-sidebar"
          state={sidebar.state}
          onStateChange={sidebar.setState}
        >
          <Layout
            className={styles.shell!}
            direction="vertical"
            data-theme={appearance}
            style={
              {
                '--pro-header-height': preferences.showHeader
                  ? `${preferences.headerHeight}px`
                  : '0px',
              } as CSSProperties
            }
            onKeyDown={sidebar.onKeyDown}
          >
            <a className={styles.skipLink} href="#pro-main">
              {t('app.skipToContent')}
            </a>
            <AppHeader
              preferences={preferences}
              updatePreferences={updatePreferences}
              theme={appearance}
              narrow={sidebar.narrow}
              sidebarState={sidebar.state}
              onSidebarWidthChange={sidebar.setWidth}
              actions={headerActions}
              accountMenu={accountMenu}
              settingsTrigger={
                canCustomize && preferences.showHeader ? (
                  <SettingsTrigger {...settings.triggerProps} />
                ) : null
              }
            />

            <Layout direction="horizontal" className={styles.body!}>
              <AppSidebar
                preferences={preferences}
                canCustomize={canCustomize}
                canVisit={canVisit}
                workspaceLabel={workspaceLabel}
                narrow={sidebar.narrow}
                state={sidebar.state}
                toggleRef={sidebar.toggleRef}
                onWidthChange={sidebar.setWidth}
              />
              <AppContent
                showBreadcrumb={preferences.showBreadcrumb}
                footer={preferences.showFooter ? <AppFooter /> : null}
              >
                {children}
              </AppContent>
            </Layout>
            {canCustomize && !preferences.showHeader ? (
              <>
                <div className={styles.recoveryControls}>
                  <Button
                    variant="outline"
                    onClick={() =>
                      updatePreferences({ showHeader: true, sidebarState: 'expanded' })
                    }
                  >
                    {t('app.restoreNavigation')}
                  </Button>
                  {accountMenu}
                </div>
                <SettingsTrigger {...settings.triggerProps} anchorY={settings.anchorY} />
              </>
            ) : null}
          </Layout>
        </Layout.SidebarProvider>
        {canCustomize ? (
          <SettingsDrawer
            settings={preferences}
            theme={appearance}
            storageAvailable={storageAvailable}
            onChange={updatePreferences}
            onReset={resetPreferences}
            extraActions={settingsActions}
            onHeaderChange={settings.onHeaderChange}
            onCloseAutoFocus={settings.onCloseAutoFocus}
          />
        ) : null}
      </Drawer>
    </Tooltip.Provider>
  );
}
