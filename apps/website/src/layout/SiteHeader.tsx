import { Layout, NavigationMenu } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { VirgoBrand } from '@/components/brand/VirgoBrand/VirgoBrand';
import { PRIMARY_NAVIGATION_ITEMS } from '@/shared/routes/route-config';

import { GlobalControls } from './components/global-controls/GlobalControls';

import styles from './layout.module.scss';

function activePrimaryNavigation(pathname: string) {
  return (
    PRIMARY_NAVIGATION_ITEMS.find(
      (item) => pathname === item.path || pathname.startsWith(`${item.path}/`),
    )?.path ?? ''
  );
}

export function SiteHeader() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <Layout.Header
      className={styles.header!}
      position="fixed"
      height="var(--layout-header-height)"
      gap="clamp(var(--vd-spacing-20), 3vw, var(--vd-spacing-64))"
      paddingInline="clamp(var(--vd-spacing-16), 3vw, var(--vd-spacing-64))"
      contentAlign="start"
      logo={<VirgoBrand className={styles.brand} />}
      actions={<GlobalControls />}
    >
      <NavigationMenu.Root
        className={styles.navigation}
        aria-label={t('app.navigation.label')}
        value={activePrimaryNavigation(pathname)}
      >
        <NavigationMenu.List>
          {PRIMARY_NAVIGATION_ITEMS.map((item) => (
            <NavigationMenu.Item key={item.path} value={item.path}>
              <NavigationMenu.Link render={(linkProps) => <Link {...linkProps} to={item.path} />}>
                {t(item.label)}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </Layout.Header>
  );
}
