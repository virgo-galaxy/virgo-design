import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { VirgoBrand } from '@/components/brand/VirgoBrand/VirgoBrand';
import { PRIMARY_NAVIGATION_ITEMS } from '@/shared/routes/route-config';

import { GlobalControls } from './components/global-controls/GlobalControls';
import styles from './layout.module.scss';

export function SiteHeader() {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <VirgoBrand className={styles.brand} />

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
