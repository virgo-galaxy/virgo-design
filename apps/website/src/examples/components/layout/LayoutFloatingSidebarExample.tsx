import { DashboardIcon, GlobeIcon, HomeIcon, LayoutIcon, SettingsIcon } from '@virgo-design/icons';
import { Layout, NavigationMenu } from '@virgo-design/ui';
import { useState } from 'react';

export default function App() {
  const [value, setValue] = useState('home');
  return (
    <div
      style={{
        width: '100%',
        border: '1px solid var(--vd-border-subtle)',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <Layout>
        <Layout.Header
          logo={<strong>Virgo</strong>}
          surface={{ tone: 'default', border: 'subtle' }}
          style={{ flexWrap: 'wrap', gap: 12, padding: '12px 16px' }}
        >
          Floating navigation
        </Layout.Header>
        <Layout.Content surface={{ tone: 'secondary' }} style={{ minHeight: 480 }}>
          <div
            style={{
              position: 'absolute',
              top: 24,
              insetInlineEnd: 24,
              maxWidth: 260,
              textAlign: 'end',
              color: 'var(--vd-text-secondary)',
            }}
          >
            <strong>A canvas with room to move</strong>
            <p>Navigation floats inside this region.</p>
          </div>
          <Layout.Sidebar
            aria-label="Floating sidebar"
            mode="floating"
            collapsible
            width="min(240px, 75%)"
            offset={16}
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
                  <NavigationMenu.Item value="home" icon={<HomeIcon />}>
                    <NavigationMenu.Link
                      href="#home"
                      aria-label="Home"
                      title={collapsed ? 'Home' : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        setValue('home');
                      }}
                    >
                      {collapsed ? null : 'Home'}
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item value="projects" icon={<LayoutIcon />}>
                    <NavigationMenu.Trigger
                      aria-label="Projects"
                      title={collapsed ? 'Projects' : undefined}
                      indicator={!collapsed}
                    >
                      {collapsed ? null : 'Projects'}
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                      <NavigationMenu.Item value="cloud" icon={<GlobeIcon />}>
                        <NavigationMenu.Link
                          href="#cloud"
                          onClick={(event) => {
                            event.preventDefault();
                            setValue('cloud');
                          }}
                        >
                          Cloud
                        </NavigationMenu.Link>
                      </NavigationMenu.Item>
                      <NavigationMenu.Item value="storage" icon={<DashboardIcon />}>
                        <NavigationMenu.Link
                          href="#storage"
                          onClick={(event) => {
                            event.preventDefault();
                            setValue('storage');
                          }}
                        >
                          Storage
                        </NavigationMenu.Link>
                      </NavigationMenu.Item>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item value="settings" icon={<SettingsIcon />}>
                    <NavigationMenu.Link
                      href="#settings"
                      aria-label="Settings"
                      title={collapsed ? 'Settings' : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        setValue('settings');
                      }}
                    >
                      {collapsed ? null : 'Settings'}
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
