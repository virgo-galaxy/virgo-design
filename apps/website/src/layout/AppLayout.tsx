import { type ReactNode, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppearance } from '@/shared/theme/use-appearance';

import { DocumentationNavigationDock } from './DocumentationNavigationDock';
import styles from './layout.module.scss';
import { SiteHeader } from './SiteHeader';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { pathname } = useLocation();
  const { appearance } = useAppearance();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return (
    <div className={styles.layout} data-theme={appearance}>
      <SiteHeader />
      <DocumentationNavigationDock />

      <main className={styles.content}>{children}</main>
    </div>
  );
}
