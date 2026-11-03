import { GaugeIcon } from '@virgo-design/icons';
import { Breadcrumb, Layout, type LayoutSidebarDisplayState, Tooltip } from '@virgo-design/ui';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { usePathname } from '@/app/navigation';
import { workplacePath } from '@/app/paths';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  type AppearanceMode,
  appearanceStorageKey,
  readAppearance,
} from '@/preferences/appearance';
import { writePreference } from '@/preferences/storage';
import * as classes from '@/styles/classes';

import { AppFooter } from './footer/AppFooter';
import { Navbar } from './navbar/Navbar';
import { AppSidebar } from './sidebar/AppSidebar';

export function AppShell({ children }: { children: ReactNode }) {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const narrow = useMediaQuery('(max-width: 1080px)');
  const dark = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<AppearanceMode>();
  const appearance = !mode || mode === 'system' ? (dark ? 'dark' : 'light') : mode;
  const [desktopState, setDesktopState] = useState<LayoutSidebarDisplayState>('expanded');
  const [mobileSidebar, setMobileSidebar] = useState<{
    pathname: string;
    state: LayoutSidebarDisplayState;
  }>();
  const sidebarState = narrow
    ? mobileSidebar?.pathname === pathname
      ? mobileSidebar.state
      : 'collapsed'
    : desktopState;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const workplace = pathname === workplacePath;

  useEffect(() => setMode(readAppearance()), []);

  useEffect(() => {
    if (!mode) return;
    const root = document.documentElement;
    root.lang = i18n.resolvedLanguage ?? 'en-US';
    root.dataset.virgoTheme = 'virgo';
    root.dataset.theme = appearance;
    root.style.colorScheme = appearance;
    document.title = `${t(workplace ? 'app.workplace' : 'notFound')} · ${t('app.virgoDesignPro')}`;
  }, [appearance, i18n.resolvedLanguage, mode, t, workplace]);

  useEffect(() => {
    contentRef.current?.scrollTo?.({ top: 0 });
    contentRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  function setAppearanceMode(next: AppearanceMode) {
    setMode(next);
    writePreference(appearanceStorageKey, next);
  }

  function setSidebarState(state: LayoutSidebarDisplayState) {
    if (narrow) setMobileSidebar({ pathname, state });
    else setDesktopState(state);
  }

  return (
    <Tooltip.Provider size="medium" arrow>
      <Layout.SidebarProvider
        id="starter-sidebar"
        state={sidebarState}
        onStateChange={setSidebarState}
      >
        <Layout
          direction="vertical"
          data-theme={appearance}
          className={classes.shell}
          onKeyDown={(event) => {
            if (
              event.key === 'Escape' &&
              narrow &&
              sidebarState === 'expanded' &&
              !event.defaultPrevented
            ) {
              setSidebarState('collapsed');
              toggleRef.current?.focus();
            }
          }}
        >
          <a className={classes.skipLink} href="#pro-main">
            {t('app.skipToContent')}
          </a>
          <Navbar
            narrow={narrow}
            sidebarState={sidebarState}
            appearance={appearance}
            appearanceMode={mode ?? 'system'}
            onAppearanceChange={setAppearanceMode}
          />
          <Layout direction="horizontal" className={classes.frame}>
            <AppSidebar narrow={narrow} state={sidebarState} toggleRef={toggleRef} />
            <Layout.Content
              id="pro-main"
              ref={contentRef}
              tabIndex={-1}
              scrollable
              className={classes.main}
            >
              <div className={classes.mainInner}>
                {workplace ? (
                  <div className={classes.breadcrumb}>
                    <Breadcrumb aria-label={t('app.pageBreadcrumb')}>
                      <Breadcrumb.Item
                        aria-current={false}
                        icon={<GaugeIcon />}
                        className={classes.breadcrumbIcon}
                      >
                        <span className={classes.visuallyHidden}>{t('app.dashboard')}</span>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item aria-current={false}>{t('app.dashboard')}</Breadcrumb.Item>
                      <Breadcrumb.Item>{t('app.workplace')}</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                ) : null}
                <div className={classes.outlet}>{children}</div>
                <AppFooter />
              </div>
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout.SidebarProvider>
    </Tooltip.Provider>
  );
}
