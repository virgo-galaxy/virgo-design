import { Button, Cursor } from '@virgo-design/ui';

import styles from './CursorCustomExample.module.scss';

export default function App() {
  return (
    <Cursor.Provider
      cursor={<span className={styles.crosshair} />}
      hotspot={{ x: 12, y: 12 }}
      className={styles.stage}
    >
      <p className={styles.note}>Your own visual, the same pointer infrastructure.</p>
      <Button variant="outline">Custom crosshair</Button>
    </Cursor.Provider>
  );
}
