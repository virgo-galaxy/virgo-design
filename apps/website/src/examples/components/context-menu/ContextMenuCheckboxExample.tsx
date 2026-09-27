import { ContextMenu } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './ContextMenuCheckboxExample.module.scss';

export default function App() {
  const [snap, setSnap] = useState(true);
  return (
    <div className={styles.root!}>
      <ContextMenu>
        <ContextMenu.Trigger aria-label="Canvas preferences" className={styles.trigger!}>
          Canvas preferences · Right-click
        </ContextMenu.Trigger>
        <ContextMenu.Content aria-label="Canvas preferences">
          <ContextMenu.CheckboxItem checked={snap} onCheckedChange={setSnap}>
            Snap to grid
          </ContextMenu.CheckboxItem>
          <ContextMenu.CheckboxItem>Show guides</ContextMenu.CheckboxItem>
        </ContextMenu.Content>
      </ContextMenu>
      <span role="status">Snap to grid {snap ? 'on' : 'off'}</span>
    </div>
  );
}
