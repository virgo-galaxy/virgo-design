import { Skeleton } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SkeletonCardExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div
      className={styles.root!}
      aria-label={t('examples.skeleton.copy.loadingCard')}
      aria-busy="true"
    >
      <Skeleton className={styles.skeleton!} />
      <div className={styles.stage!}>
        <Skeleton variant="text" className={styles.skeleton2!} />
        <Skeleton variant="text" />
        <Skeleton variant="text" className={styles.skeleton3!} />
      </div>
    </div>
  );
}
