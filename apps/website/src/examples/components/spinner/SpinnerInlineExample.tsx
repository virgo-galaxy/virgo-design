import { Spinner } from '@virgo-design/ui';

import styles from './SpinnerInlineExample.module.scss';

export default function App() {
  return (
    <span className={styles.root!}>
      <Spinner size="sm" />
      Syncing changes
    </span>
  );
}
