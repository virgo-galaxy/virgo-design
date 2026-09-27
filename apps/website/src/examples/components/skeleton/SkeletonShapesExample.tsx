import { Skeleton } from '@virgo-design/ui';

import styles from './SkeletonShapesExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!} aria-busy="true" aria-label="Loading content">
      <Skeleton variant="text" className={styles.skeleton!} />
      <Skeleton variant="text" className={styles.skeleton2!} />
      <Skeleton className={styles.skeleton3!} />
      <Skeleton variant="circle" />
    </div>
  );
}
