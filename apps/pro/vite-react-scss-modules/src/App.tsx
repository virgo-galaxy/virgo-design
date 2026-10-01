import { CheckIcon } from '@virgo-design/icons';
import { Button } from '@virgo-design/ui';

import styles from './App.module.scss';

export function App() {
  return (
    <main className={styles.app}>
      <h1 className={styles.title}>Virgo Design Pro</h1>
      <p className={styles.description}>Vite + React + SCSS Modules</p>
      <Button leadingIcon={<CheckIcon />}>Button</Button>
    </main>
  );
}
