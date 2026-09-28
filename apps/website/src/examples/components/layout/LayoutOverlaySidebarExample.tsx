import { LayoutIcon, SidebarCollapseIcon, SidebarExpandIcon } from '@virgo-design/icons';
import { Button, Layout, NavigationMenu, Surface } from '@virgo-design/ui';
import { useId, useState } from 'react';

import styles from './LayoutOverlaySidebarExample.module.scss';

function SidebarBrand() {
  return <span aria-label="Logo" className={styles.root!} />;
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
  const [collapsed, setCollapsed] = useState(true);
  const sidebarId = useId();

  return (
    <div className={styles.stage!} data-sidebar-state={collapsed ? 'collapsed' : 'expanded'}>
      <Layout className={styles.layout!}>
        <Layout.Header
          contentAlign="center"
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
          className={styles.header!}
          surface={{ tone: 'default', border: 'subtle' }}
        >
          <span className={styles.label!}>Header</span>
        </Layout.Header>
        <Layout direction="horizontal" className={styles.layout2!}>
          <Layout.Sidebar
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
            id={sidebarId}
            trigger={null}
            collapsible
            mode="overlay"
            aria-label="Overlay sidebar region"
            width={224}
            collapsedWidth={0}
            header={<SidebarBrand />}
          >
            {({ collapsed }) => <Navigation compact={collapsed} />}
          </Layout.Sidebar>
          <Layout.Content padding={16} surface={{ tone: 'secondary' }} className={styles.content!}>
            <Surface tone="elevated" radius={12} border="subtle" className={styles.surface!}>
              <span className={styles.label2!}>Content</span>
            </Surface>
          </Layout.Content>
        </Layout>
        <Layout.Footer surface={{ tone: 'default', border: 'subtle' }} className={styles.footer!}>
          <span className={styles.label2!}>Footer</span>
        </Layout.Footer>
      </Layout>
    </div>
  );
}
