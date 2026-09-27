import { Avatar, Card, Tag } from '@virgo-design/ui';

import styles from './CardChildrenExample.module.scss';

export default function App() {
  return (
    <Card className={styles.root!}>
      <Avatar fallback="VD" />
      <Card.Title as="h3">Virgo Design Core</Card.Title>
      <Tag intent="brand">Coverage Pass</Tag>
      <p className={styles.text!}>Direct children participate in the Card’s structural flow.</p>
    </Card>
  );
}
