import { BellIcon, ChevronDownIcon, MoonIcon, SearchIcon, SunIcon } from '@virgo-design/icons';
import { iconComponents } from '@virgo-design/icons/registry';
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Combobox,
  Drawer,
  Layout,
  type LayoutSidebarDisplayState,
  Popover,
  Separator,
  Tag,
  Tooltip,
} from '@virgo-design/ui';
import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';

import {
  type NotificationIndicator,
  sidebarWidthRanges,
} from '@/components/global-settings/settings';
import { SettingsDrawer, SettingsTrigger } from '@/components/global-settings/SettingsDrawer';
import { useProSettings } from '@/components/global-settings/useProSettings';
import { avatarForeground, profileInitials, type ProfileState } from '@/data/pro-workflows';

import styles from './AppShell.module.scss';
import { navigationPages } from './navigation';
import { proRouteConfig } from './routes.config';
import { proRouting } from './routing';
import { SidebarNavigation } from './SidebarNavigation';

function PageSearch() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  return (
    <Combobox
      className={styles.search}
      inputValue={search}
      onInputValueChange={setSearch}
      onValueChange={(value) => {
        if (value) navigate(value);
      }}
      size="small"
    >
      <SearchIcon aria-hidden="true" className={styles.searchIcon} />
      <Combobox.Input aria-label="Find a page" placeholder="Find a page…" />
      <Combobox.Content>
        {navigationPages.map((page) => (
          <Combobox.Option
            key={page.path}
            value={page.path}
            textValue={page.label}
            keywords={[page.group]}
          >
            <span>{page.label}</span>
            <span className={styles.optionGroup}>{page.group}</span>
          </Combobox.Option>
        ))}
        <Combobox.Empty>No matching pages</Combobox.Empty>
      </Combobox.Content>
    </Combobox>
  );
}

function Notifications({
  showOverlayArrows,
  indicator,
}: {
  showOverlayArrows: boolean;
  indicator: NotificationIndicator;
}) {
  const [open, setOpen] = useState(false);
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
                <Button {...props} iconOnly variant="text" aria-label="Notifications">
                  <Badge
                    dot={indicator === 'dot'}
                    {...(indicator === 'count' ? { count: 1 } : {})}
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
        <Tooltip.Content placement="bottom">Notifications</Tooltip.Content>
      </Tooltip>
      <Popover.Content
        className={styles.infoPanel}
        placement="bottomEnd"
        aria-label="Notifications"
        arrow={showOverlayArrows}
      >
        <strong>Notifications</strong>
        <p>Welcome to Virgo Studio.</p>
        <Separator decorative />
        <p>Workplace snapshot · October 1, 2026</p>
      </Popover.Content>
    </Popover>
  );
}

