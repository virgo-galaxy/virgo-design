import { Input } from '@virgo-design/ui';

import styles from './InputStatesExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Input aria-label="Default input" placeholder="Type something" />
      <Input disabled aria-label="Disabled input" defaultValue="Unavailable" />
      <Input readOnly aria-label="Read-only input" defaultValue="virgo-galaxy" />
      <Input invalid aria-label="Invalid input" defaultValue="virgo design" />
    </div>
  );
}
