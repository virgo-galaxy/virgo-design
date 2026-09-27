import { Checkbox } from '@virgo-design/ui';

import styles from './CheckboxDisabledExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Checkbox disabled>Unchecked</Checkbox>
      <Checkbox defaultChecked disabled>
        Checked
      </Checkbox>
      <Checkbox indeterminate disabled>
        Indeterminate
      </Checkbox>
    </div>
  );
}
