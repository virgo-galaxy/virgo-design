import { LayoutIcon, SidebarCollapseIcon, SidebarExpandIcon } from '@virgo-design/icons';
import { Button, Layout, NavigationMenu, Surface } from '@virgo-design/ui';
import { useId, useState } from 'react';

const labelStyle = {
  fontSize: 12,
  fontWeight: 400,
  color: 'var(--vd-text-tertiary)',
} as const;

function SidebarBrand() {
  return (
    <span
      aria-label="Logo"
      style={{
        display: 'block',
        width: '100%',
        height: 'var(--vd-sizing-32)',
        // Cancel the Sidebar's outer top inset, not the header slot's own padding.
        // The resulting brand row is 16 + 32 + 16 = 64px, matching Layout.Header.
        marginBlockStart: 'calc(-1 * var(--vd-spacing-16))',
        borderRadius: 'var(--vd-radius-6)',
        background: 'var(--vd-surface-strong)',
      }}
    />
  );
}

function Navigation({ compact = false }: { compact?: boolean }) {
  const [value, setValue] = useState('menu-1');
  return (
    <NavigationMenu
      orientation="vertical"
      value={value}
      onValueChange={setValue}
      aria-label="Workspace navigation"
    >
      <NavigationMenu.List>
        {[
          { id: 'menu-1', label: 'Menu 1' },
          { id: 'menu-2', label: 'Menu 2' },
          { id: 'menu-3', label: 'Menu 3' },
        ].map(({ id, label }) => (
          <NavigationMenu.Item key={id} value={id} icon={<LayoutIcon />}>
            <NavigationMenu.Link
              href={`#${id}`}
              aria-label={label}
              title={compact ? label : undefined}
              onClick={(event) => {
                event.preventDefault();
                setValue(id);
              }}
            >
              {compact ? null : label}
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu>
  );
}

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarId = useId();

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
      <Layout direction="horizontal" style={{ height: '100%' }}>
        <Layout.Sidebar
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          id={sidebarId}
          trigger={null}
          collapsible
          mode="inline"
          aria-label="External sidebar control region"
          width={224}
          collapsedWidth={64}
          header={<SidebarBrand />}
        >
          {({ collapsed }) => <Navigation compact={collapsed} />}
        </Layout.Sidebar>
        <Layout>
          <Layout.Header
            height={64}
            logo={
              <Button
                variant="text"
                iconOnly
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                aria-expanded={!collapsed}
                aria-controls={sidebarId}
                onClick={() => setCollapsed((value) => !value)}
              >
                {collapsed ? <SidebarExpandIcon /> : <SidebarCollapseIcon />}
              </Button>
            }
            style={{ position: 'relative', flexWrap: 'wrap', gap: 12, padding: '12px 16px' }}
            surface={{ tone: 'default', border: 'subtle' }}
          >
            <span
              style={{
                position: 'absolute',
                insetInlineStart: '50%',
                transform: 'translateX(-50%)',
                fontSize: 12,
                fontWeight: 400,
                color: 'var(--vd-text-tertiary)',
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
              style={{ display: 'grid', height: '100%', minHeight: 0, placeItems: 'center' }}
            >
              <span style={labelStyle}>Content</span>
            </Surface>
          </Layout.Content>
          <Layout.Footer
            surface={{ tone: 'default', border: 'subtle' }}
            style={{ display: 'grid', height: 48, placeItems: 'center', padding: '0 16px' }}
          >
            <span style={labelStyle}>Footer</span>
          </Layout.Footer>
        </Layout>
      </Layout>
    </div>
  );
}
