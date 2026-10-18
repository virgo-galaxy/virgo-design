import { Link } from 'react-router';

import { proRouteConfig, routePath } from '@/routes';

import { FooterBrand } from './brand/FooterBrand';

import styles from './AppFooter.module.scss';

export function AppFooter() {
  return (
    <footer className={styles.footer}>
      <Link to={routePath(proRouteConfig.home)}>
        <FooterBrand />
      </Link>
    </footer>
  );
}
