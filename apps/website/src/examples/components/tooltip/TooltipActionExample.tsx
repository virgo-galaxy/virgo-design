import { SettingsIcon } from '@virgo-design/icons';
import { Tooltip } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './TooltipActionExample.module.scss';

export default function App() {
  const [actions, setActions] = useState(0);
  return (
    <div className={styles.root!}>
      <Tooltip>
        <Tooltip.Trigger aria-label="Workspace settings" onClick={() => setActions((n) => n + 1)}>
          <SettingsIcon size={20} />
        </Tooltip.Trigger>
        <Tooltip.Content>Open workspace settings</Tooltip.Content>
      </Tooltip>
      <span role="status">Settings opened: {actions}</span>
    </div>
  );
}
