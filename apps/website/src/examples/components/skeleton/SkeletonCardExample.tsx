import { Skeleton } from '@virgo-design/ui';

import styles from './SkeletonCardExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!} aria-label="Loading card" aria-busy="true">
      <Skeleton className={styles.skeleton!} />
      <div className={styles.stage!}>
        <Skeleton variant="text" className={styles.skeleton2!} />
        <Skeleton variant="text" />
        <Skeleton variant="text" className={styles.skeleton3!} />
      </div>
    </div>
  );
}
