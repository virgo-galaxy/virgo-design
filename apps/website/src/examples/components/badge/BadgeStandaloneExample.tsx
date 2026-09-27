import { Badge } from '@virgo-design/ui';

import styles from './BadgeStandaloneExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <span>
        Queued <Badge count={12} />
      </span>
      <span>
        Release <Badge count="New" intent="info" />
      </span>
    </div>
  );
}
