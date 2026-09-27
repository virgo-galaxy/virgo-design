import { Input } from '@virgo-design/ui';

import styles from './InputClearableExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Input clearable aria-label="Clearable project name" defaultValue="Virgo Design" />
    </div>
  );
}
