import { proRouteConfig, routePath } from '@/routes';
import { AppLink } from '@/routes/navigation';

import { FooterBrand } from './brand/FooterBrand';

import styles from './AppFooter.module.scss';

export function AppFooter() {
  return (
    <footer className={styles.footer}>
      <AppLink href={routePath(proRouteConfig.home)}>
        <FooterBrand />
      </AppLink>
    </footer>
  );
}
