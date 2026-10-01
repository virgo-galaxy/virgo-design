import { Skeleton } from '@virgo-design/ui';
import { useLocation } from 'react-router-dom';

import { PageSkeleton } from '@/components/loading/PageSkeleton';
import { ROUTE_PATHS } from '@/shared/routes/route-config';

import styles from './route-skeleton.module.scss';

export function RouteSkeleton() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, '');
  const document =
    path.startsWith(`${ROUTE_PATHS.components}/`) || path.startsWith(`${ROUTE_PATHS.primitives}/`);
  const standalone = path.startsWith('/examples/');
  const catalogue = path === ROUTE_PATHS.components || path === ROUTE_PATHS.primitives;

  if (document) {
    return (
      <div className={styles.document} data-route-skeleton="document">
        <div className={styles.sidebar} aria-hidden="true">
          {[0, 1, 2].map((group) => (
            <div key={group} className={styles.group}>
              <Skeleton variant="text" className={styles.groupTitle} />
              {[0, 1, 2, 3].map((item) => (
                <Skeleton key={item} className={styles.navItem} />
              ))}
            </div>
          ))}
        </div>
        <main id="website-main" tabIndex={-1} className={styles.documentMain}>
          <Skeleton variant="text" className={styles.breadcrumb} aria-hidden="true" />
          <PageSkeleton
            variant={path.startsWith(`${ROUTE_PATHS.components}/`) ? 'document' : 'page'}
          />
        </main>
      </div>
    );
  }

  if (standalone) {
    return (
      <main className={styles.example} data-route-skeleton="example">
        <PageSkeleton variant="example" />
      </main>
    );
  }

  return (
    <div className={styles.page} data-route-skeleton={catalogue ? 'catalogue' : 'page'}>
      <PageSkeleton variant={catalogue ? 'catalogue' : 'page'} />
    </div>
  );
}
