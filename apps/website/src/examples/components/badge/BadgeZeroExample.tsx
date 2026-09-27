import { Badge, Button } from '@virgo-design/ui';

import styles from './BadgeZeroExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Badge count={0}>
        <Button variant="outline">Zero hidden</Button>
      </Badge>
      <Badge count={0} showZero>
        <Button variant="outline">Zero shown</Button>
      </Badge>
    </div>
  );
}
