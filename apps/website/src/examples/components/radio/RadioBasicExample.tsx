import { Radio } from '@virgo-design/ui';
import { useId } from 'react';

import styles from './RadioBasicExample.module.scss';

export default function App() {
  const name = useId();
  return (
    <div className={styles.root!}>
      <Radio name={name} value="apple">
        Apple
      </Radio>
      <Radio name={name} value="pear" defaultChecked>
        Pear
      </Radio>
    </div>
  );
}
