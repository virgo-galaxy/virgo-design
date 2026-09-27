import { Badge, Button } from '@virgo-design/ui';

import styles from './BadgeCountsExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Badge count={8}>
        <Button variant="outline">Inbox</Button>
      </Badge>
      <Badge count={120} max={99}>
        <Button variant="outline">Updates</Button>
      </Badge>
      <Badge count="New" intent="info">
        <Button variant="outline">Release</Button>
      </Badge>
    </div>
  );
}
