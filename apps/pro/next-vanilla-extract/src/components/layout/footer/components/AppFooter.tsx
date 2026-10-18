import { proRouteConfig, routePath } from '@/routes';
import { AppLink } from '@/routes/navigation';

import { FooterBrand } from './brand/FooterBrand';

import * as styles from './AppFooter.css';

export function AppFooter() {
  return (
    <footer className={styles.footer}>
      <AppLink href={routePath(proRouteConfig.home)}>
        <FooterBrand />
      </AppLink>
    </footer>
  );
}
