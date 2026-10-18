import { Breadcrumb, Button, Drawer, Layout, Tooltip } from '@virgo-design/ui';
import { usePathname } from 'next/navigation';
import { type CSSProperties, type ReactNode, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { AppFooter, FooterBrand } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { AccountMenu } from '@/components/layout/navbar/components/account-menu/AccountMenu';
import { NotificationControl } from '@/components/layout/notification';
import { SettingsDrawer, SettingsTrigger, useSettingsDrawer } from '@/components/layout/settings';
import { AppSidebar, useSidebar } from '@/components/layout/sidebar';
import { AiWorkspace } from '@/features/ai-workspace';
import { useAgentMode } from '@/features/ai-workspace/store';
import { useCurrentUser } from '@/features/auth';
import { isAdmin } from '@/lib/auth/permissions';
import { useAppPreferences } from '@/preferences';
import { canVisitRoute, proRouting, routeIcons } from '@/routes';

import * as styles from './AppLayout.css';

export function AppLayout({
  settingsActions,
  children,
}: {
  settingsActions?: ReactNode;
  children: ReactNode;
}) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const user = useCurrentUser();
  const admin = isAdmin(user);
  const { agentMode, setAgentMode } = useAgentMode();
  const { preferences, updatePreferences, resetPreferences, appearance, storageAvailable } =
    useAppPreferences(admin);
  const sidebar = useSidebar({ preferences, updatePreferences, canCustomize: admin });
  const settings = useSettingsDrawer(updatePreferences);
  const contentRef = useRef<HTMLElement>(null);

  const currentPage = proRouting.match(pathname);
  const currentGroup = currentPage?.group;
  const currentGroupLabel = currentGroup ? t(currentGroup.labelKey) : undefined;
  const currentPageLabel = currentPage ? t(currentPage.labelKey) : t('app.pageNotFound');
  const GroupIcon = currentGroup ? routeIcons[currentGroup.icon] : undefined;
  const PageIcon = currentPage?.icon ? routeIcons[currentPage.icon] : undefined;

  useEffect(() => {
    document.title = t('app.valueVirgoDesignPro', { v0: currentPageLabel });
  }, [currentPageLabel, t]);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
    contentRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  const accountMenu = <AccountMenu agentMode={agentMode} onAgentModeChange={setAgentMode} />;

  return (
    <AiWorkspace
      active={admin && agentMode}
      theme={appearance}
      onExit={() => setAgentMode(false)}
      footer={preferences.showFooter ? <FooterBrand /> : null}
    >
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
              <Navbar
                preferences={preferences}
                updatePreferences={updatePreferences}
                theme={appearance}
                narrow={sidebar.narrow}
                sidebarState={sidebar.state}
                onSidebarWidthChange={sidebar.setWidth}
                actions={
                  <NotificationControl
                    showOverlayArrows={preferences.showOverlayArrows}
                    indicator={preferences.notificationIndicator}
                  />
                }
                accountMenu={accountMenu}
                settingsTrigger={
                  admin && preferences.showHeader ? (
                    <SettingsTrigger {...settings.triggerProps} />
                  ) : null
                }
              />

              <Layout direction="horizontal" className={styles.body!}>
                <AppSidebar
                  preferences={preferences}
                  canCustomize={admin}
                  canVisit={(key) => canVisitRoute(user, key)}
                  workspaceLabel={t(`app.workspaces.${user.role}`)}
                  narrow={sidebar.narrow}
                  state={sidebar.state}
                  toggleRef={sidebar.toggleRef}
                  onWidthChange={sidebar.setWidth}
                />
                <Layout.Content
                  id="pro-main"
                  ref={contentRef}
                  tabIndex={-1}
                  scrollable
                  className={styles.main!}
                >
                  <div className={styles.content} data-layout={currentPage?.contentLayout}>
                    {preferences.showBreadcrumb && currentPage?.breadcrumb ? (
                      <div className={styles.contextBar}>
                        <Breadcrumb aria-label={t('app.pageBreadcrumb')}>
                          {GroupIcon && currentGroup ? (
                            <Breadcrumb.Item
                              aria-current={false}
                              icon={<GroupIcon />}
                              className={styles.breadcrumbIcon!}
                            >
                              <span className={styles.breadcrumbIconLabel}>
                                {currentGroupLabel}
                              </span>
                            </Breadcrumb.Item>
                          ) : null}
                          {currentGroup && currentGroupLabel !== currentPageLabel ? (
                            <Breadcrumb.Item aria-current={false}>
                              {currentGroupLabel}
                            </Breadcrumb.Item>
                          ) : null}
                          <Breadcrumb.Item {...(PageIcon ? { icon: <PageIcon /> } : {})}>
                            {currentPageLabel}
                          </Breadcrumb.Item>
                        </Breadcrumb>
                      </div>
                    ) : null}
                    <div className={styles.pageContent}>{children}</div>
                    {preferences.showFooter ? <AppFooter /> : null}
                  </div>
                </Layout.Content>
              </Layout>
              {admin && !preferences.showHeader ? (
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
          {admin ? (
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
    </AiWorkspace>
  );
}
