import { Avatar, Badge, Card } from '@virgo-design/ui';

import styles from './CardProfileExample.module.scss';

export default function App() {
  return (
    <Card variant="outlined" className={styles.root!}>
      <div className={styles.stage!}>
        <Avatar fallback="PK" size="lg" />
        <div className={styles.stage2!}>
          <Card.Title as="h3">Pokeya</Card.Title>
          <Card.Description>Design system maintainer</Card.Description>
        </div>
        <Badge count="Online" intent="success" />
      </div>
    </Card>
  );
}
