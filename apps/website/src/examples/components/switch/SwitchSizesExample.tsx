import { Switch } from '@virgo-design/ui';

import styles from './SwitchSizesExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Switch aria-label="Default switch" defaultChecked />
      <Switch aria-label="Small switch" size="small" defaultChecked />
    </div>
  );
}
