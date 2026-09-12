import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';

import { GlobalControls } from '@/components/global/GlobalControls';
import type { Appearance } from '@/features/color-studio/model/types';

import styles from './layout.module.scss';

interface SiteHeaderProps {
  appearance: Appearance;
  onAppearanceChange: (appearance: Appearance) => void;
}

const NAVIGATION_ITEMS = [
  { path: '/foundations', label: 'navigation.foundations' },
  { path: '/tokens', label: 'navigation.tokens' },
  { path: '/components', label: 'navigation.components' },
  { path: '/resources', label: 'navigation.resources' },
] as const;

export function SiteHeader({ appearance, onAppearanceChange }: SiteHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className={styles.header} data-theme={appearance}>
      <div className={styles.headerInner}>
        <Link className={styles.brand} to="/foundations/colors" aria-label="Virgo Design">
          <strong>Virgo</strong>
          <span>Design</span>
        </Link>

        <nav className={styles.navigation} aria-label={t('navigation.label')}>
          {NAVIGATION_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              className={({ isActive }) =>
                `${styles.navigationLink} ${isActive ? styles.navigationLinkActive : ''}`
              }
              to={item.path}
            >
              {t(item.label)}
            </NavLink>
          ))}
        </nav>

        <GlobalControls appearance={appearance} onAppearanceChange={onAppearanceChange} />
      </div>
    </header>
  );
}
