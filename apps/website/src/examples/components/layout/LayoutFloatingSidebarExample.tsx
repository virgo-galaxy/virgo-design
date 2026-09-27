import { LayoutIcon } from '@virgo-design/icons';
import { Layout, NavigationMenu, Surface } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './LayoutFloatingSidebarExample.module.scss';

export default function App() {
  const [value, setValue] = useState('menu-1');
  const [collapsed, setCollapsed] = useState(true);

  const sidebarWidth = 224;
  const collapsedSidebarWidth = 64;
  const sidebarOffset = 16;

  return (
    <div className={styles.root!} data-sidebar-state={collapsed ? 'collapsed' : 'expanded'}>
      <Layout className={styles.layout!}>
        <Layout.Header
          height={64}
          surface={{ tone: 'default', border: 'subtle' }}
          className={styles.header!}
        >
          <span aria-label="Logo" className={styles.label!} />
          <span className={styles.label2!}>Header</span>
        </Layout.Header>
        <Layout.Content padding={16} surface={{ tone: 'secondary' }} className={styles.content!}>
          <Surface tone="elevated" radius={12} border="subtle" className={styles.surface!}>
            <span className={styles.label3!}>Content</span>
          </Surface>
          <Layout.Sidebar
            aria-label="Floating sidebar"
            mode="floating"
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
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
                aria-label="Floating navigation"
              >
                <NavigationMenu.List>
                  <NavigationMenu.Item value="menu-1" icon={<LayoutIcon />}>
                    <NavigationMenu.Link
                      href="#menu-1"
                      aria-label="Menu 1"
                      title={collapsed ? 'Menu 1' : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        setValue('menu-1');
                      }}
                    >
                      {collapsed ? null : 'Menu 1'}
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item value="menu-2" icon={<LayoutIcon />}>
                    <NavigationMenu.Trigger
                      aria-label="Menu 2"
                      title={collapsed ? 'Menu 2' : undefined}
                      indicator={!collapsed}
                    >
                      {collapsed ? null : 'Menu 2'}
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
                          Submenu 1
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
                          Submenu 2
                        </NavigationMenu.Link>
                      </NavigationMenu.Item>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item value="menu-3" icon={<LayoutIcon />}>
                    <NavigationMenu.Link
                      href="#menu-3"
                      aria-label="Menu 3"
                      title={collapsed ? 'Menu 3' : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        setValue('menu-3');
                      }}
                    >
                      {collapsed ? null : 'Menu 3'}
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
