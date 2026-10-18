import { type ReactNode, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { ROUTE_PATHS } from '@/shared/routes/route-config';
import { useAppearance } from '@/shared/theme/use-appearance';

import { DocumentationNavigationDock } from './DocumentationNavigationDock';
import { SiteHeader } from './SiteHeader';

import styles from './layout.module.scss';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { appearance } = useAppearance();
  const normalizedPathname = pathname.replace(/\/+$/, '');
  const detailOwnsMain =
    normalizedPathname.startsWith(`${ROUTE_PATHS.components}/`) ||
    normalizedPathname.startsWith(`${ROUTE_PATHS.primitives}/`);
  const Content = detailOwnsMain ? 'div' : 'main';

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return (
    <div className={styles.layout} data-theme={appearance}>
      <a className={styles.skipLink} href="#website-main">
        {t('app.navigation.skipToContent')}
      </a>
      <SiteHeader />
      <DocumentationNavigationDock />

      <Content
        className={styles.content}
        id={detailOwnsMain ? undefined : 'website-main'}
        tabIndex={detailOwnsMain ? undefined : -1}
      >
        {children}
      </Content>
    </div>
  );
}
