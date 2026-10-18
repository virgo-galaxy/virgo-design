import { Link } from 'react-router';

import { proRouteConfig, routePath } from '@/routes';

import { FooterBrand } from './brand/FooterBrand';

import * as styles from './AppFooter.css';

export function AppFooter() {
  return (
    <footer className={styles.footer}>
      <Link to={routePath(proRouteConfig.home)}>
        <FooterBrand />
      </Link>
    </footer>
  );
}
