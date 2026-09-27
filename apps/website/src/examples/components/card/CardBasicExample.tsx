import { Card } from '@virgo-design/ui';

import styles from './CardBasicExample.module.scss';

export default function App() {
  return (
    <Card className={styles.root!}>
      <Card.Body>A compact group of related project information.</Card.Body>
    </Card>
  );
}
