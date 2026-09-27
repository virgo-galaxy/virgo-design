import { ContextMenu } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './ContextMenuRadioExample.module.scss';

export default function App() {
  const [units, setUnits] = useState('pixels');
  return (
    <div className={styles.root!}>
      <ContextMenu>
        <ContextMenu.Trigger aria-label="Canvas units" className={styles.trigger!}>
          Canvas units · Right-click
        </ContextMenu.Trigger>
        <ContextMenu.Content aria-label="Canvas units">
          <ContextMenu.RadioGroup value={units} onValueChange={setUnits} aria-label="Units">
            <ContextMenu.RadioItem value="pixels">Pixels</ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="points">Points</ContextMenu.RadioItem>
          </ContextMenu.RadioGroup>
        </ContextMenu.Content>
      </ContextMenu>
      <span role="status">Units: {units}</span>
    </div>
  );
}
