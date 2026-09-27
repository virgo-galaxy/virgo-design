import { Radio } from '@virgo-design/ui';
import { useId } from 'react';

import styles from './RadioDisabledExample.module.scss';

export default function App() {
  const name = useId();
  return (
    <div className={styles.root!}>
      <Radio disabled name={`${name}-off`}>
        Disabled unchecked
      </Radio>
      <Radio defaultChecked disabled name={`${name}-on`}>
        Disabled checked
      </Radio>
    </div>
  );
}
