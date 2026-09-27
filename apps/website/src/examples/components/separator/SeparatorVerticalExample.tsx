import { Separator } from '@virgo-design/ui';

import styles from './SeparatorVerticalExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <span>Overview</span>
      <Separator orientation="vertical" />
      <span>Activity</span>
      <Separator orientation="vertical" />
      <span>Settings</span>
    </div>
  );
}
