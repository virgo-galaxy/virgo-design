import {
  ChevronDownIcon,
  CircleInfoIcon,
  MoonIcon,
  SearchIcon,
  ShapesIcon,
  SunIcon,
} from '@virgo-design/icons';
import {
  Avatar,
  Breadcrumb,
  Button,
  Combobox,
  Layout,
  NavigationMenu,
  Popover,
  Separator,
  Tag,
  Tooltip,
} from '@virgo-design/ui';
import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';

import { snapshot } from '@/data/workplace';

import styles from './AppShell.module.scss';
import { navigationGroups, navigationPages } from './navigation';

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

export function AppShell() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentPage = navigationPages.find((page) => page.path === pathname);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [accountOpen, setAccountOpen] = useState(false);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.title = `${currentPage?.label ?? 'Page not found'} · Virgo Design Pro`;
    contentRef.current?.scrollTo({ top: 0 });
    contentRef.current?.focus({ preventScroll: true });
  }, [pathname, currentPage?.label]);

  return (
    <Layout className={styles.shell!} direction="vertical" data-theme={theme}>
      <a className={styles.skipLink} href="#pro-main">
        Skip to content
      </a>
      <Layout.Header
        className={styles.header!}
        height="var(--vd-sizing-64)"
        surface={{ tone: 'default' }}
        logo={
          <Link
            to="/dashboard/workplace"
            className={styles.brand}
            aria-label="Virgo Design Pro home"
          >
            <ShapesIcon />
            <span>Virgo Design</span>
            <Tag size="sm" variant="outline">
              PRO
            </Tag>
          </Link>
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
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} appearance`}
                    onClick={(event) => {
                      props.onClick?.(event);
                      if (!event.defaultPrevented) setTheme(theme === 'light' ? 'dark' : 'light');
                    }}
                  >
                    {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                  </Button>
                )}
              />
              <Tooltip.Content>Switch appearance</Tooltip.Content>
            </Tooltip>
            <Popover>
              <Popover.Trigger
                render={(props) => (
                  <Button {...props} iconOnly variant="text" aria-label="Workspace information">
                    <CircleInfoIcon />
                  </Button>
                )}
              />
              <Popover.Content className={styles.infoPanel} placement="bottomEnd">
                <strong>Welcome to Virgo Studio</strong>
                <p>A shared space for focused work and thoughtful delivery.</p>
                <Separator decorative />
                <p>Workplace snapshot · October 1, 2026</p>
              </Popover.Content>
            </Popover>
            <Separator orientation="vertical" decorative className={styles.actionDivider} />
            <Popover open={accountOpen} onOpenChange={setAccountOpen}>
              <Popover.Trigger variant="text" className={styles.account}>
                <Avatar size="sm" fallback={snapshot.user.initials} className={styles.userAvatar} />
                <span className={styles.accountName}>Mystic</span>
                <ChevronDownIcon />
              </Popover.Trigger>
              <Popover.Content className={styles.infoPanel} placement="bottomEnd">
                <strong>Mystic</strong>
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
        <div className={styles.workspaceName}>
          <span className={styles.statusDot} />
          {snapshot.workspace}
          <span className={styles.workspaceContext}>/ Team workspace</span>
        </div>
        <PageSearch key={pathname} />
      </Layout.Header>

      <Layout direction="horizontal" className={styles.body!}>
        <Layout.Sidebar
          className={styles.sidebar}
          width={224}
          collapsedWidth={64}
          collapsible
          collapseBelow={1080}
          surface={{ tone: 'default' }}
          footer={({ collapsed }) => (
            <div className={styles.sidebarFooter}>
              {collapsed ? (
                <span className={styles.statusDot} title="All systems operational" />
              ) : (
                <>
                  <span className={styles.statusDot} />
                  <span>All systems operational</span>
                </>
              )}
            </div>
          )}
        >
          {({ collapsed }) => (
            <NavigationMenu
              orientation="vertical"
              value={pathname}
              className={styles.navigation}
              data-compact={collapsed}
              aria-label="Main navigation"
            >
              <NavigationMenu.List>
                {navigationGroups.map((group) => (
                  <NavigationMenu.Group key={group.label} aria-labelledby={`nav-${group.label}`}>
                    <NavigationMenu.GroupLabel
                      id={`nav-${group.label}`}
                      className={styles.groupLabel}
                    >
                      {group.label}
                    </NavigationMenu.GroupLabel>
                    <NavigationMenu.List>
                      {group.pages.map((page) => (
                        <NavigationMenu.Item key={page.path} value={page.path} icon={<page.icon />}>
                          <NavigationMenu.Link
                            href={page.path}
                            aria-label={page.label}
                            title={collapsed ? page.label : undefined}
                            render={(props) => <Link {...props} to={page.path} />}
                          >
                            {page.label}
                          </NavigationMenu.Link>
                        </NavigationMenu.Item>
                      ))}
                    </NavigationMenu.List>
                  </NavigationMenu.Group>
                ))}
              </NavigationMenu.List>
            </NavigationMenu>
          )}
        </Layout.Sidebar>
        <Layout.Content
          id="pro-main"
          ref={contentRef}
          tabIndex={-1}
          scrollable
          className={styles.main!}
        >
          <div className={styles.content}>
            <div className={styles.contextBar}>
              <Breadcrumb aria-label="Page breadcrumb">
                <Breadcrumb.Item
                  href="/dashboard/workplace"
                  onClick={(event) => {
                    if (
                      !event.ctrlKey &&
                      !event.metaKey &&
                      !event.shiftKey &&
                      !event.altKey &&
                      event.button === 0
                    ) {
                      event.preventDefault();
                      navigate('/dashboard/workplace');
                    }
                  }}
                >
                  Virgo Pro
                </Breadcrumb.Item>
                {currentPage && currentPage.group !== currentPage.label ? (
                  <Breadcrumb.Item aria-current={false}>{currentPage.group}</Breadcrumb.Item>
                ) : null}
                <Breadcrumb.Item>{currentPage?.label ?? 'Page not found'}</Breadcrumb.Item>
              </Breadcrumb>
              <span className={styles.environment}>
                <span className={styles.statusDot} />
                TEAM WORKSPACE
              </span>
            </div>
            <Outlet />
            <footer className={styles.contentFooter}>
              <span>Virgo Design Pro</span>
              <span>A little more clarity. A lot more progress.</span>
            </footer>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
