import { Card } from '@virgo-design/ui';

import styles from './CardVariantsExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Card variant="outlined" size="sm" className={styles.card!}>
        <Card.Title as="h3">Outlined</Card.Title>
        <Card.Body>Subtle border and small structural spacing.</Card.Body>
      </Card>
      <Card variant="elevated" size="lg" className={styles.card!}>
        <Card.Title as="h3">Elevated</Card.Title>
        <Card.Body>Elevated surface and large structural spacing.</Card.Body>
      </Card>
    </div>
  );
}
