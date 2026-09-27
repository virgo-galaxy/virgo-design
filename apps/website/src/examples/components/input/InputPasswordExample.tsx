import { Input } from '@virgo-design/ui';

import styles from './InputPasswordExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Input.Password
        aria-label="Current password"
        autoComplete="current-password"
        defaultValue="virgo-password"
      />
    </div>
  );
}
