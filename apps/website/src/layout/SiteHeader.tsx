import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';

import { PRIMARY_NAVIGATION_ITEMS, ROUTE_PATHS } from '@/shared/routes/route-config';

import { GlobalControls } from './components/global-controls/GlobalControls';
import styles from './layout.module.scss';

export function SiteHeader() {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link className={styles.brand} to={ROUTE_PATHS.foundationColors} aria-label="Virgo Design">
          <strong>Virgo</strong>
          <span>Design</span>
        </Link>

        <nav className={styles.navigation} aria-label={t('navigation.label')}>
          {PRIMARY_NAVIGATION_ITEMS.map((item) => (
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

        <GlobalControls />
      </div>
    </header>
  );
}
