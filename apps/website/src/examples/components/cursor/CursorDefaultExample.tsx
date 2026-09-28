import { Button, Cursor } from '@virgo-design/ui';

import styles from './CursorDefaultExample.module.scss';

export default function App() {
  return (
    <Cursor.Provider className={styles.stage}>
      <p className={styles.note}>Move your mouse through this surface.</p>
      <Button variant="outline">A precise little pointer</Button>
    </Cursor.Provider>
  );
}
