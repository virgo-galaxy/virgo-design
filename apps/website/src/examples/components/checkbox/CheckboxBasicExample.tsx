import { Checkbox } from '@virgo-design/ui';

import styles from './CheckboxBasicExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Checkbox>Unchecked</Checkbox>
      <Checkbox defaultChecked>Checked</Checkbox>
      <Checkbox indeterminate>Indeterminate</Checkbox>
    </div>
  );
}
