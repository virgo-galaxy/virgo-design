import { Breadcrumb, Button, Drawer, Layout, Tooltip } from '@virgo-design/ui';
import { type CSSProperties, type ReactNode, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router';

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

export function AppLayout({ settingsActions }: { settingsActions?: ReactNode }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
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
        <Drawer className="block" open={settings.open} onOpenChange={settings.onOpenChange}>
          <Layout.SidebarProvider
            id="pro-sidebar"
            state={sidebar.state}
            onStateChange={sidebar.setState}
          >
            <Layout
              className="h-dvh overflow-hidden text-text-primary bg-surface-background"
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
              <a
                className="bg-surface-default [transform:translateY(-200%)] focus:[transform:none] fixed [top:var(--vd-spacing-8)] [left:var(--vd-spacing-8)] p-12 [z-index:10] text-brand-link"
                href="#pro-main"
              >
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

              <Layout direction="horizontal" className="relative overflow-hidden">
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
                  className={[
                    'outline-none [background:color-mix(in_srgb,_var(--vd-surface-secondary)_35%,_var(--vd-surface-background))] [scrollbar-width:thin]',
                    '[scroll-padding-block-start:var(--pro-header-height)]',
                  ].join(' ')}
                >
                  <div
                    className={[
                      'pro-app-layout-content [--pro-content-padding:var(--vd-spacing-24)] data-[layout=fill]:box-border data-[layout=fill]:flex',
                      'data-[layout=fill]:flex-col data-[layout=fill]:[min-height:100%]',
                      'viewport-max-900:[--pro-content-padding:var(--vd-spacing-20)] viewport-max-640:[--pro-content-padding:var(--vd-spacing-16)]',
                      'w-full [padding:var(--pro-content-padding)] [padding-block-start:calc(var(--pro-header-height)_+_var(--pro-content-padding))]',
                    ].join(' ')}
                    data-layout={currentPage?.contentLayout}
                  >
                    {preferences.showBreadcrumb && currentPage?.breadcrumb ? (
                      <div className="flex justify-between items-center gap-12 [margin-block-end:var(--vd-spacing-24)]">
                        <Breadcrumb aria-label={t('app.pageBreadcrumb')}>
                          {GroupIcon && currentGroup ? (
                            <Breadcrumb.Item
                              aria-current={false}
                              icon={<GroupIcon />}
                              className="gap-0"
                            >
                              <span className="absolute [width:1px] [height:1px] p-0 overflow-hidden [clip-path:inset(50%)] whitespace-nowrap">
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
                    <div
                      className={[
                        "[.pro-app-layout-content[data-layout='fill']_&]:flex [.pro-app-layout-content[data-layout='fill']_&]:[flex:1]",
                        "[.pro-app-layout-content[data-layout='fill']_&]:flex-col [.pro-app-layout-content[data-layout='fill']_&_>_*]:[flex:1]",
                        'min-w-0',
                      ].join(' ')}
                    >
                      <Outlet context={{ showOverlayArrows: preferences.showOverlayArrows }} />
                    </div>
                    {preferences.showFooter ? <AppFooter /> : null}
                  </div>
                </Layout.Content>
              </Layout>
              {admin && !preferences.showHeader ? (
                <>
                  <div
                    className={[
                      'bg-surface-default [border-radius:var(--vd-radius-8)] [border:var(--vd-border-width-1)_solid_var(--vd-border-subtle)] fixed',
                      '[top:var(--vd-spacing-8)] [right:var(--vd-spacing-48)] [z-index:10] flex gap-8 items-center p-4',
                    ].join(' ')}
                  >
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
