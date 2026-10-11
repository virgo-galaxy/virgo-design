import {
  BellIcon,
  MoonFilledIcon,
  SearchIcon,
  SunFilledIcon,
  VirgoDesignIcon,
} from '@virgo-design/icons';
import virgoDesignLogo from '@virgo-design/icons/brands/virgo-design.svg';
import { iconComponents } from '@virgo-design/icons/registry';
import {
  Badge,
  Breadcrumb,
  Button,
  Drawer,
  Input,
  Layout,
  type LayoutSidebarDisplayState,
  Popover,
  Separator,
  Tag,
  Toolbar,
  Tooltip,
} from '@virgo-design/ui';
import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';

import { useCurrentUser } from '@/application/session-context';
import { AccountMenu } from '@/components/account-menu/AccountMenu';
import { AiWorkspace } from '@/components/ai-workspace/AiWorkspace';
import {
  type NotificationIndicator,
  sidebarWidthRanges,
} from '@/components/global-settings/settings';
import { SettingsDrawer, SettingsTrigger } from '@/components/global-settings/SettingsDrawer';
import { useProSettings } from '@/components/global-settings/useProSettings';
import { LanguageControl } from '@/components/language-control/LanguageControl';
import { NotificationInbox } from '@/components/notifications/NotificationInbox';
import { useNotificationInbox } from '@/components/notifications/use-notification-inbox';
import { ThemeStyleControl } from '@/components/theme-style-control/ThemeStyleControl';
import type { ProfileState } from '@/data/pro-workflows';
import { rememberAppearance } from '@/lib/appearance';
import { isAdmin } from '@/lib/auth/permissions';

import styles from './AppShell.module.scss';
import { getGroupLabel, getPageLabel } from './navigation-labels';
import { proRouteConfig } from './routes.config';
import { proRouting } from './routing';
import { SidebarNavigation } from './SidebarNavigation';

function HeaderSearch() {
  const { t } = useTranslation();
  return (
    <Input
      rootClassName={styles.search!}
      suffix={<SearchIcon />}
      aria-label={t('app.searchPlaceholder')}
      placeholder={t('app.searchPlaceholder')}
      size="medium"
    />
  );
}

function Notifications({
  showOverlayArrows,
  indicator,
}: {
  showOverlayArrows: boolean;
  indicator: NotificationIndicator;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const inbox = useNotificationInbox();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tooltipSuppressed = useRef(false);
  const restoringFocus = useRef(false);
  const showFreshTooltip = () => {
    if (!open && !restoringFocus.current && tooltipSuppressed.current) {
      tooltipSuppressed.current = false;
      setTooltipOpen(true);
    }
  };

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        tooltipSuppressed.current = true;
        restoringFocus.current = !next;
        setTooltipOpen(false);
        setOpen(next);
        if (next) inbox.retry();
        if (!next)
          queueMicrotask(() => {
            restoringFocus.current = false;
          });
      }}
    >
      <Tooltip
        open={tooltipOpen && !open}
        onOpenChange={(next) => setTooltipOpen(next && !open && !tooltipSuppressed.current)}
      >
        <Tooltip.Trigger
          onFocus={showFreshTooltip}
          onPointerMove={(event) => {
            if (event.pointerType === 'mouse' && (event.movementX !== 0 || event.movementY !== 0))
              showFreshTooltip();
          }}
          render={(tooltipProps) => (
            <Popover.Trigger
              {...tooltipProps}
              render={(props) => (
                <Button {...props} iconOnly variant="text" aria-label={t('app.notifications')}>
                  <Badge
                    dot={indicator === 'dot' && Boolean(inbox.data?.unreadCount)}
                    {...(indicator === 'count' ? { count: inbox.data?.unreadCount ?? 0 } : {})}
                    intent="danger"
                    className={styles.notificationBadge}
                  >
                    <BellIcon />
                  </Badge>
                </Button>
              )}
            />
          )}
        />
        <Tooltip.Content placement="bottom">{t('app.notifications')}</Tooltip.Content>
      </Tooltip>
      <Popover.Content
        className={styles.notificationPanel}
        placement="bottomEnd"
        aria-label={t('app.notifications')}
        arrow={showOverlayArrows}
      >
        <NotificationInbox inbox={inbox} onNavigate={() => setOpen(false)} />
      </Popover.Content>
    </Popover>
  );
}

