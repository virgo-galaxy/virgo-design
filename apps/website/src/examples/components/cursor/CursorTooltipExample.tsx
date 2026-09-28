import { Cursor, Tooltip } from '@virgo-design/ui';

import styles from './CursorTooltipExample.module.scss';

export default function App() {
  return (
    <Cursor.Provider follow={{ tooltip: true }} className={styles.stage}>
      <p className={styles.note}>Move across the button, then try Tab and Escape.</p>
      <Tooltip openDelay={100}>
        <Tooltip.Trigger>Explore with your pointer</Tooltip.Trigger>
        <Tooltip.Content>Context that follows your intent.</Tooltip.Content>
      </Tooltip>
    </Cursor.Provider>
  );
}
