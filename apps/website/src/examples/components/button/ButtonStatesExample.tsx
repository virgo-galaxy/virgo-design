import { Button } from '@virgo-design/ui';

import styles from './ButtonStatesExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondary" disabled>
        Secondary disabled
      </Button>
    </div>
  );
}
