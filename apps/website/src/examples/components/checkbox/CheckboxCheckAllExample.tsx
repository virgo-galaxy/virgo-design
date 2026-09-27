import { Checkbox, Separator } from '@virgo-design/ui';
import { useId, useState } from 'react';

import styles from './CheckboxCheckAllExample.module.scss';

const values = ['apple', 'pear', 'orange'];

export default function App() {
  const name = useId();
  const [selected, setSelected] = useState<string[]>(['apple', 'orange']);
  const allChecked = selected.length === values.length;
  const partiallyChecked = selected.length > 0 && !allChecked;
  return (
    <div className={styles.root!}>
      <Checkbox
        checked={allChecked}
        indeterminate={partiallyChecked}
        onChange={(event) => setSelected(event.currentTarget.checked ? [...values] : [])}
      >
        Check all
      </Checkbox>
      <Separator decorative />
      <Checkbox.Group
        value={selected}
        onValueChange={setSelected}
        name={name}
        aria-label="Check all fruit"
      >
        <Checkbox value="apple">Apple</Checkbox>
        <Checkbox value="pear">Pear</Checkbox>
        <Checkbox value="orange">Orange</Checkbox>
      </Checkbox.Group>
    </div>
  );
}
