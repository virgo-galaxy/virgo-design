import { Separator } from '@virgo-design/ui';

import styles from './SeparatorHorizontalExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <span>Account details</span>
      <Separator />
      <span>Notification preferences</span>
      <Separator />
      <span>Security settings</span>
    </div>
  );
}
