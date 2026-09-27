import { Switch } from '@virgo-design/ui';

import styles from './SwitchBasicExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Switch aria-label="Notifications off" />
      <Switch aria-label="Notifications on" defaultChecked />
    </div>
  );
}
