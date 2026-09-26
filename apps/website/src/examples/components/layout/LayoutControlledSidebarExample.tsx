import {
  DashboardIcon,
  HomeIcon,
  LayoutIcon,
  SettingsIcon,
  SidebarCollapseIcon,
  SidebarExpandIcon,
} from '@virgo-design/icons';
import { Button, Layout, NavigationMenu, Surface } from '@virgo-design/ui';
import { useId, useState } from 'react';

function Navigation({ compact = false }: { compact?: boolean }) {
  const [value, setValue] = useState('overview');
  return (
    <NavigationMenu
      orientation="vertical"
      value={value}
      onValueChange={setValue}
      aria-label="Workspace navigation"
    >
      <NavigationMenu.List>
        {[
          { id: 'overview', label: 'Overview', Icon: HomeIcon },
          { id: 'projects', label: 'Projects', Icon: LayoutIcon },
          { id: 'activity', label: 'Activity', Icon: DashboardIcon },
        ].map(({ id, label, Icon }) => (
          <NavigationMenu.Item key={id} value={id} icon={<Icon />}>
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

function Content() {
  return (
    <Surface tone="elevated" border="subtle" radius={8} style={{ padding: 16, minWidth: 0 }}>
      <strong>Room for your work</strong>
      <p style={{ color: 'var(--vd-text-secondary)' }}>
        Navigation and content share the available space.
      </p>
    </Surface>
  );
}

export default function App() {
  const [wide, setWide] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const sidebarId = useId();
  return (
    <div
      style={{
        width: '100%',
        border: '1px solid var(--vd-border-subtle)',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <Layout direction="horizontal" minHeight={360}>
        <Layout.Sidebar
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          id={sidebarId}
          trigger={null}
          collapsible
          mode="inline"
          aria-label="External sidebar control region"
          width={wide ? 'min(288px, 50%)' : 'min(240px, 45%)'}
          collapsedWidth={64}
          header={({ collapsed }) => (
            <strong aria-label="Virgo">{collapsed ? 'V' : 'Virgo'}</strong>
          )}
          footer={({ collapsed }) =>
            collapsed ? (
              <Button variant="text" size="small" iconOnly aria-label="Settings">
                <SettingsIcon />
              </Button>
            ) : (
              <Button variant="text" size="small" leadingIcon={<SettingsIcon />}>
                Settings
              </Button>
            )
          }
        >
          {({ collapsed }) => <Navigation compact={collapsed} />}
        </Layout.Sidebar>
        <Layout>
          <Layout.Header
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
            style={{ flexWrap: 'wrap', gap: 12, padding: '12px 16px' }}
            actions={
              <Button variant="text" size="small" onClick={() => setWide((value) => !value)}>
                {wide ? 'Standard width' : 'Wider sidebar'}
              </Button>
            }
            surface={{ tone: 'default', border: 'subtle' }}
          />
          <Layout.Content padding={16} surface={{ tone: 'secondary' }}>
            <Content />
          </Layout.Content>
          <Layout.Footer style={{ padding: 16, color: 'var(--vd-text-secondary)' }}>
            This example owns its navigation and sidebar state.
          </Layout.Footer>
        </Layout>
      </Layout>
    </div>
  );
}
