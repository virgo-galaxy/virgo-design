import { Switch } from '@virgo-design/ui';

import styles from './SwitchTextExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Switch aria-label="Power" checkedContent="On" uncheckedContent="Off" defaultChecked />
      <Switch aria-label="Binary" checkedContent="1" uncheckedContent="0" />
    </div>
  );
}