export function AppShell({
  profile,
  agentMode,
  onAgentModeChange,
}: {
  profile: ProfileState;
  agentMode: boolean;
  onAgentModeChange: (active: boolean) => void;
}) {
  const { t } = useTranslation();
  const admin = isAdmin(useCurrentUser());
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentPage = proRouting.match(pathname);
  const currentGroup = currentPage?.group
    ? { ...currentPage.group, label: getGroupLabel(t, currentPage.group.id) }
    : undefined;
  const currentPageLabel = currentPage ? getPageLabel(t, currentPage.page) : t('app.pageNotFound');
  const CurrentGroupIcon = currentGroup ? iconComponents[currentGroup.icon] : undefined;
  const CurrentPageIcon = currentPage?.icon ? iconComponents[currentPage.icon] : undefined;
  const { settings, setSettings, updateSettings, resetSettings, theme, storageAvailable } =
    useProSettings(admin);
  const { sidebarState, sidebarWidth } = settings;
  const setSidebarState = useCallback(
    (sidebarState: LayoutSidebarDisplayState) => updateSettings({ sidebarState }),
    [updateSettings],
  );
  const setSidebarWidth = useCallback(
    (sidebarWidth: number) => updateSettings({ sidebarWidth }),
    [updateSettings],
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTooltipOpen, setSettingsTooltipOpen] = useState(false);
  const [settingsAnchorY, setSettingsAnchorY] = useState(58);
  const [navigationTooltipOpen, setNavigationTooltipOpen] = useState(false);
  const [narrow, setNarrow] = useState(() => window.matchMedia('(max-width: 1080px)').matches);
  const navigationToggle = useRef<HTMLButtonElement>(null);
  const settingsTrigger = useRef<HTMLButtonElement>(null);
  const restoringSettingsFocus = useRef(false);
  const settingsTooltipSuppressed = useRef(false);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1080px)');
    const update = () => setNarrow(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    rememberAppearance(theme);
  }, [theme]);

  useEffect(() => {
    if (narrow)
      setSettings((current) =>
        current.sidebarState === 'hidden' || current.sidebarState === 'collapsed'
          ? current
          : { ...current, sidebarState: 'collapsed', sidebarMode: 'collapsed' },
      );
  }, [pathname, narrow, setSettings]);

  useEffect(() => {
    document.title = t('app.valueVirgoDesignPro', { v0: currentPageLabel });
  }, [currentPageLabel, t]);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
    contentRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  const settingsTriggerProps = {
    ref: settingsTrigger,
    tooltipOpen: settingsTooltipOpen && !settingsOpen,
    onTooltipOpenChange: (open: boolean) => {
      setSettingsTooltipOpen(open && !settingsOpen && !settingsTooltipSuppressed.current);
    },
    onTooltipInteraction: () => {
      if (!settingsOpen && !restoringSettingsFocus.current && settingsTooltipSuppressed.current) {
        settingsTooltipSuppressed.current = false;
        setSettingsTooltipOpen(true);
      }
    },
  };

  const footerBrand = (
    <>
      <VirgoDesignIcon size={16} />
      <span>{t('app.virgoDesignPro')}</span>
    </>
  );

  return (
    <AiWorkspace
      active={agentMode}
      theme={theme}
      onExit={() => onAgentModeChange(false)}
      footer={
        settings.showFooter ? <span className={styles.footerBrand}>{footerBrand}</span> : null
      }
    >
      <Tooltip.Provider size="medium" arrow={settings.showOverlayArrows}>
        <Drawer
          className={styles.settingsRoot}
          open={settingsOpen}
          onOpenChange={(open) => {
            restoringSettingsFocus.current = !open;
            settingsTooltipSuppressed.current = true;
            setSettingsTooltipOpen(false);
            setSettingsOpen(open);
          }}
        >
          <Layout.SidebarProvider
            id="pro-sidebar"
            state={sidebarState}
            onStateChange={setSidebarState}
          >
            <Layout
              className={styles.shell!}
              direction="vertical"
              data-theme={theme}
              style={
                {
                  '--pro-header-height': settings.showHeader ? `${settings.headerHeight}px` : '0px',
                } as CSSProperties
              }
              onKeyDown={(event) => {
                if (
                  event.key === 'Escape' &&
                  narrow &&
                  sidebarState === 'expanded' &&
                  !event.defaultPrevented
                ) {
                  setSidebarState('collapsed');
                  navigationToggle.current?.focus();
                }
              }}
            >
              <a className={styles.skipLink} href="#pro-main">
                {t('app.skipToContent')}
              </a>
              <Layout.Header
                className={styles.header!}
                data-scale={settings.headerHeight > 64 ? 'large' : 'regular'}
                hidden={!settings.showHeader}
                height={settings.headerHeight}
                gap={narrow ? 'var(--vd-spacing-12)' : 'var(--vd-spacing-24)'}
                paddingInline={narrow ? 'var(--vd-spacing-12)' : 'var(--vd-spacing-24)'}
                surface={{ tone: 'default', material: settings.headerMaterial, border: 'none' }}
                logo={
                  <div className={styles.brand}>
                    <Tooltip
                      open={sidebarState === 'hidden' && navigationTooltipOpen}
                      onOpenChange={setNavigationTooltipOpen}
                    >
                      <Tooltip.Trigger
                        render={(props) => (
                          <Layout.SidebarTrigger
                            {...props}
                            action="expand"
                            className={styles.brandTrigger}
                            aria-label={
                              sidebarState === 'hidden'
                                ? t('app.restoreNavigation')
                                : t('app.virgoDesignProHome')
                            }
                            onClick={(event) => {
                              props.onClick?.(event);
                              if (!event.defaultPrevented) {
                                if (sidebarState === 'hidden') {
                                  setSidebarWidth(224);
                                } else {
                                  event.preventDefault();
                                  navigate(proRouteConfig.homePath);
                                }
                              }
                            }}
                          >
                            <img src={virgoDesignLogo} alt="" width="590" height="470" />
                          </Layout.SidebarTrigger>
                        )}
                      />
                      <Tooltip.Content>{t('app.restoreNavigation')}</Tooltip.Content>
                    </Tooltip>
                    <Link
                      to={proRouteConfig.homePath}
                      className={styles.brandHome}
                      aria-label={t('app.virgoDesignProHome')}
                    >
                      {t('app.virgoDesign')}
                    </Link>
                    <Tag size="md" intent="brand" variant="soft" className={styles.proBadge}>
                      {t('app.pro')}
                    </Tag>
                  </div>
                }
                actions={
                  <Toolbar
                    layout="custom"
                    aria-label={t('app.globalActions')}
                    className={styles.actions}
                  >
                    <LanguageControl />
                    <ThemeStyleControl />
                    {admin ? (
                      <Tooltip>
                        <Tooltip.Trigger
                          render={(props) => (
                            <Button
                              {...props}
                              iconOnly
                              variant="text"
                              aria-label={
                                theme === 'light' ? t('app.darkMode') : t('app.lightMode')
                              }
                              onClick={(event) => {
                                props.onClick?.(event);
                                if (!event.defaultPrevented)
                                  updateSettings({
                                    appearance: theme === 'light' ? 'dark' : 'light',
                                  });
                              }}
                            >
                              {theme === 'light' ? <MoonFilledIcon /> : <SunFilledIcon />}
                            </Button>
                          )}
                        />
                        <Tooltip.Content>
                          {theme === 'light' ? t('app.darkMode') : t('app.lightMode')}
                        </Tooltip.Content>
                      </Tooltip>
                    ) : null}
                    <Notifications
                      showOverlayArrows={settings.showOverlayArrows}
                      indicator={settings.notificationIndicator}
                    />
                    {admin && settings.showHeader ? (
                      <SettingsTrigger {...settingsTriggerProps} />
                    ) : null}
                    <Separator orientation="vertical" decorative className={styles.actionDivider} />
                    <AccountMenu
                      profile={profile}
                      agentMode={agentMode}
                      onAgentModeChange={onAgentModeChange}
                    />
                  </Toolbar>
                }
              >
                <HeaderSearch />
              </Layout.Header>

              <Layout direction="horizontal" className={styles.body!}>
                <Layout.Sidebar
                  className={styles.sidebar}
                  data-rail-icon-size={settings.sidebarRailWidth > 64 ? 'large' : 'regular'}
                  width={sidebarWidth}
                  resizable={admin && settings.sidebarResizable}
                  minWidth={sidebarWidthRanges.expanded.min}
                  maxWidth={sidebarWidthRanges.expanded.max}
                  mode={narrow && sidebarState === 'expanded' ? 'overlay' : 'inline'}
                  {...(settings.sidebarSnap
                    ? { resizeSnap: { collapseAt: 160, hideAt: 24, hysteresis: 16 } }
                    : {})}
                  onWidthChange={setSidebarWidth}
                  collapsedWidth={settings.sidebarRailWidth}
                  collapsible
                  collapseBelow={1080}
                  surface={{
                    tone: 'default',
                    border: 'none',
                    elevation: narrow && sidebarState === 'expanded' ? 2 : 0,
                  }}
                  trigger={
                    <div className={styles.sidebarToggle}>
                      {sidebarState === 'expanded' ? (
                        <span className={styles.environment}>
                          <Badge
                            dot
                            intent="success"
                            animation={settings.breathe ? 'breathe' : 'none'}
                            className={styles.statusDot}
                          />
                          {t('app.teamWorkspace')}
                        </span>
                      ) : null}
                      <Tooltip className={styles.sidebarToggleHint}>
                        <Tooltip.Trigger
                          ref={navigationToggle}
                          render={(props) => (
                            <Layout.SidebarTrigger
                              {...props}
                              className={styles.sidebarToggleButton}
                            />
                          )}
                        />
                        <Tooltip.Content placement="right" offset={12}>
                          {sidebarState !== 'expanded'
                            ? t('app.expandSidebar')
                            : t('app.collapseSidebar')}
                        </Tooltip.Content>
                      </Tooltip>
                    </div>
                  }
                >
                  {({ collapsed }) => (
                    <SidebarNavigation
                      collapsed={collapsed}
                      pathname={pathname}
                      showSubmenuHeader={settings.showSubmenuHeader}
                      sidebarStyle={settings.sidebarStyle}
                      showOverlayArrows={settings.showOverlayArrows}
                    />
                  )}
                </Layout.Sidebar>
                {narrow && sidebarState === 'expanded' ? (
                  <Layout.SidebarTrigger
                    action="collapse"
                    className={styles.sidebarBackdrop}
                    aria-label={t('app.closeNavigation')}
                    onClick={() => navigationToggle.current?.focus()}
                  />
                ) : null}
                <Layout.Content
                  id="pro-main"
                  ref={contentRef}
                  tabIndex={-1}
                  scrollable
                  className={styles.main!}
                >
                  <div className={styles.content} data-layout={currentPage?.contentLayout}>
                    {settings.showBreadcrumb && currentPage?.display.breadcrumb ? (
                      <div className={styles.contextBar}>
                        <Breadcrumb aria-label={t('app.pageBreadcrumb')}>
                          {CurrentGroupIcon && currentGroup ? (
                            <Breadcrumb.Item
                              aria-current={false}
                              icon={<CurrentGroupIcon />}
                              className={styles.breadcrumbIcon!}
                            >
                              <span className={styles.breadcrumbIconLabel}>
                                {currentGroup.label}
                              </span>
                            </Breadcrumb.Item>
                          ) : null}
                          {currentGroup && currentGroup.label !== currentPageLabel ? (
                            <Breadcrumb.Item aria-current={false}>
                              {currentGroup.label}
                            </Breadcrumb.Item>
                          ) : null}
                          <Breadcrumb.Item
                            {...(CurrentPageIcon ? { icon: <CurrentPageIcon /> } : {})}
                          >
                            {currentPageLabel}
                          </Breadcrumb.Item>
                        </Breadcrumb>
                      </div>
                    ) : null}
                    <div className={styles.pageContent}>
                      <Outlet context={{ showOverlayArrows: settings.showOverlayArrows }} />
                    </div>
                    {settings.showFooter ? (
                      <footer className={styles.contentFooter}>
                        <Link to={proRouteConfig.homePath}>{footerBrand}</Link>
                      </footer>
                    ) : null}
                  </div>
                </Layout.Content>
              </Layout>
              {!settings.showHeader ? (
                <SettingsTrigger {...settingsTriggerProps} anchorY={settingsAnchorY} />
              ) : null}
            </Layout>
          </Layout.SidebarProvider>
          {admin ? (
            <SettingsDrawer
              settings={settings}
              theme={theme}
              storageAvailable={storageAvailable}
              onChange={updateSettings}
              onReset={resetSettings}
              onHeaderChange={(showHeader, anchorY) => {
                updateSettings({ showHeader });
                if (!showHeader) {
                  restoringSettingsFocus.current = true;
                  settingsTooltipSuppressed.current = true;
                  setSettingsAnchorY(anchorY);
                  setSettingsTooltipOpen(false);
                  setSettingsOpen(false);
                }
              }}
              onCloseAutoFocus={(event) => {
                event.preventDefault();
                // Wait for modal isolation to release before focusing the surviving gear.
                queueMicrotask(() => {
                  restoringSettingsFocus.current = true;
                  settingsTrigger.current?.focus({ preventScroll: true });
                  restoringSettingsFocus.current = false;
                });
              }}
            />
          ) : null}
        </Drawer>
      </Tooltip.Provider>
    </AiWorkspace>
  );
}
