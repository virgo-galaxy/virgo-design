import { Skeleton } from '@virgo-design/ui';

import styles from './SkeletonMotionExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <div className={styles.stage!}>
        <span>Animated</span>
        <Skeleton className={styles.skeleton!} />
      </div>
      <div className={styles.stage!}>
        <span>Static</span>
        <Skeleton animated={false} className={styles.skeleton!} />
      </div>
    </div>
  );
}
