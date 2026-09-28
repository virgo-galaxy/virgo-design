import { Cursor, Tooltip } from '@virgo-design/ui';

import styles from './CursorComparisonExample.module.scss';

function Description() {
  return (
    <Tooltip>
      <Tooltip.Trigger>Hover or focus</Tooltip.Trigger>
      <Tooltip.Content>One Tooltip, two anchor modes.</Tooltip.Content>
    </Tooltip>
  );
}

export default function App() {
  return (
    <div className={styles.comparison}>
      <div className={styles.stage}>
        <p className={styles.note}>Element anchor</p>
        <Description />
      </div>
      <Cursor.Provider follow={{ tooltip: true }} className={styles.stage}>
        <p className={styles.note}>Pointer follow</p>
        <Description />
      </Cursor.Provider>
    </div>
  );
}
