import { Skeleton } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SkeletonMotionExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <div className={styles.stage!}>
        <span>{t('examples.skeleton.copy.animated')}</span>
        <Skeleton className={styles.skeleton!} />
      </div>
      <div className={styles.stage!}>
        <span>{t('examples.skeleton.copy.static')}</span>
        <Skeleton animated={false} className={styles.skeleton!} />
      </div>
    </div>
  );
}
