import { type ReactNode, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

import type { Appearance } from '@/features/color-studio/model/types';

import styles from './layout.module.scss';
import { SiteHeader } from './SiteHeader';

interface AppLayoutProps {
  appearance: Appearance;
  children: ReactNode;
  onAppearanceChange: (appearance: Appearance) => void;
}

export function AppLayout({ appearance, children, onAppearanceChange }: AppLayoutProps) {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = appearance;

    return () => {
      delete root.dataset.theme;
    };
  }, [appearance]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return (
    <div className={styles.layout} data-theme={appearance}>
      <SiteHeader appearance={appearance} onAppearanceChange={onAppearanceChange} />

      <main className={styles.content}>{children}</main>
    </div>
  );
}
