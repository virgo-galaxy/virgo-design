import { LayoutIcon } from '@virgo-design/icons';
import { Layout, type LayoutSidebarDisplayState, NavigationMenu, Surface } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './LayoutFloatingSidebarExample.module.scss';

export default function App() {
  const { t } = useTranslation();
  const [value, setValue] = useState('menu-1');
  const [sidebarState, setSidebarState] = useState<LayoutSidebarDisplayState>('collapsed');

  const sidebarWidth = 224;
  const collapsedSidebarWidth = 64;
  const sidebarOffset = 16;

  return (
    <div className={styles.root!} data-sidebar-state={sidebarState}>
      <Layout className={styles.layout!}>
        <Layout.Header
          contentAlign="center"
          height={64}
          surface={{ tone: 'default', border: 'subtle' }}
          className={styles.header!}
        >
          <span aria-label={t('examples.layout.copy.logo')} className={styles.label!} />
          <span className={styles.label2!}>{t('examples.layout.copy.header')}</span>
        </Layout.Header>
        <Layout.Content
          as="div"
          padding={16}
          surface={{ tone: 'secondary' }}
          className={styles.content!}
        >
          <Surface tone="elevated" radius={12} border="subtle" className={styles.surface!}>
            <span className={styles.label3!}>{t('examples.layout.copy.content')}</span>
          </Surface>
          <Layout.Sidebar
            aria-label={t('examples.layout.copy.floatingSidebar')}
            mode="floating"
            state={sidebarState}
            onStateChange={setSidebarState}
            collapsible
            width={sidebarWidth}
            collapsedWidth={collapsedSidebarWidth}
            offset={sidebarOffset}
          >
            {({ collapsed }) => (
              <NavigationMenu
                orientation="vertical"
                submenu="popover"
                value={value}
                onValueChange={setValue}
                aria-label={t('examples.layout.copy.floatingNavigation')}
              >
                <NavigationMenu.List>
                  <NavigationMenu.Item value="menu-1" icon={<LayoutIcon />}>
                    <NavigationMenu.Link
                      href="#menu-1"
                      aria-label={t('examples.layout.copy.menu1')}
                      title={collapsed ? t('examples.layout.details.menu1') : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        setValue('menu-1');
                      }}
                    >
                      {collapsed ? null : t('examples.layout.details.menu1')}
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item value="menu-2" icon={<LayoutIcon />}>
                    <NavigationMenu.Trigger
                      aria-label={t('examples.layout.copy.menu2')}
                      title={collapsed ? t('examples.layout.details.menu2') : undefined}
                      indicator={!collapsed}
                    >
                      {collapsed ? null : t('examples.layout.details.menu2')}
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                      <NavigationMenu.Item value="submenu-1" icon={<LayoutIcon />}>
                        <NavigationMenu.Link
                          href="#submenu-1"
                          onClick={(event) => {
                            event.preventDefault();
                            setValue('submenu-1');
                          }}
                        >
                          {t('examples.layout.copy.submenu1')}
                        </NavigationMenu.Link>
                      </NavigationMenu.Item>
                      <NavigationMenu.Item value="submenu-2" icon={<LayoutIcon />}>
                        <NavigationMenu.Link
                          href="#submenu-2"
                          onClick={(event) => {
                            event.preventDefault();
                            setValue('submenu-2');
                          }}
                        >
                          {t('examples.layout.copy.submenu2')}
                        </NavigationMenu.Link>
                      </NavigationMenu.Item>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item value="menu-3" icon={<LayoutIcon />}>
                    <NavigationMenu.Link
                      href="#menu-3"
                      aria-label={t('examples.layout.copy.menu3')}
                      title={collapsed ? t('examples.layout.details.menu3') : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        setValue('menu-3');
                      }}
                    >
                      {collapsed ? null : t('examples.layout.details.menu3')}
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                </NavigationMenu.List>
              </NavigationMenu>
            )}
          </Layout.Sidebar>
        </Layout.Content>
      </Layout>
    </div>
  );
}
