import { CursorArrowIcon } from '@virgo-design/icons';
import { Cursor, Tooltip } from '@virgo-design/ui';

import styles from './TooltipCursorExample.module.scss';

export default function App() {
  return (
    <Cursor.Provider
      cursor={<CursorArrowIcon className={styles.custom} />}
      hotspot={{ x: 5, y: 3 }}
      follow={{ tooltip: true }}
      className={styles.stage}
    >
      <p className={styles.note}>A custom cursor, an ordinary Tooltip.</p>
      <Tooltip>
        <Tooltip.Trigger>Copy link</Tooltip.Trigger>
        <Tooltip.Content>Copy a shareable link</Tooltip.Content>
      </Tooltip>
    </Cursor.Provider>
  );
}
