import { Card } from '@virgo-design/ui';

import styles from './CardHeaderExample.module.scss';

export default function App() {
  return (
    <Card className={styles.root!}>
      <Card.Header>
        <Card.Title as="h3">Virgo Design</Card.Title>
        <Card.Description>Shared UI components and design tokens.</Card.Description>
      </Card.Header>
      <Card.Body>A consistent foundation for your product.</Card.Body>
    </Card>
  );
}
