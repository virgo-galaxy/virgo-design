import { LayoutIcon, SidebarCollapseIcon, SidebarExpandIcon } from '@virgo-design/icons';
import { Button, Layout, type LayoutSidebarDisplayState, NavigationMenu, Surface } from '@virgo-design/ui';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './LayoutOverlaySidebarExample.module.scss';

function SidebarBrand() {
  const { t } = useTranslation();

  return <span aria-label={t('examples.layout.copy.logo')} className={styles.root!} />;
}

function Navigation({ compact = false }: { compact?: boolean }) {
  const { t } = useTranslation();
  const [value, setValue] = useState('menu-1');

  return (
    <NavigationMenu
      orientation="vertical"
      value={value}
      onValueChange={setValue}
      aria-label={t('examples.layout.copy.workspaceNavigation')}
    >
      <NavigationMenu.List>
        {[
          { id: 'menu-1', label: t('examples.layout.details.menu1') },
          { id: 'menu-2', label: t('examples.layout.details.menu2') },
          { id: 'menu-3', label: t('examples.layout.details.menu3') },
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
  const { t } = useTranslation();

  const [sidebarState, setSidebarState] = useState<LayoutSidebarDisplayState>('collapsed');
  const collapsed = sidebarState !== 'expanded';
  const sidebarId = useId();

  return (
    <div className={styles.stage!} data-sidebar-state={sidebarState}>
      <Layout className={styles.layout!}>
        <Layout.Header
          contentAlign="center"
          height={64}
          logo={
            <Button
              variant="text"
              className={styles.sidebarTrigger!}
              iconOnly
              aria-label={
                collapsed
                  ? t('examples.layout.details.expandSidebar')
                  : t('examples.layout.details.collapseSidebar')
              }
              aria-expanded={!collapsed}
              aria-controls={sidebarId}
              onClick={() =>
                  setSidebarState((state) => state === 'expanded' ? 'collapsed' : 'expanded')
                }
            >
              {collapsed ? <SidebarExpandIcon /> : <SidebarCollapseIcon />}
            </Button>
          }
          className={styles.header!}
          surface={{ tone: 'default', border: 'subtle' }}
        >
          <span className={styles.label!}>{t('examples.layout.copy.header')}</span>
        </Layout.Header>
        <Layout direction="horizontal" className={styles.layout2!}>
          <Layout.Sidebar
            state={sidebarState}
            onStateChange={setSidebarState}
            id={sidebarId}
            trigger={null}
            collapsible
            mode="overlay"
            aria-label={t('examples.layout.copy.overlaySidebarRegion')}
            width={224}
            collapsedWidth={0}
            header={<SidebarBrand />}
          >
            {({ collapsed }) => <Navigation compact={collapsed} />}
          </Layout.Sidebar>
          <Layout.Content
            as="div"
            padding={16}
            surface={{ tone: 'secondary' }}
            className={styles.content!}
          >
            <Surface tone="elevated" radius={12} border="subtle" className={styles.surface!}>
              <span className={styles.label2!}>{t('examples.layout.copy.content')}</span>
            </Surface>
          </Layout.Content>
        </Layout>
        <Layout.Footer surface={{ tone: 'default', border: 'subtle' }} className={styles.footer!}>
          <span className={styles.label2!}>{t('examples.layout.copy.footer')}</span>
        </Layout.Footer>
      </Layout>
    </div>
  );
}
