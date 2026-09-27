import { Badge, Button } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './BadgeInteractiveHostExample.module.scss';

export default function App() {
  const [opens, setOpens] = useState(0);
  return (
    <div className={styles.root!}>
      <Badge count={3} intent="danger">
        <Button onClick={() => setOpens((value) => value + 1)}>Inbox</Button>
      </Badge>
      <span role="status">Inbox opened: {opens}</span>
    </div>
  );
}