export function AppShell({ profile }: { profile: ProfileState }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentPage = proRouting.match(pathname);
  const currentGroup = currentPage?.group;
  const CurrentGroupIcon = currentGroup ? iconComponents[currentGroup.icon] : undefined;
  const CurrentPageIcon = currentPage?.icon ? iconComponents[currentPage.icon] : undefined;
  const { settings, setSettings, updateSettings, resetSettings, theme, storageAvailable } =
    useProSettings();
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
  const [accountOpen, setAccountOpen] = useState(false);
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
    document.title = `${currentPage?.label ?? 'Page not found'} · Virgo Design Pro`;
    contentRef.current?.scrollTo({ top: 0 });
    contentRef.current?.focus({ preventScroll: true });
  }, [pathname, currentPage?.label]);

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

  return (
    <Tooltip.Provider size="small" arrow={settings.showOverlayArrows}>
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
              Skip to content
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
                              ? 'Restore navigation'
                              : 'Virgo Design Pro home'
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
                          <img src="/virgo-design.svg" alt="" width="590" height="470" />
                        </Layout.SidebarTrigger>
                      )}
                    />
                    <Tooltip.Content>Restore navigation</Tooltip.Content>
                  </Tooltip>
                  <Link
                    to={proRouteConfig.homePath}
                    className={styles.brandHome}
                    aria-label="Virgo Design Pro home"
                  >
                    Virgo Design
                  </Link>
                  <Tag size="sm" intent="brand" variant="soft" className={styles.proBadge}>
                    PRO
                  </Tag>
                </div>
              }
              actions={
                <div className={styles.actions}>
                  <Tooltip>
                    <Tooltip.Trigger
                      render={(props) => (
                        <Button
                          {...props}
                          iconOnly
                          variant="text"
                          aria-label={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                          onClick={(event) => {
                            props.onClick?.(event);
                            if (!event.defaultPrevented)
                              updateSettings({ appearance: theme === 'light' ? 'dark' : 'light' });
                          }}
                        >
                          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>
                      )}
                    />
                    <Tooltip.Content>
                      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </Tooltip.Content>
                  </Tooltip>
                  <Notifications
                    showOverlayArrows={settings.showOverlayArrows}
                    indicator={settings.notificationIndicator}
                  />
                  {settings.showHeader ? <SettingsTrigger {...settingsTriggerProps} /> : null}
                  <Separator orientation="vertical" decorative className={styles.actionDivider} />
                  <Popover open={accountOpen} onOpenChange={setAccountOpen}>
                    <Popover.Trigger
                      render={(props) => (
                        <Button
                          {...props}
                          variant="text"
                          size="large"
                          className={styles.account}
                          aria-label={`${profile.name} account`}
                          trailingIcon={<ChevronDownIcon className={styles.accountChevron} />}
                        >
                          <Avatar
                            size="sm"
                            fallback={profileInitials(profile.name).slice(0, 1)}
                            {...(profile.avatarImage ? { src: profile.avatarImage } : {})}
                            style={{
                              background: profile.avatarColor,
                              color: avatarForeground(profile.avatarColor),
                            }}
                            className={styles.userAvatar}
                          />
                          <span className={styles.accountName}>{profile.name}</span>
                        </Button>
                      )}
                    />
                    <Popover.Content
                      className={styles.infoPanel}
                      placement="bottomEnd"
                      arrow={settings.showOverlayArrows}
                    >
                      <strong>{profile.name}</strong>
                      <p>Workspace owner · Virgo Studio</p>
                      <Separator decorative />
                      <Button
                        variant="text"
                        onClick={() => {
                          setAccountOpen(false);
                          navigate('/profile');
                        }}
                      >
                        View profile
                      </Button>
                    </Popover.Content>
                  </Popover>
                </div>
              }
            >
              <PageSearch key={pathname} />
            </Layout.Header>

            <Layout direction="horizontal" className={styles.body!}>
              <Layout.Sidebar
                className={styles.sidebar}
                data-rail-icon-size={settings.sidebarRailWidth > 64 ? 'large' : 'regular'}
                width={sidebarWidth}
                resizable={settings.sidebarResizable}
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
                        TEAM WORKSPACE
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
                        {sidebarState !== 'expanded' ? 'Expand sidebar' : 'Collapse sidebar'}
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
                  aria-label="Close navigation"
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
                      <Breadcrumb aria-label="Page breadcrumb">
                        {CurrentGroupIcon && currentGroup ? (
                          <Breadcrumb.Item
                            aria-current={false}
                            icon={<CurrentGroupIcon />}
                            className={styles.breadcrumbIcon!}
                          >
                            <span className={styles.breadcrumbIconLabel}>{currentGroup.label}</span>
                          </Breadcrumb.Item>
                        ) : null}
                        {currentGroup && currentGroup.label !== currentPage.label ? (
                          <Breadcrumb.Item aria-current={false}>
                            {currentGroup.label}
                          </Breadcrumb.Item>
                        ) : null}
                        <Breadcrumb.Item
                          {...(CurrentPageIcon ? { icon: <CurrentPageIcon /> } : {})}
                        >
                          {currentPage.label}
                        </Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                  ) : null}
                  <div className={styles.pageContent}>
                    <Outlet context={{ showOverlayArrows: settings.showOverlayArrows }} />
                  </div>
                  {settings.showFooter ? (
                    <footer className={styles.contentFooter}>
                      <Link to={proRouteConfig.homePath}>Virgo Design Pro</Link>
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
      </Drawer>
    </Tooltip.Provider>
  );
}
