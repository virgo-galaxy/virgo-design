import { Button } from '@virgo-design/ui';

import styles from './ButtonVariantsExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="text">Text Button</Button>
    </div>
  );
}
