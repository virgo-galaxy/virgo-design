import { Skeleton } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SkeletonShapesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div
      className={styles.root!}
      aria-busy="true"
      aria-label={t('examples.skeleton.copy.loadingContent')}
    >
      <Skeleton variant="text" className={styles.skeleton!} />
      <Skeleton variant="text" className={styles.skeleton2!} />
      <Skeleton className={styles.skeleton3!} />
      <Skeleton variant="circle" />
    </div>
  );
}
