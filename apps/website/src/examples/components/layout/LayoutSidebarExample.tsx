import { LayoutIcon } from '@virgo-design/icons';
import { Layout, NavigationMenu, Surface } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './LayoutSidebarExample.module.scss';

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
              aria-label={translateExampleText(t, 'layout', label)}
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

  return (
    <div className={styles.stage!}>
      <Layout direction="horizontal" className={styles.layout!}>
        <Layout.Sidebar
          collapsible
          mode="inline"
          aria-label={t('examples.layout.copy.collapsibleSidebarRegion')}
          width={224}
          collapsedWidth={64}
          header={<SidebarBrand />}
        >
          {({ collapsed }) => <Navigation compact={collapsed} />}
        </Layout.Sidebar>
        <Layout>
          <Layout.Header
            contentAlign="center"
            height={64}
            className={styles.header!}
            surface={{ tone: 'default', border: 'subtle' }}
          >
            <span className={styles.label!}>{t('examples.layout.copy.header')}</span>
          </Layout.Header>
          <Layout.Content padding={16} surface={{ tone: 'secondary' }} className={styles.content!}>
            <Surface tone="elevated" radius={12} border="subtle" className={styles.surface!}>
              <span className={styles.label2!}>{t('examples.layout.copy.content')}</span>
            </Surface>
          </Layout.Content>
          <Layout.Footer surface={{ tone: 'default', border: 'subtle' }} className={styles.footer!}>
            <span className={styles.label2!}>{t('examples.layout.copy.footer')}</span>
          </Layout.Footer>
        </Layout>
      </Layout>
    </div>
  );
}
