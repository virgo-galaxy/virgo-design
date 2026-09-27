import { LayoutIcon } from '@virgo-design/icons';
import { Layout, NavigationMenu, Surface } from '@virgo-design/ui';
import { useState } from 'react';

const labelStyle = {
  fontSize: 12,
  fontWeight: 400,
  color: 'var(--vd-text-tertiary)',
} as const;

export default function App() {
  const [value, setValue] = useState('menu-1');
  const [collapsed, setCollapsed] = useState(true);

  const sidebarWidth = 224;
  const collapsedSidebarWidth = 64;
  const sidebarOffset = 16;
  const headerLogoGap = 16;
  const headerLogoWidth = sidebarWidth - headerLogoGap * 2;
  // Reserve the sidebar and its offset; Content's padding supplies the 16px gap.
  const contentInset = sidebarOffset + (collapsed ? collapsedSidebarWidth : sidebarWidth);

  return (
    <div
      style={{
        width: '100%',
        height: 560,
        border: '1px solid var(--vd-border-subtle)',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <Layout style={{ height: '100%' }}>
        <Layout.Header
          height={64}
          surface={{ tone: 'default', border: 'subtle' }}
          style={{ position: 'relative', padding: 0 }}
        >
          <span
            aria-label="Logo"
            style={{
              position: 'absolute',
              insetInlineStart: headerLogoGap,
              insetBlockStart: '50%',
              width: headerLogoWidth,
              height: 'var(--vd-sizing-32)',
              borderRadius: 'var(--vd-radius-6)',
              background: 'var(--vd-surface-strong)',
              transform: 'translateY(-50%)',
            }}
          />
          <span
            style={{
              ...labelStyle,
              position: 'absolute',
              insetBlock: 0,
              insetInlineStart: contentInset,
              insetInlineEnd: 0,
              display: 'grid',
              placeItems: 'center',
              transition: 'inset-inline-start 220ms ease',
            }}
          >
            Header
          </span>
        </Layout.Header>
        <Layout.Content padding={16} surface={{ tone: 'secondary' }} style={{ minHeight: 0 }}>
          <Surface
            tone="elevated"
            radius={12}
            border="subtle"
            style={{
              position: 'relative',
              height: '100%',
              minHeight: 0,
              marginInlineStart: contentInset,
              transition: 'margin-inline-start 220ms ease',
            }}
          >
            <span
              style={{
                ...labelStyle,
                position: 'absolute',
                inset: 0,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              Content
            </span>
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
