import { Button, Cursor } from '@virgo-design/ui';

import styles from './CursorScopeExample.module.scss';

export default function App() {
  return (
    <div className={styles.regions}>
      <Cursor.Provider className={styles.stage}>
        <p className={styles.note}>Virgo cursor within this scope</p>
        <Button variant="outline">Outer scope</Button>
        <Cursor.Provider disabled className={styles.native}>
          <Button variant="text">Native cursor in this nested region</Button>
        </Cursor.Provider>
      </Cursor.Provider>
      <Button variant="outline">Outside all providers</Button>
    </div>
  );
}
